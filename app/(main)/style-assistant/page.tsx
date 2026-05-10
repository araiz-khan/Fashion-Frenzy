
"use client";

import React, { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Loader2, Sparkles, AlertTriangle } from 'lucide-react';
import { getStyleAdvice } from '@/actions/styleActions';
import Image from 'next/image';
import { ProductCard } from '@/components/products/ProductCard';
import type { Product } from '@/types';
import { cn } from '@/lib/utils';

interface StyleResult {
  suggestions: string;
  recommendedProducts?: Product[];
}

export default function StyleAssistantPage() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState<StyleResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!prompt.trim()) {
      setError("Please describe your style need or occasion.");
      return;
    }
    setError(null);
    setResult(null);

    startTransition(async () => {
      const response = await getStyleAdvice({ prompt });
      if ('error' in response) {
        setError(response.error);
      } else {
        setResult({
            suggestions: response.suggestions,
            recommendedProducts: response.recommendedProducts || []
        });
      }
    });
  };

  return (
    <div className="container mx-auto py-8 md:py-12">
      <div className="max-w-6xl mx-auto"> {/* Changed to max-w-6xl for wider layout */}
        <div className="max-w-3xl mx-auto"> {/* Keep form part centered and narrow */}
            <div className="text-center mb-10">
            <Sparkles className="mx-auto h-16 w-16 text-primary mb-4" />
            <h1 className="text-4xl font-headline font-bold mb-3">AI Style Assistant</h1>
            <p className="text-lg text-muted-foreground">
                Describe your fashion needs, an upcoming event, or a style you're curious about, and get personalized advice and product recommendations!
            </p>
            </div>

            <Card className="shadow-xl rounded-xl">
            <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                <Sparkles className="h-6 w-6 mr-2 text-primary" />
                Get Personalized Style Advice
                </CardTitle>
                <CardDescription>
                For example: "I need an outfit for a beach wedding" or "Help me find a casual chic look for fall."
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                <div>
                    <Label htmlFor="style-prompt" className="text-base">Your Style Request</Label>
                    <Textarea
                    id="style-prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Tell me about your style needs..."
                    rows={5}
                    className="mt-1 text-base"
                    disabled={isPending}
                    />
                </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                <Button type="submit" size="lg" disabled={isPending} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    {isPending ? (
                    <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Getting Advice...
                    </>
                    ) : (
                    <>
                        <Sparkles className="mr-2 h-5 w-5" />
                        Get Style Advice
                    </>
                    )}
                </Button>
                </CardFooter>
            </form>
            </Card>
        </div>

        {error && (
            <div className="max-w-3xl mx-auto"> {/* Keep error centered */}
                <Card className="mt-8 bg-destructive/10 border-destructive text-destructive rounded-xl">
                    <CardContent className="p-6 flex items-start space-x-3">
                    <AlertTriangle className="h-6 w-6 mt-1" />
                    <div>
                        <CardTitle className="text-lg">Oops! Something went wrong.</CardTitle>
                        <p className="text-sm">{error}</p>
                    </div>
                    </CardContent>
                </Card>
            </div>
        )}

        {result && (
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Suggestions */}
            <div className={cn(
              result.recommendedProducts && result.recommendedProducts.length > 0
                ? "lg:col-span-2"
                : "lg:col-span-3"
            )}>
              <Card className="shadow-lg rounded-xl h-full">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <Image src="https://placehold.co/40x40.png" alt="AI Stylist" width={40} height={40} className="rounded-full mr-3" data-ai-hint="avatar fashion" />
                    Your Style Suggestions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose dark:prose-invert max-w-none whitespace-pre-line text-base leading-relaxed">
                    {result.suggestions}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recommended Products */}
            {result.recommendedProducts && result.recommendedProducts.length > 0 && (
              <div className="lg:col-span-1">
                <h3 className="text-2xl font-headline font-semibold mb-6">Shop The Look</h3>
                <div className="space-y-6">
                  {result.recommendedProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
