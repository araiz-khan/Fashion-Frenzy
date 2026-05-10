
import React, { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { ShopPageClient } from './ShopPageClient';

function ShopPageLoading() {
  return (
    <div className="container mx-auto py-8 md:py-12">
      <div className="text-center mb-10">
        <Skeleton className="h-10 w-3/4 mx-auto max-w-lg mb-3" />
        <Skeleton className="h-6 w-1/2 mx-auto max-w-md" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="hidden lg:block lg:col-span-1">
          <Skeleton className="h-[600px] w-full rounded-xl sticky top-20" />
        </div>
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(9)].map((_, i) => (
              <Skeleton key={i} className="h-96 w-full rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<ShopPageLoading />}>
      <ShopPageClient />
    </Suspense>
  );
}
