
"use client";

import { useCart } from '@/contexts/CartContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ProductImage } from '@/components/products/ProductImage';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CreditCard, Lock, Terminal } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { cartItems, totalItems, totalPrice, clearCart } = useCart();
  const { formatPrice } = useCurrency();
  const { toast } = useToast();
  const router = useRouter();

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    // This is a mock order placement
    toast({
      title: "Order Placed! (Mock)",
      description: "Thank you for your purchase. Your order has been successfully placed.",
      duration: 5000,
    });
    clearCart();
    router.push('/');
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-8">You cannot proceed to checkout with an empty cart.</p>
        <Button onClick={() => router.push('/shop')}>Continue Shopping</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 md:py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-headline font-bold mb-3">Checkout</h1>
        <p className="text-lg text-muted-foreground">Complete your order by providing the details below.</p>
      </div>
      
      <form onSubmit={handlePlaceOrder}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Shipping & Payment Details */}
          <div className="lg:col-span-2">
            <div className="space-y-8">
              <Card className="shadow-lg rounded-xl">
                <CardHeader>
                  <CardTitle>Shipping Information</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="John Doe" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="you@example.com" required />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" placeholder="123 Fashion Ave" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="New York" required />
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input id="zip" placeholder="10001" required />
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg rounded-xl">
                <CardHeader>
                  <CardTitle>Payment Details</CardTitle>
                  <CardDescription>All transactions are secure and encrypted.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Alert>
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>This is a mock payment form!</AlertTitle>
                    <AlertDescription>
                      No real payment will be processed. You can enter any details.
                    </AlertDescription>
                  </Alert>
                  <div className="space-y-2">
                    <Label htmlFor="card-number">Card Number</Label>
                    <Input id="card-number" placeholder="**** **** **** 1234" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry-date">Expiry Date</Label>
                      <Input id="expiry-date" placeholder="MM/YY" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input id="cvc" placeholder="123" required />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 shadow-xl rounded-xl sticky top-28">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="text-2xl font-headline">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-4 max-h-64 overflow-y-auto pr-2 mb-4">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex items-center justify-between">
                       <div className="flex items-center gap-3">
                         <ProductImage src={item.imageUrl} alt={item.name} width={50} height={60} className="rounded-md" aiHint={`${item.category.toLowerCase()} ${item.name.split(' ').slice(0,1).join(' ').toLowerCase()}`} />
                         <div>
                            <p className="font-semibold text-sm truncate w-40">{item.name}</p>
                            <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                         </div>
                       </div>
                       <p className="text-sm">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>
                <Separator className="my-4"/>
                <div className="space-y-2">
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
                </div>
                 <Button type="submit" size="lg" className="w-full mt-6 bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Lock className="mr-2 h-5 w-5" />
                  Place Order
                </Button>
              </CardContent>
            </Card>
          </div>

        </div>
      </form>
    </div>
  );
}
