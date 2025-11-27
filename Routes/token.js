import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/", (req, res) => {
  try {
    const API_KEY = process.env.VIDEOSDK_API_KEY;
    const SECRET = process.env.VIDEOSDK_SECRET; // ✔️ Correct One

    if (!API_KEY || !SECRET) {
      return res.status(500).json({ error: "Missing API_KEY or SECRET" });
    }

    const payload = {
      apikey: API_KEY,
      version: 2,
      permissions: [
       "allow_join",
        "allow_mod",
        "allow_webcam",
        "allow_mic",
        "allow_screen_share",
        "allow_chat",
        "allow_create",
        "allow_recording",
        "allow_server_config"]
    };

    const token = jwt.sign(payload, SECRET, {
      algorithm: "HS256",
      expiresIn: "24h",
    });

    res.json({ token });
  } catch (err) {
    console.error("Token error:", err);
    res.status(500).json({ error: "Token generation failed" });
  }
});

export default router;
