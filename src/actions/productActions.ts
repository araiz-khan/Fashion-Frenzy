
"use server";

import { getProductModel } from '@/lib/mongodb/models/Product';
import type { Product, ProductCategory, ProductSize } from '@/types';
import { ALL_CATEGORIES, ALL_SIZES } from '@/types';

const PLACEHOLDER_IMAGE = 'https://placehold.co/300x450.png';

const normalizeSizes = (sizes: string[]): ProductSize[] => {
  const normalized = sizes
    .map((size) => String(size).trim().toUpperCase())
    .filter((size) => ALL_SIZES.includes(size as ProductSize)) as ProductSize[];

  return normalized.length > 0 ? normalized : ['One Size'];
};

const mapProduct = (doc: any): Product => ({
  id: doc._id.toString(),
  name: doc.name || 'Unnamed Product',
  description: doc.description || '',
  price: typeof doc.price === 'number' ? doc.price : 0,
  imageUrl: doc.imageUrl || PLACEHOLDER_IMAGE,
  category: (ALL_CATEGORIES.includes(doc.category)
    ? doc.category
    : ALL_CATEGORIES[0]) as ProductCategory,
  sizes: normalizeSizes(Array.isArray(doc.sizes) ? doc.sizes : []),
  sellerId: doc.sellerId || 'unknown_seller',
  createdAt: doc.createdAt ? new Date(doc.createdAt).toISOString() : undefined,
});

export async function getAllProductsFromDB(): Promise<Product[] | { error: string }> {
  try {
    const ProductModel = await getProductModel();
    const products = await ProductModel.find().sort({ createdAt: -1 }).lean();
    return products.map(mapProduct);
  } catch (error: any) {
    console.error('Error fetching all products from MongoDB:', error);
    return { error: `Failed to fetch products. ${error.message}` };
  }
}

export async function getProductById(id: string): Promise<Product | { error: string }> {
  try {
    const ProductModel = await getProductModel();
    const product = await ProductModel.findById(id).lean();
    if (!product) {
      return { error: 'Product not found.' };
    }
    return mapProduct(product);
  } catch (error: any) {
    console.error('Error fetching product from MongoDB:', error);
    return { error: `Failed to fetch product. ${error.message}` };
  }
}

export async function getProductsBySeller(
  sellerId: string
): Promise<Product[] | { error: string }> {
  try {
    const ProductModel = await getProductModel();
    const products = await ProductModel.find({ sellerId })
      .sort({ createdAt: -1 })
      .lean();
    return products.map(mapProduct);
  } catch (error: any) {
    console.error('Error fetching seller products from MongoDB:', error);
    return { error: `Failed to fetch seller products. ${error.message}` };
  }
}

export type CreateProductInput = {
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  category: string;
  sizes: string[];
  sellerId: string;
};

export async function createProduct(
  input: CreateProductInput
): Promise<Product | { error: string }> {
  try {
    const name = input.name?.trim();
    const price = Number(input.price);

    if (!name) {
      return { error: 'Product name is required.' };
    }

    if (!Number.isFinite(price) || price <= 0) {
      return { error: 'Price must be a positive number.' };
    }

    if (!input.sellerId) {
      return { error: 'Seller ID is required.' };
    }

    const category = ALL_CATEGORIES.includes(input.category as ProductCategory)
      ? (input.category as ProductCategory)
      : ALL_CATEGORIES[0];

    const sizes = normalizeSizes(input.sizes || []);

    const ProductModel = await getProductModel();
    const created = await ProductModel.create({
      name,
      description: input.description || '',
      price,
      imageUrl: input.imageUrl || PLACEHOLDER_IMAGE,
      category,
      sizes,
      sellerId: input.sellerId,
    });

    return mapProduct(created);
  } catch (error: any) {
    console.error('Error creating product in MongoDB:', error);
    return { error: `Failed to add product. ${error.message}` };
  }
}

export async function deleteProduct(
  productId: string,
  sellerId: string
): Promise<{ success: true } | { error: string }> {
  try {
    const ProductModel = await getProductModel();
    const deleted = await ProductModel.findOneAndDelete({
      _id: productId,
      sellerId,
    });

    if (!deleted) {
      return { error: 'Product not found or access denied.' };
    }

    return { success: true };
  } catch (error: any) {
    console.error('Error deleting product from MongoDB:', error);
    return { error: `Failed to delete product. ${error.message}` };
  }
}
