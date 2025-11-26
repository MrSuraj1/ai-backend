import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import tokenRoute from "./Routes/token.js";
import createMeetingRoute from "./Routes/createMeeting.js";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://ai-meet.netlify.app"],
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/api/get-token", tokenRoute);
app.use("/api/create-meeting", createMeetingRoute);

app.get("/", (req, res) => {
  res.send("🚀 AI Meet Backend Running!");
});

app.listen(process.env.PORT || 5000, () => {
  console.log("🚀 Server running on", process.env.PORT || 5000);
});
