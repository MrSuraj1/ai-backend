import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// ⚠️ Replace with your real API key & secret from dashboard.videosdk.live
const API_KEY = "df83590d-a877-4446-a58b-d7a23534c299";
const SECRET = "qfn1Ek3WotU35RB1fh3KJaUQ-EfjzWijEOqAJ6zFDHA";

app.get("/api/get-token", async (req, res) => {
  try {
    const { data } = await axios.post(
      "https://api.videosdk.live/v2/auth/token",
      {
        apikey: API_KEY,
        secret: SECRET,
        permissions: ["allow_join", "allow_mod", "allow_create"],
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    return res.json({ token: data.token });
  } catch (err) {
    console.error("❌ Error generating token:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to generate token" });
  }
});

app.listen(8080, () => console.log("✅ Server running on port 8080"));
