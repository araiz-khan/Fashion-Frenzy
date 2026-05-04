
import { z } from 'zod';

export type ProductCategory = "Tops" | "Dresses" | "Pants" | "Accessories" | "Shoes" | "Outerwear";
export const ALL_CATEGORIES: ProductCategory[] = ["Tops", "Dresses", "Pants", "Accessories", "Shoes", "Outerwear"];

export type ProductSize = "XS" | "S" | "M" | "L" | "XL" | "One Size";
export const ALL_SIZES: ProductSize[] = ["XS", "S", "M", "L", "XL", "One Size"];

export type Product = {
  id: string; // Firestore document ID when fetched
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: ProductCategory;
  sizes: ProductSize[];
  sellerId: string; 
  createdAt?: string; // Serialized Firestore Timestamp (ISO string)
};

// Zod schema for validating Product data, can be used in Genkit flows.
export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  imageUrl: z.string(),
  category: z.enum(ALL_CATEGORIES),
  sizes: z.array(z.enum(ALL_SIZES)),
  sellerId: z.string(),
  createdAt: z.string().optional(),
});

export type CartItem = Product & {
  quantity: number;
};

export type WishlistItem = Product;

export type Filters = {
  categories: ProductCategory[];
  sizes: ProductSize[];
  priceRange: { min: number; max: number };
};

// Types for Virtual Try-On Flow
export const VirtualTryOnInputSchema = z.object({
  userImage: z
    .string()
    .describe(
      "A photo of the user, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  productImage: z.string().describe(
      "A photo of the product (e.g., a shirt, dress), as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
  ),
  productName: z.string().describe("The name of the product."),
  productCategory: z.string().describe("The category of the product (e.g., 'Tops', 'Dresses').")
});
export type VirtualTryOnInput = z.infer<typeof VirtualTryOnInputSchema>;

export const VirtualTryOnOutputSchema = z.object({
  generatedImage: z
    .string()
    .describe(
      "The generated try-on image as a data URI, including MIME type and Base64 encoding."
    ),
});
export type VirtualTryOnOutput = z.infer<typeof VirtualTryOnOutputSchema>;
