import mongoose from "mongoose";

const PetProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    key: { type: String, required: true, unique: true },
    price: { type: Number, default: 0 },
    images: { type: [String], default: [] }, // initial image(s)
    templates: { type: [String], default: [] },
    mockupImage: { type: String, default: "" },
    coverArea: { type: Object, default: {} },
    coverSize: { type: Object, default: {} },
  },
  { timestamps: true }
);

export default mongoose.model("PetProduct", PetProductSchema);
