const express = require('express');
const generatorController = require('../controllers/generatorController');

const router = express.Router();

router.route('/shopee').post(generatorController.getLinkShopee);

module.exports = router;
