const { DataTypes } = require('sequelize');
const DB = require('../configs/dbConfig');

module.exports = DB.define(
    'Orders',
    {
        orderId: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        orderStatus: {
            type: DataTypes.STRING,
        },
        shopType: {
            type: DataTypes.STRING,
        },
    },
    {
        timestamps: false,
        freezeTableName: true,
    }
);
