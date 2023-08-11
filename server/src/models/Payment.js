const { DataTypes } = require('sequelize');
const DB = require('../configs/dbConfig');
const { getUnixTime } = require('date-fns');

module.exports = DB.define(
    'Payments',
    {
        paymentId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        amount: {
            type: DataTypes.INTEGER,
        },
        createTime: {
            type: DataTypes.INTEGER,
            defaultValue: getUnixTime(new Date()),
        },
        completeTime: {
            type: DataTypes.INTEGER,
        },
        status: {
            type: DataTypes.ENUM,
            values: ['0', '1', '2'],
        },
        paymentType: {
            type: DataTypes.ENUM,
            values: ['withdraw', 'bonus'],
        },
        paymentImage: {
            type: DataTypes.STRING,
        },
        bankAccountName: {
            type: DataTypes.STRING,
        },
        bankAccountNumber: {
            type: DataTypes.STRING,
        },
    },
    {
        timestamps: false,
        freezeTableName: true,
    }
);
