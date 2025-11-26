import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    console.log("🎯 /api/create-meeting called");
    const { token } = req.body;

    if (!token) {
      console.log("❌ No token received");
      return res.status(400).json({ error: "Token missing" });
    }

    const response = await axios.post(
      "https://api.videosdk.live/v2/rooms",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("✅ Meeting created:", response.data.roomId);
    return res.json(response.data);
  } catch (err) {
    console.error("❌ Create meeting error:", err.response?.data || err.message);
    return res.status(500).json({
      error: err.response?.data || err.message,
    });
  }
});

export default router;
