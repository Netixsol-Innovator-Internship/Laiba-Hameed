import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: [30, "Name must be less than 30 characters"],
    },
    slug: { type: String, unique: true, lowercase: true },
    description: { type: String, required: [true, "Description is required"] },
    collections: {
      type: String,
      enum: [
        "Black teas",
        "Green teas",
        "White teas",
        "Chai",
        "Matcha",
        "Herbal teas",
        "Oolong",
        "Rooibos",
        "Tisanes",
      ],
      required: true,
    },
    origin: { type: String, enum: ["India", "Japan", "Iran", "South Africa"] },
    flavor: {
      type: [String],
      enum: [
        "Spicy",
        "Sweet",
        "Citrus",
        "Fruity",
        "Floral",
        "Grassy",
        "Minty",
        "Bitter",
        "Creamy",
      ],
    },
    qualities: {
      type: [String],
      enum: ["Detox", "Energy", "Relax", "Digestion", "Smoothing"],
    },
    caffeine: {
      type: String,
      enum: ["No Caffeine", "Low Caffeine", "Medium Caffeine", "High Caffeine"],
    },
    allergens: {
      type: [String],
      enum: ["Lactose-free", "Gluten-free", "Nut-free", "Soy-free"],
    },
    organic: { type: Boolean, default: false },
    variants: [
      {
        weight: { type: String, required: true },
        price: { type: Number, required: true },
      },
    ],
    images: { type: [String], required: true },
    steepingInstructions: {
      servingSize: String,
      temperature: String,
      time: String,
      colorNote: String,
    },
    ingredients: [String],
    stock: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
