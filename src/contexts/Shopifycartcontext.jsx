import { createContext, useContext, useState, useEffect } from 'react';
import client from '../shopify-client'; 

const ShopifyCartContext = createContext();

export function useShopifyCart() {
  return useContext(ShopifyCartContext);
}

export function ShopifyCartProvider({ children }) {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);

  // Helper to prevent the "undefined" crash
  const isClientReady = client && client.cart;

  useEffect(() => {
    if (isClientReady) {
      initializeCart();
    } else {
      console.error("Shopify Client is not initialized. Check your Storefront Access Token.");
      // Set a fallback state so the UI doesn't break
      setCart({ lines: { edges: [] }, cost: { totalAmount: { amount: '0.00' } } });
    }
  }, []);

  async function initializeCart() {
    try {
      const cartId = localStorage.getItem('shopify_cart_id');
      
      if (cartId) {
        try {
          const existingCart = await client.cart.fetch(cartId);
          if (existingCart) {
            setCart(existingCart);
            return;
          }
        } catch (error) {
          localStorage.removeItem('shopify_cart_id');
        }
      }
      
      // The crash happened here because client.cart was undefined
      const newCart = await client.cart.create();
      localStorage.setItem('shopify_cart_id', newCart.id);
      setCart(newCart);
    } catch (error) {
      console.error('Cart initialization error:', error);
      setCart({ 
        id: null, 
        lines: { edges: [] }, 
        cost: { totalAmount: { amount: '0.00' } } 
      });
    }
  }

  async function addToCart(merchandiseId, quantity = 1) {
    if (!isClientReady) return { success: false, error: 'Client not ready' };
    setLoading(true);
    try {
      let currentCartId = cart?.id;
      if (!currentCartId) {
        const newCart = await client.cart.create();
        currentCartId = newCart.id;
        localStorage.setItem('shopify_cart_id', currentCartId);
      }

      const lines = [{
        merchandiseId,
        quantity: parseInt(quantity, 10)
      }];
      
      const updatedCart = await client.cart.linesAdd(currentCartId, lines);
      setCart(updatedCart);
      return { success: true };
    } catch (error) {
      console.error('Add to cart error:', error);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  }

  async function removeFromCart(lineId) {
    if (!isClientReady || !cart?.id) return;
    setLoading(true);
    try {
      const updatedCart = await client.cart.linesRemove(cart.id, [lineId]);
      setCart(updatedCart);
    } catch (error) {
      console.error('Remove from cart error:', error);
    } finally {
      setLoading(false);
    }
  }

  async function updateQuantity(lineId, quantity) {
    if (!isClientReady || !cart?.id) return;
    setLoading(true);
    try {
      const lines = [{ id: lineId, quantity: parseInt(quantity, 10) }];
      const updatedCart = await client.cart.linesUpdate(cart.id, lines);
      setCart(updatedCart);
    } catch (error) {
      console.error('Update quantity error:', error);
    } finally {
      setLoading(false);
    }
  }

  function openCheckout() {
    if (cart?.checkoutUrl) {
      window.location.href = cart.checkoutUrl;
    } else {
      console.warn("No checkout URL available. Check your Storefront API permissions.");
    }
  }

  const cartCount = cart?.lines?.edges?.reduce((total, edge) => {
    return total + edge.node.quantity;
  }, 0) || 0;

  const cartTotal = cart?.cost?.totalAmount?.amount || '0.00';

  const value = {
    cart,
    cartCount,
    cartTotal,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    openCheckout
  };

  return (
    <ShopifyCartContext.Provider value={value}>
      {children}
    </ShopifyCartContext.Provider>
  );
}