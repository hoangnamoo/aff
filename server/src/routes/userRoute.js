const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/signup/step1', authController.signupStep1);
router.post('/signup/step2', authController.signupStep2);
router.post('/signup/step3', authController.signupStep3);
router.post('/login', authController.login);

//Route required Logined
router.use(authController.protect);

router.get('/get-me', userController.getMe);
router.route('/otp').get(authController.getOTP).post(authController.verifyOTP);

module.exports = router;
