import validatePhone from "../../utils/validateNum.js";
import sentOTP from "../../utils/nodeMailer.js";
export const getSignUpPage = async (req, res) => {
  return res.render("users/signup");
};

export const postSignupPage = async (req, res) => {
  try {
    const { name, phone, email, password, confirmPassword } = req.body;
    console.log(name);

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

    res.json({ success: true, message: "OTP sent to email" });
  } catch (error) {
    console.error("Error", error);
  }
};

export const getSignUpOTP = async (req, res) => {
  const email = req.query.email;
  console.log("email found", email);

  if (!email) {
    return res
      .status(400)
      .json({ field: "email", message: "Email is Required" });
  }
  const otp = Math.floor(10000 + Math.random() * 900000);

  await sentOTP(email, otp);
  // if(sentOTP){
  //   res.json({ success: true, message: "OTP sent successfully" });
  // }

  return res.render("users/signup-otp.ejs", { email });
};

export const verifyOTP = async (req, res) => {
  try {
  
    console.log(req.body);
  } catch (err) {}
};

export const getLoginPage = async (req, res) => {
  return res.render("users/login");
};
