import express from 'express';
import { getSignUpPage,getLoginPage } from '../controllers/authController.js';


const router = express.Router();

router.get('/signup',getSignUpPage);
router.get('/login',getLoginPage);









export default router;