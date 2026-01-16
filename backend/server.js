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
app.set("trust proxy", 1);
app.disable("x-powered-by");

// ----- CORS -----
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",")
  : [];

const corsOptions = {
  origin: function (origin, callback) {
    // allow server-to-server, curl, health checks
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// ----- BODY -----
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// ----- HEALTH CHECK -----
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// ----- ROUTES -----
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authroutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/leads", leadRoutes);

// ----- STATIC -----
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ----- START -----
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
