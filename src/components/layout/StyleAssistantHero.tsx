
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
              Your Dress Wear AI Stylist
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto md:mx-0">
              Need a dress for a wedding, party, or casual day out? Describe the occasion and our AI assistant will create dress-only recommendations just for you.
            </p>
            <Button asChild size="lg">
              <Link href="/style-assistant">
                Try The Dress Assistant <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
          <div className="order-1 md:order-2">
            <Image
              src="/images/ai.jpg"
              alt="AI dress wear assistant creating dress suggestions"
              width={600}
              height={600}
              className="rounded-lg shadow-xl mx-auto"
              data-ai-hint="dress stylist illustration"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
