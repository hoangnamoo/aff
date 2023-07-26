const { DataTypes } = require('sequelize');
const DB = require('../configs/dbConfig');

module.exports = DB.define(
    'campaigns',
    {
        camp_id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        merchant: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: false,
        freezeTableName: true,
    }
);
