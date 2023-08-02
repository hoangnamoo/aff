const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup/step1', authController.signupStep1);
router.post('/signup/step2', authController.signupStep2);
router.post('/signup/step3', authController.signupStep3);

module.exports = router;
