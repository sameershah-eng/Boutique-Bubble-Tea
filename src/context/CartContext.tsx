import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import { Product } from '../data/products';

export interface CartCustomization {
  size: 'Regular' | 'Large';
  sugar: string;
  ice: string;
  milk?: string;
  toppings: { name: string; price: number }[];
  baseTea?: string;
  notes?: string;
}

export interface CartItem {
  cartItemId: string;
  product: Product;
  customization: CartCustomization;
  quantity: number;
  unitPrice: number;
}

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; customization: CartCustomization; quantity: number } }
  | { type: 'UPDATE_QTY'; payload: { cartItemId: string; delta: number } }
  | { type: 'REMOVE_ITEM'; payload: { cartItemId: string } }
  | { type: 'CLEAR_CART' }
  | { type: 'HYDRATE'; payload: CartItem[] };

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, customization?: Partial<CartCustomization>, quantity?: number) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  removeItem: (cartItemId: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  totalItems: number;
  subtotal: number;
  toast: { message: string; visible: boolean; type?: 'add' | 'remove' | 'info' };
  showToast: (message: string, type?: 'add' | 'remove' | 'info') => void;
  hideToast: () => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = 'hydor_cart_v1';

function calculateUnitPrice(basePrice: number, customization: CartCustomization): number {
  let price = basePrice;
  if (customization.size === 'Large') {
    price += 0.80;
  }
  if (customization.toppings && customization.toppings.length > 0) {
    const toppingsTotal = customization.toppings.reduce((acc, t) => acc + t.price, 0);
    price += toppingsTotal;
  }
  return Number(price.toFixed(2));
}

function generateCartItemId(productId: string, customization: CartCustomization): string {
  const toppingsKey = (customization.toppings || []).map(t => t.name).sort().join(',');
  return `${productId}_${customization.size}_${customization.sugar}_${customization.ice}_${customization.milk || ''}_${toppingsKey}`;
}

const defaultCustomization: CartCustomization = {
  size: 'Regular',
  sugar: '50% (Standard)',
  ice: 'Less Ice',
  milk: 'Whole Milk',
  toppings: [],
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'HYDRATE':
      return { items: action.payload };

    case 'ADD_ITEM': {
      const { product, customization, quantity } = action.payload;
      const unitPrice = calculateUnitPrice(product.price, customization);
      const cartItemId = generateCartItemId(product.id, customization);

      const existingIndex = state.items.findIndex((item) => item.cartItemId === cartItemId);

      if (existingIndex > -1) {
        const updated = [...state.items];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return { items: updated };
      } else {
        const newItem: CartItem = {
          cartItemId,
          product,
          customization,
          quantity,
          unitPrice,
        };
        return { items: [newItem, ...state.items] };
      }
    }

    case 'UPDATE_QTY': {
      const { cartItemId, delta } = action.payload;
      const updated = state.items
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];

      return { items: updated };
    }

    case 'REMOVE_ITEM': {
      return {
        items: state.items.filter((item) => item.cartItemId !== action.payload.cartItemId),
      };
    }

    case 'CLEAR_CART':
      return { items: [] };

    default:
      return state;
  }
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toast, setToast] = useState<{ message: string; visible: boolean; type?: 'add' | 'remove' | 'info' }>({
    message: '',
    visible: false,
    type: 'info',
  });

  // Load from localStorage on mount (with try/catch)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          dispatch({ type: 'HYDRATE', payload: parsed });
        }
      }
    } catch {
      // LocalStorage access failsafe
    }
  }, []);

  // Save to localStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      // Quota exceeded or private browsing
    }
  }, [state.items]);

  const showToast = (message: string, type: 'add' | 'remove' | 'info' = 'info') => {
    setToast({ message, visible: true, type });
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, visible: false }));
  };

  useEffect(() => {
    if (toast.visible) {
      const timer = setTimeout(() => {
        hideToast();
      }, 3200);
      return () => clearTimeout(timer);
    }
  }, [toast.visible]);

  const addItem = (
    product: Product,
    customizationPartial: Partial<CartCustomization> = {},
    quantity = 1
  ) => {
    const fullCustomization: CartCustomization = {
      ...defaultCustomization,
      ...customizationPartial,
      toppings: customizationPartial.toppings || [],
    };

    dispatch({
      type: 'ADD_ITEM',
      payload: { product, customization: fullCustomization, quantity },
    });

    showToast(`Added ${quantity > 1 ? `${quantity}x ` : ''}${product.name} to cart`, 'add');
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    dispatch({ type: 'UPDATE_QTY', payload: { cartItemId, delta } });
  };

  const removeItem = (cartItemId: string) => {
    const item = state.items.find((i) => i.cartItemId === cartItemId);
    dispatch({ type: 'REMOVE_ITEM', payload: { cartItemId } });
    if (item) {
      showToast(`Removed ${item.product.name}`, 'remove');
    }
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const totalItems = state.items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = Number(
    state.items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0).toFixed(2)
  );

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        totalItems,
        subtotal,
        toast,
        showToast,
        hideToast,
        quickViewProduct,
        setQuickViewProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
