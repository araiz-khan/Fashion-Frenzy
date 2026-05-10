
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Truck, Undo2, Clock } from 'lucide-react';

export default function ShippingPage() {
  return (
    <div className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto shadow-xl rounded-2xl overflow-hidden border">
          <CardHeader className="text-center p-8 bg-muted/30">
            <Truck className="mx-auto h-12 w-12 text-primary mb-4" />
            <CardTitle className="text-3xl md:text-4xl font-headline">Shipping & Returns</CardTitle>
            <CardDescription className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about getting your order and what to do if it's not quite right.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12">
              
              {/* Shipping Information Section */}
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 bg-primary/10 text-primary p-3 rounded-full">
                        <Clock className="h-7 w-7" />
                    </div>
                    <div>
                        <h3 className="text-xl font-headline font-semibold text-foreground">Shipping Information</h3>
                        <p className="text-muted-foreground">When you can expect your new styles.</p>
                    </div>
                </div>
                <div className="prose dark:prose-invert max-w-none text-base text-foreground/90 leading-relaxed space-y-4">
                  <p>
                    We process orders within 1-2 business days. Once shipped, standard domestic shipping typically takes <strong>5-7 business days</strong>. International shipping times may vary.
                  </p>
                  <p>
                    You'll receive a shipping confirmation email with a tracking number as soon as your order is on its way. We partner with major carriers to ensure your items arrive safely and on time.
                  </p>
                </div>
              </div>
              
              {/* Return Policy Section */}
              <div className="space-y-6">
                 <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 bg-primary/10 text-primary p-3 rounded-full">
                        <Undo2 className="h-7 w-7" />
                    </div>
                    <div>
                        <h3 className="text-xl font-headline font-semibold text-foreground">Return Policy</h3>
                        <p className="text-muted-foreground">Easy, hassle-free returns.</p>
                    </div>
                </div>
                <div className="prose dark:prose-invert max-w-none text-base text-foreground/90 leading-relaxed space-y-4">
                    <p>
                      Not in love with your purchase? No problem. We accept returns within <strong>30 days of delivery</strong>. Items must be in their original, unworn, and unwashed condition with all tags attached.
                    </p>
                    <p>
                      To start a return, simply contact our support team through the contact page with your order number. Once we receive and inspect the item, your refund will be processed to the original payment method.
                    </p>
                </div>
              </div>

            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
