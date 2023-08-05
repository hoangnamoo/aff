const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const { getUnixTime } = require('date-fns');

const { User } = require('../models');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const Email = require('../utils/sendEmail');
const generateOTP = require('../utils/generateOTP');
const createSendToken = require('../utils/createSendToken');
const checkPasswordCorrect = require('../utils/checkPasswordCorrect');
const changedPasswordAfter = require('../utils/changedPasswordAfter');

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

exports.login = catchAsync(async (req, res, next) => {
    //input {email/username: abcd, password: 123456}
    const { email, password } = req.body;

    //1, check input
    if (!email || !password)
        return next(new AppError('Vui lòng cung cấp Email và mật khẩu', 400));

    //2, check exist user and password //Do not show exactly user or password is incorrect!
    const currentUser = await User.findOne({
        where: { email },
    });

    if (
        !currentUser ||
        !(await checkPasswordCorrect(password, currentUser.password))
    )
        return next(new AppError('user or password is incorrect!!', 401));

    //3, If everithing ok, start send Token
    createSendToken(currentUser, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
    //1, get Token from req.cookies
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.access_token) {
        token = req.cookies.access_token;
    }
    if (!token) {
        return next(new AppError('please login to access!', 401));
    }

    //2, check user exits with id from Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log(decoded);
    const currentUser = await User.findByPk(decoded.id);
    if (!currentUser) {
        return next(new AppError('User not exist, please login again!!', 401));
    }

    //3, check expires token
    if (changedPasswordAfter(decoded.iat, currentUser.changePasswordTime)) {
        return next(
            new AppError('user changed password, plesae login again!', 401)
        );
    }

    //provide currentUser to next action
    req.user = currentUser;

    next();
});
