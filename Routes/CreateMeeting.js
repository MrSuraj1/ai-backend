import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/create-meeting", async (req, res) => {
  try {
    const { token } = req.body;

    const response = await axios.post(
      "https://api.videosdk.live/v2/rooms",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`, // ✔ CORRECT
          "Content-Type": "application/json",
        },
      }
    );

    return res.json({ meetingId: response.data.roomId });
  } catch (error) {
    console.log("Create meeting error:", error.response?.data);
    return res.status(500).json({
      error: error.response?.data || "Meeting creation failed",
    });
  }
});

export default router;
