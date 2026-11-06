import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Star, Plus, ArrowRight, Sparkles } from 'lucide-react';
import { PRODUCTS, formatPrice } from '../data/products';
import { useCart } from '../context/CartContext';
import { handleImageError } from '../utils/imageFallback';

export const BestSellersSection: React.FC = () => {
  const { setQuickViewProduct, addItem } = useCart();

  // Filter 8 top best-sellers & favorites
  const bestSellers = PRODUCTS.filter((p) => p.isPopular || p.tags.includes('Best Seller')).slice(0, 8);

  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-14">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-wider text-[#FF8FB1] uppercase font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>East London's Most Ordered</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-[#FBF6EF]">
            The House <span className="font-serif-italic font-normal gradient-text-hero">Favourites</span>.
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#FBF6EF]/70 max-w-lg">
            Pearls cooked every 4 hours, slow-steeped loose leaves, and fresh dairy or plant milk.
          </p>
        </div>

        <Link
          to="/menu"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#B79CED] hover:text-white transition-colors group self-start sm:self-auto"
        >
          <span>View All 20+ Creations</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Product Cards Container: Horizontal Snap-Scroll on Mobile, 4-Col Grid on Desktop */}
      <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 overflow-x-auto sm:overflow-visible pb-4 sm:pb-0 snap-x snap-mandatory no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
        {bestSellers.map((product, idx) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            className="w-[280px] sm:w-auto shrink-0 snap-center rounded-[28px] glass-card glass-card-hover p-3.5 sm:p-4 flex flex-col justify-between group"
          >
            <div>
              {/* Product Image Box */}
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
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E0B1A]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Tag pill */}
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

                {/* Quick customize overlay prompt on desktop hover */}
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

            {/* Bottom Row: Price & Add to Cart */}
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-white/50 block font-mono">FROM</span>
                <span className="font-mono text-base font-extrabold gradient-text-hero">
                  {formatPrice(product.price)}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setQuickViewProduct(product)}
                  className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all border border-white/10 flex items-center gap-1"
                >
                  <span className="hidden sm:inline">Customize</span>
                  <Plus className="w-4 h-4 sm:hidden" />
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
      </div>
    </section>
  );
};
