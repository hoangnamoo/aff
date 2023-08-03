const express = require('express');
const morgan = require('morgan');
const globalErrorHandler = require('./controllers/errorController');
const cookieParser = require('cookie-parser');
const cors = require('cors');

require('dotenv').config();

const ecommerceRouter = require('./routes/ecommerceRouter');
const commissionRouter = require('./routes/commissionRouter');
const transactionRouter = require('./routes/transactionRoute');
const campaignRouter = require('./routes/campaignRoute');
const conversionRouter = require('./routes/conversionRoute');
const generatorRouter = require('./routes/generatorRoute');
const userRouter = require('./routes/userRoute');
const AppError = require('./utils/AppError');

const app = express();

//1, GLOBAL MIDDLEWARE
//implement CORS
app.use(cors());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.static('src/public'));

//read body into req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Define Route
app.use('/api/v1/ecommerce', ecommerceRouter);
app.use('/api/v1/commission', commissionRouter);
app.use('/api/v1/transaction', transactionRouter);
app.use('/api/v1/campaign', campaignRouter);
app.use('/api/v1/conversion', conversionRouter);
app.use('/api/v1/generator', generatorRouter);
app.use('/api/v1/user', userRouter);

app.use('*', (req, res, next) => {
    next(new AppError(`Can not found ${req.originalUrl}`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
