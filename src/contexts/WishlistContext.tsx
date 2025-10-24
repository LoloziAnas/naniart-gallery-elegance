import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { wishlistAPI, Product } from "@/lib/api";

export interface WishlistItem {
  id: string;
  title: string;
  artist: string;
  price: string;
  priceValue: number;
  image: string;
  category?: string;
  inStock?: boolean;
}

interface WishlistContextType {
  items: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  toggleWishlist: (item: WishlistItem) => void;
  clearWishlist: () => void;
  getWishlistCount: () => number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { isAuthenticated, user } = useAuth();

  // Load wishlist from backend for authenticated users, localStorage for guests
  useEffect(() => {
    const loadWishlist = async () => {
      if (isAuthenticated) {
        // Load from backend
        try {
          setIsLoading(true);
          const response = await wishlistAPI.get();
          const backendItems: WishlistItem[] = response.data.map((product: Product) => ({
            id: product.id.toString(),
            title: product.title,
            artist: product.artist || 'Unknown',
            price: `${product.price} MAD`,
            priceValue: product.price,
            image: product.images[0] || '',
            category: product.category,
            inStock: product.inStock,
          }));
          setItems(backendItems);
          
          // Sync local storage with backend
          localStorage.setItem("naniart-wishlist", JSON.stringify(backendItems));
        } catch (error) {
          console.error("Failed to load wishlist from backend:", error);
          // Fallback to localStorage
          const savedWishlist = localStorage.getItem("naniart-wishlist");
          if (savedWishlist) {
            try {
              setItems(JSON.parse(savedWishlist));
            } catch (e) {
              console.error("Failed to parse localStorage wishlist:", e);
            }
          }
        } finally {
          setIsLoading(false);
        }
      } else {
        // Load from localStorage for guests
        const savedWishlist = localStorage.getItem("naniart-wishlist");
        if (savedWishlist) {
          try {
            setItems(JSON.parse(savedWishlist));
          } catch (error) {
            console.error("Failed to load wishlist:", error);
          }
        }
      }
    };
    
    loadWishlist();
  }, [isAuthenticated]);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("naniart-wishlist", JSON.stringify(items));
  }, [items]);

  const addToWishlist = async (item: WishlistItem) => {
    // Add to backend if authenticated
    if (isAuthenticated) {
      try {
        await wishlistAPI.add(parseInt(item.id));
        toast({
          title: "Ajouté aux favoris",
          description: `${item.title} a été ajouté à vos favoris`,
        });
      } catch (error: any) {
        toast({
          title: "Erreur",
          description: error.response?.data?.message || "Impossible d'ajouter aux favoris",
          variant: "destructive",
        });
        return;
      }
    }
    
    // Update local state
    setItems((prevItems) => {
      const exists = prevItems.find((i) => i.id === item.id);
      
      if (exists) {
        return prevItems;
      }
      
      if (!isAuthenticated) {
        toast({
          title: "Ajouté aux favoris",
          description: `${item.title} a été ajouté à vos favoris`,
        });
      }
      
      return [...prevItems, item];
    });
  };

  const removeFromWishlist = async (id: string) => {
    // Remove from backend if authenticated
    if (isAuthenticated) {
      try {
        await wishlistAPI.remove(parseInt(id));
        const item = items.find((i) => i.id === id);
        if (item) {
          toast({
            title: "Retiré des favoris",
            description: `${item.title} a été retiré de vos favoris`,
          });
        }
      } catch (error: any) {
        toast({
          title: "Erreur",
          description: error.response?.data?.message || "Impossible de retirer des favoris",
          variant: "destructive",
        });
        return;
      }
    }
    
    // Update local state
    setItems((prevItems) => {
      const item = prevItems.find((i) => i.id === id);
      if (item && !isAuthenticated) {
        toast({
          title: "Retiré des favoris",
          description: `${item.title} a été retiré de vos favoris`,
        });
      }
      return prevItems.filter((i) => i.id !== id);
    });
  };

  const isInWishlist = (id: string) => {
    return items.some((item) => item.id === id);
  };

  const toggleWishlist = (item: WishlistItem) => {
    if (isInWishlist(item.id)) {
      removeFromWishlist(item.id);
    } else {
      addToWishlist(item);
    }
  };

  const clearWishlist = () => {
    setItems([]);
    toast({
      title: "Favoris vidés",
      description: "Tous les articles ont été retirés de vos favoris",
    });
  };

  const getWishlistCount = () => {
    return items.length;
  };

  return (
    <WishlistContext.Provider
      value={{
        items,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        toggleWishlist,
        clearWishlist,
        getWishlistCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
