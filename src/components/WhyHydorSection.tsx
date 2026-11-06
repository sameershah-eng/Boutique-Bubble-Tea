import React from 'react';
import { motion } from 'motion/react';
import { Flame, Citrus, Sliders, Milk } from 'lucide-react';

const FEATURES = [
  {
    icon: Flame,
    color: '#FF8FB1',
    title: 'Pearls Every 4 Hours',
    subtitle: 'Warm & bouncy, never slimy.',
    description:
      "We slow-simmer raw grade-A cassava pearls in authentic Okinawa black sugar and dump any batch older than 4 hours. Because we're fussy like that.",
  },
  {
    icon: Citrus,
    color: '#FFB570',
    title: 'Fruit You Can Taste',
    subtitle: 'Real purées, zero chemical squirts.',
    description:
      'We hand-press Alfonso mangoes, British strawberries, and organic passion fruit every morning. Real seeds, real pulp, real tartness.',
  },
  {
    icon: Sliders,
    color: '#6FE3E1',
    title: 'Sugar Under Your Control',
    subtitle: 'From 0% zero-sugar to 100%.',
    description:
      'Our loose-leaf teas are so fragrant and smooth that most Londoners drink them at 25% or 50% sweetness. No toothache in a cup.',
  },
  {
    icon: Milk,
    color: '#9BD4A8',
    title: 'Free Plant-Based Milks',
    subtitle: 'No £0.60 oat milk penalty.',
    description:
      'Minor Figures British oat milk, silken soy, and pure coconut milk are always swapped at zero extra pence. It should have been like this anyway.',
  },
];

export const WhyHydorSection: React.FC = () => {
  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background glow accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#B79CED]/10 blur-[120px] pointer-events-none" />

      {/* Heading */}
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <span className="text-xs font-mono uppercase tracking-widest text-[#B79CED] font-semibold">
          The Craft of Hydor
        </span>
        <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-[#FBF6EF] mt-2 tracking-tight">
          Why your first sip <span className="font-serif-italic font-normal gradient-text-hero">ruins</span> all other boba.
        </h2>
        <p className="mt-3 text-sm sm:text-base text-[#FBF6EF]/70">
          Most shops use powders, syrups that sit in tubs for 6 months, and pearls that turn rock-hard after 20 minutes. Here is how we do things in Spitalfields.
        </p>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        {FEATURES.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 rounded-[28px] glass-card glass-card-hover flex flex-col justify-between border border-white/10"
            >
              <div>
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: `${item.color}20`, color: item.color }}
                >
                  <Icon className="w-6 h-6 stroke-[2]" />
                </div>

                <h3 className="font-display font-bold text-lg sm:text-xl text-white">
                  {item.title}
                </h3>
                <p className="text-xs font-mono text-[#B79CED] mt-1 mb-3">
                  {item.subtitle}
                </p>
                <p className="text-xs sm:text-sm text-white/65 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-white/40">
                <span>STANDARD 0{idx + 1}</span>
                <span className="text-[#9BD4A8]">VERIFIED</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
