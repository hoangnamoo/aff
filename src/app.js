const express = require('express');
const morgan = require('morgan');
const globalErrorHandler = require('./controllers/errorController');

require('dotenv').config();

const ecommerceRouter = require('./routes/ecommerceRouter');
const AppError = require('./utils/AppError');

const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

//read body into req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1/ecommerce', ecommerceRouter);

app.use('*', (req, res, next) => {
    next(new AppError(`Can not found ${req.originalUrl}`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
