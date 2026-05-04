"use client";

// src/components/layout/CategoryCard.tsx
import Link from 'next/link';
import { ProductImage } from '@/components/products/ProductImage'; // Reusing ProductImage for consistency

interface CategoryCardProps {
  name: string;
  imageUrl: string;
  href: string;
  imageAiHint: string;
}

export function CategoryCard({ name, imageUrl, href, imageAiHint }: CategoryCardProps) {
  return (
    <Link href={href} className="relative rounded-lg overflow-hidden group block">
      <ProductImage
        src={imageUrl}
        alt={name}
        width={600} // Adjust as needed, maintaining aspect ratio
        height={800} // Adjust as needed, for a taller category image
        className="w-full h-48 md:h-64 object-cover transition-transform duration-300 group-hover:scale-105"
        aiHint={imageAiHint}
      />
      <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-40 transition-opacity duration-300"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <h3 className="text-white font-bold text-xl md:text-2xl">{name}</h3>
      </div>
    </Link>
  );
}
