const crypto = require('crypto');
const catchAsync = require('../utils/catchAsync');
const generateOTP = require('../utils/generateOTP');
const Email = require('../utils/sendEmail');

exports.getOTP = (Model, OTPLength) => {
    return catchAsync(async (req, res, next) => {
        //input req.user
        //2, Genarate OTP Code and create User
        const OTPCode = generateOTP(OTPLength);
        const hashedOTPCode = crypto
            .createHash('sha256')
            .update(OTPCode)
            .digest('hex');
        const OTPExpires = getUnixTime(new Date().getTime() + 3 * 60 * 1000); //Expires 3 minutes
        const currentUser = await Model.findByPk(req.user.userId);
        currentUser.hashedOTPCode = hashedOTPCode;
        currentUser.OTPExpires = OTPExpires;
        await currentUser.save();

        //3,Send Email
        await new Email(currentUser, null, OTPCode).sendOTP();

        //4, Send Response
        res.status(200).json({
            status: 'success',
            message: 'OTP đã được gửi về Email của bạn',
        });
    });
};
