const { DataTypes } = require('sequelize');
const DB = require('../configs/dbConfig');

module.exports = DB.define(
    'commissions',
    {
        camp_id: {
            type: DataTypes.STRING,
            references: {
                model: 'campaigns',
                key: 'camp_id',
            },
        },
        merchant: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        category_id: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: 'unique_category_id_customer_type',
        },
        product_category: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        customer_type: {
            type: DataTypes.STRING,
            unique: 'unique_category_id_customer_type',
        },
        user_ratio: {
            type: DataTypes.DECIMAL(8, 3),
            defaultValue: 0,
        },
        real_ratio: {
            type: DataTypes.DECIMAL(8, 3),
            defaultValue: 0,
        },
        max_com: {
            type: DataTypes.INTEGER,
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
