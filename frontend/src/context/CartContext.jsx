import { createContext, useContext, useMemo, useState, useEffect, useCallback } from "react";
import { useAuth } from "./AuthContext.jsx";
import authApi from "../api/authApi.js";

const CartContext = createContext({
  items: [],
  addItem: () => { },
  removeItem: () => { },
  updateQuantity: () => { },
  clear: () => { },
  total: 0
});

export const CartProvider = ({ children }) => {
  const { isAuthenticated, user, token } = useAuth();
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : [];
  });

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(items));
  }, [items]);

  // Fetch cart from server on mount/auth change
  useEffect(() => {
    if (isAuthenticated && user?.role === "user" && token) {
      const fetchServerCart = async () => {
        try {
          const serverCart = await authApi.getCart(token);

          // Merge logic: If local cart is empty, use server cart. 
          // If local cart has items, we could either replace or merge. 
          // Let's replace for now as most users expect recent changes to win.
          if (serverCart && serverCart.length > 0) {
            setItems(serverCart);
          } else if (items.length > 0) {
            // If server cart is empty but local has items, sync local to server
            await authApi.syncCart(items, token);
          }
        } catch (error) {
          console.error("Failed to fetch server cart:", error);
        }
      };
      fetchServerCart();
    }
  }, [isAuthenticated, user, token]);

  // Sync to server on change
  const syncToServer = useCallback(async (newItems) => {
    if (isAuthenticated && user?.role === "user" && token) {
      try {
        await authApi.syncCart(newItems, token);
      } catch (error) {
        console.error("Failed to sync cart to server:", error);
      }
    }
  }, [isAuthenticated, user, token]);

  const addItem = (payload) => {
    setItems((prev) => {
      const newState = [...prev, payload];
      syncToServer(newState);
      return newState;
    });
  };

  const removeItem = (index) => {
    setItems((prev) => {
      const newState = prev.filter((_, i) => i !== index);
      syncToServer(newState);
      return newState;
    });
  };

  // NEW FUNCTION - Add this
  const updateQuantity = (index, newQuantity) => {
    if (newQuantity < 1) return;
    setItems((prev) => {
      const newState = prev.map((item, i) =>
        i === index ? { ...item, quantity: newQuantity } : item
      );
      syncToServer(newState);
      return newState;
    });
  };

  const clear = () => {
    setItems([]);
    localStorage.removeItem("cartItems");
    syncToServer([]);
  };

  const total = (items || []).reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      updateQuantity, // Add this to the value object
      clear,
      total
    }),
    [items, total]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);