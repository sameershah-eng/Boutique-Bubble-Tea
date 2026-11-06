import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'motion/react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Star, Clock, Flame } from 'lucide-react';
import { handleImageError } from '../utils/imageFallback';

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tilt effect for desktop
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
    const mouseY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[100svh] w-full flex items-center justify-center pt-24 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#0E0B1A]"
    >
      {/* 3 Morphing Ambient Background Blobs (Taro, Lychee, Mango) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Blob 1: Taro */}
        <motion.div
          animate={{
            x: [0, 40, -30, 0],
            y: [0, -50, 20, 0],
            scale: [1, 1.15, 0.95, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 18,
            ease: 'easeInOut',
          }}
          className="absolute -top-20 -left-20 w-96 sm:w-[550px] h-96 sm:h-[550px] rounded-full bg-[#B79CED]/20 blur-[90px] sm:blur-[120px]"
        />

        {/* Blob 2: Lychee */}
        <motion.div
          animate={{
            x: [0, -60, 40, 0],
            y: [0, 40, -30, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 22,
            ease: 'easeInOut',
          }}
          className="absolute top-1/3 -right-20 w-96 sm:w-[500px] h-96 sm:h-[500px] rounded-full bg-[#FF8FB1]/15 blur-[90px] sm:blur-[120px]"
        />

        {/* Blob 3: Mango & Aqua Glow */}
        <motion.div
          animate={{
            x: [0, 50, -20, 0],
            y: [0, 30, -40, 0],
            scale: [0.95, 1.1, 1, 0.95],
          }}
          transition={{
            repeat: Infinity,
            duration: 25,
            ease: 'easeInOut',
          }}
          className="absolute -bottom-20 left-1/4 w-80 sm:w-[480px] h-80 sm:h-[480px] rounded-full bg-[#FFB570]/15 blur-[80px] sm:blur-[110px]"
        />

        {/* Subtle noise grain texture overlay */}
        <div className="absolute inset-0 bg-grain pointer-events-none" />
      </div>

      {/* Main Grid Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto">
        {/* Left Column: Typography & CTAs (7 cols desktop) */}
        <div className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start pt-2 sm:pt-4">
          {/* Boutique Tag */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md mb-4 sm:mb-6 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-[#6FE3E1] animate-pulse" />
            <span className="text-xs font-mono tracking-wider uppercase text-[#FBF6EF]/90 font-medium">
              70 Commercial St • Spitalfields, E1
            </span>
          </motion.div>

          {/* Staggered Giant Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.2rem] xl:text-[5.75rem] font-display font-extrabold tracking-[-0.04em] text-[#FBF6EF] leading-[1.02] max-w-2xl sm:max-w-3xl">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="block"
            >
              Bubble tea,
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="block"
            >
              <span className="font-serif-italic font-normal gradient-text-hero mr-2 sm:mr-3">
                poured
              </span>
              properly.
            </motion.span>
          </h1>

          {/* British, authentic witty subline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-4 sm:mt-6 text-sm sm:text-lg text-[#FBF6EF]/80 max-w-xl font-normal leading-relaxed"
          >
            Hand-shaken Taiwanese teas, warm tapioca cooked fresh every four hours, and real fruit you can actually taste. No artificial syrups. Now pouring on Commercial Street.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-7 sm:mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto"
          >
            <Link
              to="/menu"
              className="py-3.5 sm:py-4 px-8 rounded-full gradient-hero text-[#0E0B1A] font-bold text-sm sm:text-base tracking-wide flex items-center justify-center gap-2 shadow-xl shadow-[#FF8FB1]/25 hover:shadow-[#FF8FB1]/40 hover:scale-[1.02] active:scale-[0.98] transition-all animate-shimmer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Explore the Menu</span>
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </Link>

            <Link
              to="/build"
              className="py-3.5 sm:py-4 px-7 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-[#FBF6EF] font-semibold text-sm sm:text-base tracking-wide flex items-center justify-center gap-2 backdrop-blur-md hover:border-[#B79CED] transition-all"
            >
              <span>Build Your Own</span>
            </Link>
          </motion.div>

          {/* Quick Stats Pill Strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-[#FBF6EF]/70 font-mono"
          >
            <div className="flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 fill-[#FFB570] text-[#FFB570]" />
              <strong className="text-white">4.9 / 5</strong>
              <span>(680+ East London ratings)</span>
            </div>
            <span className="hidden sm:inline-block text-white/20">•</span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#6FE3E1]" />
              <span>Open till 10pm</span>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Floating 3D Drink Showcase (5 cols desktop) */}
        <div className="lg:col-span-5 flex justify-center items-center relative mt-4 lg:mt-0">
          <motion.div
            style={{
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative w-64 sm:w-80 md:w-96 aspect-[4/5] flex items-center justify-center"
          >
            {/* Ambient Background Aura */}
            <div className="absolute inset-0 rounded-[36px] bg-gradient-to-tr from-[#B79CED]/30 via-[#FF8FB1]/20 to-[#FFB570]/30 blur-2xl transform scale-95 pointer-events-none" />

            {/* Floating Drink Card with 3D Float animation */}
            <motion.div
              animate={{
                y: [-8, 8, -8],
              }}
              transition={{
                repeat: Infinity,
                duration: 6,
                ease: 'easeInOut',
              }}
              className="relative w-full h-full rounded-[32px] overflow-hidden p-2.5 glass-card shadow-2xl border border-white/20 group"
            >
              <div className="relative w-full h-full rounded-[24px] overflow-hidden bg-[#1B1428]">
                <img
                  src="https://images.unsplash.com/photo-1558857563-b37cf5ef1c78?auto=format&fit=crop&w=800&q=85"
                  alt="HYDOR Tiger Brown Sugar Milk Tea"
                  onError={(e) => handleImageError(e, 'Tiger Brown Sugar Milk', 'Signature')}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E0B1A]/80 via-transparent to-black/20" />

                {/* Floating Card Content */}
                <div className="absolute bottom-4 left-4 right-4 text-left">
                  <div className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-white/20 backdrop-blur-md text-white font-medium mb-1 border border-white/20">
                    Signature Drop
                  </div>
                  <h3 className="font-display font-bold text-lg sm:text-xl text-white">
                    Tiger Brown Sugar Milk
                  </h3>
                  <p className="text-[11px] sm:text-xs text-white/70 line-clamp-1">
                    Warm Okinawa caramel boba & creamy organic milk
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Floating Glass Badges */}
            {/* Badge 1: Fresh Pearls */}
            <motion.div
              animate={{ y: [-4, 5, -4] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut', delay: 0.5 }}
              className="absolute -top-3 -left-3 sm:-left-6 px-3.5 py-2 rounded-2xl glass-pill shadow-xl border border-white/20 flex items-center gap-2 text-xs text-white"
            >
              <div className="p-1 rounded-full bg-[#FF8FB1]/20 text-[#FF8FB1]">
                <Flame className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="font-bold text-[11px]">Fresh Pearls</p>
                <p className="text-[10px] text-white/60">Every 4 hrs</p>
              </div>
            </motion.div>

            {/* Badge 2: Google Rating */}
            <motion.div
              animate={{ y: [5, -5, 5] }}
              transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1 }}
              className="absolute -bottom-3 -right-2 sm:-right-5 px-3.5 py-2 rounded-2xl glass-pill shadow-xl border border-white/20 flex items-center gap-2 text-xs text-white"
            >
              <div className="p-1 rounded-full bg-[#FFB570]/20 text-[#FFB570]">
                <Star className="w-3.5 h-3.5 fill-[#FFB570]" />
              </div>
              <div>
                <p className="font-bold text-[11px]">4.9 ★ Rating</p>
                <p className="text-[10px] text-white/60">Commercial St, E1</p>
              </div>
            </motion.div>

            {/* Floating Radial Boba Spheres (Parallax Pearl circles) */}
            <motion.div
              animate={{ y: [-10, 10, -10], x: [-5, 5, -5] }}
              transition={{ repeat: Infinity, duration: 5.5, ease: 'easeInOut' }}
              className="absolute -top-6 right-8 w-6 h-6 rounded-full bg-gradient-to-tr from-[#1B1424] via-[#35254A] to-[#B79CED] shadow-lg border border-white/20 pointer-events-none"
            />
            <motion.div
              animate={{ y: [8, -8, 8], x: [4, -4, 4] }}
              transition={{ repeat: Infinity, duration: 6.2, ease: 'easeInOut', delay: 0.3 }}
              className="absolute bottom-16 -left-6 w-8 h-8 rounded-full bg-gradient-to-tr from-[#1B1424] via-[#4A2535] to-[#FF8FB1] shadow-lg border border-white/20 pointer-events-none"
            />
            <motion.div
              animate={{ y: [-6, 6, -6] }}
              transition={{ repeat: Infinity, duration: 4.8, ease: 'easeInOut', delay: 0.8 }}
              className="absolute top-1/2 -right-6 w-5 h-5 rounded-full bg-gradient-to-tr from-[#1B1424] via-[#254A4A] to-[#6FE3E1] shadow-lg border border-white/20 pointer-events-none"
            />
          </motion.div>
        </div>
      </div>

      {/* Animated Bottom Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-[11px] font-mono text-white/40 uppercase tracking-widest pointer-events-none"
      >
        <span>Scroll</span>
        <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="w-1.5 h-1.5 rounded-full bg-[#B79CED]"
          />
        </div>
      </motion.div>
    </section>
  );
};
