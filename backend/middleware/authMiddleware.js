import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.toLowerCase().startsWith("bearer ")) {
    token = authHeader.split(" ")[1];
  }

  if (!token) {
    console.log("[AuthMiddleware] No token found in Authorization header");
    return res.status(401).json({ message: "Not authorized, token missing" });
  }

  try {
    if (!process.env.JWT_SECRET) {
      console.error("[AuthMiddleware] CRITICAL: JWT_SECRET is not defined!");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("[AuthMiddleware] Token verified for user:", decoded.id);
    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) {
      console.log("[AuthMiddleware] User not found in database for ID:", decoded.id);
      return res.status(401).json({ message: "User no longer exists" });
    }
    next();
  } catch (error) {
    console.error("[AuthMiddleware] Verification failed:", error.message);
    return res.status(401).json({ message: "Not authorized, token invalid" });
  }
};

