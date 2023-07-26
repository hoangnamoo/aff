const { Sequelize } = require('sequelize');

const DB = new Sequelize(
    'affiliate_app',
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: 'mysql',
        logging: false,
    }
);

module.exports = DB;
