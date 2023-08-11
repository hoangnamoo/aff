const { DataTypes } = require('sequelize');
const DB = require('../configs/dbConfig');
const { getUnixTime } = require('date-fns');

module.exports = DB.define(
    'Banks',
    {
        bankId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        bankName: {
            type: DataTypes.STRING,
        },
    },
    {
        timestamps: false,
        freezeTableName: true,
    }
);
