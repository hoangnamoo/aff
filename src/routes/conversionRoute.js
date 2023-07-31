const express = require('express');
const conversionController = require('../controllers/conversionController');

const router = express.Router();

router.route('/shopee').get(conversionController.updateShopeeConversion);

module.exports = router;
