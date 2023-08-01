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
            type: DataTypes.DATE,
        },
        clickTime: {
            type: DataTypes.DATE,
        },
        completeTime: {
            type: DataTypes.DATE,
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
            type: DataTypes.DATE,
        },
    },
    {
        timestamps: false,
        freezeTableName: true,
    }
);
