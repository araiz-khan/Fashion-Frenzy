
"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, Gift } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export function PromotionalBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the banner has been dismissed before during the current session
    const isDismissed = sessionStorage.getItem('promoBannerDismissed');
    if (!isDismissed) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('promoBannerDismissed', 'true');
  };

  return (
    <div className={cn(
        "relative bg-primary text-primary-foreground text-sm font-medium text-center z-50 transition-all duration-300 ease-in-out overflow-hidden",
        isVisible ? "py-2 px-10 h-10" : "py-0 h-0"
    )}>
        <div className="flex items-center justify-center h-full">
            <Gift className="inline-block h-4 w-4 mr-2 shrink-0" />
            <Link href="/shipping" className="hover:underline focus:underline outline-none">
                Free Shipping On Orders Over $50
            </Link>
            <Button
                variant="ghost"
                size="icon"
                onClick={handleDismiss}
                className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 text-primary-foreground hover:bg-primary/80 rounded-full"
                aria-label="Dismiss promotional banner"
            >
                <X className="h-4 w-4" />
            </Button>
        </div>
    </div>
  );
}
