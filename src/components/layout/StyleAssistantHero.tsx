
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight } from 'lucide-react';
 

export function StyleAssistantHero() {
  return (
    <section className="bg-muted/30 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div className="order-2 md:order-1 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4 text-foreground">
              <Sparkles className="inline-block h-8 w-8 text-primary mr-2" />
              Your Personal AI Stylist
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto md:mx-0">
              Stuck on what to wear? Describe an occasion or a style you love, and our AI assistant will create personalized outfit recommendations just for you. It's like having a personal stylist on demand!
            </p>
            <Button asChild size="lg">
              <Link href="/style-assistant">
                Try The Style Assistant <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
          <div className="order-1 md:order-2">
            <Image
              src="/images/ai.jpg"
              alt="AI Style Assistant creating outfits"
              width={600}
              height={600}
              className="rounded-lg shadow-xl mx-auto"
              data-ai-hint="fashion stylist illustration"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
