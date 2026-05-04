
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FileText, Users, Package, Copyright, Gavel } from 'lucide-react';

export default function TermsOfServicePage() {
  return (
    <div className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto shadow-xl rounded-2xl overflow-hidden border">
          <CardHeader className="text-center p-8 bg-muted/30">
            <FileText className="mx-auto h-12 w-12 text-primary mb-4" />
            <CardTitle className="text-3xl md:text-4xl font-headline">Terms of Service</CardTitle>
            <CardDescription className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Please read these terms carefully before using our service.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 md:p-12">
            <div className="prose dark:prose-invert max-w-none text-foreground/90 leading-relaxed space-y-8">
              <p>
                By accessing or using the Fashion Frenzy website and services, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, then you may not access the service. This is a sample terms of service and should be replaced with your own legally reviewed terms.
              </p>

              <section>
                <h2 className="font-headline text-2xl font-semibold flex items-center">
                  <Users className="mr-3 h-6 w-6 text-primary" />
                  1. User Accounts
                </h2>
                <p>
                  When you create an account with us, you must provide us with information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our service.
                </p>
                <p>
                  You are responsible for safeguarding the password that you use to access the service and for any activities or actions under your password.
                </p>
              </section>

              <section>
                <h2 className="font-headline text-2xl font-semibold flex items-center">
                  <Package className="mr-3 h-6 w-6 text-primary" />
                  2. Products and Orders
                </h2>
                <p>
                  We reserve the right to refuse or cancel your order at any time for certain reasons including but not limited to: product or service availability, errors in the description or price of the product or service, error in your order, or other reasons.
                </p>
                 <p>
                  We reserve the right to refuse or cancel your order if fraud or an unauthorized or illegal transaction is suspected. All product descriptions and pricing are subject to change at any time without notice.
                </p>
              </section>

              <section>
                <h2 className="font-headline text-2xl font-semibold flex items-center">
                  <Copyright className="mr-3 h-6 w-6 text-primary" />
                  3. Intellectual Property
                </h2>
                <p>
                  The service and its original content, features, and functionality are and will remain the exclusive property of Fashion Frenzy and its licensors. The service is protected by copyright, trademark, and other laws of both your country and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Fashion Frenzy.
                </p>
              </section>

              <section>
                <h2 className="font-headline text-2xl font-semibold flex items-center">
                  <Gavel className="mr-3 h-6 w-6 text-primary" />
                  4. Governing Law
                </h2>
                <p>
                  These Terms shall be governed and construed in accordance with the laws of Pakistan, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
                </p>
              </section>

            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
