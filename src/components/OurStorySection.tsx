import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Droplets, HeartHandshake } from 'lucide-react';
import { handleImageError } from '../utils/imageFallback';

export const OurStorySection: React.FC = () => {
  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        {/* Left Column: Overlapping boutique images */}
        <div className="lg:col-span-6 relative">
          <div className="relative mx-auto max-w-md sm:max-w-none">
            {/* Main Primary Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative w-4/5 aspect-[4/5] rounded-[32px] overflow-hidden glass-card border border-white/20 p-2 shadow-2xl z-10"
            >
              <div className="w-full h-full rounded-[24px] overflow-hidden bg-[#1B1428]">
                <img
                  src="https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&w=800&q=80"
                  alt="HYDOR tea craftsmanship in London"
                  loading="lazy"
                  onError={(e) => handleImageError(e, 'HYDOR Craftsmanship', 'Our Story')}
                  className="w-full h-full object-cover filter brightness-[0.95]"
                />
              </div>
            </motion.div>

            {/* Overlapping Secondary Image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="absolute -bottom-6 -right-2 sm:right-4 w-3/5 aspect-square rounded-[28px] overflow-hidden glass-card border border-white/20 p-2 shadow-2xl z-20"
            >
              <div className="w-full h-full rounded-[20px] overflow-hidden bg-[#1B1428]">
                <img
                  src="https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=800&q=80"
                  alt="Real fresh fruit and hand-shaken teas"
                  loading="lazy"
                  onError={(e) => handleImageError(e, 'Fresh Fruit Shaken Tea', 'Craft')}
                  className="w-full h-full object-cover filter brightness-[0.95]"
                />
              </div>
            </motion.div>

            {/* Floating Glass Stamp */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', damping: 15, delay: 0.4 }}
              className="absolute top-6 right-8 z-30 px-4 py-2 rounded-2xl glass-pill border border-white/20 shadow-xl flex items-center gap-2"
            >
              <Droplets className="w-4 h-4 text-[#6FE3E1]" />
              <span className="text-xs font-mono font-bold text-white tracking-wider">
                HYDOR = WATER
              </span>
            </motion.div>
          </div>
        </div>

        {/* Right Column: Editorial Brand Copy */}
        <div className="lg:col-span-6 space-y-6 text-center lg:text-left mt-8 lg:mt-0">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-wider text-[#FF8FB1] font-semibold">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Spitalfields • Est. 2024</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-[#FBF6EF] tracking-tight leading-[1.08]">
            Born from water. <br />
            <span className="font-serif-italic font-normal gradient-text-hero">Poured with obsession</span>.
          </h2>

          <p className="text-sm sm:text-base text-[#FBF6EF]/75 leading-relaxed">
            In ancient Greek, <strong className="text-white font-medium">Hydor (ὕδωρ)</strong> means the source of all life: water. In modern East London, it means the purest loose-leaf tea infusions, filtered alkaline water, and raw tapioca cooked in small pots every four hours.
          </p>

          <p className="text-sm sm:text-base text-[#FBF6EF]/75 leading-relaxed">
            We opened at 70 Commercial Street right between Shoreditch and Spitalfields Market because we were tired of syrupy boba that left you sluggish. Here, every cup is shaken by hand, the oat milk is never taxed, and the tea aroma hits you the moment you push through the doors.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <Link
              to="/story"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-[#B79CED] transition-colors group"
            >
              <span>Read the Full Hydor Journal</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <span className="hidden sm:inline-block text-white/20">|</span>

            <span className="text-xs font-mono text-white/50">
              Commercial St, London E1 6LT
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
