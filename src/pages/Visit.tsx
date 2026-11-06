import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Clock, Navigation, Instagram, Train, Bus, Car, ExternalLink, Sparkles } from 'lucide-react';

export const Visit: React.FC = () => {
  return (
    <div className="min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-[#FBF6EF]">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#9BD4A8]/15 border border-[#9BD4A8]/30 text-xs font-mono uppercase tracking-wider text-[#9BD4A8] font-semibold mb-3">
          <span className="w-2 h-2 rounded-full bg-[#9BD4A8] animate-pulse" />
          <span>Open Today in East London</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-[#FBF6EF] tracking-tight">
          Find Us in <span className="font-serif-italic font-normal gradient-text-hero">Spitalfields</span>.
        </h1>
        <p className="mt-3 text-sm sm:text-base text-[#FBF6EF]/75">
          Conveniently situated on Commercial Street, moments away from Old Spitalfields Market and Shoreditch High Street.
        </p>
      </div>

      {/* Main Grid: Info + Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Info Panel (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Address & Quick Links */}
          <div className="p-6 rounded-[28px] glass-card border border-white/10 space-y-4">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-2xl bg-[#B79CED]/20 text-[#B79CED] shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-[#B79CED] uppercase tracking-wider font-semibold">
                  Location
                </span>
                <h3 className="font-display font-bold text-lg text-white mt-0.5">
                  70 Commercial Street
                </h3>
                <p className="text-sm text-white/80">London E1 6LT, United Kingdom</p>
                <p className="text-xs text-white/50 mt-1">Directly opposite Old Spitalfields Market</p>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row gap-2">
              <a
                href="https://maps.google.com/?q=70+Commercial+St,+London+E1+6LT"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded-full gradient-hero text-[#0E0B1A] font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:scale-[1.01] transition-transform"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Google Maps</span>
              </a>
              <a
                href="https://citymapper.com/directions?endcoord=51.5194,-0.0754&endname=HYDOR"
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-full bg-white/10 text-white font-semibold text-xs flex items-center justify-center gap-1.5 border border-white/10 hover:bg-white/15 transition-colors"
              >
                <span>Citymapper</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-60" />
              </a>
            </div>
          </div>

          {/* Brewing Hours Card */}
          <div className="p-6 rounded-[28px] glass-card border border-white/10 space-y-3.5">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#FF8FB1]/20 text-[#FF8FB1]">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-[#FF8FB1] uppercase tracking-wider font-semibold">
                  Store Hours
                </span>
                <h3 className="font-display font-bold text-base text-white">Opening Schedule</h3>
              </div>
            </div>

            <div className="space-y-2 text-xs font-mono pt-1 text-white/80">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span>Monday – Thursday:</span>
                <span className="text-white font-semibold">11:00 – 21:00</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-[#9BD4A8]">Friday – Saturday (Late):</span>
                <span className="text-[#9BD4A8] font-bold">11:00 – 22:00</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Sunday:</span>
                <span className="text-white font-semibold">12:00 – 20:00</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white/5 text-[11px] text-white/60">
              Tapioca is brewed fresh at opening and refreshed every four hours until 30 minutes before closing.
            </div>
          </div>

          {/* Contact & Socials */}
          <div className="p-6 rounded-[28px] glass-card border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-[#6FE3E1]/20 text-[#6FE3E1]">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-white/50 block uppercase">Phone Line</span>
                  <a href="tel:+442037125128" className="text-sm font-bold text-white hover:text-[#B79CED]">
                    +44 20 3712 5128
                  </a>
                </div>
              </div>
              <a
                href="tel:+442037125128"
                className="px-3 py-1.5 rounded-full bg-white/10 text-white text-xs font-semibold hover:bg-white/20 transition-colors"
              >
                Call Now
              </a>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-[#FFB570]/20 text-[#FFB570]">
                  <Instagram className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-white/50 block uppercase">Instagram DM</span>
                  <a
                    href="https://www.instagram.com/hydor_uk_london"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-bold text-white hover:text-[#B79CED]"
                  >
                    @hydor_uk_london
                  </a>
                </div>
              </div>
              <a
                href="https://www.instagram.com/hydor_uk_london"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-full bg-white/10 text-white text-xs font-semibold hover:bg-white/20 transition-colors"
              >
                Visit Profile
              </a>
            </div>
          </div>
        </div>

        {/* Right Embedded Interactive Map & Transport Guide (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Google Map Box */}
          <div className="h-[380px] sm:h-[480px] rounded-[32px] overflow-hidden border border-white/15 relative shadow-2xl bg-[#1B1428]">
            <iframe
              title="HYDOR Store Map - 70 Commercial St"
              src="https://www.google.com/maps?q=70+Commercial+St,+London+E1+6LT&output=embed"
              className="w-full h-full border-0 filter grayscale-[25%] contrast-[110%] invert-[90%] hue-rotate-180"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full glass-pill border border-white/20 text-xs font-mono text-white shadow-lg flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF8FB1] animate-ping" />
              <span>HYDOR Boutique London</span>
            </div>
          </div>

          {/* Transport Guide */}
          <div className="p-6 rounded-[28px] glass-card border border-white/10 space-y-4">
            <h3 className="font-display font-bold text-base text-white flex items-center gap-2">
              <Train className="w-4 h-4 text-[#B79CED]" />
              <span>Getting Here via London Transit</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-white/80">
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                <span className="font-bold text-white block">Liverpool Street</span>
                <p className="text-[11px] text-white/60">Central, Elizabeth, Circle, Hammersmith & City, Overground</p>
                <span className="text-[10px] font-mono text-[#6FE3E1] block pt-1">5 MIN WALK (0.3 mi)</span>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                <span className="font-bold text-white block">Shoreditch High St</span>
                <p className="text-[11px] text-white/60">London Overground (Windrush Line)</p>
                <span className="text-[10px] font-mono text-[#6FE3E1] block pt-1">4 MIN WALK (0.2 mi)</span>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                <span className="font-bold text-white block">Aldgate East</span>
                <p className="text-[11px] text-white/60">District, Hammersmith & City Lines</p>
                <span className="text-[10px] font-mono text-[#6FE3E1] block pt-1">7 MIN WALK (0.4 mi)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
