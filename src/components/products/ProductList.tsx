
"use client";

import React, { useState, useEffect, useMemo } from 'react';
import type { Product, Filters } from '@/types';
import { ProductCard } from './ProductCard';
// import { mockProducts } from '@/data/products'; // No longer using mockProducts

interface ProductListProps {
  initialProducts?: Product[]; 
  filters: Partial<Filters>;
}

export function ProductList({ initialProducts, filters }: ProductListProps) {
  const [productsToDisplay, setProductsToDisplay] = useState<Product[]>(initialProducts || []);

  const filteredProducts = useMemo(() => {
    let tempProducts = initialProducts || [];

    if (filters.categories && filters.categories.length > 0) {
      tempProducts = tempProducts.filter(p => filters.categories!.includes(p.category));
    }

    if (filters.sizes && filters.sizes.length > 0) {
      tempProducts = tempProducts.filter(p => p.sizes.some(s => filters.sizes!.includes(s)));
    }

    if (filters.priceRange) {
      tempProducts = tempProducts.filter(p => p.price >= filters.priceRange!.min && p.price <= filters.priceRange!.max);
    }
    
    return tempProducts;
  }, [initialProducts, filters]);


  useEffect(() => {
    setProductsToDisplay(filteredProducts);
  }, [filteredProducts]);

  // The parent component (ShopPage) now handles the main loading/error states for initialProducts.
  // This component just displays what it's given or the filtered result.
  if (!initialProducts || initialProducts.length === 0) {
     return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-semibold mb-2">No Products Available</h2>
        <p className="text-muted-foreground">Check back later or try adjusting your filters if applied.</p>
      </div>
    );
  }
  
  if (productsToDisplay.length === 0) {
     return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-semibold mb-2">No Products Found Matching Your Criteria</h2>
        <p className="text-muted-foreground">Try adjusting your filters.</p>
      </div>
    );
  }


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {productsToDisplay.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
