import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Clock, Navigation, CheckCircle2, Train } from 'lucide-react';

export const VisitUsSection: React.FC = () => {
  return (
    <section id="visit-section" className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="relative rounded-[32px] sm:rounded-[40px] glass-card p-6 sm:p-12 border border-white/10 overflow-hidden">
        {/* Glow */}
        <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-[#6FE3E1]/15 blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Details */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#9BD4A8]/15 border border-[#9BD4A8]/30 text-xs font-mono uppercase tracking-wider text-[#9BD4A8] font-semibold mb-2">
                <span className="w-2 h-2 rounded-full bg-[#9BD4A8] animate-pulse" />
                <span>Now Open • Spitalfields</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#FBF6EF] tracking-tight">
                Visit the <span className="font-serif-italic font-normal gradient-text-hero">Sanctuary</span>.
              </h2>
              <p className="mt-2 text-sm text-[#FBF6EF]/70 leading-relaxed">
                Step off busy Commercial Street into ambient warmth, the scent of freshly roasted oolong, and warm tapioca pearls.
              </p>
            </div>

            {/* Info Cards */}
            <div className="space-y-4 text-xs sm:text-sm text-white/80">
              {/* Address */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3.5">
                <div className="p-2 rounded-xl bg-[#B79CED]/20 text-[#B79CED] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Store Address</h4>
                  <p className="mt-0.5 text-white/80">70 Commercial St, London E1 6LT</p>
                  <p className="text-[11px] text-[#B79CED] font-mono mt-0.5">Opposite Old Spitalfields Market</p>
                </div>
              </div>

              {/* Transit & Stations */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3.5">
                <div className="p-2 rounded-xl bg-[#6FE3E1]/20 text-[#6FE3E1] shrink-0">
                  <Train className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Nearby Underground & Rail</h4>
                  <p className="mt-0.5 text-white/80">
                    Liverpool Street (5 min walk) • Shoreditch High St Overground (4 min) • Aldgate East (7 min)
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3.5">
                <div className="p-2 rounded-xl bg-[#FF8FB1]/20 text-[#FF8FB1] shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="w-full">
                  <h4 className="font-bold text-white text-sm mb-1.5">Brewing Hours</h4>
                  <div className="grid grid-cols-2 gap-y-1 text-xs text-white/70 font-mono">
                    <span>Monday – Thursday:</span>
                    <span className="text-white text-right">11:00 – 21:00</span>
                    <span>Friday – Saturday:</span>
                    <span className="text-[#9BD4A8] text-right font-semibold">11:00 – 22:00</span>
                    <span>Sunday:</span>
                    <span className="text-white text-right">12:00 – 20:00</span>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-[#FFB570]/20 text-[#FFB570]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-white/50 block font-mono">STORE TELEPHONE</span>
                    <a
                      href="tel:+442037125128"
                      className="font-bold text-white hover:text-[#B79CED] transition-colors"
                    >
                      +44 20 3712 5128
                    </a>
                  </div>
                </div>
                <a
                  href="tel:+442037125128"
                  className="px-3 py-1.5 rounded-full bg-white/10 text-white text-xs font-semibold hover:bg-white/20 transition-colors"
                >
                  Call Store
                </a>
              </div>
            </div>

            {/* Directions Action */}
            <div className="pt-2">
              <a
                href="https://maps.google.com/?q=70+Commercial+St,+London+E1+6LT"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-full gradient-hero text-[#0E0B1A] font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-[#FF8FB1]/20 hover:scale-[1.01] transition-transform"
              >
                <Navigation className="w-4 h-4" />
                <span>Open in Google Maps / Apple Maps</span>
              </a>
            </div>
          </div>

          {/* Right Embedded Map */}
          <div className="lg:col-span-7 h-[340px] sm:h-[460px] rounded-3xl overflow-hidden border border-white/15 relative shadow-2xl bg-[#1B1428]">
            <iframe
              title="HYDOR Store Location - 70 Commercial St London"
              src="https://www.google.com/maps?q=70+Commercial+St,+London+E1+6LT&output=embed"
              className="w-full h-full border-0 filter grayscale-[25%] contrast-[110%] invert-[90%] hue-rotate-180"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* Overlay card for map pointer */}
            <div className="absolute bottom-4 left-4 right-4 sm:right-auto px-4 py-3 rounded-2xl glass-pill border border-white/20 shadow-xl flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[#FF8FB1] animate-ping" />
              <div>
                <p className="font-display font-bold text-xs text-white">HYDOR Commercial St</p>
                <p className="text-[10px] text-white/60 font-mono">70 Commercial St, E1 6LT</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
