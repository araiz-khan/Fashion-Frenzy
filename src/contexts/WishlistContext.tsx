"use client";

import type { WishlistItem, Product } from '@/types';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

interface WishlistContextType {
  wishlistItems: WishlistItem[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const storedWishlist = localStorage.getItem('fashionFrenzyWishlist');
    if (storedWishlist) {
      setWishlistItems(JSON.parse(storedWishlist));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('fashionFrenzyWishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = (product: Product) => {
    if (wishlistItems.find(item => item.id === product.id)) {
      toast({
        title: "Already in Wishlist",
        description: `${product.name} is already in your wishlist.`,
      });
      return;
    }
    setWishlistItems(prevItems => [...prevItems, product]);
    toast({
      title: "Added to Wishlist",
      description: `${product.name} has been added to your wishlist.`,
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlistItems(prevItems => prevItems.filter(item => item.id !== productId));
     toast({
      title: "Removed from Wishlist",
      description: `Item has been removed from your wishlist.`,
      variant: "destructive"
    });
  };

  const isWishlisted = (productId: string) => {
    return !!wishlistItems.find(item => item.id === productId);
  }

  return (
    <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
