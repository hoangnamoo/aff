const express = require('express');
const ecommerceController = require('../controllers/ecommerceController');

const router = express.Router();

router.post('/shopee', ecommerceController.getLinkShopee);

module.exports = router;
