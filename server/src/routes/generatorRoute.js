const express = require('express');
const generatorController = require('../controllers/generatorController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/ecommerce/unlogin').post(generatorController.getLinkAffiliate);

router
    .route('/ecommerce')
    .post(authController.protect, generatorController.getLinkAffiliate);

module.exports = router;
