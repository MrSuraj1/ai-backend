import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/", (req, res) => {
  try {
    const API_KEY = process.env.VIDEOSDK_API_KEY;
    const SECRET = process.env.VIDEOSDK_SECRET;

    if (!API_KEY || !SECRET) {
      return res.status(500).json({ error: "API Key or Secret missing" });
    }

    const payload = {
      apikey: API_KEY,
      permissions: [
        "allow_join",
        "allow_mod",
        "allow_create",
        "allow_webcam",
        "allow_screen_share"
      ],
      version: 2,
    };

    const token = jwt.sign(payload, SECRET, {
      algorithm: "HS256",
      expiresIn: "24h",
    });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Token generation failed" });
  }
});

export default router;
