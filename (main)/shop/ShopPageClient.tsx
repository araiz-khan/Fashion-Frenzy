
"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProductList } from '@/components/products/ProductList';
import { FilterSidebar } from '@/components/products/FilterSidebar';
import type { Filters, Product, ProductCategory } from '@/types';
import { ALL_CATEGORIES } from '@/types';
import { getAllProductsFromDB } from '@/actions/productActions';
import { Loader2, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ShopPageClient() {
  const searchParams = useSearchParams();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState<Partial<Filters>>({
    categories: [],
    sizes: [],
    priceRange: { min: 0, max: 500 }, // Initial default, updated by maxProductPrice
  });

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      const result = await getAllProductsFromDB();
      if ('error' in result) {
        setError(result.error);
        setAllProducts([]);
      } else {
        setAllProducts(result);
      }
      setIsLoading(false);
    };
    fetchProducts();
  }, []);

  const maxProductPrice = useMemo(() => {
    if (allProducts.length === 0) return 500;
    return Math.max(...allProducts.map(p => p.price), 0);
  }, [allProducts]);

  // Effect to update filters based on URL search parameters
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category') as ProductCategory | null;

    setFilters(prevFilters => {
      let newCategories = prevFilters.categories || [];
      if (categoryFromUrl && ALL_CATEGORIES.includes(categoryFromUrl)) {
        newCategories = [categoryFromUrl];
      }

      return {
        ...prevFilters,
        categories: newCategories,
      };
    });
  }, [searchParams]);


  // Effect to initialize/update priceRange filter once products are loaded or maxProductPrice changes
  useEffect(() => {
    if (allProducts.length > 0 || maxProductPrice > 0) {
      setFilters(prevFilters => ({
        ...prevFilters,
        priceRange: { 
          min: prevFilters.priceRange?.min ?? 0, 
          max: maxProductPrice > 0 ? maxProductPrice : (prevFilters.priceRange?.max ?? 500)
        },
      }));
    }
  }, [allProducts, maxProductPrice]);


  const handleFilterChange = (newFilters: Partial<Filters>) => {
    setFilters(prevFilters => ({ ...prevFilters, ...newFilters }));
  };
  
  const currentFiltersForList = useMemo(() => ({
    ...filters,
    priceRange: filters.priceRange || { min: 0, max: maxProductPrice },
  }), [filters, maxProductPrice]);

  return (
    <div className="container mx-auto py-8 md:py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-headline font-bold mb-3">Shop Our Collection</h1>
        <p className="text-lg text-muted-foreground">Discover unique pieces from independent brands.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <FilterSidebar 
            onFilterChange={handleFilterChange} 
            initialFilters={filters}
            maxPrice={maxProductPrice}
          />
        </div>
        <div className="lg:col-span-3">
          {isLoading && (
            <div className="flex flex-col items-center justify-center min-h-[300px]">
              <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
              <p className="text-muted-foreground">Loading products...</p>
            </div>
          )}
          {error && !isLoading && (
            <div className="flex flex-col items-center justify-center min-h-[300px] text-center bg-destructive/10 p-6 rounded-lg">
              <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
              <h2 className="text-xl font-semibold text-destructive mb-2">Failed to Load Products</h2>
              <p className="text-destructive/80 mb-4">{error}</p>
              <Button onClick={() => window.location.reload()} variant="destructive">Try Again</Button>
            </div>
          )}
          {!isLoading && !error && (
            <ProductList initialProducts={allProducts} filters={currentFiltersForList} />
          )}
        </div>
      </div>
    </div>
  );
}
