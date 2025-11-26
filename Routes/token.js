import express from "express";
import axios from "axios";

const router = express.Router();

const API_KEY = "df83590d-a877-4446-a58b-d7a23534c299";
const SECRET = "6e3aaa3506d7872d54c051029abcf6ad6349a26b64ae48cdd60c73e85228adfe";

router.get("/", async (req, res) => {
  try {
    console.log("🎯 Generating token...");

    const { data } = await axios.post(
      "https://api.videosdk.live/v1/auth/token", // ✅ Correct endpoint
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
