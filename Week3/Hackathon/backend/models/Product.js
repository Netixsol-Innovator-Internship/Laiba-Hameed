import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true, lowercase: true },
    description: { type: String, required: true },

    attributes: {
      type: Map,
      of: [String],
    },

    variants: [
      { weight: { type: String, required: true }, price: { type: Number, required: true } }
    ],
    images: { type: [String], required: true },
    stock: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
