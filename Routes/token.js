import express from "express";
import axios from "axios";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await axios.post("https://api.videosdk.live/v2/token", {
      apikey: process.env.VIDEOSDK_API_KEY,
      permissions: ["allow_join", "allow_mod"],  // ✅ ये दोनों जरूरी हैं
    });

    res.json({ token: response.data.token });
  } catch (err) {
    console.error("❌ Token generation error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to generate token" });
  }
});

export default router;
