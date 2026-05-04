"use client";

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { ProductCard } from '@/components/products/ProductCard';
import type { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { ArrowRight, Loader2 } from 'lucide-react';
import { getAllProductsFromDB } from '@/actions/productActions';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export function NewArrivals() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const autoplayPlugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);

      const allProductsResult = await getAllProductsFromDB();
      if ('error' in allProductsResult) {
        console.error(allProductsResult.error);
        setProducts([]);
      } else {
        // Sort by creation date and take the latest 12 for the carousel
        const sortedProducts = allProductsResult.sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateB - dateA;
        });
        setProducts(sortedProducts.slice(0, 12));
      }
      
      setIsLoading(false);
    };

    fetchProducts();
  }, []);

  if (isLoading) {
    return (
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Fresh Off The Hanger</h2>
          <div className="flex items-center justify-center min-h-[200px]">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return null; // Don't show if there are no products
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-foreground">Fresh Off The Hanger</h2>
          <Button variant="link" asChild className="text-primary hover:underline">
            <Link href="/shop">View All <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>
        
        <Carousel
          plugins={[autoplayPlugin.current]}
          className="w-full"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="-ml-4">
            {products.map((product) => (
              <CarouselItem key={product.id} className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                <div className="p-1 h-full">
                  <ProductCard product={product} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
}
