
"use client";

import React, { Suspense } from 'react';
import { AiTryOnClient } from '@/components/layout/AiTryOnClient';
import { Loader2, Sparkles } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

function AiTryOnLoading() {
  return (
    <div className="container mx-auto py-8 md:py-12">
        <div className="text-center mb-10">
            <Sparkles className="mx-auto h-16 w-16 text-muted animate-pulse mb-4" />
            <Skeleton className="h-10 w-64 mx-auto mb-3" />
            <Skeleton className="h-6 w-full max-w-xl mx-auto" />
        </div>
        <div className="max-w-5xl mx-auto space-y-8">
            <Skeleton className="h-[400px] w-full rounded-xl" />
            <Skeleton className="h-24 w-full rounded-xl" />
        </div>
    </div>
  );
}

export default function AiTryOnPage() {
  return (
    <Suspense fallback={<AiTryOnLoading />}>
      <AiTryOnClient />
    </Suspense>
  );
}
