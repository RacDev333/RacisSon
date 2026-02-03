import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  size?: string;
  version?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  totalPrice: number;
  itemCount: number;
  promoCode: string | null;
  promoDiscount: number;
  promoCodeId: number | null;
  applyPromoCode: (code: string) => boolean;
  setPromoCode: (code: string, discount: number, id: number) => void;
  clearPromoCode: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    // Ładowanie z localStorage
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [promoCode, setPromoCode] = useState<string | null>(() => {
    const saved = localStorage.getItem('promoCode');
    return saved || null;
  });

  const [promoDiscount, setPromoDiscountState] = useState<number>(() => {
    const saved = localStorage.getItem('promoDiscount');
    return saved ? parseFloat(saved) : 0;
  });

  const [promoCodeId, setPromoCodeIdState] = useState<number | null>(() => {
    const saved = localStorage.getItem('promoCodeId');
    return saved ? parseInt(saved) : null;
  });

  // Zapisywanie do localStorage za każdym razem, gdy zmieni się koszyk
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    if (promoCode) {
      localStorage.setItem('promoCode', promoCode);
      localStorage.setItem('promoDiscount', promoDiscount.toString());
      if (promoCodeId) {
        localStorage.setItem('promoCodeId', promoCodeId.toString());
      }
    } else {
      localStorage.removeItem('promoCode');
      localStorage.removeItem('promoDiscount');
      localStorage.removeItem('promoCodeId');
    }
  }, [promoCode, promoDiscount, promoCodeId]);

  const addItem = (item: CartItem) => {
    setItems((prevItems) => {
      const existing = prevItems.find((i) => i.id === item.id);
      if (existing) {
        // Jeśli produkt już istnieje, nie dodajemy go ponownie (one item per product)
        return prevItems;
      }
      return [...prevItems, item];
    });
  };

  const removeItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
    setPromoCode(null);
    setPromoDiscountState(0);
    setPromoCodeIdState(null);
  };

  const applyPromoCode = (_code: string): boolean => {
    // Ta funkcja będzie wywoływana z komponentów Cart/Order z walidacją
    return false; // Placeholder - będzie nadpisane w komponentach
  };

  const setPromoCodeHandler = (code: string, discount: number, id: number) => {
    setPromoCode(code);
    setPromoDiscountState(discount);
    setPromoCodeIdState(id);
  };

  const clearPromoCode = () => {
    setPromoCode(null);
    setPromoDiscountState(0);
    setPromoCodeIdState(null);
  };

  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);
  const itemCount = items.length;

  return (
    <CartContext.Provider 
      value={{ 
        items, 
        addItem, 
        removeItem, 
        clearCart, 
        totalPrice, 
        itemCount,
        promoCode,
        promoDiscount,
        promoCodeId,
        applyPromoCode,
        setPromoCode: setPromoCodeHandler,
        clearPromoCode
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
