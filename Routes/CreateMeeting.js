import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { token } = req.body;

    const response = await axios.post(
      "https://api.videosdk.live/v2/rooms",
      {},
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({ meetingId: response.data.roomId });
  } catch (error) {
    res.status(500).json({ error: "Meeting creation failed" });
  }
});

export default router;
