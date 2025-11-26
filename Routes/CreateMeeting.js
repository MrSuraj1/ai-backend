// routes/createMeeting.js
import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ error: "Token required in body" });

    // VideoSDK expects header 'authorization' with token (no Bearer typically)
    const resp = await axios.post(
      "https://api.videosdk.live/v2/rooms",
      {}, // empty body
      {
        headers: {
          authorization: token,
          "Content-Type": "application/json",
        },
        timeout: 10000,
      }
    );

    console.log("✅ Room created:", resp.data);
    res.json(resp.data);
  } catch (err) {
    console.error("❌ create-meeting error:", err.response?.data || err.message || err);
    const status = err.response?.status || 500;
    res.status(500).json({ error: err.response?.data || err.message || "Server error" });
  }
});

export default router;
