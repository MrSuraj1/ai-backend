import express from "express";
import axios from "axios";
const router = express.Router();

router.post("/", async (req, res) => {
  
  console.log("🎯 /api/create-meeting hit with body:", req.body);
  
  try {
    const { token } = req.body;


    if (!token) {
      console.log("❌ Token missing in request body");
      return res.status(400).json({ error: "Token missing" });
    }

    console.log("🎟️ Token received:", token.substring(0, 20) + "...");

    const response = await axios.post(
      "https://api.videosdk.live/v2/rooms",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Meeting created:", response.data.meetingId);
    res.json(response.data);
  } catch (error) {
    console.error("❌ Error creating meeting:");
    console.error(error.response?.data || error.message || error);
    res.status(500).json({
      error: error.response?.data || error.message || "Server error",
    });
  }
});

export default router;
