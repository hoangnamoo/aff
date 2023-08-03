const { DataTypes } = require('sequelize');
const DB = require('../configs/dbConfig');
const { getUnixTime } = require('date-fns');

module.exports = DB.define(
    'Campaigns',
    {
        campId: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        merchant: {
            type: DataTypes.STRING,
        },
        campName: {
            type: DataTypes.STRING,
        },
        campType: {
            type: DataTypes.STRING,
        },
        userRate: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        createTime: {
            type: DataTypes.INTEGER,
            defaultValue: getUnixTime(new Date()),
        },
        updateTime: {
            type: DataTypes.INTEGER,
            defaultValue: getUnixTime(new Date()),
        },
        tax: {
            type: DataTypes.DECIMAL(10, 2),
        },
        cap: {
            type: DataTypes.INTEGER,
        },
    },
    {
        timestamps: false,
        freezeTableName: true,
    }
);
