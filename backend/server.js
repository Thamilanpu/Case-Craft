import express from "express";
import cors from "cors";
import Stripe from "stripe";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

import orderRoutes from "./routes/orderRoutes.js";

import adminRoutes from "./routes/adminRoutes.js";

import phoneModelRoutes from "./routes/phoneModelRoutes.js";
import petProductRoutes from "./routes/petProductRoutes.js";





dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Database
connectDB();

// Middleware
// Middleware
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "http://localhost:8888",
  "https://case-craft-aobr.vercel.app",
  process.env.CLIENT_URL
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1 || !process.env.NODE_ENV === 'production') {
        callback(null, true);
      } else {
        // Optional: Allow all during dev/testing if needed, or be strict
        callback(null, true); // Temporarily allow all to avoid issues during debugging
      }
    },
    credentials: true
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(morgan("dev"));

// Routes
const apiRouter = express.Router();

apiRouter.get("/", (req, res) => {
  res.json({ message: "Phone Cover Customizer API is running" });
});

apiRouter.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount, currency = "usd" } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

apiRouter.use("/auth", authRoutes);
apiRouter.use("/orders", orderRoutes);
apiRouter.use("/admin", adminRoutes);
apiRouter.use("/phone-models", phoneModelRoutes);
apiRouter.use("/pet-products", petProductRoutes);
apiRouter.use("/admin/pet-products", petProductRoutes);

// Mount router
app.use("/api", apiRouter);
app.use("/", apiRouter);



// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Error:", err);

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      message: messages.join(", ")
    });
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    return res.status(409).json({
      message: "Duplicate entry. This record already exists."
    });
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      message: "Invalid token"
    });
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      message: "Token expired"
    });
  }

  // Default error
  res.status(err.status || 500).json({
    message: err.message || "Internal server error"
  });
});


export default app;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

