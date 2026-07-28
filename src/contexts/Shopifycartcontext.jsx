import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import client from '../shopify-client';
import { useLanguage } from '../components/LanguageContext.jsx';

const MAX_PER_ITEM = 4;

const ShopifyCartContext = createContext();

export function useShopifyCart() {
  return useContext(ShopifyCartContext);
}

export function ShopifyCartProvider({ children }) {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();

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

    // Per-product cap: count what's already in the cart for this variant
    const existingQty = cart?.lines?.edges
      ?.filter(({ node }) => node.merchandise?.id === merchandiseId)
      .reduce((sum, { node }) => sum + node.quantity, 0) || 0;
    const allowed = MAX_PER_ITEM - existingQty;
    if (allowed <= 0) {
      toast.error(t.maxQuantityReached);
      return { success: false, error: 'max-quantity' };
    }
    const cappedQty = Math.min(allowed, parseInt(quantity, 10) || 1);
    if (cappedQty < (parseInt(quantity, 10) || 1)) {
      toast.error(t.maxQuantityReached);
    }

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
        quantity: cappedQty
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
    let qty = parseInt(quantity, 10);
    if (qty > MAX_PER_ITEM) {
      toast.error(t.maxQuantityReached);
      qty = MAX_PER_ITEM;
    }
    setLoading(true);
    try {
      const lines = [{ id: lineId, quantity: qty }];
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