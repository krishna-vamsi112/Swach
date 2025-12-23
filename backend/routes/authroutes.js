import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

global.otpStore = {};

// Log Twilio credentials (for debugging)
console.log("SID num:", process.env.TWILIO_ACCOUNT_SID);
console.log("TOKEN num:", process.env.TWILIO_AUTH_TOKEN);
console.log("PHONE:", process.env.TWILIO_PHONE_NUMBER);

// ======================= REGISTER =======================

// ✅ Register route
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    await newUser.save();

    // success response
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        id: newUser._id,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ======================= LOGIN =======================
// ✅ Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // find user
    const user = await User.findOne({ email }).select("email password role");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // generate JWT
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // success response
    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        token,
        userId: user._id,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ======================= SEND OTP =======================
router.post("/send-otp", async (req, res) => {
  try {
    // For testing, use a fixed number
    const mobile = "+918143666507"; // Replace with the number you want to test

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save OTP to memory
    global.otpStore[mobile] = otp;

    console.log(`Generated OTP for ${mobile}: ${otp}`);

    // Send OTP using Twilio
    if (process.env.NODE_ENV === "development") {
      // Just log OTP in development
      console.log(`[DEV MODE] OTP for ${mobile}: ${otp}`);
    } else {
      // Send SMS in production
      await client.messages.create({
        body: `Your OTP code is ${otp}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: mobile,
      });
      console.log(`OTP sent to ${mobile}`);
    }

    return res.status(200).json({
      success: true,
      message: `OTP sent successfully to ${mobile}`,
      mobile, // for debugging
    });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send OTP",
      error: error.message,
    });
  }
});

// ======================= VERIFY OTP =======================
router.post("/verify-otp", async (req, res) => {
  try {
    const { otp } = req.body;
    const mobile = "+918143666507"; // Fixed number for test

    if (!otp) {
      return res.status(400).json({ success: false, message: "OTP is required" });
    }

    // Check OTP
    if (global.otpStore[mobile] !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    // OTP correct, delete from memory
    delete global.otpStore[mobile];

    // Find or create user
    let user = await User.findOne({ mobile });
    if (!user) {
      user = new User({
        name: "Test User",
        email: `${mobile}@swachh.com`,
        password: "otp_login",
        mobile,
      });
      await user.save();
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, mobile: user.mobile, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
      token,
      userId: user._id,
      role: user.role,
    });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to verify OTP",
      error: error.message,
    });
  }
});

export default router;
