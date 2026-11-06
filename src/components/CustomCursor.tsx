import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch-only device or small screen
    if (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 1024) {
      setIsTouchDevice(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check if hovering interactive element
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.closest('button') ||
          target.closest('a') ||
          target.closest('input') ||
          target.closest('select') ||
          target.hasAttribute('data-cursor-hover'))
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[999] overflow-hidden">
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#FF8FB1] -translate-x-1/2 -translate-y-1/2 shadow-[0_0_8px_#FF8FB1]"
        animate={{
          x: position.x,
          y: position.y,
          scale: isHovered ? 0 : 1,
        }}
        transition={{ type: 'spring', damping: 45, stiffness: 450, mass: 0.1 }}
      />

      {/* Trailing Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-[#B79CED]/80 -translate-x-1/2 -translate-y-1/2"
        animate={{
          x: position.x,
          y: position.y,
          width: isHovered ? 48 : 28,
          height: isHovered ? 48 : 28,
          backgroundColor: isHovered ? 'rgba(183, 156, 237, 0.18)' : 'transparent',
          borderColor: isHovered ? '#6FE3E1' : 'rgba(183, 156, 237, 0.6)',
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 260, mass: 0.3 }}
      />
    </div>
  );
};
