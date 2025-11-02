import express from 'express';
import { getSignUpPage,getLoginPage, postSignupPage,getSignUpOTP,verifyOTP } from '../controllers/userController/authController.js';
import { verify } from 'crypto';


const router = express.Router();

router.get('/signup',getSignUpPage);
router.post('/signup',postSignupPage);
router.get('/signup-otp',getSignUpOTP);
router.post('/verify-otp',verifyOTP);

router.get('/login',getLoginPage);









export default router;