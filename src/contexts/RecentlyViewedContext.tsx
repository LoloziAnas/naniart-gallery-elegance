import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface RecentlyViewedProduct {
  id: string;
  title: string;
  price: string;
  priceValue: number;
  image: string;
  category?: string;
  inStock?: boolean;
}

interface RecentlyViewedContextType {
  items: RecentlyViewedProduct[];
  addToRecentlyViewed: (product: RecentlyViewedProduct) => void;
  clearRecentlyViewed: () => void;
}

const RecentlyViewedContext = createContext<RecentlyViewedContextType | undefined>(undefined);

const MAX_RECENTLY_VIEWED = 8;

export const RecentlyViewedProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<RecentlyViewedProduct[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("naniart-recently-viewed");
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (error) {
        console.error("Failed to load recently viewed:", error);
      }
    }
  }, []);

  // Save to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem("naniart-recently-viewed", JSON.stringify(items));
  }, [items]);

  const addToRecentlyViewed = (product: RecentlyViewedProduct) => {
    setItems((prevItems) => {
      // Remove if already exists
      const filtered = prevItems.filter((item) => item.id !== product.id);
      
      // Add to beginning
      const updated = [product, ...filtered];
      
      // Keep only MAX_RECENTLY_VIEWED items
      return updated.slice(0, MAX_RECENTLY_VIEWED);
    });
  };

  const clearRecentlyViewed = () => {
    setItems([]);
    localStorage.removeItem("naniart-recently-viewed");
  };

  return (
    <RecentlyViewedContext.Provider
      value={{
        items,
        addToRecentlyViewed,
        clearRecentlyViewed,
      }}
    >
      {children}
    </RecentlyViewedContext.Provider>
  );
};

export const useRecentlyViewed = () => {
  const context = useContext(RecentlyViewedContext);
  if (!context) {
    throw new Error("useRecentlyViewed must be used within RecentlyViewedProvider");
  }
  return context;
};
