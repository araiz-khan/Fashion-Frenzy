
"use client";

import { useEffect, useState }from 'react';
import { useParams } from 'next/navigation';
import { mockProducts } from '@/data/products';
import type { Product } from '@/types';
import { ProductImage } from '@/components/products/ProductImage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Heart, ShoppingCart, Loader2, AlertTriangle, Camera } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import Link from 'next/link';
import { ProductCard } from '@/components/products/ProductCard'; // For related products
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { getAllProductsFromDB } from '@/actions/productActions';

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id as string;
  
  const [product, setProduct] = useState<Product | null | undefined>(undefined); // undefined for loading state
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlist();
  const { formatPrice } = useCurrency();

  useEffect(() => {
    if (id) {
      const fetchProductData = async () => {
        const allProductsResult = await getAllProductsFromDB();
        if ('error' in allProductsResult) {
          console.error(allProductsResult.error);
          setProduct(null);
          return;
        }
        
        const foundProduct = allProductsResult.find(p => p.id === id);
        setProduct(foundProduct || null);

        if (foundProduct?.sizes.length) {
          setSelectedSize(foundProduct.sizes[0]);
        }

        // Fetch related products (simple logic: same category, not the current product)
        if (foundProduct) {
          const related = allProductsResult
            .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
            .slice(0, 4); // Show up to 4 related products
          setRelatedProducts(related);
        }
      };
      
      fetchProductData();
    }
  }, [id]);

  if (product === undefined) {
    return (
      <div className="container mx-auto flex min-h-[calc(100vh-10rem)] items-center justify-center py-12">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto flex min-h-[calc(100vh-10rem)] flex-col items-center justify-center py-12 text-center">
        <AlertTriangle className="h-16 w-16 text-destructive mb-4" />
        <h1 className="text-3xl font-bold mb-2">Product Not Found</h1>
        <p className="text-muted-foreground mb-6">Sorry, we couldn't find the product you're looking for.</p>
        <Button asChild>
          <Link href="/">Go to Homepage</Link>
        </Button>
      </div>
    );
  }

  const handleWishlistToggle = () => {
    if (isWishlisted(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };
  
  const aiHintForImage = `${product.category.toLowerCase()} ${product.name.split(' ').slice(0,1).join(' ').toLowerCase()}`;

  return (
    <div className="container mx-auto py-8 md:py-12">
      <Card className="overflow-hidden shadow-xl rounded-xl">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-4 md:p-6">
             <ProductImage
              src={product.imageUrl.replace('300x450', '600x800')} // Request larger image
              alt={product.name}
              width={600}
              height={800}
              className="w-full h-auto aspect-[3/4] rounded-lg shadow-md"
              priority
              aiHint={aiHintForImage}
            />
          </div>
          <div className="p-6 md:p-8 flex flex-col justify-center">
            <CardHeader className="p-0 mb-4">
              <Badge variant="secondary" className="mb-2 w-fit">{product.category}</Badge>
              <CardTitle className="text-3xl lg:text-4xl font-headline">{product.name}</CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-4">
              <CardDescription className="text-base text-muted-foreground leading-relaxed">
                {product.description}
              </CardDescription>
              <p className="text-4xl font-bold text-primary">{formatPrice(product.price)}</p>
              
              <Separator />

              <div>
                <h4 className="mb-2 text-sm font-medium text-foreground">Available Sizes:</h4>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? 'default' : 'outline'}
                      onClick={() => setSelectedSize(size)}
                      className="text-xs px-3 py-1 h-auto"
                    >
                      {size}
                    </Button>
                  ))}
                </div>
                {!selectedSize && product.sizes.length > 0 && (
                  <p className="mt-2 text-sm text-destructive">Please select a size.</p>
                )}
              </div>

              <Separator />

              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <Button 
                  size="lg" 
                  onClick={() => addToCart(product)} 
                  className="flex-grow bg-primary hover:bg-primary/90 text-primary-foreground"
                  disabled={!selectedSize && product.sizes.length > 0}
                >
                  <ShoppingCart size={20} className="mr-2" />
                  Add to Cart
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={handleWishlistToggle} 
                  className={cn("flex-grow", isWishlisted(product.id) ? "text-primary border-primary hover:bg-primary/10" : "")}
                >
                  <Heart size={20} className="mr-2" fill={isWishlisted(product.id) ? "currentColor" : "none"}/>
                  {isWishlisted(product.id) ? 'Wishlisted' : 'Add to Wishlist'}
                </Button>
              </div>
              <Link href={`/ai-try-on?productId=${product.id}`} passHref legacyBehavior>
                <a className={cn(buttonVariants({ variant: 'outline', size: 'lg'}), "w-full mt-3")}>
                  <Camera size={20} className="mr-2" />
                  AI Virtual Try-On
                </a>
              </Link>
            </CardContent>
          </div>
        </div>
      </Card>

      {relatedProducts.length > 0 && (
        <div className="mt-12 md:mt-16">
          <h2 className="text-2xl md:text-3xl font-headline font-semibold mb-6 text-center">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(relatedProduct => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
