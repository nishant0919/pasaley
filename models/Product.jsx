import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  sellingPrice: { type: Number, required: true },
  crossedPrice: { type: Number },
  costPrice: { type: Number },
  quantity: { type: Number },
  weight: { type: String },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  images: [{ type: String }],
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
