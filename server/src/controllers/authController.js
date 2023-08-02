const crypto = require('crypto');
const { Op } = require('sequelize');
const { User } = require('../models');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const Email = require('../utils/sendEmail');
const { getUnixTime } = require('date-fns');
const generateOTP = require('../utils/generateOTP');
const createSendToken = require('../utils/createSendToken');

exports.signupStep1 = catchAsync(async (req, res, next) => {
    //input req.body.email

    //1, Check existed user verified
    const user = await User.findOne({
        where: {
            email: req.body.email,
        },
    });
    if (user && user.verified)
        return next(new AppError('Email đã tồn tại', 400));

    if (user && !user.verified)
        await User.destroy({
            where: { email: req.body.email },
        });
    //2, Genarate OTP Code and create User
    const OTPCode = generateOTP(6);
    console.log(OTPCode);
    const hashedOTPCode = crypto
        .createHash('sha256')
        .update(OTPCode)
        .digest('hex');
    const OTPExpires = getUnixTime(new Date().getTime() + 3 * 60 * 1000);
    const newUser = await User.create(
        {
            email: req.body.email,
            hashedOTPCode,
            OTPExpires,
            OTPType: 'signup',
        },
        {
            fields: ['name', 'email', 'hashedOTPCode', 'OTPExpires', 'OTPType'],
        }
    );
    newUser.hashedOTPCode = undefined;
    newUser.OTPExpires = undefined;
    newUser.OTPType = undefined;

    //3,Send Email
    await new Email(newUser, null, OTPCode).sendOTP();

    //4, Send Response
    res.status(200).json({
        status: 'success',
        message: 'OTP đã được gửi về Email của bạn',
        data: newUser,
    });
});

exports.signupStep2 = catchAsync(async (req, res, next) => {
    //input req.body.OTPCode
    const hashedOTPCode = crypto
        .createHash('sha256')
        .update(`${req.body.OTPCode}` || '')
        .digest('hex');

    const currentUser = await User.findOne({
        where: {
            email: req.body.email,
            hashedOTPCode,
            OTPExpires: {
                [Op.gte]: getUnixTime(new Date()),
            },
        },
    });

    if (!currentUser)
        return next(new AppError('OTP không chính xác hoặc đã hết hạn', 401));

    const resetToken = crypto.randomBytes(32).toString('hex');
    const passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');
    currentUser.hashedOTPCode = null;
    currentUser.OTPExpires = null;
    currentUser.OTPType = null;
    currentUser.passwordResetToken = passwordResetToken;
    currentUser.passwordResetExpires = getUnixTime(Date.now() + 3 * 60 * 1000);
    await currentUser.save();
    res.status(200).json({
        status: 'success',
        resetToken,
    });
});

exports.signupStep3 = catchAsync(async (req, res, next) => {
    //input req.body: {password, email, resetToken}

    const passwordResetToken = crypto
        .createHash('sha256')
        .update(req.body.resetToken)
        .digest('hex');

    const currentUser = await User.findOne({
        where: {
            email: req.body.email,
            passwordResetToken,
            passwordResetExpires: {
                [Op.gte]: getUnixTime(Date.now()),
            },
        },
    });

    if (!currentUser)
        return next(
            new AppError(
                'Người dùng không tồn tại hoặc đã hết hạn xác thực',
                401
            )
        );

    currentUser.password = req.body.password;
    currentUser.passwordResetExpires = null;
    currentUser.passwordResetToken = null;
    currentUser.verified = true;
    const updateUser = await currentUser.save();
    createSendToken(updateUser, 201, res);
});
