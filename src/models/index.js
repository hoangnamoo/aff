const DB = require('../configs/dbConfig');
const campaignModel = require('./campaignModel');
const commissionModel = require('./commissionModel');
const transactionModel = require('./transactionModel');

const Commission = commissionModel;
const Transaction = transactionModel;
const Campaign = campaignModel;

//Define relationship Model
Transaction.belongsTo(Campaign, { foreignKey: 'camp_id' });
Campaign.hasMany(Transaction);

DB.sync({ force: false, alter: true });

module.exports = {
    Commission,
    Transaction,
    Campaign,
};
