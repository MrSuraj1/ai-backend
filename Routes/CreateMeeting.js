import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/create-meeting", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Token missing in header" });
    }

    const token = authHeader.split(" ")[1];

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

    return res.json({ meetingId: response.data.roomId });
  } catch (error) {
    console.log("Create meeting error:", error.response?.data);
    res.status(500).json({
      error: error.response?.data || "Meeting creation failed",
    });
  }
});

export default router;
