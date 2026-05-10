import mongoose, { Schema, type Model } from "mongoose";
import { connectToProductsDb } from "../connection";

export interface ProductDocument {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  sizes: string[];
  sellerId: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<ProductDocument>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    price: { type: Number, required: true, min: 0 },
    imageUrl: { type: String, default: "" },
    category: { type: String, required: true },
    sizes: { type: [String], default: [] },
    sellerId: { type: String, required: true },
  },
  { timestamps: true }
);

export async function getProductModel(): Promise<Model<ProductDocument>> {
  const conn = await connectToProductsDb();
  return conn.models.Product || conn.model<ProductDocument>("Product", ProductSchema);
}
