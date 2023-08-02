const nodemailer = require('nodemailer');
const ejs = require('ejs');
const htmlToText = require('html-to-text');

//new Email(user, url).sendWellcome()

module.exports = class Email {
    constructor(user, url, otp) {
        this.name = user.name || '';
        this.to = user.email;
        this.url = url;
        this.otp = otp;
    }
    transporter() {
        return nodemailer.createTransport({
            host: 'smtp.sendgrid.net',
            port: 587,
            auth: {
                user: 'apikey',
                pass: process.env.SENDGRID_API_KEY,
            },
        });
    }

    async send(template, subject) {
        const html = await ejs.renderFile(
            `${__dirname}/../views/emails/${template}.ejs`,
            {
                name: this.name,
                url: this.url,
                otp: this.otp,
                subject,
            }
        );
        await this.transporter().sendMail({
            from: `"Donhang.store Company" <${process.env.EMAIL_FROM}>`, // sender address
            to: this.to, // list of receivers
            subject, // Subject line
            text: htmlToText.convert(html),
            html,
        });
    }

    async sendWellcome() {
        await this.send('wellcome', 'Đăng ký thành công tại donhang.online');
    }

    async sendResetPassword() {
        await this.send('resetpassword', 'Đặt lại mật khẩu mới');
    }

    async sendOTP() {
        await this.send('otpcode', 'Thực hiện xác thực OTP');
    }
};

// // using Twilio SendGrid's v3 Node.js Library
// // https://github.com/sendgrid/sendgrid-nodejs
// javascript
// const sgMail = require('@sendgrid/mail')
// sgMail.setApiKey(process.env.SENDGRID_API_KEY)
// const msg = {
//   to: 'test@example.com', // Change to your recipient
//   from: 'test@example.com', // Change to your verified sender
//   subject: 'Sending with SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// }
// sgMail
//   .send(msg)
//   .then(() => {
//     console.log('Email sent')
//   })
//   .catch((error) => {
//     console.error(error)
//   })
