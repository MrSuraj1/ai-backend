import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/", (req, res) => {
  const API_KEY = process.env.VIDEOSDK_API_KEY;
  const SECRET_KEY = process.env.VIDEOSDK_SECRET_KEY;

  const token = jwt.sign(
    {
      apikey: API_KEY,
      permissions: ["allow_join", "allow_mod"],
    },
    SECRET_KEY,
    
    { expiresIn: "24h", algorithm: "HS256" }
  );

  res.json({ token });
});

export default router;
