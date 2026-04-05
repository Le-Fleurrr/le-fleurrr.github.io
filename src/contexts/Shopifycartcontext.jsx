import { createContext, useContext, useState, useEffect } from "react";
import client from "../shopify-client";

const ShopifyCartContext = createContext({});

export const useShopifyCart = () => {
  const context = useContext(ShopifyCartContext);
  if (!context) {
    throw new Error("useShopifyCart must be used within a ShopifyCartProvider");
  }
  return context;
};

export const ShopifyCartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    initializeCart();
  }, []);

  async function initializeCart() {
    try {
      const cartId = localStorage.getItem("shopify_cart_id");

      if (cartId) {
        const existingCart = await client.checkout.fetch(cartId);
        if (existingCart && !existingCart.completedAt) {
          setCart(existingCart);
          return;
        }
      }

      const newCart = await client.checkout.create();
      localStorage.setItem("shopify_cart_id", newCart.id);
      setCart(newCart);
    } catch (error) {
      console.error("Cart initialization error:", error);
    }
  }

  async function addToCart(variantId, quantity = 1) {
    setLoading(true);
    try {
      const lineItemsToAdd = [{ variantId, quantity: parseInt(quantity, 10) }];
      const updatedCart = await client.checkout.addLineItems(cart.id, lineItemsToAdd);
      setCart(updatedCart);
      return { success: true };
    } catch (error) {
      console.error("Add to cart error:", error);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  }

  async function removeFromCart(lineItemId) {
    setLoading(true);
    try {
      const updatedCart = await client.checkout.removeLineItems(cart.id, [lineItemId]);
      setCart(updatedCart);
    } catch (error) {
      console.error("Remove from cart error:", error);
    } finally {
      setLoading(false);
    }
  }

  async function updateQuantity(lineItemId, quantity) {
    setLoading(true);
    try {
      const lineItemsToUpdate = [{ id: lineItemId, quantity: parseInt(quantity, 10) }];
      const updatedCart = await client.checkout.updateLineItems(cart.id, lineItemsToUpdate);
      setCart(updatedCart);
    } catch (error) {
      console.error("Update quantity error:", error);
    } finally {
      setLoading(false);
    }
  }

  function openCheckout() {
    if (cart?.webUrl) {
      window.location.href = cart.webUrl;
    }
  }

  const cartCount =
    cart?.lineItems?.reduce((total, item) => total + item.quantity, 0) || 0;
  const cartTotal = cart?.totalPrice?.amount || "0.00";

  const value = {
    cart,
    cartCount,
    cartTotal,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    openCheckout,
  };

  return (
    <ShopifyCartContext.Provider value={value}>
      {children}
    </ShopifyCartContext.Provider>
  );
};
