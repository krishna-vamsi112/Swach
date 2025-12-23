// import express from "express";
// import multer from "multer";
// import path from "path";

// const router = express.Router();

// // Multer storage config
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); // local folder where images go
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname)); // unique name
//   },
// });

// const upload = multer({ storage });

// // Route for uploading image
// router.post("/", upload.single("image"), (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ error: "No file uploaded" });
//   }
//   res.json({
//     imageUrl: `https://swacchh.com/backend/uploads/${req.file.filename}`,
//   });
// });

// export default router;

import express from "express";
import multer from "multer";
import path from "path";

const router = express.Router();

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Store uploaded images here
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post("/", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  res.json({
    imageUrl: `https://swacchh.com/backend/uploads/${req.file.filename}`,
  });
});

export default router;
