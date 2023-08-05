const { DataTypes } = require('sequelize');
const DB = require('../configs/dbConfig');
const { getUnixTime } = require('date-fns');
const bcrypt = require('bcrypt');

module.exports = DB.define(
    'Users',
    {
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: 'Email đã tồn tại.',
            },
            validate: {
                isEmail: {
                    msg: 'Vui lòng nhập email của bạn.',
                },
            },
        },
        password: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    msg: 'Mật khẩu phải có độ dài lớn hơn 8 ký tự.',
                    args: [8],
                },
            },
        },
        hashedOTPCode: DataTypes.STRING,
        OTPExpires: DataTypes.INTEGER,
        OTPType: {
            type: DataTypes.ENUM,
            values: ['signup', 'resetPassword', 'withdraw'],
        },
        passwordResetToken: {
            type: DataTypes.STRING,
        },
        passwordResetExpires: {
            type: DataTypes.STRING,
        },
        verified: { type: DataTypes.BOOLEAN, defaultValue: false },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        changePasswordTime: {
            type: DataTypes.INTEGER,
        },
        role: {
            type: DataTypes.ENUM,
            values: ['user', 'admin'],
            defaultValue: 'user',
        },
        cash: {
            type: DataTypes.DECIMAL(10, 0),
            defaultValue: 0,
        },
        pendingCash: {
            type: DataTypes.DECIMAL(10, 0),
            defaultValue: 0,
        },
        avatar: {
            type: DataTypes.STRING,
            defaultValue: 'no-avatar.png',
        },
        createTime: {
            type: DataTypes.INTEGER,
            defaultValue: getUnixTime(new Date()),
        },
    },
    {
        timestamps: false,
        freezeTableName: true,
        hooks: {
            beforeCreate: function (user) {
                user.email = user.email.toLowerCase();
            },
            beforeSave: async function (user) {
                if (user.changed('password')) {
                    user.password = await bcrypt.hash(user.password, 12);
                }
            },
        },
    }
);
