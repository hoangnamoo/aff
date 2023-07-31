const { DataTypes } = require('sequelize');
const DB = require('../configs/dbConfig');

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
            type: DataTypes.DATE,
            defaultValue: new Date(),
        },
        updateTime: {
            type: DataTypes.DATE,
            defaultValue: new Date(),
        },
        tax: {
            type: DataTypes.DECIMAL(10, 2),
        },
    },
    {
        timestamps: false,
        freezeTableName: true,
    }
);
