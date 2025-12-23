import express from "express";
import Product from "../models/product.js"; // create this model
const router = express.Router();
import auth from "../middleware/auth.js";

// Create product
// Create product
router.post("/", auth(["admin"]), async (req, res) => {
  try {
    const { name, image, variants } = req.body;

    if (!variants || !Array.isArray(variants) || variants.length === 0) {
      return res.status(400).json({ error: "At least one variant is required" });
    }

    const newProduct = new Product({ name, image, variants });
    await newProduct.save();
    res.json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update product
router.put("/:id",auth(["admin"]), async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete product
router.delete("/:id",auth(["admin"]), async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;