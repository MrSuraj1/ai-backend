import express from "express";
import fetch from "node-fetch"; // make sure node-fetch installed (npm i node-fetch)
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// ✅ POST /api/create-meeting
router.post("/", async (req, res) => {
  try {
    const { token } = req.body;

    const response = await fetch("https://api.videosdk.live/v2/rooms", {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("VideoSDK error:", data);
      return res.status(400).json({ error: data });
    }

    res.json(data);
  } catch (error) {
    console.error("❌ Error creating meeting:", error);
    res.status(500).json({ error: "Error creating meeting" });
  }
});

export default router;
