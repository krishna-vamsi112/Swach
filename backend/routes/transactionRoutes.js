import express from "express";
import Transaction from "../models/transactionModel.js";
import auth from "../middleware/auth.js";
const router = express.Router();

// Get all transactions
router.get("/",auth(["admin"]), async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
