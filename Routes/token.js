// routes/token.js
import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

// Ensure you set VIDEOSDK_API_KEY and VIDEOSDK_SECRET in .env
router.get("/", (req, res) => {
  try {
    const API_KEY = process.env.VIDEOSDK_API_KEY;
    const SECRET = process.env.VIDEOSDK_SECRET;
    if (!API_KEY || !SECRET) {
      return res.status(500).json({ error: "VIDEOSDK_API_KEY or VIDEOSDK_SECRET missing in env" });
    }

    const payload = {
      apikey: API_KEY,
      permissions: [
    "allow_join",
    "allow_mod",
    "allow_create",
    "allow_webcam",
    "allow_share",
    "allow_record"
  ],
      version: 2,
    };

    // Sign token with Videosdk secret
    const token = jwt.sign(payload, SECRET, { algorithm: "HS256", expiresIn: "24h" });

    console.log("✅ Token generated (first 20 chars):", token.substring(0, 20) + "...");
    res.json({ token });
  } catch (err) {
    console.error("❌ Token error:", err);
    res.status(500).json({ error: "Failed to generate token" });
  }
});

export default router;


// import express from "express";
// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";

// dotenv.config();

// const router = express.Router();   

// router.get("/", (req, res) => {
//   try {
//     console.log("🎯 Generating JWT token...");

//     const token = jwt.sign(
//       {
//         apikey: process.env.VIDEOSDK_API_KEY,
//         permissions: ["allow_join",
//     "allow_mod",
//     "allow_create",
//     "ask_join",
//     "ask_mod",
//     "ask_create"],
//         version: 2,
//       },
//       process.env.VIDEOSDK_SECRET_KEY,
//       { expiresIn: "2h" }
//     );

//     console.log("✅ Token generated:", token.substring(0, 20) + "...");

//     res.json({ token });
//   } catch (error) {
//     console.error("Token error:", error);
//     res.status(500).json({ error: "Failed to generate token" });
//   }
// });

// export default router;   // <-- CORRECT
