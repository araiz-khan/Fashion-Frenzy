
// src/components/layout/FeaturedCategories.tsx
import { CategoryCard } from './CategoryCard';

const categories = [
  { 
    name: 'Tops', 
    imageUrl: '/images/tops.png', // Updated path
    href: '/shop?category=Tops',
    imageAiHint: 'shirts fashion'
  },
  { 
    name: 'Dresses', 
    imageUrl: '/images/dresses.png', // Updated path
    href: '/shop?category=Dresses',
    imageAiHint: 'dresses fashion'
  },
  { 
    name: 'Pants', 
    imageUrl: '/images/pants.png', // Updated path
    href: '/shop?category=Pants',
    imageAiHint: 'pants fashion'
  },
  { 
    name: 'Accessories', 
    imageUrl: '/images/accessories.png', // Updated path
    href: '/shop?category=Accessories',
    imageAiHint: 'accessories fashion'
  },
];

export function FeaturedCategories() {
  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-8 text-center text-foreground">Shop By Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {categories.map((category) => (
          <CategoryCard 
            key={category.name} 
            name={category.name} 
            imageUrl={category.imageUrl} 
            href={category.href}
            imageAiHint={category.imageAiHint}
          />
        ))}
      </div>
    </section>
  );
}
