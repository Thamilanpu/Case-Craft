import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    items: [
      {
        productId: { type: String, required: true },
        productName: { type: String, required: true },
        designImage: { type: String, required: true },
        templateImage: { type: String, default: "" },
        userCustomImage: { type: String, default: "" },
        customText: { type: String, default: "" },
        price: { type: Number, required: true, default: 0 },
        quantity: { type: Number, required: true, min: 1, default: 1 },
        category: { type: String, default: "phone_case" }
      }
    ],
    fullName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    address: {
      type: String,
      required: true,
      trim: true
    },
    total: {
      type: Number,
      required: true,
      default: 0
    },
    status: {
      type: String,
      enum: ["pending", "confirmed"],
      default: "pending"
    }
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;

