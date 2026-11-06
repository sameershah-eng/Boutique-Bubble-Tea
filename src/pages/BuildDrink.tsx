import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Check, ArrowRight, ArrowLeft, RefreshCw, ShoppingBag } from 'lucide-react';
import { useCart, CartCustomization } from '../context/CartContext';
import { formatPrice, Product, TOPPINGS } from '../data/products';

interface TeaBase {
  id: string;
  name: string;
  tagline: string;
  color: string;
  basePrice: number;
}

const TEA_BASES: TeaBase[] = [
  {
    id: 'roasted-oolong',
    name: 'Tieguanyin Roasted Oolong',
    tagline: 'Deep charcoal-roasted aroma with nutty notes',
    color: '#8C5A3C',
    basePrice: 4.80,
  },
  {
    id: 'assam-black',
    name: 'Sun Moon Lake Assam Black',
    tagline: 'Bold, malty & rich Taiwanese black tea',
    color: '#7B3F00',
    basePrice: 4.80,
  },
  {
    id: 'uji-matcha',
    name: 'First-Harvest Uji Matcha',
    tagline: 'Vibrant green, whisked Japanese ceremonial tea',
    color: '#5C8A62',
    basePrice: 5.40,
  },
  {
    id: 'jasmine-green',
    name: 'Blossom Jasmine Green Tea',
    tagline: 'Triple-scented floral jasmine with light astringency',
    color: '#D4C494',
    basePrice: 4.80,
  },
  {
    id: 'taro-infusion',
    name: 'Fresh Taro Root Puree',
    tagline: 'Real mashed taro root with velvety purple hue',
    color: '#B79CED',
    basePrice: 5.20,
  },
  {
    id: 'mango-passion',
    name: 'Alfonso Mango Passion Nectar',
    tagline: 'Freshly pressed tropical fruit & green tea',
    color: '#FFAE42',
    basePrice: 5.10,
  },
];

const MILK_OPTIONS = [
  { id: 'Whole Milk', name: 'Organic British Whole Milk', note: 'Creamy & velvety' },
  { id: 'Oat Milk', name: 'Minor Figures Oat Milk', note: 'Free plant-milk swap' },
  { id: 'Soy Milk', name: 'Silken Organic Soy Milk', note: 'Light & nutty' },
  { id: 'Coconut Milk', name: 'Pure Pressed Coconut Milk', note: 'Rich tropical body' },
  { id: 'Clear', name: 'No Milk (Clear Tea)', note: 'Pure crisp infusion' },
];

const SWEETNESS_LEVELS = [
  { level: '0%', label: 'Zero Sugar', note: 'Pure leaf taste' },
  { level: '25%', label: 'Light (Recommended)', note: 'Subtle sweetness' },
  { level: '50%', label: 'Standard', note: 'Classic balance' },
  { level: '75%', label: 'Sweet', note: 'Indulgent treat' },
  { level: '100%', label: 'Extra Sweet', note: 'Maximum sugar rush' },
];

const ICE_LEVELS = [
  { id: 'No Ice', label: 'No Ice', note: 'Chilled liquid only' },
  { id: 'Less Ice', label: 'Less Ice (Recommended)', note: 'Optimal chill, maximum tea' },
  { id: 'Normal Ice', label: 'Normal Ice', note: 'Crisp & refreshing' },
];

