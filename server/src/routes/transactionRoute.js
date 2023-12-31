const express = require('express');
const transactionController = require('../controllers/transactionController');

const router = express.Router();

router.route('/').get(transactionController.updateTransactions);

module.exports = router;
