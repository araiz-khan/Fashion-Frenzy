
"use client";

import Link from 'next/link';
import type { Product } from '@/types';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, ShoppingCart, Star, Camera } from 'lucide-react';
import { ProductImage } from './ProductImage';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge'; // For discount/status badges

interface ProductCardProps {
  product: Product;
  discount?: string; 
  status?: "New" | "Last 2!" | string;
  rating?: number;
  reviewCount?: number;
  brandName?: string;
  secondaryInfo?: string;
  originalPrice?: number;
}

export function ProductCard({ 
  product, 
  discount, 
  status, 
  rating = 0,
  reviewCount = 0,
  brandName,
  secondaryInfo 
}: ProductCardProps) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlist();
  const { formatPrice } = useCurrency();

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation();
    if (isWishlisted(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation();
    addToCart(product);
  };
  
  const aiHintForImage = `${product.category.toLowerCase()} ${product.name.split(' ').slice(0,1).join(' ').toLowerCase()}`;

  let displayBadge: React.ReactNode = null;
  if (discount) {
    displayBadge = <Badge variant="destructive" className="absolute bottom-2 left-2 text-xs px-2 py-1">{discount}</Badge>;
  } else if (status === "New") {
    displayBadge = <Badge variant="secondary" className="absolute bottom-2 left-2 text-xs px-2 py-1 bg-green-600 text-white">{status}</Badge>;
  } else if (status) {
    displayBadge = <Badge variant="destructive" className="absolute bottom-2 left-2 text-xs px-2 py-1">{status}</Badge>;
  }


  return (
    <Card className="group flex h-full flex-col overflow-hidden rounded-lg bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        <CardHeader className="p-0 relative">
          <Link href={`/products/${product.id}`} aria-label={product.name}>
            <ProductImage
              src={product.imageUrl}
              alt={product.name}
              width={300}
              height={400} 
              className="w-full h-auto aspect-[3/4] transition-transform duration-300 group-hover:scale-105"
              aiHint={aiHintForImage}
            />
          </Link>
          {displayBadge}
          
          <div className="absolute top-2 right-2 flex flex-col gap-2">
            <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleWishlistToggle}
                className={cn(
                "h-auto p-1.5 rounded-full bg-card/70 hover:bg-card text-muted-foreground hover:text-primary",
                isWishlisted(product.id) && "text-primary bg-primary/10 hover:bg-primary/20"
                )}
                aria-label={isWishlisted(product.id) ? "Remove from wishlist" : "Add to wishlist"}
            >
                <Heart className="h-5 w-5" fill={isWishlisted(product.id) ? "currentColor" : "none"} />
            </Button>
            <Link 
                href={`/ai-try-on?productId=${product.id}`} 
                className={cn(
                    buttonVariants({ variant: 'ghost', size: 'icon' }),
                    "h-auto p-1.5 rounded-full bg-card/70 hover:bg-card text-muted-foreground hover:text-primary"
                )}
                aria-label="AI Virtual Try-On"
            >
                <Camera className="h-5 w-5" />
            </Link>
          </div>

        </CardHeader>
        <CardContent className="flex-grow p-4">
          <Link href={`/products/${product.id}`}>
            <h3 className="font-semibold text-foreground mb-1 text-base truncate hover:text-primary transition-colors" title={product.name}>{product.name}</h3>
          </Link>
          
          {rating > 0 && (
            <div className="flex items-center mb-2">
              <div className="flex text-yellow-400 text-sm">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={cn("h-4 w-4", i < Math.floor(rating) ? "fill-current" : (i < rating ? "fill-current opacity-50" : "fill-transparent stroke-current"))} />
                ))}
              </div>
              {reviewCount > 0 && <span className="text-muted-foreground text-xs ml-1">({reviewCount})</span>}
            </div>
          )}

          <div className="flex items-baseline">
            <span className="text-primary font-bold text-lg">{formatPrice(product.price)}</span>
            {(product as any).originalPrice && (product as any).originalPrice > product.price && (
              <span className="text-muted-foreground text-sm line-through ml-2">{formatPrice((product as any).originalPrice)}</span>
            )}
          </div>

          {brandName && <p className="text-xs text-muted-foreground mt-1">From "{brandName}"</p>}
          {secondaryInfo && <p className="text-xs text-muted-foreground mt-1">{secondaryInfo}</p>}
          
          {product.sizes && product.sizes.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {product.sizes.slice(0, 4).map(size => ( // Show max 4 sizes
                <Badge key={size} variant="outline" className="text-xs px-1.5 py-0.5">{size}</Badge>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="mt-auto p-4 pt-0">
           <Button size="sm" onClick={handleAddToCart} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              <ShoppingCart size={16} className="mr-2" />
              Add to Cart
            </Button>
        </CardFooter>
    </Card>
  );
}
