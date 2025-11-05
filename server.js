import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import tokenRoute from "./Routes/token.js";
import createmeeting from "./Routes/CreateMeeting.js";

dotenv.config();
const app = express();

// ✅ CORS Middleware (better & dynamic)
app.use((req, res, next) => {
  const allowedOrigins = [
    "http://localhost:5173",
    "https://ai-meet.netlify.app",
    "https://ai-backend-zczd.onrender.com",
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(express.json());

app.use("/api/get-token", tokenRoute);
app.use("/api/create-meeting", createmeeting);

app.get("/", (req, res) => {
  res.send("✅ AI Meet Backend is running!");
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`🚀 Server running on http://localhost:${process.env.PORT || 5000}`);
});
