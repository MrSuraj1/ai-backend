import express from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = "df83590d-a877-4446-a58b-d7a23534c299";
const SECRET = "6e3aaa3506d7872d54c051029abcf6ad6349a26b64ae48cdd60c73e85228adfe";

app.get("/api/get-token", (req, res) => {
  try {
    console.log("Generating token...");

    const payload = {
      apikey: API_KEY,
      permissions: ["allow_join", "allow_mod", "allow_create"],
      version: 2,
      roles: ["rtc", "participant", "host"],   // MOST IMPORTANT
    };

    const token = jwt.sign(payload, SECRET, {
      expiresIn: "2h",
      algorithm: "HS256",
    });

    console.log("Token:", token);
    res.json({ token });
  } catch (err) {
    console.error("Token error:", err);
    res.status(500).json({ error: "Token generation failed" });
  }
});

app.listen(5000, () => console.log("Server running on 5000"));
