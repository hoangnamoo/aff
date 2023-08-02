const generateOTP = (num) => {
    const digits = '0123456789';
    let OTP = '';
    for (i = 0; i < num; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
};

module.exports = generateOTP;
