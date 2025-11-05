import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import tokenRoute from "./Routes/token.js";
import createmeeting from "./Routes/CreateMeeting.js"


dotenv.config();
const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173", "https://ai-meet.netlify.app" , "https://ai-backend-zczd.onrender.com"], // array of allowed origins
    credentials: true, // allow cookies/auth headers
  })
);

app.use(express.json());

app.use("/api/get-token", tokenRoute);
app.use("/api/create-meeting" , createmeeting) ;

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on http://localhost:${process.env.PORT || 5000}`);
});
