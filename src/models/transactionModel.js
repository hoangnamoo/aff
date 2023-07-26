const { DataTypes } = require('sequelize');
const DB = require('../configs/dbConfig');

module.exports = DB.define(
    'transactions',
    {
        conversion_id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        transaction_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        merchant: {
            type: DataTypes.STRING,
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        platform: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        product_category: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        customer_type: {
            type: DataTypes.STRING,
        },
        transaction_time: {
            type: DataTypes.DATE,
            defaultValue: new Date(),
        },
        transaction_value: {
            type: DataTypes.STRING,
        },
        product_price: {
            type: DataTypes.INTEGER,
        },
        product_quantity: {
            type: DataTypes.INTEGER,
        },
        product_name: {
            type: DataTypes.STRING,
        },
        commission: {
            type: DataTypes.INTEGER,
        },
        user_com: {
            type: DataTypes.INTEGER,
        },
        payed_to_user: {
            type: DataTypes.INTEGER,
            defaultValue: false,
        },
        update_time: {
            type: DataTypes.DATE,
            defaultValue: new Date(),
        },
        click_url: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        is_confirmed: {
            type: DataTypes.INTEGER,
        },
        confirmed_time: {
            type: DataTypes.DATE,
        },
    },
    {
        timestamps: false,
        freezeTableName: true,
    }
);
