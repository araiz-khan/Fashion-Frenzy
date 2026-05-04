import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Percent, ArrowRight } from 'lucide-react';

export function SaleBanner() {
  return (
    <section className="bg-accent text-accent-foreground">
      <div className="container mx-auto px-4 py-8 md:py-12 text-center">
        <Percent className="mx-auto h-12 w-12 mb-4" />
        <h2 className="text-3xl font-headline font-bold mb-3">Summer Sale is On!</h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Get up to <span className="font-bold">50% off</span> on selected items. Don't miss out on these hot deals!
        </p>
        <Button asChild size="lg" variant="secondary" className="bg-accent-foreground text-accent hover:bg-accent-foreground/90">
          <Link href="/shop?sale=true">
            Shop The Sale <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
