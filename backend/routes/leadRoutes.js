import express from "express";
import Lead from "../models/Lead.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Create a new lead
router.post("/", async (req, res) => {
  try {
    const { name,phone, email, subject, message } = req.body;

    const newLead = new Lead({ name,phone, email, subject, message });
    await newLead.save();

    res.status(201).json({ message: "Lead saved successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all leads
router.get("/",auth(["admin"]), async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
