import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });


 const sentOTP = async(toEmail,otp)=>{
    try{

        const mailOptions = {
            from: `"Toffee Puddle" <${process.env.EMAIL_USER}>`,
            to: toEmail,
            subject: "Your OTP Code",
            html: `
              <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h2 style="color: #e11d48;">🔐 Your OTP Code</h2>
                <p>Use the code below to verify your account:</p>
                <h1 style="color: #1e40af; letter-spacing: 4px;">${otp}</h1>
                <p>This code is valid for <b>5 minutes</b>.</p>
                <p>If you didn’t request this, you can ignore this email.</p>
              </div>
            `,
          };

          await transporter.sendMail(mailOptions);
          console.log("✅ OTP sent successfully to", toEmail);
        
      
    }catch(error){
        console.error("❌ Error sending OTP:", error);
    }
}

export default sentOTP;