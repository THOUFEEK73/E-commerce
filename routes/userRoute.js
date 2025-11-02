import express from 'express';
import { getSignUpPage,getLoginPage, postSignupPage,getSignUpOTP } from '../controllers/userController/authController.js';


const router = express.Router();

router.get('/signup',getSignUpPage);
router.post('/signup',postSignupPage);
router.get('/signup-otp',getSignUpOTP);

router.get('/login',getLoginPage);









export default router;