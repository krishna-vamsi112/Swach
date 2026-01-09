import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import authroutes from "./routes/authroutes.js"
import productRoutes from "./routes/productRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js"; // ✅ new
import { fileURLToPath } from "url";
import path from "path";
import customerRoutes from "./routes/customers.js";
import couponRoutes from "./routes/coupons.js";
import profileRoutes from "./routes/profile.js";
import leadRoutes from "./routes/leadRoutes.js";





dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));   // or even 20mb if needed
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth",authroutes)


app.use("/api/products", productRoutes); // ✅ new
app.use("/api/upload", uploadRoutes); // ✅ new
app.use("/api/customers", customerRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/leads", leadRoutes);


// ✅ Serve static uploads
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 5000;



mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
