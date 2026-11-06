import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Droplets, Leaf, Flame, Heart } from 'lucide-react';
import { handleImageError } from '../utils/imageFallback';

export const Story: React.FC = () => {
  return (
    <div className="min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-[#FBF6EF]">
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-wider text-[#FF8FB1] font-semibold mb-3">
          <Droplets className="w-3.5 h-3.5" />
          <span>The Hydor Philosophy</span>
        </div>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-black tracking-tight leading-[1.05]">
          A rebellion against <br />
          <span className="font-serif-italic font-normal gradient-text-hero">powdered mediocrity</span>.
        </h1>
        <p className="mt-4 text-sm sm:text-lg text-[#FBF6EF]/75 font-normal max-w-xl mx-auto leading-relaxed">
          How two tea geeks built a sanctuary on Commercial Street dedicated to slow leaves, warm tapioca, and real fruit.
        </p>
      </div>

      {/* Large Featured Editorial Image */}
      <div className="relative rounded-[32px] sm:rounded-[40px] overflow-hidden aspect-[16/9] mb-14 border border-white/15 shadow-2xl bg-[#1B1428]">
        <img
          src="https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&w=1400&q=85"
          alt="HYDOR tea ceremony in London"
          onError={(e) => handleImageError(e, 'HYDOR Story', 'Editorial')}
          className="w-full h-full object-cover filter brightness-[0.9]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E0B1A]/80 via-transparent to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs font-mono text-white/80">
          <span>SPITALFIELDS, LONDON E1</span>
          <span className="text-[#FFB570]">FIRST HARVEST MATCHA & OOLONG</span>
        </div>
      </div>

      {/* Editorial Body Articles */}
      <div className="space-y-12 sm:space-y-16 text-sm sm:text-base leading-relaxed text-white/80 font-normal max-w-3xl mx-auto">
        {/* Paragraph 1 */}
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
            1. Why "Hydor"?
          </h2>
          <p>
            In ancient Greek, <strong className="text-white">Hydor (ὕδωρ)</strong> is the primordial element: water. It holds no rigid shape of its own; it reflects whatever light shines through it, and it gives life to everything it touches.
          </p>
          <p>
            When bubble tea migrated to London fifteen years ago, something got lost in translation. Tea bags were replaced with shelf-stable chemical concentrates, artificial food colouring replaced crushed berries, and cassava was reduced to rubbery black pellets steeped in glucose syrup.
          </p>
        </div>

        {/* Pull Quote */}
        <div className="py-8 px-6 sm:px-10 rounded-3xl bg-white/5 border-l-4 border-[#B79CED] my-8">
          <blockquote className="text-xl sm:text-3xl font-serif-italic text-[#FBF6EF] leading-relaxed">
            "A tapioca pearl should yield like velvet on your tongue, then push back with quiet, chewy resilience. If it feels like silicone, throw it away."
          </blockquote>
          <p className="mt-3 text-xs font-mono text-[#B79CED] uppercase tracking-wider">
            — Head Brewer & Founder, HYDOR London
          </p>
        </div>

        {/* Paragraph 2: The 4-Hour Rule */}
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
            2. The Non-Negotiable Four-Hour Pot
          </h2>
          <p>
            Every single batch of our grade-A cassava pearls is cooked in cast-iron pots in our kitchen on Commercial Street. We simmer them for 45 minutes, braise them in dark Okinawa Muscovado sugar for another 35, and keep them in a thermal bath at exactly 52°C.
          </p>
          <p>
            At the 4-hour mark, whatever remains in that pot is discarded. We would rather lose a few pounds than hand you a cup of gummy boba. That is why when you hold a Hydor cup, the bottom is warmly reassuring while the tea above is iced and frosty.
          </p>
        </div>

        {/* Second Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
          <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-[#1B1428] border border-white/10">
            <img
              src="https://images.unsplash.com/photo-1558857563-b37cf5ef1c78?auto=format&fit=crop&w=800&q=80"
              alt="Brown sugar boba preparation"
              onError={(e) => handleImageError(e, 'Molten Boba', 'Craft')}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-[#1B1428] border border-white/10">
            <img
              src="https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=800&q=80"
              alt="Fresh strawberry teas"
              onError={(e) => handleImageError(e, 'Real Fruit', 'Craft')}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Paragraph 3: Shoreditch & Plant Milk */}
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
            3. Spitalfields Home & Zero Plant-Milk Surcharges
          </h2>
          <p>
            We chose 70 Commercial Street because East London understands craft. Our neighbors are independent coffee roasters, vintage bookstores, and street market stallholders who take immense pride in what they hand you.
          </p>
          <p>
            And we made a vow on day one: we will never charge Londoners a "vegan tax" or a 60p surcharge for Minor Figures oat milk or silken soy milk. Great tea belongs to everyone.
          </p>
        </div>

        {/* Bottom CTA Box */}
        <div className="mt-12 p-8 rounded-3xl glass-card text-center space-y-4 border border-white/10">
          <h3 className="text-2xl font-display font-bold text-white">
            Taste what we mean today.
          </h3>
          <p className="text-xs sm:text-sm text-white/70 max-w-md mx-auto">
            We are pouring right now at 70 Commercial Street, London E1 6LT.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Link
              to="/menu"
              className="py-3 px-6 rounded-full gradient-hero text-[#0E0B1A] font-bold text-xs tracking-wide shadow-md hover:scale-105 transition-transform"
            >
              Order Online for Pickup
            </Link>
            <Link
              to="/visit"
              className="py-3 px-6 rounded-full bg-white/10 text-white font-semibold text-xs border border-white/10 hover:bg-white/15 transition-colors"
            >
              Directions & Hours
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
