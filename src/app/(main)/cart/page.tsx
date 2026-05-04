
"use client";

import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import { ProductImage } from '@/components/products/ProductImage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Trash2, ShoppingBag } from 'lucide-react';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  const { formatPrice } = useCurrency();

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity >= 0) {
      updateQuantity(productId, newQuantity);
    }
  };
  
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto py-12 text-center min-h-[calc(100vh-10rem)] flex flex-col items-center justify-center">
        <ShoppingBag className="h-24 w-24 text-muted-foreground mb-6" />
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-8">Add some fabulous items to your cart and let the fashion journey begin!</p>
        <Button asChild size="lg">
          <Link href="/">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-headline font-bold mb-8 text-center">Your Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map(item => {
            const aiHintForImage = `${item.category.toLowerCase()} ${item.name.split(' ').slice(0,1).join(' ').toLowerCase()}`;
            return (
            <Card key={item.id} className="flex flex-col sm:flex-row items-center p-4 shadow-md rounded-xl">
              <Link href={`/products/${item.id}`} className="shrink-0 mb-4 sm:mb-0 sm:mr-4">
                 <ProductImage src={item.imageUrl} alt={item.name} width={100} height={120} className="rounded-md" aiHint={aiHintForImage}/>
              </Link>
              <div className="flex-grow text-center sm:text-left">
                <Link href={`/products/${item.id}`}>
                    <h2 className="text-lg font-semibold hover:text-primary transition-colors">{item.name}</h2>
                </Link>
                <p className="text-sm text-muted-foreground">{item.category} - {item.sizes.join(', ')}</p>
                <p className="text-lg font-semibold text-primary mt-1">{formatPrice(item.price)}</p>
              </div>
              <div className="flex items-center space-x-2 mt-4 sm:mt-0 sm:ml-auto">
                <Input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                  className="w-16 h-9 text-center"
                  aria-label={`Quantity for ${item.name}`}
                />
                <Button variant="outline" size="icon" onClick={() => removeFromCart(item.id)} aria-label={`Remove ${item.name} from cart`}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </Card>
          )})}
          {cartItems.length > 0 && (
            <div className="text-right mt-6">
              <Button variant="outline" onClick={clearCart} className="text-destructive border-destructive hover:bg-destructive/10">
                <Trash2 className="h-4 w-4 mr-2" /> Clear Cart
              </Button>
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <Card className="p-6 shadow-xl rounded-xl sticky top-20">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-2xl font-headline">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-4">
              <div className="flex justify-between">
                <p>Subtotal ({totalItems} items)</p>
                <p>{formatPrice(totalPrice)}</p>
              </div>
              <div className="flex justify-between">
                <p>Shipping</p>
                <p>Free</p> 
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-xl">
                <p>Total</p>
                <p>{formatPrice(totalPrice)}</p>
              </div>
              <Button asChild size="lg" className="w-full mt-6 bg-accent hover:bg-accent/90 text-accent-foreground">
                 <Link href="/checkout">Proceed to Checkout</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
