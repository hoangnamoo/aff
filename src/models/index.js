const DB = require('../configs/dbConfig');
const commissionModel = require('./commissionModel');

const Commission = commissionModel;

DB.sync({ force: true, alter: true });

module.exports = {
    Commission,
};
