const express = require('express');
const generatorController = require('../controllers/generatorController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/shopee').post(generatorController.getLinkAffiliate);

module.exports = router;
