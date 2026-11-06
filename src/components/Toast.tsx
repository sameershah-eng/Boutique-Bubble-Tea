import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Trash2, Info, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Toast: React.FC = () => {
  const { toast, hideToast, setIsCartOpen } = useCart();

  return (
    <AnimatePresence>
      {toast.visible && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="fixed bottom-6 right-6 z-50 max-w-sm pointer-events-auto"
        >
          <div className="glass-pill px-4 py-3 rounded-2xl shadow-2xl border border-white/20 flex items-center gap-3 text-sm text-[#FBF6EF]">
            {toast.type === 'add' ? (
              <div className="p-1.5 rounded-full bg-[#9BD4A8]/20 text-[#9BD4A8]">
                <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
              </div>
            ) : toast.type === 'remove' ? (
              <div className="p-1.5 rounded-full bg-[#FF8FB1]/20 text-[#FF8FB1]">
                <Trash2 className="w-4 h-4" />
              </div>
            ) : (
              <div className="p-1.5 rounded-full bg-[#B79CED]/20 text-[#B79CED]">
                <Info className="w-4 h-4" />
              </div>
            )}

            <span className="flex-1 font-medium text-xs sm:text-sm text-white">{toast.message}</span>

            {toast.type === 'add' && (
              <button
                onClick={() => {
                  hideToast();
                  setIsCartOpen(true);
                }}
                className="text-xs font-mono font-semibold text-[#FFB570] hover:underline"
              >
                View
              </button>
            )}

            <button
              onClick={hideToast}
              aria-label="Dismiss notification"
              className="p-1 text-white/50 hover:text-white transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
