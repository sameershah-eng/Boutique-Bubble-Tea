import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, Clock, MapPin, Phone, MessageSquare, ArrowRight, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { formatPrice } from '../data/products';
import { useCart } from '../context/CartContext';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { items, subtotal, clearCart, setIsCartOpen } = useCart();

  const [orderType, setOrderType] = useState<'pickup' | 'delivery'>('pickup');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [time, setTime] = useState('As soon as possible (10-15 mins)');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [notes, setNotes] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  if (!isOpen) return null;

  const deliveryFee = orderType === 'delivery' && subtotal < 20 ? 2.50 : 0;
  const grandTotal = subtotal + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const generatedOrderNum = `HYD-${Math.floor(1000 + Math.random() * 9000)}`;
      setOrderNumber(generatedOrderNum);
      setIsSubmitting(false);
      setOrderComplete(true);

      // Trigger celebratory confetti/pearl burst
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#B79CED', '#FF8FB1', '#FFB570', '#6FE3E1', '#FBF6EF'],
      });
    }, 1200);
  };

  const handleFinish = () => {
    clearCart();
    setIsCartOpen(false);
    onClose();
    setOrderComplete(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => (!orderComplete ? onClose() : handleFinish())}
          className="fixed inset-0 bg-[#0E0B1A]/85 backdrop-blur-md"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="relative w-full max-w-lg bg-[#140E26] border border-white/15 rounded-3xl p-5 sm:p-8 text-[#FBF6EF] shadow-2xl z-10 overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={() => (!orderComplete ? onClose() : handleFinish())}
            aria-label="Close"
            className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {!orderComplete ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <span className="text-[11px] font-mono tracking-widest text-[#B79CED] uppercase font-semibold">
                  Express Checkout
                </span>
                <h3 className="text-2xl font-display font-bold mt-1 text-white">
                  Confirm Your Order
                </h3>
                <p className="text-xs text-white/60 mt-0.5">
                  Freshly prepared at 70 Commercial St, Spitalfields.
                </p>
              </div>

              {/* Order Type Toggle */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-white/5 rounded-2xl border border-white/10">
                <button
                  type="button"
                  onClick={() => setOrderType('pickup')}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                    orderType === 'pickup'
                      ? 'bg-gradient-to-r from-[#B79CED] to-[#FF8FB1] text-[#0E0B1A] shadow-md'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  Store Pickup (Fast)
                </button>
                <button
                  type="button"
                  onClick={() => setOrderType('delivery')}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                    orderType === 'delivery'
                      ? 'bg-gradient-to-r from-[#B79CED] to-[#FF8FB1] text-[#0E0B1A] shadow-md'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  Local Delivery (E1 Area)
                </button>
              </div>

              {/* Form Fields */}
              <div className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-white/75 font-medium mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maya Chen"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#B79CED]"
                  />
                </div>

                <div>
                  <label className="block text-white/75 font-medium mb-1">Mobile Phone (for SMS updates) *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +44 7911 123456"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#B79CED]"
                  />
                </div>

                {orderType === 'delivery' ? (
                  <div>
                    <label className="block text-white/75 font-medium mb-1">Delivery Address (Commercial St / Shoreditch) *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Flat 4B, 15 Folgate Street, E1 6BX"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#B79CED]"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-white/75 font-medium mb-1">Pickup Time</label>
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#140E26] border border-white/10 text-white focus:outline-none focus:border-[#B79CED]"
                    >
                      <option value="As soon as possible (10-15 mins)">As soon as possible (10-15 mins)</option>
                      <option value="In 30 minutes">In 30 minutes</option>
                      <option value="In 45 minutes">In 45 minutes</option>
                      <option value="In 1 hour">In 1 hour</option>
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-white/75 font-medium mb-1">Kitchen / Barista Notes</label>
                  <input
                    type="text"
                    placeholder="e.g. Separate bag, extra napkin, ring buzzer 4"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#B79CED]"
                  />
                </div>
              </div>

              {/* Order Summary breakdown */}
              <div className="pt-3 border-t border-white/10 space-y-1.5 text-xs text-white/75">
                <div className="flex justify-between">
                  <span>Items ({items.reduce((acc, i) => acc + i.quantity, 0)})</span>
                  <span className="font-mono">{formatPrice(subtotal)}</span>
                </div>
                {orderType === 'delivery' && (
                  <div className="flex justify-between">
                    <span>Local Courier Delivery</span>
                    <span className="font-mono">
                      {deliveryFee === 0 ? <span className="text-[#9BD4A8]">FREE</span> : formatPrice(deliveryFee)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-bold text-white pt-1">
                  <span>Total Due</span>
                  <span className="font-mono text-base gradient-text-hero">{formatPrice(grandTotal)}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-full gradient-hero text-[#0E0B1A] font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-xl shadow-[#FF8FB1]/20 hover:scale-[1.01] active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-[#0E0B1A] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Place Order ({formatPrice(grandTotal)})</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </>
                )}
              </button>
            </form>
          ) : (
            /* Order Success View */
            <div className="text-center py-4 space-y-5">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 15 }}
                className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#6FE3E1] to-[#9BD4A8] text-[#0E0B1A] flex items-center justify-center mx-auto shadow-lg shadow-[#6FE3E1]/30"
              >
                <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
              </motion.div>

              <div>
                <span className="text-xs font-mono tracking-widest text-[#9BD4A8] uppercase font-semibold">
                  Order Confirmed
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mt-1">
                  We're Shaking Your Tea!
                </h3>
                <div className="inline-block mt-3 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 font-mono text-sm font-bold text-[#FFB570]">
                  Order #{orderNumber}
                </div>
              </div>

              <div className="bg-white/5 rounded-2xl p-4 text-left border border-white/10 space-y-2.5 text-xs text-white/80">
                <div className="flex items-center gap-2.5 text-[#FBF6EF]">
                  <Clock className="w-4 h-4 text-[#FF8FB1] shrink-0" />
                  <span>Ready for {orderType === 'pickup' ? 'pickup' : 'delivery'} in ~15 mins</span>
                </div>
                <div className="flex items-start gap-2.5 text-[#FBF6EF]">
                  <MapPin className="w-4 h-4 text-[#B79CED] shrink-0 mt-0.5" />
                  <span>70 Commercial St, London E1 6LT (Opposite Spitalfields)</span>
                </div>
                <div className="flex items-center gap-2.5 text-[#FBF6EF]">
                  <Phone className="w-4 h-4 text-[#6FE3E1] shrink-0" />
                  <span>Store Hotline: +44 20 3712 5128</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <a
                  href={`https://wa.me/442037125128?text=${encodeURIComponent(
                    `Hi HYDOR, I just placed order ${orderNumber} for ${name}!`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/30 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Store</span>
                </a>

                <button
                  onClick={handleFinish}
                  className="flex-1 py-3 px-4 rounded-full gradient-hero text-[#0E0B1A] font-bold text-xs tracking-wide shadow-md hover:scale-[1.01] transition-transform"
                >
                  Back to HYDOR
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
