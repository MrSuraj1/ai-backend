import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import tokenRoute from "./Routes/token.js";
import createmeeting from "./Routes/CreateMeeting.js";

dotenv.config();
const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://ai-meet.netlify.app"
];


// ✅ CORS middleware सबसे ऊपर होना चाहिए
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// ✅ यह line manually मत लगाओ — Render में ये auto conflict बनाती है
// app.use((req, res, next) => { ... }) ❌  ← इसे हटा दो

app.use(express.json());

// ✅ Routes
app.use("/api/get-token", tokenRoute);
app.use("/api/create-meeting", createmeeting);

app.get("/", (req, res) => {
  res.send("✅ AI Meet Backend Running Properly!");
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
});
