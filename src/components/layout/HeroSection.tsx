// src/components/layout/HeroSection.tsx

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center text-center text-white overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-[center_20%] z-0" 
        style={{ backgroundImage: "url('/images/hero_banner.png')" }}
        data-ai-hint="fashion runway model"
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-headline font-bold mb-4 drop-shadow-2xl">
          Discover Unique Fashion
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto drop-shadow-2xl">
          Shop from hundreds of small fashion brands. Each purchase supports an independent creator and brings a unique story to your wardrobe.
        </p>
        <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground drop-shadow-lg">
          <Link href="/shop">
            Shop The Collection <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
