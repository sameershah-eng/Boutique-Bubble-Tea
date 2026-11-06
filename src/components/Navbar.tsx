import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Menu as MenuIcon, X, MapPin, Phone, Instagram, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface NavItem {
  name: string;
  path: string;
}

const NAV_ITEMS: NavItem[] = [
  { name: 'Home', path: '/' },
  { name: 'Menu', path: '/menu' },
  { name: 'Build Your Drink', path: '/build' },
  { name: 'Our Story', path: '/story' },
  { name: 'Visit Us', path: '/visit' },
];

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalItems, setIsCartOpen } = useCart();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartPopped, setCartPopped] = useState(false);

  // Trigger bounce animation when totalItems changes
  useEffect(() => {
    if (totalItems > 0) {
      setCartPopped(true);
      const timer = setTimeout(() => setCartPopped(false), 400);
      return () => clearTimeout(timer);
    }
  }, [totalItems]);

  // Track scroll position for floating pill & hide-on-scroll-down
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Scroll progress
      const totalScrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScrollable > 0) {
        setScrollProgress((currentScrollY / totalScrollable) * 100);
      }

      // Check scrolled past 40px
      if (currentScrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide navbar when scrolling down fast, show when scrolling up
      if (currentScrollY > 150 && currentScrollY > lastScrollY && !mobileMenuOpen) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{
          y: isVisible ? 0 : -100,
        }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-400 ease-out flex justify-center px-3 sm:px-6 pointer-events-none"
      >
        <div
          className={`pointer-events-auto w-full transition-all duration-400 ease-out ${
            isScrolled
              ? 'max-w-6xl mt-2 sm:mt-3 rounded-full glass-pill py-2.5 px-4 sm:px-6 shadow-2xl border border-white/10'
              : 'max-w-7xl pt-4 sm:pt-6 pb-3 px-2 sm:px-4 bg-transparent'
          } flex items-center justify-between relative`}
        >
          {/* Scroll progress bar along bottom of navbar when scrolled */}
          {isScrolled && (
            <div className="absolute bottom-0 left-6 right-6 h-[2px] bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full gradient-hero transition-all duration-100 ease-out"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>
          )}

          {/* Left: HYDOR Brand Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group focus:outline-none"
            aria-label="HYDOR Home"
          >
            <div className="relative flex items-center">
              <span className="font-display font-black text-2xl sm:text-2xl tracking-[0.2em] text-[#FBF6EF] uppercase group-hover:text-white transition-colors">
                HYDOR
              </span>
              <motion.span
                animate={{
                  scale: [1, 1.25, 1],
                  opacity: [0.9, 1, 0.9],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2.2,
                  ease: 'easeInOut',
                }}
                className="w-2 h-2 ml-1 rounded-full bg-gradient-to-tr from-[#6FE3E1] to-[#FF8FB1] inline-block shadow-[0_0_8px_rgba(255,143,177,0.8)]"
              />
            </div>
            <span className="hidden xl:inline-block text-[11px] font-mono text-[#FBF6EF]/50 uppercase tracking-widest pl-2 border-l border-white/15">
              London E1
            </span>
          </Link>

          {/* Center (desktop >= 1024px): Navigation links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="relative px-3.5 py-1.5 text-sm font-medium tracking-wide transition-colors group focus:outline-none"
                >
                  {/* Active Indicator Pill */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 rounded-full bg-white/10 border border-white/15 shadow-inner"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}

                  <span
                    className={`relative z-10 transition-colors ${
                      isActive ? 'text-[#FBF6EF] font-semibold' : 'text-[#FBF6EF]/75 group-hover:text-[#FBF6EF]'
                    }`}
                  >
                    {item.name}
                  </span>

                  {/* Gradient underline on hover */}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] gradient-hero group-hover:w-4/5 transition-all duration-300 rounded-full" />
                </Link>
              );
            })}
          </nav>

          {/* Right Action buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* "Order Now" / Menu CTA button */}
            <button
              onClick={() => navigate('/menu')}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide text-[#0E0B1A] gradient-hero shadow-lg shadow-[#FF8FB1]/20 hover:shadow-[#FF8FB1]/35 hover:scale-[1.02] active:scale-[0.98] transition-all animate-shimmer focus:outline-none"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Order Now</span>
            </button>

            {/* Cart Icon with Pop Badge */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="View Shopping Cart"
              className="relative p-2.5 rounded-full bg-white/10 hover:bg-white/15 text-[#FBF6EF] transition-all border border-white/10 focus:outline-none"
            >
              <ShoppingBag className="w-5 h-5 text-[#FBF6EF]" />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    key="cart-badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: cartPopped ? 1.3 : 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full gradient-hero text-[#0E0B1A] font-bold text-[10px] flex items-center justify-center shadow-md font-mono"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              className="lg:hidden p-2.5 rounded-full bg-white/10 hover:bg-white/15 text-[#FBF6EF] transition-all border border-white/10 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Full-Screen Overlay Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 lg:hidden flex flex-col justify-between bg-[#0E0B1A]/95 backdrop-blur-2xl px-6 pt-24 pb-8 overflow-y-auto"
          >
            {/* Background ambient blobs */}
            <div className="absolute top-1/4 -right-20 w-80 h-80 rounded-full bg-[#B79CED]/15 blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 -left-20 w-80 h-80 rounded-full bg-[#FF8FB1]/15 blur-3xl pointer-events-none" />

            {/* Nav Links */}
            <div className="relative z-10 flex flex-col gap-5 my-auto">
              {NAV_ITEMS.map((item, index) => {
                const isActive = location.pathname === item.path;
                return (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 * index, duration: 0.3 }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="group flex items-center justify-between py-2 text-3xl font-display font-bold tracking-tight text-[#FBF6EF] hover:text-white"
                    >
                      <span className={isActive ? 'gradient-text-hero' : ''}>
                        {item.name}
                      </span>
                      <span className="text-xs font-mono tracking-widest text-[#FBF6EF]/30 group-hover:text-[#B79CED] transition-colors">
                        0{index + 1}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}

              <div className="pt-4">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/menu');
                  }}
                  className="w-full py-3.5 rounded-full gradient-hero text-[#0E0B1A] font-bold text-base tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-[#FF8FB1]/20 active:scale-[0.98] transition-transform"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Order for Pickup</span>
                </button>
              </div>
            </div>

            {/* Bottom info: address, phone, instagram */}
            <div className="relative z-10 pt-6 border-t border-white/10 space-y-3 text-sm text-[#FBF6EF]/75">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#B79CED] shrink-0 mt-0.5" />
                <span>70 Commercial St, London E1 6LT (Spitalfields)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#FF8FB1] shrink-0" />
                <a
                  href="tel:+442037125128"
                  className="hover:text-white transition-colors underline-offset-4 hover:underline"
                >
                  +44 20 3712 5128
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Instagram className="w-4 h-4 text-[#6FE3E1] shrink-0" />
                <a
                  href="https://www.instagram.com/hydor_uk_london"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  @hydor_uk_london
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
