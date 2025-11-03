import validatePhone from "../../utils/validateNum.js";
import sentOTP from "../../utils/nodeMailer.js";
import { hashPassword,comparePassword } from "../../utils/bcrypt.js";
import User from "../../models/userModel.js";
import redisClient from "../../utils/redis.js";



export const getSignUpPage = async (req, res) => {
  return res.render("users/signup");
};

export const postSignupPage = async (req, res) => {
  try {
    const { name, phone, email, password, confirmPassword } = req.body;

    if (!name)
      return res
        .status(400)
        .json({ field: "name", message: "Please enter your name" });

    if (!phone)
      return res
        .status(400)
        .json({ field: "phone", message: "Please enter your phone number" });

    // const isValidPhone = await validatePhone(phone);
    // if(!isValidPhone){
    //   return res
    //   .status(400)
    //   .json({ field: "phone", message: "Invalid phone number" });
    // }

    if (!email)
      return res
        .status(400)
        .json({ field: "email", message: "Please enter your email" });

    if (!password)
      return res
        .status(400)
        .json({ field: "password", message: "please enter your password" });

    if (password !== confirmPassword)
      return res
        .status(400)
        .json({ field: "confirmPassword", message: "password does'nt match" });
    const bcryptpassword = await hashPassword(password);

    const userData = { name, phone, email, bcryptpassword };

    await redisClient.setEx(`signup${email}`, 300, JSON.stringify(userData));
    res.json({ success: true, message: "OTP sent to email" });
  } catch (error) {
    console.error("Error", error);
  }
};

export const getSignUpOTP = async (req, res) => {
  const email = req.query.email;

  if (!email) {
    return res
      .status(400)
      .json({ field: "email", message: "Email is Required" });
  }
  const OTP = Math.floor(100000 + Math.random() * 900000);

  await redisClient.setEx(`otp${email}`, 300, JSON.stringify(OTP));
  await sentOTP(email, OTP);
  // if(sentOTP){
  //   res.json({ success: true, message: "OTP sent successfully" });
  // }

  return res.render("users/signup-otp.ejs", { email });
};

export const verifyOTP = async (req, res) => {
  try {
    const { otp, email } = req.body;
    const data = await redisClient.get(`signup${email}`);
    const redisOTP = await redisClient.get(`otp${email}`);
    if (!redisOTP) return res.status(400).json({ message: "OTP expired" });
    if (!data)
      return res.status(400).json({ message: "signup session expired" });
    const userData = JSON.parse(data);

    if (otp.toString() !== redisOTP.toString()) {
      console.log(otp, "&&", redisOTP);
      return res.status(400).json({ message: "OTP is In Correct !" });
    }

    const newUser = new User({
      userName: userData.name,
      phone: userData.phone,
      email: userData.email,
      password_hash: userData.bcryptpassword,
    });

    await newUser.save();

    req.session.userId = newUser._id;
    req.session.userEmail = newUser.email;

    await redisClient.del(`signup:${email}`);
    await redisClient.del(`otp:${email}`);
    res
      .status(200)
      .json({ message: "User verified and registered successfully" });
  } catch (err) {
    console.error("error occured", err);
  }
};



// LOGIN LOGIC 

export const getLoginPage = async (req, res) => {
  if(req.session.user && req.session.user.email) return res.render('users/home');


  return res.render("users/login");
};

export const postLoginPage = async(req,res)=>{
  try {
    const {email,password} = req.body;
    console.log("passs",password)
    const user = await User.findOne({email});
    console.log('user is',user.email)
    if(!user)  return res.status(400).json({ message: "User not found" });
    
    const validPassword = await comparePassword(password, user.password_hash);
    console.log("validate pass",validPassword)
    if (!validPassword) return res.status(400).json({ message: "Invalid password" });
    console.log('trigger 1')
    req.session.user = {
      id: user._id,
      email: user.email,
      name: user.userName
    };
    req.session.save();

    console.log(req.session.user)


    

    req.session.save((err) => {
      if (err) {
        console.log("❌ Error saving session:", err);
        return res.status(500).send("Session error");
      }
    
      console.log("✅ Session saved:", req.session);
      return res.status(200).json({ message: "Login successful" });
      // res.redirect("/user/home");
    });
    
    // return res.render('users/home');
 

  } catch (err) {
    console.error(err)
  }
 
}

export const logoutUser= async(req,res)=>{
  console.log('test...')
     req.session.destroy((err)=>{
          if(err){
            console.log(err);
            return res.redirect('users/login');
          }

          res.clearCookie('connect.sid');
          res.redirect('/user/login');
     })
}