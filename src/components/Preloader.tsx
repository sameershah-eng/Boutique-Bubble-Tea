import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PreloaderProps {
  onComplete?: () => void;
  forceShow?: boolean;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete, forceShow = false }) => {
  const [shouldShow, setShouldShow] = useState<boolean>(() => {
    if (forceShow) return true;
    try {
      const visited = sessionStorage.getItem('hydor_intro_shown');
      return !visited;
    } catch {
      return true;
    }
  });

  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (!shouldShow) {
      if (onComplete) onComplete();
      return;
    }

    // Progress counter animation from 0 to 100 over ~1.8s
    const startTime = performance.now();
    const duration = 1800;

    let frameId: number;
    const updateProgress = (now: number) => {
      const elapsed = now - startTime;
      const pct = Math.min(Math.round((elapsed / duration) * 100), 100);
      setProgress(pct);

      if (elapsed < duration) {
        frameId = requestAnimationFrame(updateProgress);
      } else {
        // Mark session as visited
        try {
          sessionStorage.setItem('hydor_intro_shown', 'true');
        } catch {
          // ignore
        }
        // Brief pause at 100% then slide out
        setTimeout(() => {
          setIsFinished(true);
          setTimeout(() => {
            setShouldShow(false);
            if (onComplete) onComplete();
          }, 600);
        }, 300);
      }
    };

    frameId = requestAnimationFrame(updateProgress);

    return () => cancelAnimationFrame(frameId);
  }, [shouldShow, onComplete]);

  if (!shouldShow) return null;

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="hydor-preloader"
          initial={{ opacity: 1, y: 0 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0E0B1A] text-[#FBF6EF] select-none pointer-events-auto"
        >
          {/* Subtle background glow */}
          <div className="absolute w-72 h-72 rounded-full bg-[#B79CED]/15 blur-3xl pointer-events-none" />

          {/* Animated Cup & Boba Filling */}
          <div className="relative w-36 h-48 mb-8 flex items-center justify-center">
            <svg
              className="w-full h-full"
              viewBox="0 0 120 160"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="loaderLiquidGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#B79CED" />
                  <stop offset="50%" stop-color="#FF8FB1" />
                  <stop offset="100%" stop-color="#FFB570" />
                </linearGradient>

                {/* Cup clip path so liquid stays inside tapered cup */}
                <clipPath id="cupInteriorClip">
                  <path d="M26 40 L34 135 C35 143 41 148 50 148 L70 148 C79 148 85 143 86 135 L94 40 Z" />
                </clipPath>
              </defs>

              {/* Straw */}
              <motion.line
                x1="64"
                y1="10"
                x2="52"
                y2="70"
                stroke="#FFB570"
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              />

              {/* Cup Outline */}
              <motion.path
                d="M26 40 L34 135 C35 143 41 148 50 148 L70 148 C79 148 85 143 86 135 L94 40 Z"
                stroke="#FBF6EF"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.9, ease: 'easeInOut' }}
              />

              {/* Cup Rim */}
              <motion.path
                d="M20 40 L100 40"
                stroke="#FBF6EF"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              />

              {/* Liquid rising inside cup */}
              <g clipPath="url(#cupInteriorClip)">
                <motion.rect
                  x="20"
                  y="40"
                  width="80"
                  height="120"
                  fill="url(#loaderLiquidGradient)"
                  initial={{ y: 155 }}
                  animate={{ y: 155 - (progress / 100) * 115 }}
                  transition={{ duration: 0.1, ease: 'linear' }}
                />

                {/* Bouncing pearls */}
                {progress > 30 && (
                  <>
                    <motion.circle
                      cx="50"
                      cy="138"
                      r="4.5"
                      fill="#0E0B1A"
                      stroke="#FFB570"
                      strokeWidth="1"
                      initial={{ cy: 40, opacity: 0 }}
                      animate={{ cy: 138, opacity: 1 }}
                      transition={{ type: 'spring', bounce: 0.5, delay: 0.1 }}
                    />
                    <motion.circle
                      cx="64"
                      cy="140"
                      r="5"
                      fill="#0E0B1A"
                      stroke="#FF8FB1"
                      strokeWidth="1"
                      initial={{ cy: 40, opacity: 0 }}
                      animate={{ cy: 140, opacity: 1 }}
                      transition={{ type: 'spring', bounce: 0.5, delay: 0.2 }}
                    />
                    <motion.circle
                      cx="56"
                      cy="130"
                      r="4"
                      fill="#0E0B1A"
                      stroke="#B79CED"
                      strokeWidth="1"
                      initial={{ cy: 40, opacity: 0 }}
                      animate={{ cy: 130, opacity: 1 }}
                      transition={{ type: 'spring', bounce: 0.5, delay: 0.3 }}
                    />
                    <motion.circle
                      cx="70"
                      cy="134"
                      r="4.5"
                      fill="#0E0B1A"
                      stroke="#6FE3E1"
                      strokeWidth="1"
                      initial={{ cy: 40, opacity: 0 }}
                      animate={{ cy: 134, opacity: 1 }}
                      transition={{ type: 'spring', bounce: 0.5, delay: 0.35 }}
                    />
                    <motion.circle
                      cx="42"
                      cy="133"
                      r="4"
                      fill="#0E0B1A"
                      stroke="#FFB570"
                      strokeWidth="1"
                      initial={{ cy: 40, opacity: 0 }}
                      animate={{ cy: 133, opacity: 1 }}
                      transition={{ type: 'spring', bounce: 0.5, delay: 0.4 }}
                    />
                  </>
                )}
              </g>
            </svg>
          </div>

          {/* HYDOR Wordmark - Letter by Letter */}
          <div className="flex items-center space-x-2 text-2xl sm:text-3xl font-display font-extrabold tracking-[0.25em] text-[#FBF6EF] uppercase">
            {['H', 'Y', 'D', 'O', 'R'].map((letter, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
              >
                {letter}
              </motion.span>
            ))}
            <span className="w-2 h-2 rounded-full bg-[#FF8FB1] inline-block animate-pulse ml-1" />
          </div>

          <p className="mt-2 text-xs font-mono tracking-widest text-[#B79CED]/80 uppercase">
            Commercial St • London E1
          </p>

          {/* Percentage Counter */}
          <div className="mt-6 font-mono text-sm tracking-wider text-[#FFB570]">
            <span>{progress}</span>
            <span className="text-xs text-[#FBF6EF]/50">%</span>
          </div>

          {/* Micro progress line */}
          <div className="w-32 h-[2px] bg-white/10 rounded-full mt-2 overflow-hidden">
            <div
              className="h-full gradient-hero transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
