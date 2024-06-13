import nodemailer from "nodemailer";
import User from "@/models/userModel";

export const sendOTPEmail = async ({ email, otp }: any) => {
  try {
    var transport = nodemailer.createTransport({
      host: "live.smtp.mailtrap.io",
      port: 587,
      auth: {
        user: "api",
        pass: "fd1ee79d1a32bb4f3da18e2c83cac525",
      },
    });

    const mailOptions = {
      from: '"QuickBuy Support" <mailtrap@quickbuyhere.xyz>',
      to: email,
      subject: "Your OTP Code",
      html: `<p>Your OTP code is <b>${otp}</b>. It will expire in 10 minutes.</p>`,
    };

    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;
  } catch (error: any) {
    console.error("Error sending email:", error.message); // Added logging
    throw new Error(error.message);
  }
};
