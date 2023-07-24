const { DataTypes } = require('sequelize');
const DB = require('../configs/dbConfig');

module.exports = DB.define(
    'commissions',
    {
        platform: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        category_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        category_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        customer_type: {
            type: DataTypes.STRING,
        },
        user_fixed_com: {
            type: DataTypes.DECIMAL(10, 3),
            defaultValue: 0,
        },
        user_bunus_com: {
            type: DataTypes.DECIMAL(10, 3),
            defaultValue: 0,
        },
        max_com: {
            type: DataTypes.INTEGER,
            defaultValue: null,
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: new Date(),
        },
    },
    {
        timestamps: false,
        freezeTableName: true,
    }
);
