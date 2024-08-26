// app.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

// Schemas and Models
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  isVerified: { type: Boolean, default: false },
  otp: String,
  otpExpiration: Date,
});

const User = mongoose.model("User", userSchema);

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Signup route
app.post("/signup", async (req, res) => {
  try {
    const { name, email, number, password ,otp} = req.body;
    console.log(req.body);
    // Check if the user already exists
    let user = await User.findOne({ email });
    if (otp==user.otp) {
      user.name = name;
      user.email = email;
      user.number =number;
      user.password = password;
      await user.save();
    }else{
      res.send("invalid Otp")
    }
  } catch (error) {
    console.error("Error in signup:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
});

// OTP verification route
app.post("/send-otp", async (req, res) => {
  try {
    const { email } = req.body;
    // Find the user by email
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exist." });
    } else {
      const otp = await Math.floor(100000 + Math.random() * 900000).toString();
      const mailOptions = {
        from: "filmflix110@gmail.com",
        to: email,
        subject: "Verify your FilmFlix account",
        html: `Your OTP is: <h1>${otp}</h1>`,
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
          return res
            .status(200)
            .json({ success: true, message: "Error sending email." });
        }
  
        res.json({
          success: true,
          message: "Signup successful! Check your email for OTP verification.",
        });
      });
      const user = await User({ email, otp });
      user.save();
      const userId = user._id;
      res.send({value : "ok" ,id :userId})

    }
  } catch (error) {
    console.error("Error in OTP verification:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
});

// Login route
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found." });
    }

    // Check if password matches
    if (user.password !== password) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect password." });
    }

    // Check if user is verified
    if (!user.isVerified) {
      return res.status(400).json({
        success: false,
        message:
          "Account not verified. Please verify your account using the OTP sent to your email.",
      });
    }

    res.json({ success: true, message: "Login successful!" });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
