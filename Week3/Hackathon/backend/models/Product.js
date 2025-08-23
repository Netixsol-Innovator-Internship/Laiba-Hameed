import mongoose from "mongoose";
import slugify from "slugify";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, unique: true, lowercase: true },
    description: { type: String, required: true },
    caffeine: {
      type: String,
      enum: ["Low Caffeine", "High Caffeine", "Medium Caffeine", "No Caffeine"],
    },
    organic: { type: Boolean, default: false },
    attributes: {
      type: Map,
      of: [String],
    },
    variants: [
      {
        weight: { type: String, required: true },
        price: {
          type: Number,
          required: true,
          min: [0, "Price cannot be negative"],
        },
      },
    ],
    ingredients: {
      type: [String],
    },
    image: { type: String, required: true },
    stock: { type: Number, default: 0, min: [0, "Stock cannot be negative"] },
  },
  { timestamps: true }
);


productSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});


export default mongoose.model("Product", productSchema);
