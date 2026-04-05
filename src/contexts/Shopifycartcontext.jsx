import { createContext, useContext, useState, useEffect } from 'react';
import client from '../shopify-client';

const ShopifyCartContext = createContext();

export function useShopifyCart() {
  return useContext(ShopifyCartContext);
}

export function ShopifyCartProvider({ children }) {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);

  // Initialize cart on mount
  useEffect(() => {
    initializeCart();
  }, []);

  async function initializeCart() {
    try {
      // Check if cart exists in localStorage
      const cartId = localStorage.getItem('shopify_cart_id');
      
      if (cartId) {
        try {
          // Try to fetch existing cart
          const existingCart = await client.cart.fetch(cartId);
          if (existingCart) {
            setCart(existingCart);
            return;
          }
        } catch (error) {
          console.log('Existing cart not found, creating new one');
          localStorage.removeItem('shopify_cart_id');
        }
      }
      
      // Create new cart using the new Cart API
      const newCart = await client.cart.create();
      localStorage.setItem('shopify_cart_id', newCart.id);
      setCart(newCart);
    } catch (error) {
      console.error('Cart initialization error:', error);
      // Create minimal cart object to prevent errors
      setCart({ 
        id: null, 
        lines: [], 
        cost: { totalAmount: { amount: '0.00' } } 
      });
    }
  }

  async function addToCart(merchandiseId, quantity = 1) {
    setLoading(true);
    try {
      if (!cart?.id) {
        await initializeCart();
      }

      const lines = [{
        merchandiseId, // Note: Changed from variantId to merchandiseId
        quantity: parseInt(quantity, 10)
      }];
      
      const updatedCart = await client.cart.linesAdd(cart.id, lines);
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
    setLoading(true);
    try {
      const lines = [{
        id: lineId,
        quantity: parseInt(quantity, 10)
      }];
      
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
    }
  }

  // Calculate cart totals from new Cart API structure
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