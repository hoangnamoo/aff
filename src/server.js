require('dotenv').config();
const app = require('./app');
const autoUpdateCommission = require('./auto/autoUpdateCommisstion');
const DB = require('./configs/dbConfig');
const schedule = require('node-schedule');

const PORT = process.env.PORT || 3000;

DB.authenticate().then(() => {
    console.log('DB connected');
});

// const job = schedule.scheduleJob('*/30 * * * * *', () => {
//     autoUpdateCommission();
// });

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
