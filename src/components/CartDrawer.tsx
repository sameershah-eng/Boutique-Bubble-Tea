import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';
import { CheckoutModal } from './CheckoutModal';
import { handleImageError } from '../utils/imageFallback';

export const CartDrawer: React.FC = () => {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeItem, subtotal, totalItems } = useCart();
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  // Free delivery threshold: £20
  const FREE_DELIVERY_THRESHOLD = 20;
  const progressToFreeDelivery = Math.min((subtotal / FREE_DELIVERY_THRESHOLD) * 100, 100);
  const remainingForFree = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);

  return (
    <>
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-[#0E0B1A]/80 backdrop-blur-md"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed top-0 right-0 bottom-0 w-full sm:max-w-md bg-[#140E26] border-l border-white/10 shadow-2xl flex flex-col z-10 text-[#FBF6EF]"
            >
              {/* Drawer Header */}
              <div className="p-5 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                    <ShoppingBag className="w-5 h-5 text-[#B79CED]" />
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-lg text-white">Your Hydor Bag</h2>
                    <p className="text-xs text-white/50 font-mono">
                      {totalItems} {totalItems === 1 ? 'drink' : 'drinks / items'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsCartOpen(false)}
                  aria-label="Close cart drawer"
                  className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Delivery Bar */}
              <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs">
                <div className="flex items-center justify-between mb-1.5 font-medium">
                  <span className="flex items-center gap-1.5 text-white/90">
                    <Truck className="w-4 h-4 text-[#6FE3E1]" />
                    {remainingForFree === 0 ? (
                      <span className="text-[#9BD4A8] font-semibold">Free Spitalfields delivery unlocked!</span>
                    ) : (
                      <span>
                        Add <strong className="text-[#FFB570] font-mono">{formatPrice(remainingForFree)}</strong> for free delivery
                      </span>
                    )}
                  </span>
                  <span className="font-mono text-white/50">{Math.round(progressToFreeDelivery)}%</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full gradient-hero transition-all duration-300 rounded-full"
                    style={{ width: `${progressToFreeDelivery}%` }}
                  />
                </div>
              </div>

              {/* Cart Items List */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4 space-y-4">
                    <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/30">
                      <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-lg text-white">Your bag is empty</h3>
                      <p className="text-xs text-white/60 mt-1 max-w-xs mx-auto">
                        Warm tapioca pearls and hand-shaken teas are waiting for you.
                      </p>
                    </div>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="px-6 py-2.5 rounded-full gradient-hero text-[#0E0B1A] font-bold text-xs tracking-wide shadow-md"
                    >
                      Browse Our Menu
                    </button>
                  </div>
                ) : (
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.div
                        key={item.cartItemId}
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex gap-3 relative group"
                      >
                        {/* Thumbnail */}
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-black/40 shrink-0 border border-white/10">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            onError={(e) => handleImageError(e, item.product.name, item.product.category)}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0 pr-6">
                          <h4 className="font-display font-semibold text-sm text-white truncate">
                            {item.product.name}
                          </h4>

                          {/* Options pills */}
                          <div className="flex flex-wrap gap-1 mt-1 text-[11px] text-white/65">
                            <span className="bg-white/10 px-1.5 py-0.5 rounded text-[10px] font-mono">
                              {item.customization.size}
                            </span>
                            {item.customization.sugar !== 'N/A' && (
                              <span className="bg-white/10 px-1.5 py-0.5 rounded text-[10px]">
                                {item.customization.sugar.split(' ')[0]}
                              </span>
                            )}
                            {item.customization.ice !== 'N/A' && (
                              <span className="bg-white/10 px-1.5 py-0.5 rounded text-[10px]">
                                {item.customization.ice}
                              </span>
                            )}
                            {item.customization.toppings.length > 0 && (
                              <span className="text-[#FFB570] text-[10px]">
                                +{item.customization.toppings.map((t) => t.name.split(' ')[0]).join(', ')}
                              </span>
                            )}
                          </div>

                          {/* Price & Quantity Controls */}
                          <div className="flex items-center justify-between mt-3">
                            <span className="font-mono font-bold text-sm text-[#FF8FB1]">
                              {formatPrice(item.unitPrice * item.quantity)}
                            </span>

                            <div className="flex items-center bg-white/10 rounded-full border border-white/10 p-0.5">
                              <button
                                onClick={() => updateQuantity(item.cartItemId, -1)}
                                aria-label="Decrease quantity"
                                className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-6 text-center font-mono text-xs font-semibold">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.cartItemId, 1)}
                                aria-label="Increase quantity"
                                className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Remove button */}
                        <button
                          onClick={() => removeItem(item.cartItemId)}
                          aria-label="Remove item"
                          className="absolute top-3 right-3 text-white/40 hover:text-[#FF8FB1] transition-colors p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>

              {/* Drawer Footer */}
              {items.length > 0 && (
                <div className="p-5 bg-[#0E0B1A] border-t border-white/10 space-y-3 shrink-0">
                  <div className="space-y-1.5 text-xs text-white/70">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-mono text-white text-sm font-semibold">{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-[11px] text-white/50">
                      <span>Taxes & bag fee</span>
                      <span>Included</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setCheckoutOpen(true)}
                    className="w-full py-3.5 rounded-full gradient-hero text-[#0E0B1A] font-bold text-sm tracking-wide flex items-center justify-between px-5 shadow-xl shadow-[#FF8FB1]/20 hover:scale-[1.01] active:scale-[0.98] transition-all"
                  >
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" />
                      <span>Proceed to Checkout</span>
                    </span>
                    <span className="flex items-center gap-1 font-mono text-base font-extrabold">
                      {formatPrice(subtotal)}
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </span>
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <CheckoutModal isOpen={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
    </>
  );
};
