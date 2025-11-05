import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.get("/", (req, res) => {
  const payload = {
    apikey: process.env.VIDEOSDK_API_KEY,
    permissions: ["allow_join", "allow_mod"],
  };

  const token = jwt.sign(payload, process.env.VIDEOSDK_SECRET_KEY, {
    expiresIn: "24h",
    algorithm: "HS256",
  });

  res.json({ token });
});

export default router;
