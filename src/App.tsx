import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import Lenis from 'lenis';

import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Preloader } from './components/Preloader';
import { QuickViewModal } from './components/QuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { Toast } from './components/Toast';
import { CustomCursor } from './components/CustomCursor';
import { ScrollToTop } from './components/ScrollToTop';

import { Home } from './pages/Home';
import { Menu } from './pages/Menu';
import { BuildDrink } from './pages/BuildDrink';
import { Story } from './pages/Story';
import { Visit } from './pages/Visit';

// Route Scroll-to-top handler
function ScrollToTopOnRoute() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

// Animated Page Wrapper for smooth route transitions
const PageTransitionWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="w-full flex-1 flex flex-col"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default function App() {
  // Smooth scroll with Lenis
  useEffect(() => {
    // Only enable if user has not requested reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let lenis: Lenis | null = null;
    try {
      lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 0.9,
      });

      let animationFrameId: number;
      const raf = (time: number) => {
        lenis?.raf(time);
        animationFrameId = requestAnimationFrame(raf);
      };
      animationFrameId = requestAnimationFrame(raf);

      return () => {
        cancelAnimationFrame(animationFrameId);
        lenis?.destroy();
      };
    } catch {
      // Fallback to native smooth scroll
    }
  }, []);

  return (
    <CartProvider>
      <BrowserRouter>
        <ScrollToTopOnRoute />
        <Preloader />
        <CustomCursor />

        <div className="min-h-screen flex flex-col bg-[#0E0B1A] text-[#FBF6EF] relative selection:bg-[#B79CED] selection:text-[#0E0B1A]">
          <Navbar />

          <main className="flex-1 flex flex-col">
            <PageTransitionWrapper>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/build" element={<BuildDrink />} />
                <Route path="/story" element={<Story />} />
                <Route path="/visit" element={<Visit />} />
                {/* Fallback route */}
                <Route path="*" element={<Home />} />
              </Routes>
            </PageTransitionWrapper>
          </main>

          <Footer />

          {/* Global Drawers & Modals */}
          <QuickViewModal />
          <CartDrawer />
          <Toast />
          <ScrollToTop />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}
