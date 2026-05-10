
"use client";

import Link from 'next/link';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import { ProductImage } from '@/components/products/ProductImage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { HeartCrack, ShoppingCart, Trash2 } from 'lucide-react';
import type { WishlistItem } from '@/types';

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();

  const handleMoveToCart = (item: WishlistItem) => {
    addToCart(item);
    removeFromWishlist(item.id);
  };
  
  if (wishlistItems.length === 0) {
    return (
      <div className="container mx-auto py-12 text-center min-h-[calc(100vh-10rem)] flex flex-col items-center justify-center">
        <HeartCrack className="h-24 w-24 text-muted-foreground mb-6" />
        <h1 className="text-3xl font-bold mb-4">Your Wishlist is Empty</h1>
        <p className="text-muted-foreground mb-8">Looks like you haven't added any favorites yet. Explore our collections!</p>
        <Button asChild size="lg">
          <Link href="/">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-headline font-bold mb-8 text-center">My Wishlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlistItems.map(item => {
          const aiHintForImage = `${item.category.toLowerCase()} ${item.name.split(' ').slice(0,1).join(' ').toLowerCase()}`;
          return (
          <Card key={item.id} className="overflow-hidden shadow-lg rounded-xl flex flex-col">
            <Link href={`/products/${item.id}`}>
              <CardHeader className="p-0">
                <ProductImage src={item.imageUrl} alt={item.name} width={300} height={400} className="w-full h-auto aspect-[3/4]" aiHint={aiHintForImage}/>
              </CardHeader>
            </Link>
            <CardContent className="p-4 flex-grow">
              <Link href={`/products/${item.id}`}>
                <CardTitle className="text-lg mb-1 truncate hover:text-primary transition-colors" title={item.name}>{item.name}</CardTitle>
              </Link>
              <p className="text-primary font-semibold text-lg">{formatPrice(item.price)}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0 grid grid-cols-2 gap-2">
              <Button size="sm" variant="outline" onClick={() => handleMoveToCart(item)} className="w-full">
                <ShoppingCart size={16} className="mr-2" />
                Move to Cart
              </Button>
              <Button size="sm" variant="destructive" onClick={() => removeFromWishlist(item.id)} className="w-full">
                <Trash2 size={16} className="mr-2" />
                Remove
              </Button>
            </CardFooter>
          </Card>
        )})}
      </div>
    </div>
  );
}