export const BuildDrink: React.FC = () => {
  const navigate = useNavigate();
  const { addItem, setIsCartOpen } = useCart();

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedBase, setSelectedBase] = useState<TeaBase>(TEA_BASES[0]);
  const [selectedMilk, setSelectedMilk] = useState(MILK_OPTIONS[1]); // Minor Figures Oat
  const [selectedSweetness, setSelectedSweetness] = useState(SWEETNESS_LEVELS[1]); // 25%
  const [selectedIce, setSelectedIce] = useState(ICE_LEVELS[1]); // Less Ice
  const [selectedToppings, setSelectedToppings] = useState<{ name: string; price: number }[]>([
    { name: 'Slow-Cooked Tapioca Pearls', price: 0.70 },
  ]);
  const [drinkName, setDrinkName] = useState('My Custom Hydor');

  // Calculations
  const toppingsTotal = selectedToppings.reduce((acc, t) => acc + t.price, 0);
  const totalPrice = selectedBase.basePrice + toppingsTotal;

  const toggleTopping = (toppingName: string, price: number) => {
    if (selectedToppings.some((t) => t.name === toppingName)) {
      setSelectedToppings(selectedToppings.filter((t) => t.name !== toppingName));
    } else {
      setSelectedToppings([...selectedToppings, { name: toppingName, price }]);
    }
  };

  const handleFinish = () => {
    const customProduct: Product = {
      id: `custom_${Date.now()}`,
      name: drinkName.trim() || 'Custom Hydor Craft',
      category: 'Milk Tea',
      description: `${selectedBase.name} with ${selectedMilk.name}, ${selectedSweetness.level} sweetness, and ${
        selectedToppings.length > 0 ? selectedToppings.map((t) => t.name.split(' ')[0]).join(', ') : 'no toppings'
      }.`,
      price: totalPrice,
      rating: 5.0,
      reviewCount: 1,
      tags: ['Custom Recipe'],
      image: 'https://images.unsplash.com/photo-1558857563-b37cf5ef1c78?auto=format&fit=crop&w=800&q=80',
      baseColor: selectedBase.color,
    };

    const customization: CartCustomization = {
      size: 'Regular',
      sugar: selectedSweetness.level,
      ice: selectedIce.label,
      milk: selectedMilk.name,
      toppings: selectedToppings,
      baseTea: selectedBase.name,
    };

    addItem(customProduct, customization, 1);
    setIsCartOpen(true);
  };

  const hasTapioca = selectedToppings.some((t) => t.name.includes('Tapioca') || t.name.includes('Grass Jelly'));
  const hasPopping = selectedToppings.some((t) => t.name.includes('Popping') || t.name.includes('Coconut'));
  const hasCheeseFoam = selectedToppings.some((t) => t.name.includes('Cheese Foam'));

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-wider text-[#6FE3E1] font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Hydor Tea Laboratory</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-[#FBF6EF] tracking-tight">
          Build Your <span className="font-serif-italic font-normal gradient-text-hero">Masterpiece</span>.
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-white/70">
          5 simple steps. Zero compromises. Watch your liquid and toppings blend in real time.
        </p>
      </div>

      {/* Progress Steps Header */}
      <div className="max-w-xl mx-auto mb-10">
        <div className="flex items-center justify-between relative">
          {/* Progress bar background line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/10 -translate-y-1/2 -z-0" />
          <div
            className="absolute top-1/2 left-0 h-0.5 gradient-hero -translate-y-1/2 -z-0 transition-all duration-300"
            style={{ width: `${((currentStep - 1) / 4) * 100}%` }}
          />

          {[
            { num: 1, label: 'Base Tea' },
            { num: 2, label: 'Milk' },
            { num: 3, label: 'Sugar' },
            { num: 4, label: 'Ice' },
            { num: 5, label: 'Toppings' },
          ].map((s) => (
            <button
              key={s.num}
              onClick={() => setCurrentStep(s.num)}
              className="flex flex-col items-center gap-1.5 z-10 focus:outline-none"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all ${
                  currentStep === s.num
                    ? 'gradient-hero text-[#0E0B1A] ring-4 ring-[#B79CED]/20 scale-110'
                    : currentStep > s.num
                    ? 'bg-[#9BD4A8] text-[#0E0B1A]'
                    : 'bg-[#1B1428] border border-white/20 text-white/50'
                }`}
              >
                {currentStep > s.num ? <Check className="w-4 h-4 stroke-[3]" /> : s.num}
              </div>
              <span className="hidden sm:inline-block text-[11px] font-mono text-white/60">
                {s.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Builder Grid: Step Controls on Left, Live SVG Cup on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Interactive Step Selectors (7 cols) */}
        <div className="lg:col-span-7 rounded-[32px] glass-card p-6 sm:p-8 border border-white/10">
          <AnimatePresence mode="wait">
            {/* STEP 1: TEA BASE */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-4"
              >
                <div>
                  <span className="text-xs font-mono text-[#B79CED] uppercase font-semibold">Step 1 of 5</span>
                  <h3 className="text-2xl font-display font-bold text-white mt-0.5">
                    Choose Your Tea Infusion
                  </h3>
                  <p className="text-xs text-white/60">
                    High-mountain loose-leaf harvests steeped for balanced depth and zero bitterness.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {TEA_BASES.map((base) => {
                    const isSelected = selectedBase.id === base.id;
                    return (
                      <button
                        key={base.id}
                        type="button"
                        onClick={() => setSelectedBase(base)}
                        className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                          isSelected
                            ? 'bg-white/10 border-[#B79CED] shadow-lg ring-1 ring-[#B79CED]'
                            : 'bg-white/5 border-white/10 hover:bg-white/10'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span
                            className="w-4 h-4 rounded-full border border-white/30"
                            style={{ backgroundColor: base.color }}
                          />
                          <span className="font-mono text-xs font-bold text-[#FF8FB1]">
                            {formatPrice(base.basePrice)}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-display font-bold text-sm text-white">{base.name}</h4>
                          <p className="text-[11px] text-white/60 mt-0.5">{base.tagline}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* STEP 2: MILK */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-4"
              >
                <div>
                  <span className="text-xs font-mono text-[#9BD4A8] uppercase font-semibold">Step 2 of 5</span>
                  <h3 className="text-2xl font-display font-bold text-white mt-0.5">
                    Select Your Milk Base
                  </h3>
                  <p className="text-xs text-[#9BD4A8]">
                    British oat milk & plant milks are always zero extra pence at Hydor.
                  </p>
                </div>

                <div className="space-y-2.5 pt-2">
                  {MILK_OPTIONS.map((milk) => {
                    const isSelected = selectedMilk.id === milk.id;
                    return (
                      <button
                        key={milk.id}
                        type="button"
                        onClick={() => setSelectedMilk(milk)}
                        className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                          isSelected
                            ? 'bg-white/10 border-[#9BD4A8] shadow-md ring-1 ring-[#9BD4A8]'
                            : 'bg-white/5 border-white/10 hover:bg-white/10'
                        }`}
                      >
                        <div>
                          <h4 className="font-display font-bold text-sm text-white">{milk.name}</h4>
                          <p className="text-xs text-white/60 mt-0.5">{milk.note}</p>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                            isSelected ? 'bg-[#9BD4A8] border-[#9BD4A8] text-[#0E0B1A]' : 'border-white/30'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* STEP 3: SWEETNESS */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-4"
              >
                <div>
                  <span className="text-xs font-mono text-[#FF8FB1] uppercase font-semibold">Step 3 of 5</span>
                  <h3 className="text-2xl font-display font-bold text-white mt-0.5">
                    Dial In Sweetness
                  </h3>
                  <p className="text-xs text-white/60">
                    We use organic cane sugar and slow-simmered caramel.
                  </p>
                </div>

                <div className="space-y-2.5 pt-2">
                  {SWEETNESS_LEVELS.map((s) => {
                    const isSelected = selectedSweetness.level === s.level;
                    return (
                      <button
                        key={s.level}
                        type="button"
                        onClick={() => setSelectedSweetness(s)}
                        className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                          isSelected
                            ? 'bg-white/10 border-[#FF8FB1] shadow-md ring-1 ring-[#FF8FB1]'
                            : 'bg-white/5 border-white/10 hover:bg-white/10'
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-sm text-white">{s.level}</span>
                            <span className="text-sm text-white font-medium">— {s.label}</span>
                          </div>
                          <p className="text-xs text-white/60 mt-0.5">{s.note}</p>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                            isSelected ? 'bg-[#FF8FB1] border-[#FF8FB1] text-[#0E0B1A]' : 'border-white/30'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* STEP 4: ICE */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-4"
              >
                <div>
                  <span className="text-xs font-mono text-[#6FE3E1] uppercase font-semibold">Step 4 of 5</span>
                  <h3 className="text-2xl font-display font-bold text-white mt-0.5">
                    Ice & Temperature
                  </h3>
                  <p className="text-xs text-white/60">
                    Chilled through triple-filtered crystalline ice.
                  </p>
                </div>

                <div className="space-y-2.5 pt-2">
                  {ICE_LEVELS.map((i) => {
                    const isSelected = selectedIce.id === i.id;
                    return (
                      <button
                        key={i.id}
                        type="button"
                        onClick={() => setSelectedIce(i)}
                        className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                          isSelected
                            ? 'bg-white/10 border-[#6FE3E1] shadow-md ring-1 ring-[#6FE3E1]'
                            : 'bg-white/5 border-white/10 hover:bg-white/10'
                        }`}
                      >
                        <div>
                          <h4 className="font-display font-bold text-sm text-white">{i.label}</h4>
                          <p className="text-xs text-white/60 mt-0.5">{i.note}</p>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                            isSelected ? 'bg-[#6FE3E1] border-[#6FE3E1] text-[#0E0B1A]' : 'border-white/30'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* STEP 5: TOPPINGS */}
            {currentStep === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-4"
              >
                <div>
                  <span className="text-xs font-mono text-[#FFB570] uppercase font-semibold">Step 5 of 5</span>
                  <h3 className="text-2xl font-display font-bold text-white mt-0.5">
                    Handcrafted Toppings
                  </h3>
                  <p className="text-xs text-white/60">
                    Warm black sugar boba, bursting fruit pearls, and velvety cheese foam.
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  {TOPPINGS.map((topping) => {
                    const isSelected = selectedToppings.some((t) => t.name === topping.name);
                    return (
                      <button
                        key={topping.id}
                        type="button"
                        onClick={() => toggleTopping(topping.name, topping.price)}
                        className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                          isSelected
                            ? 'bg-[#FFB570]/15 border-[#FFB570] shadow-sm'
                            : 'bg-white/5 border-white/10 hover:bg-white/10'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-colors ${
                              isSelected ? 'bg-[#FFB570] border-[#FFB570] text-[#0E0B1A]' : 'border-white/30'
                            }`}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                          <div>
                            <span className="font-semibold text-xs sm:text-sm text-white block">
                              {topping.name}
                            </span>
                          </div>
                        </div>
                        <span className="font-mono text-xs font-bold text-[#FFB570]">
                          +{formatPrice(topping.price)}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Custom Name */}
                <div className="pt-3 border-t border-white/10">
                  <label className="block text-xs font-mono uppercase text-white/60 mb-1">
                    Name Your Creation (Optional)
                  </label>
                  <input
                    type="text"
                    value={drinkName}
                    onChange={(e) => setDrinkName(e.target.value)}
                    placeholder="e.g. Maya's Spitalfields Sunset"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#B79CED]"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-6 mt-6 border-t border-white/10">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => prev - 1)}
                className="py-2.5 px-5 rounded-full bg-white/5 hover:bg-white/10 text-white text-xs font-semibold flex items-center gap-2 border border-white/10 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {currentStep < 5 ? (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => prev + 1)}
                className="py-2.5 px-6 rounded-full gradient-hero text-[#0E0B1A] text-xs font-bold flex items-center gap-2 shadow-md hover:scale-102 transition-transform"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinish}
                className="py-3 px-7 rounded-full gradient-hero text-[#0E0B1A] text-xs sm:text-sm font-extrabold flex items-center gap-2 shadow-xl shadow-[#FF8FB1]/25 hover:scale-105 active:scale-95 transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart ({formatPrice(totalPrice)})</span>
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Live SVG Cup Visualizer (5 cols) */}
        <div className="lg:col-span-5 rounded-[32px] glass-card p-6 sm:p-8 border border-white/10 flex flex-col items-center sticky top-28">
          <div className="w-full flex items-center justify-between text-xs font-mono text-white/50 pb-3 border-b border-white/10 mb-4">
            <span>LIVE CUP SIMULATOR</span>
            <span className="text-[#9BD4A8]">CALIBRATED</span>
          </div>

          {/* Dynamic SVG Cup */}
          <div className="relative w-48 h-64 sm:w-56 sm:h-72 my-2 flex items-center justify-center">
            <svg className="w-full h-full drop-shadow-[0_15px_30px_rgba(0,0,0,0.5)]" viewBox="0 0 140 180" fill="none">
              <defs>
                <clipPath id="builderCupClip">
                  <path d="M30 40 L40 152 C41 162 48 168 58 168 L82 168 C92 168 99 162 100 152 L110 40 Z" />
                </clipPath>

                {/* Dynamic Tea Base Gradient */}
                <linearGradient id="liveTeaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={selectedBase.color} />
                  <stop offset="100%" stopColor={selectedBase.color} stopOpacity="0.85" />
                </linearGradient>

                {/* Milk Overlay Gradient */}
                <linearGradient id="milkBlending" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FFFDF7" stopOpacity={selectedMilk.id === 'Clear' ? '0' : '0.55'} />
                  <stop offset="100%" stopColor="#FFFDF7" stopOpacity={selectedMilk.id === 'Clear' ? '0' : '0.2'} />
                </linearGradient>
              </defs>

              {/* Straw */}
              <line
                x1="80"
                y1="10"
                x2="65"
                y2="90"
                stroke="#FFB570"
                strokeWidth="5"
                strokeLinecap="round"
              />

              {/* Cup Outline */}
              <path
                d="M30 40 L40 152 C41 162 48 168 58 168 L82 168 C92 168 99 162 100 152 L110 40 Z"
                stroke="#FBF6EF"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M24 40 L116 40" stroke="#FBF6EF" strokeWidth="3" strokeLinecap="round" />

              {/* Inside Cup Elements */}
              <g clipPath="url(#builderCupClip)">
                {/* Tea Liquid */}
                <rect x="25" y="45" width="90" height="130" fill="url(#liveTeaGradient)" />

                {/* Milk swirl overlay */}
                {selectedMilk.id !== 'Clear' && (
                  <rect x="25" y="45" width="90" height="130" fill="url(#milkBlending)" />
                )}

                {/* Ice Cubes */}
                {selectedIce.id !== 'No Ice' && (
                  <>
                    <rect x="52" y="70" width="16" height="16" rx="3" fill="#FFFFFF" fillOpacity="0.25" stroke="#FFFFFF" strokeOpacity="0.5" strokeWidth="1" transform="rotate(12 60 78)" />
                    <rect x="74" y="85" width="15" height="15" rx="3" fill="#FFFFFF" fillOpacity="0.25" stroke="#FFFFFF" strokeOpacity="0.5" strokeWidth="1" transform="rotate(-15 81 92)" />
                  </>
                )}

                {/* Tapioca Pearls */}
                {hasTapioca && (
                  <g>
                    <circle cx="56" cy="156" r="5" fill="#140E26" stroke="#B79CED" strokeWidth="1" />
                    <circle cx="70" cy="158" r="5.5" fill="#140E26" stroke="#FF8FB1" strokeWidth="1" />
                    <circle cx="84" cy="155" r="4.5" fill="#140E26" stroke="#B79CED" strokeWidth="1" />
                    <circle cx="62" cy="146" r="5" fill="#140E26" stroke="#FFB570" strokeWidth="1" />
                    <circle cx="78" cy="147" r="4.5" fill="#140E26" stroke="#6FE3E1" strokeWidth="1" />
                    <circle cx="50" cy="150" r="4" fill="#140E26" stroke="#FF8FB1" strokeWidth="1" />
                  </g>
                )}

                {/* Popping Boba */}
                {hasPopping && (
                  <g>
                    <circle cx="65" cy="138" r="4.5" fill="#FFB570" fillOpacity="0.9" stroke="#FFF" strokeWidth="1" />
                    <circle cx="76" cy="135" r="4" fill="#FF8FB1" fillOpacity="0.9" stroke="#FFF" strokeWidth="1" />
                    <circle cx="54" cy="136" r="4" fill="#6FE3E1" fillOpacity="0.9" stroke="#FFF" strokeWidth="1" />
                  </g>
                )}

                {/* Cheese Foam Cap */}
                {hasCheeseFoam && (
                  <rect x="25" y="45" width="90" height="26" fill="#FFF8E7" opacity="0.95" />
                )}
              </g>
            </svg>
          </div>

          {/* Live Specs Summary */}
          <div className="w-full mt-4 p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs">
            <div className="flex justify-between items-center text-white">
              <span className="font-display font-bold text-sm truncate">{drinkName}</span>
              <span className="font-mono font-extrabold text-base gradient-text-hero">
                {formatPrice(totalPrice)}
              </span>
            </div>

            <div className="pt-2 border-t border-white/10 space-y-1 text-white/70 text-[11px] font-mono">
              <p>• {selectedBase.name}</p>
              <p>• {selectedMilk.name}</p>
              <p>• {selectedSweetness.level} Sweetness | {selectedIce.label}</p>
              {selectedToppings.length > 0 && (
                <p className="text-[#FFB570]">• {selectedToppings.map((t) => t.name).join(', ')}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
