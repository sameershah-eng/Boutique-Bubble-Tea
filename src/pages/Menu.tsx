import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Sparkles, Star, Plus, ShoppingBag, Filter } from 'lucide-react';
import { PRODUCTS, CATEGORIES, formatPrice, Product } from '../data/products';
import { useCart } from '../context/CartContext';
import { handleImageError } from '../utils/imageFallback';

export const Menu: React.FC = () => {
  const { setQuickViewProduct, addItem, totalItems, subtotal, setIsCartOpen } = useCart();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter products by category & search query
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen pt-28 pb-24 sm:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Menu Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-wider text-[#FF8FB1] font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Bespoke Taiwanese Brews</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-[#FBF6EF] tracking-tight">
          The Full <span className="font-serif-italic font-normal gradient-text-hero">Hydor</span> Menu.
        </h1>
        <p className="mt-3 text-sm sm:text-base text-[#FBF6EF]/70">
          Hand-crafted with loose-leaf teas, organic milks, and slow-simmered toppings. Click any drink to customize sweetness, ice, milk and pearls.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-8 relative">
        <div className="relative">
          <Search className="w-4 h-4 text-white/40 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search matcha, brown sugar, mochi, taro..."
            className="w-full pl-11 pr-4 py-3 rounded-full bg-white/5 border border-white/10 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#B79CED] glass-pill transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-white/50 hover:text-white"
            >
              CLEAR
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Pills with Layout Indicator */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-10 -mx-4 px-4 sm:mx-0 sm:px-0 sm:justify-center">
        {CATEGORIES.map((category) => {
          const isSelected = selectedCategory === category;
          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`relative px-4 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap transition-colors focus:outline-none ${
                isSelected ? 'text-[#0E0B1A]' : 'text-white/70 hover:text-white bg-white/5 border border-white/10'
              }`}
            >
              {isSelected && (
                <motion.div
                  layoutId="activeCategoryPill"
                  className="absolute inset-0 rounded-full gradient-hero shadow-md"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{category}</span>
            </button>
          );
        })}
      </div>

      {/* Result Count and Active Filters note */}
      <div className="flex items-center justify-between text-xs font-mono text-white/50 mb-6 px-1">
        <span>
          SHOWING {filteredProducts.length} {filteredProducts.length === 1 ? 'CREATION' : 'CREATIONS'}
        </span>
        {selectedCategory !== 'All' && (
          <button
            onClick={() => setSelectedCategory('All')}
            className="text-[#FF8FB1] hover:underline"
          >
            Reset filter
          </button>
        )}
      </div>

      {/* Products Grid with Framer Motion Layout Animation */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10 p-8">
          <p className="text-lg font-display text-white">No teas found for "{searchQuery}"</p>
          <p className="text-xs text-white/60 mt-1">Try searching for "matcha", "oolong", or "tapioca".</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="mt-4 px-5 py-2 rounded-full gradient-hero text-[#0E0B1A] font-bold text-xs"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6"
        >
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="rounded-[28px] glass-card glass-card-hover p-4 flex flex-col justify-between group"
              >
                <div>
                  {/* Image */}
                  <div
                    onClick={() => setQuickViewProduct(product)}
                    className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#1B1428] cursor-pointer mb-3.5"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      onError={(e) => handleImageError(e, product.name, product.category)}
                      className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
                    />

                    {/* Tag badge */}
                    {product.tags[0] && (
                      <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase font-semibold bg-[#0E0B1A]/80 backdrop-blur-md text-[#FFB570] border border-white/10">
                        {product.tags[0]}
                      </span>
                    )}

                    {/* Rating badge */}
                    <div className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#0E0B1A]/80 backdrop-blur-md text-white border border-white/10">
                      <Star className="w-3 h-3 fill-[#FFB570] text-[#FFB570]" />
                      <span>{product.rating}</span>
                    </div>

                    <div className="absolute inset-x-3 bottom-3 hidden sm:flex items-center justify-center py-2 rounded-xl bg-white/20 backdrop-blur-md text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                      Customize Drink
                    </div>
                  </div>

                  {/* Title & Category */}
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#B79CED]">
                      {product.category}
                    </span>
                    <h3
                      onClick={() => setQuickViewProduct(product)}
                      className="font-display font-bold text-base sm:text-lg text-white mt-0.5 hover:text-[#B79CED] transition-colors cursor-pointer line-clamp-1"
                    >
                      {product.name}
                    </h3>
                    <p className="text-xs text-white/60 line-clamp-2 mt-1 leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Row */}
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-white/50 block font-mono">FROM</span>
                    <span className="font-mono text-base font-extrabold gradient-text-hero">
                      {formatPrice(product.price)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setQuickViewProduct(product)}
                      className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all border border-white/10"
                    >
                      Customize
                    </button>

                    <button
                      type="button"
                      onClick={() => addItem(product)}
                      aria-label={`Quick add ${product.name}`}
                      className="p-2 rounded-full gradient-hero text-[#0E0B1A] hover:scale-105 active:scale-95 transition-transform shadow-md"
                    >
                      <Plus className="w-4 h-4 stroke-[3]" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Sticky Mobile Bottom Bar showing Cart Total + View Cart Button */}
      {totalItems > 0 && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-4 inset-x-4 z-40 sm:hidden"
        >
          <div className="glass-pill p-3 rounded-2xl shadow-2xl border border-white/20 flex items-center justify-between">
            <div className="flex items-center gap-2.5 pl-1">
              <div className="p-2 rounded-xl gradient-hero text-[#0E0B1A]">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white">
                  {totalItems} {totalItems === 1 ? 'Item' : 'Items'}
                </p>
                <p className="font-mono font-bold text-sm text-[#FFB570]">{formatPrice(subtotal)}</p>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(true)}
              className="py-2.5 px-5 rounded-full gradient-hero text-[#0E0B1A] font-bold text-xs tracking-wide shadow-md"
            >
              View Cart
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};
