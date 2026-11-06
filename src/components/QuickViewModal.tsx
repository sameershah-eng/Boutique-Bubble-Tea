import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, Check, Sparkles, Star } from 'lucide-react';
import { useCart, CartCustomization } from '../context/CartContext';
import { TOPPINGS, formatPrice } from '../data/products';
import { handleImageError } from '../utils/imageFallback';

const SIZES = [
  { id: 'Regular', name: 'Regular (500ml)', extra: 0 },
  { id: 'Large', name: 'Large (700ml)', extra: 0.80 },
] as const;

const SUGAR_LEVELS = ['0% (Unsweetened)', '25% (Light)', '50% (Standard)', '75% (Sweet)', '100% (Extra)'];
const ICE_LEVELS = ['No Ice (Chilled)', 'Less Ice', 'Normal Ice'];
const MILK_OPTIONS = [
  { id: 'Whole Milk', name: 'Organic Whole Milk', extra: 0 },
  { id: 'Oat Milk', name: 'Minor Figures Oat Milk (Free)', extra: 0 },
  { id: 'Soy Milk', name: 'Silken Soy Milk', extra: 0 },
  { id: 'Coconut Milk', name: 'Pure Coconut Milk', extra: 0 },
];

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct, addItem } = useCart();

  const [size, setSize] = useState<'Regular' | 'Large'>('Regular');
  const [sugar, setSugar] = useState('50% (Standard)');
  const [ice, setIce] = useState('Less Ice');
  const [milk, setMilk] = useState('Whole Milk');
  const [selectedToppings, setSelectedToppings] = useState<{ name: string; price: number }[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [specialNote, setSpecialNote] = useState('');

  // Reset state when product opens
  useEffect(() => {
    if (quickViewProduct) {
      setSize('Regular');
      setSugar('50% (Standard)');
      setIce('Less Ice');
      setMilk('Whole Milk');
      // If it's a signature milk tea or brown sugar, pre-select tapioca pearls as default convenience
      if (quickViewProduct.category === 'Brown Sugar' || quickViewProduct.name.includes('Signature')) {
        setSelectedToppings([{ name: 'Slow-Cooked Tapioca Pearls', price: 0.70 }]);
      } else {
        setSelectedToppings([]);
      }
      setQuantity(1);
      setSpecialNote('');
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const isSnack = quickViewProduct.category === 'Snacks';

  // Calculate live total unit price
  const basePrice = quickViewProduct.price;
  const sizeExtra = size === 'Large' ? 0.80 : 0;
  const toppingsExtra = selectedToppings.reduce((acc, t) => acc + t.price, 0);
  const unitPrice = isSnack ? basePrice : basePrice + sizeExtra + toppingsExtra;
  const totalPrice = unitPrice * quantity;

  const toggleTopping = (toppingName: string, price: number) => {
    if (selectedToppings.some((t) => t.name === toppingName)) {
      setSelectedToppings(selectedToppings.filter((t) => t.name !== toppingName));
    } else {
      setSelectedToppings([...selectedToppings, { name: toppingName, price }]);
    }
  };

  const handleAddToCart = () => {
    const customization: CartCustomization = {
      size,
      sugar: isSnack ? 'N/A' : sugar,
      ice: isSnack ? 'N/A' : ice,
      milk: isSnack ? undefined : milk,
      toppings: isSnack ? [] : selectedToppings,
      notes: specialNote,
    };

    addItem(quickViewProduct, customization, quantity);
    setQuickViewProduct(null);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setQuickViewProduct(null)}
          className="fixed inset-0 bg-[#0E0B1A]/80 backdrop-blur-md"
        />

        {/* Modal Window / Mobile Bottom Sheet */}
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 28, stiffness: 280 }}
          className="relative w-full sm:max-w-xl max-h-[90vh] sm:max-h-[85vh] bg-[#140E26] border border-white/10 rounded-t-[28px] sm:rounded-[28px] shadow-2xl flex flex-col z-10 overflow-hidden"
        >
          {/* Header image & close button */}
          <div className="relative h-44 sm:h-52 w-full bg-[#0E0B1A] shrink-0 overflow-hidden">
            <img
              src={quickViewProduct.image}
              alt={quickViewProduct.name}
              onError={(e) => handleImageError(e, quickViewProduct.name, quickViewProduct.category)}
              className="w-full h-full object-cover object-center filter brightness-[0.9]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#140E26] via-[#140E26]/40 to-transparent" />

            {/* Close Button */}
            <button
              onClick={() => setQuickViewProduct(null)}
              aria-label="Close dialog"
              className="absolute top-4 right-4 p-2 rounded-full bg-[#0E0B1A]/70 text-[#FBF6EF] hover:bg-white/20 transition-all border border-white/10 focus:outline-none"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Badges on image */}
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wider uppercase bg-[#0E0B1A]/80 text-[#B79CED] border border-[#B79CED]/30 backdrop-blur-md">
                {quickViewProduct.category}
              </span>

              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-[#0E0B1A]/80 text-[#FFB570] border border-[#FFB570]/30 backdrop-blur-md">
                <Star className="w-3.5 h-3.5 fill-[#FFB570]" />
                <span>{quickViewProduct.rating}</span>
                <span className="text-white/40">({quickViewProduct.reviewCount})</span>
              </div>
            </div>
          </div>

          {/* Scrollable Customization Content */}
          <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-sm text-[#FBF6EF]">
            {/* Title & Description */}
            <div>
              <h2 className="text-xl sm:text-2xl font-display font-bold tracking-tight text-[#FBF6EF]">
                {quickViewProduct.name}
              </h2>
              <p className="mt-1 text-[#FBF6EF]/70 leading-relaxed text-xs sm:text-sm">
                {quickViewProduct.description}
              </p>
            </div>

            {!isSnack ? (
              <>
                {/* 1. Size Selection */}
                <div>
                  <label className="block text-xs font-mono tracking-wider text-[#B79CED] uppercase mb-2 font-semibold">
                    1. Choose Cup Size
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {SIZES.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setSize(s.id)}
                        className={`py-2.5 px-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                          size === s.id
                            ? 'bg-[#B79CED]/15 border-[#B79CED] text-white font-medium shadow-sm'
                            : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                        }`}
                      >
                        <span className="text-xs sm:text-sm">{s.name}</span>
                        {s.extra > 0 && (
                          <span className="text-xs font-mono text-[#FF8FB1]">
                            +{formatPrice(s.extra)}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Sugar Level */}
                <div>
                  <label className="block text-xs font-mono tracking-wider text-[#B79CED] uppercase mb-2 font-semibold">
                    2. Sugar Level
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {SUGAR_LEVELS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSugar(s)}
                        className={`py-2 px-2.5 rounded-lg border text-center text-xs transition-all ${
                          sugar === s
                            ? 'bg-[#FF8FB1]/15 border-[#FF8FB1] text-white font-medium'
                            : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Ice Level */}
                <div>
                  <label className="block text-xs font-mono tracking-wider text-[#B79CED] uppercase mb-2 font-semibold">
                    3. Ice Preference
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {ICE_LEVELS.map((i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setIce(i)}
                        className={`py-2 px-2.5 rounded-lg border text-center text-xs transition-all ${
                          ice === i
                            ? 'bg-[#6FE3E1]/15 border-[#6FE3E1] text-white font-medium'
                            : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                        }`}
                      >
                        {i}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Milk Option (Free plant milk!) */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-mono tracking-wider text-[#B79CED] uppercase font-semibold">
                      4. Milk Base
                    </label>
                    <span className="text-[11px] font-mono text-[#9BD4A8] bg-[#9BD4A8]/10 px-2 py-0.5 rounded-full border border-[#9BD4A8]/20">
                      Plant Milk Always Free
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {MILK_OPTIONS.map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setMilk(m.id)}
                        className={`py-2 px-3 rounded-lg border text-left text-xs transition-all ${
                          milk === m.id
                            ? 'bg-[#9BD4A8]/15 border-[#9BD4A8] text-white font-medium'
                            : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                        }`}
                      >
                        {m.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 5. Toppings */}
                <div>
                  <label className="block text-xs font-mono tracking-wider text-[#B79CED] uppercase mb-2 font-semibold">
                    5. Add Toppings
                  </label>
                  <div className="space-y-1.5">
                    {TOPPINGS.map((t) => {
                      const isSelected = selectedToppings.some((item) => item.name === t.name);
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => toggleTopping(t.name, t.price)}
                          className={`w-full py-2 px-3 rounded-lg border flex items-center justify-between text-xs transition-all ${
                            isSelected
                              ? 'bg-[#FFB570]/15 border-[#FFB570] text-white font-medium'
                              : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-4 h-4 rounded-md flex items-center justify-center border transition-colors ${
                                isSelected
                                  ? 'bg-[#FFB570] border-[#FFB570] text-[#0E0B1A]'
                                  : 'border-white/30'
                              }`}
                            >
                              {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                            <span>{t.name}</span>
                          </div>
                          <span className="font-mono text-[#FFB570]">+{formatPrice(t.price)}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            ) : (
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-white/80">
                <p className="font-semibold text-white mb-1">Freshly Made to Order</p>
                <p>Snacks are prepared hot in our Spitalfields kitchen for optimal crispness.</p>
              </div>
            )}

            {/* Special Instructions Note */}
            <div>
              <label className="block text-xs font-mono tracking-wider text-[#FBF6EF]/60 uppercase mb-1">
                Special Requests (optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Extra hot taiyaki, paper bag, etc."
                value={specialNote}
                onChange={(e) => setSpecialNote(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#B79CED]"
              />
            </div>
          </div>

          {/* Bottom Sticky Action Bar */}
          <div className="p-4 sm:p-5 bg-[#0E0B1A] border-t border-white/10 flex items-center justify-between gap-4 shrink-0">
            {/* Quantity Selector */}
            <div className="flex items-center bg-white/10 rounded-full border border-white/10 p-1">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/15 transition-colors focus:outline-none"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-8 text-center font-mono font-bold text-sm">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/15 transition-colors focus:outline-none"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Live Add To Cart Button */}
            <button
              onClick={handleAddToCart}
              className="flex-1 py-3 px-5 rounded-full gradient-hero text-[#0E0B1A] font-bold text-sm tracking-wide flex items-center justify-between shadow-lg shadow-[#FF8FB1]/20 hover:scale-[1.01] active:scale-[0.98] transition-all"
            >
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>Add to Cart</span>
              </span>
              <span className="font-mono text-base font-extrabold">{formatPrice(totalPrice)}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
