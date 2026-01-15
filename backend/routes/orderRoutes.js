import express from "express";
import Order from "../models/order.js";
import User from "../models/User.js";
import auth from "../middleware/auth.js";  

const router = express.Router();

router.post("/", auth(), async (req, res) => {
  try {
const { items, totalAmount, addressId, address, razorpayPaymentId, razorpayOrderId, razorpaySignature, coupon } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "No items in order" });
    }

    // ✅ Address selection
    let finalAddress = null;
    if (addressId) {
      const user = await User.findById(req.user.id);
      const savedAddress = user.addresses.id(addressId);
      if (!savedAddress) return res.status(404).json({ error: "Address not found" });
      finalAddress = savedAddress;
    } else if (address) {
      finalAddress = address;
    } else {
      return res.status(400).json({ error: "Delivery address required" });
    }

    // ✅ Create and save order
    const order = new Order({
      user: req.user.id,
      items,
      totalAmount,
      address: finalAddress,
      status: "Paid", // already successful
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
       coupon: coupon || null,  // ✅ save coupon info

    });

    await order.save();
    res.status(201).json({ message: "Order placed successfully", order });
  } catch (err) {
    console.error("Order Save Error:", err.message);
    res.status(400).json({ error: "Invalid order data" });
  }
});


// 🔹 Get all orders (admin view)
// routes/orderRoutes.js
router.get("/", auth(), async (req, res) => {
  try {
    let orders;

    if (req.user.role === "admin") {
      orders = await Order.find().populate("user", "name email").sort({ createdAt: -1 });
    } else {
      orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    }

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// ✅ Get logged-in user's successful orders
router.get("/my-orders", auth(), async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user.id,     // 👈 comes from authMiddleware after decoding JWT
      status: "Paid",        // only successful orders
    }).sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error("Error fetching my orders:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// 🆕 Admin sets trackingId (no lat/lng)
// router.put("/:orderId/tracking",  async (req, res) => {
//   try {
//     if (req.user.role !== "admin") {
//       return res.status(403).json({ error: "Access denied" });
//     }

//     const { trackingId } = req.body;

// if (!trackingId) return res.status(400).json({ error: "Tracking ID is required" });

// // Generate a Google search link for the tracking ID
// // const trackingUrl = https://www.google.com/search?q=${encodeURIComponent(trackingId)};
//     const trackingUrl = trackingId;


// const order = await Order.findByIdAndUpdate(
//   req.params.orderId,
//   { trackingId, trackingUrl },
//   { new: true }
// );


//     if (!order) {
//       return res.status(404).json({ message: "Order not found" });
//     }

//     res.json({ message: "Tracking info updated", order });
//   } catch (err) {
//     console.error("Tracking Update Error:", err.message);
//     res.status(500).json({ error: err.message });
//   }
// });
router.put("/:orderId/tracking", auth(), async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied" });
    }

    const { trackingId, trackingUrl } = req.body;

    if (!trackingId || !trackingUrl)
      return res.status(400).json({ error: "Tracking ID and URL are required" });

    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      { trackingId, trackingUrl },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ message: "Tracking info updated", order });
  } catch (err) {
    console.error("Tracking Update Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;
