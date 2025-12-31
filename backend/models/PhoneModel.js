import mongoose from "mongoose";

const phoneModelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    key: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    templateImages: {
      type: [String],
      required: true,
      default: []
    },

    templateImage: {
      type: String,
      default: ""
    },

    mockupImage: {
      type: String,
      default: ""
    },
    cameraOverlay: {
      type: String,
      default: ""
    },

    coverArea: {
      x: { type: Number, default: 0.1 },
      y: { type: Number, default: 0.15 },
      width: { type: Number, default: 0.8 },
      height: { type: Number, default: 0.7 }
    },

    coverSize: {
      width: { type: Number, default: 300 },
      height: { type: Number, default: 500 }
    },

    // ⭐ NEW — Add price for each phone model
    price: {
      type: Number,
      required: true,
      default: 100 // or any default price you want
    }
  },
  { timestamps: true }
);

const PhoneModel = mongoose.model("PhoneModel", phoneModelSchema);

export default PhoneModel;
