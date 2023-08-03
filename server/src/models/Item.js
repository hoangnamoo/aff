const { DataTypes } = require('sequelize');
const DB = require('../configs/dbConfig');

module.exports = DB.define(
    'Items',
    {
        orderItemId: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        conversionId: {
            type: DataTypes.STRING,
        },
        itemId: {
            type: DataTypes.STRING,
        },
        itemName: {
            type: DataTypes.STRING,
        },
        shopId: {
            type: DataTypes.STRING,
        },
        shopName: {
            type: DataTypes.STRING,
        },
        itemPrice: {
            type: DataTypes.STRING,
        },
        actualAmount: {
            type: DataTypes.STRING,
        },
        qty: {
            type: DataTypes.INTEGER,
        },
        imageUrl: {
            type: DataTypes.STRING,
        },
        itemTotalCommission: {
            type: DataTypes.DECIMAL(10, 2),
        },
        itemUserCommission: {
            type: DataTypes.DECIMAL(10, 2),
        },
        itemNotes: {
            type: DataTypes.STRING,
        },
        refundAmount: {
            type: DataTypes.STRING,
        },
        fraudStatus: {
            type: DataTypes.STRING,
        },
        completeTime: {
            type: DataTypes.INTEGER,
        },
    },
    {
        timestamps: false,
        freezeTableName: true,
    }
);
