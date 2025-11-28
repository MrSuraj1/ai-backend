import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import tokenRoute from "./Routes/token.js";
import createMeetingRoute from "./Routes/CreateMeeting.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://ai-meet.netlify.app"
    ],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());

// API Routes
app.use("/api/", tokenRoute);
app.use("/api/create-meeting", createMeetingRoute);

app.get("/", (req, res) => {
  res.send("✅ Backend running successfully!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
