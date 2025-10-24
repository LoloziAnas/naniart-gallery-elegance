import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";

export interface CartItem {
  id: string; // Composite ID for cart uniqueness (productId-size-frame-timestamp)
  productId: number; // Numeric product ID for backend
  title: string;
  artist: string;
  price: string;
  priceValue: number;
  image: string;
  quantity: number;
  size?: string;
  frame?: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("naniart-cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        
        // Migrate old cart items that don't have productId
        const migratedCart = parsedCart.map((item: any) => {
          if (!item.productId && item.id) {
            // Extract productId from composite ID (format: "19-size-frame-timestamp")
            const productId = parseInt(item.id.split('-')[0]);
            console.log(`Migrating cart item: ${item.id} -> productId: ${productId}`);
            return { ...item, productId };
          }
          return item;
        });
        
        setItems(migratedCart);
        
        // Save migrated cart back to localStorage
        if (migratedCart.some((item: any) => item.productId)) {
          localStorage.setItem("naniart-cart", JSON.stringify(migratedCart));
        }
      } catch (error) {
        console.error("Failed to load cart:", error);
        // Clear corrupted cart
        localStorage.removeItem("naniart-cart");
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("naniart-cart", JSON.stringify(items));
  }, [items]);

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      
      if (existingItem) {
        toast({
          title: "Quantité mise à jour",
          description: `${item.title} - Quantité augmentée`,
        });
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      
      toast({
        title: "Ajouté au panier",
        description: `${item.title} a été ajouté à votre panier`,
      });
      
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setItems((prevItems) => {
      const item = prevItems.find((i) => i.id === id);
      if (item) {
        toast({
          title: "Retiré du panier",
          description: `${item.title} a été retiré de votre panier`,
        });
      }
      return prevItems.filter((i) => i.id !== id);
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }
    
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    toast({
      title: "Panier vidé",
      description: "Tous les articles ont été retirés",
    });
  };

  const getCartTotal = () => {
    return items.reduce((total, item) => total + item.priceValue * item.quantity, 0);
  };

  const getCartCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
