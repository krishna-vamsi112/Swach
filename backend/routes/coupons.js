import express from "express";
import Coupon from "../models/Coupon.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// ✅ Add new coupon
router.post("/",auth(["admin"]), async (req, res) => {
  try {
    const { code, discount, minAmount, expiry, createdBy } = req.body;

    // Prevent duplicate code
    const existing = await Coupon.findOne({ code });
    if (existing) {
      return res.status(400).json({ message: "Coupon code already exists" });
    }

    const coupon = new Coupon({
      code,
      discount,
      minAmount,
      expiry,
      createdBy,
    });

    await coupon.save();
    res.status(201).json(coupon);
  } catch (err) {
    res.status(500).json({ message: "Error creating coupon", error: err.message });
  }
});

// ✅ Get all coupons
router.get("/",auth(), async (req, res) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    res.json(coupons);
  } catch (err) {
    res.status(500).json({ message: "Error fetching coupons", error: err.message });
  }
});

// ✅ Update coupon
router.put("/:id",auth(["admin"]), async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCoupon = await Coupon.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedCoupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    res.json(updatedCoupon);
  } catch (err) {
    res.status(500).json({ message: "Error updating coupon", error: err.message });
  }
});

// ✅ Delete coupon
router.delete("/:id",auth(["admin"]), async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCoupon = await Coupon.findByIdAndDelete(id);

    if (!deletedCoupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    res.json({ message: "Coupon deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting coupon", error: err.message });
  }
});

export default router;
