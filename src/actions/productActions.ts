
"use server";

import { rtdb } from '@/lib/firebase/config';
import type { Product, ProductCategory, ProductSize } from '@/types';
import { ALL_CATEGORIES, ALL_SIZES } from '@/types';
import { ref, get, query, orderByChild } from 'firebase/database';

export async function getAllProductsFromDB(): Promise<Product[] | { error: string }> {
  try {
    const productsRef = ref(rtdb, 'products');
    // Note: For this query to be efficient, you must define an index in your Realtime Database rules.
    // ".indexOn": "createdAt"
    const q = query(productsRef, orderByChild('createdAt'));
    const snapshot = await get(q);

    if (!snapshot.exists()) {
      return [];
    }

    const productsData = snapshot.val();
    const products = Object.keys(productsData).map(key => {
      const data = productsData[key];
      
      let parsedSizes: ProductSize[] = [];
      if (Array.isArray(data.sizes)) {
        // Ensure sizes are uppercase and valid
        parsedSizes = data.sizes
          .map(s => String(s).trim().toUpperCase())
          .filter(s => ALL_SIZES.includes(s as ProductSize)) as ProductSize[];
      } else if (typeof data.sizes === 'string' && data.sizes.length > 0) {
        parsedSizes = data.sizes.split(',')
          .map(s => s.trim().toUpperCase())
          .filter(s => ALL_SIZES.includes(s as ProductSize)) as ProductSize[];
      }
      
      const mappedProduct: Product = {
        id: key,
        name: data.name || "Unnamed Product",
        description: data.description || "",
        price: typeof data.price === 'number' ? data.price : 0,
        imageUrl: data.imageUrl || `https://placehold.co/300x450.png`,
        category: (ALL_CATEGORIES.includes(data.category) ? data.category : ALL_CATEGORIES[0]) as ProductCategory,
        sizes: parsedSizes.length > 0 ? parsedSizes : ['One Size'],
        sellerId: data.sellerId || "unknown_seller",
        // Correctly handle the createdAt timestamp from Firebase
        createdAt: data.createdAt ? new Date(data.createdAt).toISOString() : new Date().toISOString(),
      };
      return mappedProduct;
    }).filter(product => product.name !== "Unnamed Product" || product.price !== 0);

    // RTDB returns items in ascending order, so we reverse the array for "newest first"
    return products.reverse();
  } catch (error: any) {
    console.error("Error fetching all products from Realtime Database:", error);
    return { error: `Failed to fetch products. ${error.message}` };
  }
}
