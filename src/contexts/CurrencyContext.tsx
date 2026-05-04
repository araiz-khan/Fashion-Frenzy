
"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect, useMemo } from 'react';

type Currency = 'USD' | 'PKR';

const EXCHANGE_RATE_USD_TO_PKR = 278; // Example fixed rate

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatPrice: (priceInUsd: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrencyState] = useState<Currency>('USD');

  useEffect(() => {
    const storedCurrency = localStorage.getItem('fashionFrenzyCurrency') as Currency;
    if (storedCurrency && ['USD', 'PKR'].includes(storedCurrency)) {
      setCurrencyState(storedCurrency);
    }
  }, []);

  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency);
    localStorage.setItem('fashionFrenzyCurrency', newCurrency);
  };

  const formatPrice = useMemo(() => (priceInUsd: number) => {
    if (currency === 'PKR') {
      const priceInPkr = priceInUsd * EXCHANGE_RATE_USD_TO_PKR;
      return `PKR ${priceInPkr.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
    }
    // Default to USD
    return `$${priceInUsd.toFixed(2)}`;
  }, [currency]);

  const value = {
    currency,
    setCurrency,
    formatPrice,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
