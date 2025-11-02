import express from "express";
import {
  getSignUpPage,
  getLoginPage,
  postSignupPage,
  getSignUpOTP,
  verifyOTP,
  postLoginPage,
} from "../controllers/userController/authController.js";
import { getHomePage } from "../controllers/userController/homePage.js";
import { isAthenticated } from "../middleWare/authMiddleware.js";

const router = express.Router();


/// SIGNUP INFO ///

router.get("/signup", getSignUpPage);
router.post("/signup", postSignupPage);
router.get("/signup-otp", getSignUpOTP);
router.post("/verify-otp", verifyOTP);


/// LOGIN INFO /// 

router.get("/login", getLoginPage);
router.post('/login',postLoginPage)

router.get("/home", isAthenticated, getHomePage);

export default router;
