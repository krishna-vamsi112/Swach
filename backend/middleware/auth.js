
import jwt from "jsonwebtoken";
import User from "../models/user.js";

// Auth middleware
const auth = (roles = []) => async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided or invalid format" });
    }

    const token = authHeader.split(" ")[1];

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({
        message: err.name === "TokenExpiredError" ? "Token expired" : "Unauthorized",
      });
    }

    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(401).json({ message: "User not found" });

    // Role-based authorization
    if (roles.length && !roles.includes(user.role)) {
      return res.status(403).json({ message: "Forbidden: Insufficient permissions" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Auth middleware error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export default auth;
