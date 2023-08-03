const { DataTypes } = require('sequelize');
const DB = require('../configs/dbConfig');

module.exports = DB.define(
    'Conversions',
    {
        conversionId: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        purchaseTime: {
            type: DataTypes.INTEGER,
        },
        clickTime: {
            type: DataTypes.INTEGER,
        },
        completeTime: {
            type: DataTypes.INTEGER,
        },
        merchant: {
            type: DataTypes.STRING,
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        commission: {
            type: DataTypes.DECIMAL(10, 2),
            defaultValue: 0,
        },
        userCommission: {
            type: DataTypes.DECIMAL(10, 2),
            defaultValue: 0,
        },
        payedToUser: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        payTime: {
            type: DataTypes.INTEGER,
        },
    },
    {
        timestamps: false,
        freezeTableName: true,
    }
);
