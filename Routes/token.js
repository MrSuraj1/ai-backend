import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();
const SECRET = "mysecret"; // use ENV or secure string

router.post("/", (req, res) => {
  const payload = {
    apikey: process.env.VIDEOSDK_API_KEY,
    permissions: [
      "allow_join",
      "allow_mod",
      "allow_create",
      "ask_join",
      "ask_mod",
      "ask_create"
    ],
    version: 2,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 2
  };

  const token = jwt.sign(payload, process.env.VIDEOSDK_SECRET_KEY);
  res.json({ token });
});

export default router;
