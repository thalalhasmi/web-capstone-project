import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../data/productsData';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  appliedPromo: string | null;
  promoDiscount: number;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  lastAddedProduct: Product | null;
  dismissToast: () => void;
}

const CART_STORAGE_KEY = 'portfolio_capstone_cart_v1';
const PROMO_STORAGE_KEY = 'portfolio_capstone_promo_v1';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // Ignore parsing errors
    }
    return [];
  });

  const [appliedPromo, setAppliedPromo] = useState<string | null>(() => {
    try {
      return localStorage.getItem(PROMO_STORAGE_KEY) || null;
    } catch {
      return null;
    }
  });

  const [lastAddedProduct, setLastAddedProduct] = useState<Product | null>(null);

  // Sync cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      // Storage full or disabled
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      if (appliedPromo) {
        localStorage.setItem(PROMO_STORAGE_KEY, appliedPromo);
      } else {
        localStorage.removeItem(PROMO_STORAGE_KEY);
      }
    } catch {
      // Ignore
    }
  }, [appliedPromo]);

  const addToCart = (product: Product, quantity = 1) => {
    const qty = Math.max(1, quantity);
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        const newQty = Math.min(product.stock, updated[existingIndex].quantity + qty);
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
        };
        return updated;
      }
      return [...prevItems, { product, quantity: Math.min(product.stock, qty) }];
    });

    setLastAddedProduct(product);
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) => {
        if (item.product.id === productId) {
          const clamped = Math.min(item.product.stock, quantity);
          return { ...item, quantity: clamped };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedPromo(null);
  };

  const dismissToast = () => {
    setLastAddedProduct(null);
  };

  // Calculations
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  // Promo Code Validation
  let promoDiscount = 0;
  if (appliedPromo === 'CAPSTONE20') {
    promoDiscount = subtotal * 0.2; // 20% off
  } else if (appliedPromo === 'DEAL10') {
    promoDiscount = subtotal * 0.1; // 10% off
  } else if (appliedPromo === 'STUDENT') {
    promoDiscount = subtotal * 0.15; // 15% student discount
  }

  const discountedSubtotal = Math.max(0, subtotal - promoDiscount);
  // Free shipping on orders over $100
  const shipping = subtotal === 0 || discountedSubtotal >= 100 ? 0 : 9.99;
  const tax = discountedSubtotal * 0.0825; // 8.25% sales tax
  const total = subtotal === 0 ? 0 : discountedSubtotal + shipping + tax;

  const applyPromoCode = (code: string): { success: boolean; message: string } => {
    const normalized = code.trim().toUpperCase();
    if (normalized === 'CAPSTONE20') {
      setAppliedPromo('CAPSTONE20');
      return { success: true, message: '20% Capstone Discount applied successfully!' };
    }
    if (normalized === 'DEAL10') {
      setAppliedPromo('DEAL10');
      return { success: true, message: '10% Developer Discount applied successfully!' };
    }
    if (normalized === 'STUDENT') {
      setAppliedPromo('STUDENT');
      return { success: true, message: '15% Engineering Student Discount applied successfully!' };
    }
    return { success: false, message: 'Invalid promo code. Try CAPSTONE20, DEAL10, or STUDENT.' };
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        shipping,
        tax,
        total,
        appliedPromo,
        promoDiscount,
        applyPromoCode,
        removePromoCode,
        lastAddedProduct,
        dismissToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
