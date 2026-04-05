import { X, ShoppingBag, Trash2 } from 'lucide-react';
import { useShopifyCart } from '../contexts/Shopifycartcontext';
import { Button } from './ui/Button';

export function CartSidebar({ isOpen, onClose }) {
  const { cart, cartCount, cartTotal, removeFromCart, updateQuantity, openCheckout, loading } = useShopifyCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-background border-l border-border z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            <h2 className="text-xl font-bold">
              Səbət ({cartCount})
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cart?.lineItems?.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground">Səbət boşdur</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart?.lineItems?.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 bg-card rounded-lg border border-border">
                  {/* Product Image */}
                  <img 
                    src={item.variant.image?.src || '/placeholder.png'} 
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded"
                  />
                  
                  {/* Product Info */}
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {item.variant.title !== 'Default Title' && item.variant.title}
                    </p>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={loading || item.quantity <= 1}
                        className="w-7 h-7 rounded border border-border hover:bg-muted transition disabled:opacity-50"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        disabled={loading}
                        className="w-7 h-7 rounded border border-border hover:bg-muted transition disabled:opacity-50"
                      >
                        +
                      </button>
                      
                      <button
                        onClick={() => removeFromCart(item.id)}
                        disabled={loading}
                        className="ml-auto text-red-500 hover:text-red-600 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Price */}
                  <div className="text-right">
                    <p className="font-bold">
                      {parseFloat(item.variant.price.amount).toFixed(2)} ₼
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart?.lineItems?.length > 0 && (
          <div className="border-t border-border p-6 space-y-4">
            <div className="flex justify-between items-center text-lg">
              <span className="font-semibold">Cəmi:</span>
              <span className="font-bold text-2xl">
                {parseFloat(cartTotal).toFixed(2)} ₼
              </span>
            </div>
            
            <Button 
              onClick={openCheckout}
              disabled={loading}
              className="w-full h-12 text-lg font-bold"
            >
              Ödənişə keç
            </Button>
            
            <button
              onClick={onClose}
              className="w-full text-sm text-muted-foreground hover:text-foreground transition"
            >
              Alış-verişə davam et
            </button>
          </div>
        )}
      </div>
    </>
  );
}