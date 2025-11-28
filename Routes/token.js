import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.get("/get-token", (req, res) => {
  try {
    const API_KEY = process.env.VIDEOSDK_API_KEY;
    const SECRET = process.env.VIDEOSDK_SECRET;

    if (!API_KEY || !SECRET) {
      return res
        .status(500)
        .json({ error: "Missing VIDEOSDK_API_KEY or VIDEOSDK_SECRET" });
    }

    // CORRECT PAYLOAD STRUCTURE for VIDEOSDK v2
    const payload = {
      apikey: API_KEY,
      permissions: {
        allow_join: true,
        allow_mod: true,
        allow_webcam: true,
        allow_mic: true,
        allow_screen_share: true,
        allow_chat: true,
        allow_recording: true,
      },
    };

    const token = jwt.sign(payload, SECRET, {
      algorithm: "HS256",
      expiresIn: "24h",
    });

    return res.json({ token });
  } catch (err) {
    console.error("Token error:", err);
    res.status(500).json({ error: "Token generation failed" });
  }
});

export default router;
