import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();   

router.get("/", (req, res) => {
  try {
    console.log("🎯 Generating JWT token...");

    const token = jwt.sign(
      {
        apikey: process.env.VIDEOSDK_API_KEY,
        permissions: ["allow_join",
    "allow_mod",
    "allow_create",
    "ask_join",
    "ask_mod",
    "ask_create"],
        version: 2,
      },
      process.env.VIDEOSDK_SECRET_KEY,
      { expiresIn: "2h" }
    );

    console.log("✅ Token generated:", token.substring(0, 20) + "...");

    res.json({ token });
  } catch (error) {
    console.error("Token error:", error);
    res.status(500).json({ error: "Failed to generate token" });
  }
});

export default router;   // <-- CORRECT
