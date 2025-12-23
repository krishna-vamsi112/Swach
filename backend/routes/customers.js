import express from "express";
import User from "../models/User.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// ✅ Get all customers
router.get("/",auth(["admin"]), async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching customers", error });
  }
});

// ✅ Add new customer
router.post("/",auth(["admin"]), async (req, res) => {
  try {
    const { name, email, mobile, address, role } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already exists" });

    const user = new User({
      name,
      email,
      mobile,
      address,
      role,
      password: "default123", // 👈 you can generate / hash later if needed
    });

    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error adding customer", error });
  }
});

// ✅ Edit customer
router.put("/:id",auth(["admin"]), async (req, res) => {
  try {
    const { name, email, mobile, address, role } = req.body;

    const updated = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, mobile, address, role },
      { new: true }
    ).select("-password");

    if (!updated) return res.status(404).json({ message: "Customer not found" });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating customer", error });
  }
});

// ✅ Delete customer
router.delete("/:id",auth(["admin"]), async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Customer not found" });
    res.json({ message: "Customer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting customer", error });
  }
});

export default router;
