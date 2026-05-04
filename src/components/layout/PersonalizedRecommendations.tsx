
"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ProductCard } from '@/components/products/ProductCard';
import type { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { ArrowRight, Loader2 } from 'lucide-react';
import { getAllProductsFromDB } from '@/actions/productActions';

export function PersonalizedRecommendations() {
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState("Recommended For You");

  useEffect(() => {
    const fetchRecommendations = async () => {
      setIsLoading(true);

      const allProductsResult = await getAllProductsFromDB();
      if ('error' in allProductsResult) {
        console.error(allProductsResult.error);
        setRecommendedProducts([]);
        setIsLoading(false);
        return;
      }
      
      const allProducts = allProductsResult;
      let finalProducts: Product[] = [];

      // Show random products
      if (allProducts.length > 0) {
        setTitle("Fresh Finds For You");
        const shuffled = [...allProducts].sort(() => 0.5 - Math.random());
        finalProducts = shuffled.slice(0, 5);
      }
      
      setRecommendedProducts(finalProducts);
      setIsLoading(false);
    };

    fetchRecommendations();
  }, []);

  if (isLoading) {
    return (
      <section className="bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-foreground">{title}</h2>
            <Button variant="link" asChild className="text-primary hover:underline">
              <Link href="/shop">View All <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="flex items-center justify-center min-h-[200px]">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </div>
      </section>
    );
  }

  if (!recommendedProducts || recommendedProducts.length === 0) {
    return null; // Don't show the section if no products could be recommended
  }

  return (
    <section className="bg-muted/30 py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-foreground">{title}</h2>
          <Button variant="link" asChild className="text-primary hover:underline">
            <Link href="/shop">View All <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {recommendedProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
