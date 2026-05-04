
import type { Product, ProductCategory, ProductSize } from '@/types';

// This file can be used for initial seeding or testing, but the live app now fetches from the database.
export const mockProducts: Product[] = [];

// This function is now deprecated for the main product detail page, as it fetches from the DB.
// It might still be useful for other parts of the app if they only need mock data.
export const getProductById = (id: string): Product | undefined => {
  console.warn(`getProductById (from mock data) is deprecated. Product with ID ${id} should be fetched from the database.`);
  return mockProducts.find(product => product.id === id);
};
