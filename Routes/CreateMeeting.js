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
          Authorization: `Bearer ${token}`, // 👈 IMPORTANT
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("❌ Error creating meeting:", error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || error.message });
  }
});

export default router;
