const express = require('express');
const campaignController = require('../controllers/campaignController');

const router = express.Router();

router.route('/').post(campaignController.newCampaign);

module.exports = router;
