const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/signup/step1', authController.signupStep1);
router.post('/signup/step2', authController.signupStep2);
router.post('/signup/step3', authController.signupStep3);
router.post('/login', authController.login);

router.get('/get-me', authController.protect, userController.getMe);

module.exports = router;
