import express from "express";
import User from "../models/User.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Get user profile by ID
router.get("/:id",auth(), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Update user profile by ID
router.put("/:id", async (req, res) => {
  try {
    const { name, email, photo, addresses } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = name || user.name;
    user.email = email || user.email;
    user.photo = photo || user.photo;

    // ✅ If addresses exist in request, update
    if (addresses && addresses.length > 0) {
      if (user.addresses && user.addresses.length > 0) {
        user.addresses[0].address = addresses[0].address || user.addresses[0].address;
        user.addresses[0].mobile = addresses[0].mobile || user.addresses[0].mobile;
      } else {
        user.addresses.push(addresses[0]);
      }
    }

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


export default router;
