import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

const API_KEY = "df83590d-a877-4446-a58b-d7a23534c299";
const SECRET = "6e3aaa3506d7872d54c051029abcf6ad6349a26b64ae48cdd60c73e85228adfe";

router.get("/", async (req, res) => {
  try {
    console.log("🎯 Generating JWT token...");

    const payload = {
      apikey: API_KEY,
      permissions: ["allow_join", "allow_mod", "allow_create"],
      version: 2,
    };

    const token = jwt.sign(payload, SECRET, {
      expiresIn: "2h",
      algorithm: "HS256",
    });

    console.log("✅ Token generated:", token.substring(0, 25) + "...");

    return res.json({ token });
  } catch (err) {
    console.error("❌ Error generating token:", err);
    res.status(500).json({ error: "Failed to generate token" });
  }
});

export default router;
