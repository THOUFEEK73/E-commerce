import express from "express";
import {
  getSignUpPage,
  getLoginPage,
  postSignupPage,
  getSignUpOTP,
  verifyOTP,
  postLoginPage,
  logoutUser,
} from "../controllers/userController/authController.js";
import { getHomePage } from "../controllers/userController/homePage.js";
import { isAthenticated } from "../middleWare/authMiddleware.js";
import { noCache } from "../middleWare/noCache.js";
const router = express.Router();


/// SIGNUP INFO ///

router.get("/signup", getSignUpPage);
router.post("/signup", postSignupPage);
router.get("/signup-otp", getSignUpOTP);
router.post("/verify-otp", verifyOTP);


/// LOGIN INFO /// 

router.get("/login",noCache,getLoginPage);
router.post('/login',noCache,postLoginPage)

router.get('/logout',noCache,logoutUser);

router.get("/home",noCache, isAthenticated, getHomePage);

export default router;
