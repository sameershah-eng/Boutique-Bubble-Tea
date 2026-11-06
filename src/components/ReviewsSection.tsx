import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, Quote, MessageCircle } from 'lucide-react';
import { REVIEWS } from '../data/products';

export const ReviewsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % REVIEWS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % REVIEWS.length);
  };

  const review = REVIEWS[currentIndex];

  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="relative rounded-[32px] sm:rounded-[40px] glass-card p-6 sm:p-12 lg:p-16 border border-white/10 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-1/4 w-80 h-80 rounded-full bg-[#FFB570]/10 blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-wider text-[#FFB570] font-semibold mb-2">
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Spitalfields Locals</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
            What East London <span className="font-serif-italic font-normal gradient-text-hero">is saying</span>.
          </h2>
          <div className="flex items-center justify-center gap-1 mt-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-[#FFB570] text-[#FFB570]" />
            ))}
            <span className="text-xs font-mono font-bold text-white ml-2">4.9 / 5.0 Average</span>
          </div>
        </div>

        {/* Animated Active Review Box */}
        <div className="max-w-3xl mx-auto relative min-h-[220px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="text-center space-y-5"
            >
              <div className="inline-block p-3 rounded-full bg-white/5 border border-white/10 text-[#B79CED]">
                <Quote className="w-6 h-6 stroke-[1.5]" />
              </div>

              <blockquote className="text-lg sm:text-2xl font-serif-italic text-[#FBF6EF] leading-relaxed">
                "{review.text}"
              </blockquote>

              <div>
                <p className="font-display font-bold text-base text-white">{review.name}</p>
                <div className="flex items-center justify-center gap-2 mt-1 text-xs font-mono text-white/50">
                  <span>{review.location}</span>
                  <span>•</span>
                  <span className="text-[#FF8FB1]">Favourite: {review.drink}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Dots and Arrows */}
        <div className="flex items-center justify-center gap-6 mt-10">
          <button
            onClick={handlePrev}
            aria-label="Previous review"
            className="p-2.5 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors border border-white/10"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex gap-2">
            {REVIEWS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to review ${idx + 1}`}
                className={`h-2 rounded-full transition-all ${
                  currentIndex === idx ? 'w-8 gradient-hero' : 'w-2 bg-white/20'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            aria-label="Next review"
            className="p-2.5 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors border border-white/10"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
