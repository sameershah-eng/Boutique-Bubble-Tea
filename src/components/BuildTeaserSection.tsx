import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Check } from 'lucide-react';

export const BuildTeaserSection: React.FC = () => {
  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="relative rounded-[32px] sm:rounded-[40px] overflow-hidden glass-card p-6 sm:p-12 lg:p-16 border border-white/15">
        {/* Background gradient swirls */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#B79CED]/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#FF8FB1]/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B79CED]/15 border border-[#B79CED]/30 text-xs font-mono text-[#B79CED] uppercase font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Customizer</span>
            </span>

            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-[#FBF6EF] tracking-tight leading-[1.08]">
              Design your cup, <br />
              <span className="font-serif-italic font-normal gradient-text-hero">pearl by pearl</span>.
            </h2>

            <p className="text-sm sm:text-base text-[#FBF6EF]/75 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Step into the Hydor drink builder. Choose your loose-leaf tea base, pick dairy or oat milk, dial in sweetness to the exact percent, and pile on slow-simmered toppings. Watch your cup fill up in real time.
            </p>

            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-white/80 pt-2 max-w-md mx-auto lg:mx-0">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#9BD4A8]/20 text-[#9BD4A8] flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span>5 Signature loose leaf bases</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#9BD4A8]/20 text-[#9BD4A8] flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span>Plant milks always zero extra pence</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#9BD4A8]/20 text-[#9BD4A8] flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span>7 Handcrafted boba toppings</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#9BD4A8]/20 text-[#9BD4A8] flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span>Live dynamic SVG cup preview</span>
              </div>
            </div>

            <div className="pt-4 flex justify-center lg:justify-start">
              <Link
                to="/build"
                className="py-4 px-8 rounded-full gradient-hero text-[#0E0B1A] font-bold text-sm sm:text-base tracking-wide flex items-center gap-2 shadow-xl shadow-[#FF8FB1]/20 hover:scale-[1.02] active:scale-[0.98] transition-all animate-shimmer"
              >
                <span>Launch Drink Builder</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Visual interactive mini preview */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="w-full max-w-sm rounded-3xl p-6 bg-[#0E0B1A]/80 border border-white/10 shadow-2xl flex flex-col items-center"
            >
              <div className="w-full flex items-center justify-between text-xs font-mono text-white/50 pb-3 border-b border-white/10 mb-4">
                <span>SIMULATOR</span>
                <span className="text-[#6FE3E1]">LIVE ENGINE</span>
              </div>

              {/* Graphic Cup Preview */}
              <div className="relative w-40 h-52 flex items-center justify-center my-2">
                <svg className="w-full h-full" viewBox="0 0 120 160" fill="none">
                  <defs>
                    <linearGradient id="teaserTeaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#B79CED" />
                      <stop offset="100%" stopColor="#FF8FB1" />
                    </linearGradient>
                    <clipPath id="teaserCupClip">
                      <path d="M26 35 L34 135 C35 143 41 148 50 148 L70 148 C79 148 85 143 86 135 L94 35 Z" />
                    </clipPath>
                  </defs>

                  {/* Straw */}
                  <line x1="68" y1="8" x2="55" y2="65" stroke="#FFB570" strokeWidth="4.5" strokeLinecap="round" />

                  {/* Cup glass */}
                  <path
                    d="M26 35 L34 135 C35 143 41 148 50 148 L70 148 C79 148 85 143 86 135 L94 35 Z"
                    stroke="#FBF6EF"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path d="M22 35 L98 35" stroke="#FBF6EF" strokeWidth="3" strokeLinecap="round" />

                  {/* Filled tea */}
                  <g clipPath="url(#teaserCupClip)">
                    <rect x="20" y="45" width="80" height="110" fill="url(#teaserTeaGrad)" />
                    {/* Tapioca layer */}
                    <circle cx="50" cy="138" r="4.5" fill="#0E0B1A" />
                    <circle cx="65" cy="140" r="5" fill="#0E0B1A" />
                    <circle cx="58" cy="130" r="4.5" fill="#0E0B1A" />
                    <circle cx="72" cy="134" r="4" fill="#0E0B1A" />
                    <circle cx="42" cy="134" r="4.5" fill="#0E0B1A" />
                    {/* Cheese foam cap */}
                    <rect x="20" y="45" width="80" height="20" fill="#FFF6D6" opacity="0.9" />
                  </g>
                </svg>
              </div>

              <div className="w-full mt-4 text-center">
                <span className="text-xs font-mono text-[#FFB570]">Custom Taro & Cheese Cloud</span>
                <p className="text-[11px] text-white/50 mt-0.5">Oat Milk • 25% Sweetness • Less Ice</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
