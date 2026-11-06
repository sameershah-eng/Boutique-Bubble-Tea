import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, MapPin, Phone, ArrowRight, Heart, Sparkles, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="relative bg-[#0A0713] border-t border-white/10 pt-16 sm:pt-20 pb-10 px-4 sm:px-6 lg:px-8 overflow-hidden text-[#FBF6EF]">
      {/* Background ambient light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-48 bg-gradient-to-b from-[#B79CED]/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-white/10">
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2 group">
              <span className="font-display font-black text-2xl tracking-[0.2em] text-white uppercase">
                HYDOR
              </span>
              <span className="w-2 h-2 rounded-full bg-[#FF8FB1] inline-block" />
            </Link>

            <p className="text-xs sm:text-sm text-white/65 leading-relaxed max-w-sm">
              Hand-shaken boutique teas, fresh warm pearls cooked every four hours, and uncompromised Taiwanese craftsmanship in the heart of East London.
            </p>

            <div className="pt-2 space-y-2 text-xs text-white/70">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#B79CED]" />
                <span>70 Commercial St, London E1 6LT</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#6FE3E1]" />
                <a href="tel:+442037125128" className="hover:text-white">
                  +44 20 3712 5128
                </a>
              </div>
            </div>
          </div>

          {/* Quick Navigation Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-widest text-[#B79CED]">
              Explore
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-white/75">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-white transition-colors">
                  Tea & Snack Menu
                </Link>
              </li>
              <li>
                <Link to="/build" className="hover:text-white transition-colors">
                  Build Your Drink
                </Link>
              </li>
              <li>
                <Link to="/story" className="hover:text-white transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/visit" className="hover:text-white transition-colors">
                  Find & Visit Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-widest text-[#FF8FB1]">
              Flavours
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-white/75">
              <li>
                <Link to="/menu" className="hover:text-white transition-colors">
                  Tiger Brown Sugar
                </Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-white transition-colors">
                  Ceremonial Matcha
                </Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-white transition-colors">
                  Taro Velvet Tea
                </Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-white transition-colors">
                  Sea Salt Cheese Foam
                </Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-white transition-colors">
                  Shoreditch Taiyaki
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Box (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-widest text-[#FFB570]">
              The Secret Menu Club
            </h4>
            <p className="text-xs text-white/65 leading-relaxed">
              Join 2,400+ East London tea enthusiasts. Get first dibs on seasonal drops and free secret topping upgrades.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-xl bg-[#9BD4A8]/15 border border-[#9BD4A8]/30 flex items-center gap-2 text-xs text-[#9BD4A8]">
                <Check className="w-4 h-4 stroke-[3]" />
                <span>You're on the list! Welcome to the club.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#B79CED]"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="px-4 py-2.5 rounded-xl gradient-hero text-[#0E0B1A] font-bold text-xs flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/hydor_uk_london"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors border border-white/10"
                aria-label="Follow HYDOR on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <span className="text-xs text-white/50 font-mono">@hydor_uk_london</span>
            </div>
          </div>
        </div>

        {/* Big HYDOR Giant Outline Wordmark */}
        <div className="py-10 text-center select-none overflow-hidden">
          <span
            className="text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] font-display font-black tracking-widest text-transparent block opacity-25 hover:opacity-40 transition-opacity"
            style={{
              WebkitTextStroke: '1.5px #B79CED',
            }}
          >
            HYDOR
          </span>
        </div>

        {/* Bottom Copyright & Legal */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/50">
          <p>© 2026 HYDOR LTD. All rights reserved. 70 Commercial St, London E1 6LT.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Allergens & Nutrition</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-[#FF8FB1]">
              Poured with <Heart className="w-3 h-3 fill-current inline" /> in Spitalfields
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
