const express = require('express');
const commissionController = require('../controllers/commissionController');

const router = express.Router();

router
    .route('/')
    .post(commissionController.createCommistion)
    .patch(commissionController.updateCommission);

module.exports = router;
