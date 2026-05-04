
"use client";

import React, { type ReactNode } from 'react';
import { CartProvider } from '@/contexts/CartContext';
import { WishlistProvider } from '@/contexts/WishlistContext';
import { CurrencyProvider } from '@/contexts/CurrencyContext';

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <CurrencyProvider>
      <CartProvider>
        <WishlistProvider>
          {children}
        </WishlistProvider>
      </CartProvider>
    </CurrencyProvider>
  );
}
