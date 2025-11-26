import express from "express";
import axios from "axios";

const router = express.Router();

const API_KEY = process.env.VIDEOSDK_API_KEY;
const SECRET = process.env.VIDEOSDK_SECRET;

router.get("/", async (req, res) => {
  try {
    console.log("🎯 Generating token...");

    const { data } = await axios.post(
      "https://api.videosdk.live/v2/auth/token", // ✅ Correct endpoint
      {
        apikey: API_KEY,
        secret: SECRET,
        permissions: ["allow_join", "allow_mod", "allow_create"],
      },
      { headers: { "Content-Type": "application/json" } }
    );

    console.log("✅ Token generated:", data.token.substring(0, 20) + "...");
    return res.json({ token: data.token });
  } catch (err) {
    console.error("❌ Error generating token:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to generate token" });
  }
});

export default router;
