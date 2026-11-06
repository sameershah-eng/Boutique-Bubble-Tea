import React from 'react';
import { motion } from 'motion/react';

const FLAVOURS = [
  'BROWN SUGAR',
  'TARO ROOT',
  'CEREMONIAL MATCHA',
  'ALFONSO MANGO',
  'LYCHEE ROSE',
  'WHITE PEACH',
  'FOUR SEASONS OOLONG',
  'SEA SALT CHEESE FOAM',
  'ORGANIC TAPIOCA',
];

export const MarqueeSection: React.FC = () => {
  return (
    <div className="relative w-full py-6 sm:py-8 bg-[#0E0B1A] border-y border-white/10 overflow-hidden select-none">
      {/* Soft gradient edge fade */}
      <div className="absolute top-0 bottom-0 left-0 w-20 sm:w-40 bg-gradient-to-r from-[#0E0B1A] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-20 sm:w-40 bg-gradient-to-l from-[#0E0B1A] to-transparent z-10 pointer-events-none" />

      <div className="flex w-max">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
          className="flex items-center gap-6 sm:gap-10 whitespace-nowrap text-3xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight uppercase"
        >
          {[...FLAVOURS, ...FLAVOURS, ...FLAVOURS].map((flavour, idx) => (
            <div key={idx} className="flex items-center gap-6 sm:gap-10">
              <span className="text-transparent transition-colors hover:text-white" style={{ WebkitTextStroke: '1px rgba(251, 246, 239, 0.4)' }}>
                {flavour}
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#FF8FB1] to-[#FFB570] inline-block" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
