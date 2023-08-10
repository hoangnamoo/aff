const express = require('express');
const campaignController = require('../controllers/campaignController');
const authController = require('../controllers/authController');
const paymentController = require('../controllers/paymentController');

const router = express.Router();

router.use(authController.protect);
router
    .route('/withdraw')
    .post(authController.verifyOTP, paymentController.requestWithdraw);

module.exports = router;
