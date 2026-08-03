import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, Tag, Clock, ShieldCheck } from 'lucide-react';

export const LimitedTimeOfferModal: React.FC<{
  isOpen?: boolean;
  onClose?: () => void;
}> = ({ isOpen: controlledIsOpen, onClose: controlledOnClose }) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const triggerButtonRef = useRef<HTMLElement | null>(null);

  const isControlled = typeof controlledIsOpen === 'boolean';
  // If controlledIsOpen is true, show modal. Otherwise fallback to internal state.
  const isOpen = isControlled ? (controlledIsOpen || internalIsOpen) : internalIsOpen;

  useEffect(() => {
    // Check session storage for auto popup on page load
    const hasSeenModal = sessionStorage.getItem('hasSeenLimitedOfferModal');
    if (!hasSeenModal) {
      const timer = setTimeout(() => {
        triggerButtonRef.current = document.activeElement as HTMLElement;
        setInternalIsOpen(true);
        sessionStorage.setItem('hasSeenLimitedOfferModal', 'true');
      }, 3000); // 3 seconds on page load

      return () => clearTimeout(timer);
    }
  }, []);

  // Handle Close & Focus Restoring
  const handleClose = () => {
    setInternalIsOpen(false);
    if (controlledOnClose) {
      controlledOnClose();
    }
    if (triggerButtonRef.current) {
      triggerButtonRef.current.focus();
    }
  };

  // Keyboard accessibility (Escape key & Focus trap)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        handleClose();
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement?.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement?.focus();
            e.preventDefault();
          }
        }
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          {/* Overlay with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
            className="fixed inset-0 bg-primary-950/80 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative z-10 w-full max-w-md bg-slate-900/95 border border-white/20 rounded-3xl p-6 md:p-8 shadow-2xl overflow-hidden"
          >
            {/* Background Glow Accents matching website theme */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-secondary-500/20 rounded-full blur-3xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={handleClose}
              aria-label="Close offer modal"
              className="absolute top-4 right-4 p-2 text-white/60 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-accent-400"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content */}
            <div className="text-center pt-2">
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 bg-amber-400/20 border border-amber-400/50 text-amber-300 text-xs font-bold px-3.5 py-1.5 rounded-full mb-4">
                <Tag className="w-3.5 h-3.5 text-amber-400" />
                Limited Time Offer
              </div>

              <h2 id="modal-title" className="text-2xl md:text-3xl font-extrabold text-white mb-2">
                🚘 Need a Rental Car?
              </h2>

              <p className="text-xl font-extrabold text-amber-400 mb-3 tracking-wide drop-shadow-sm">
                Get the Best Price Guaranteed!
              </p>

              <div id="modal-description" className="space-y-2 mb-6">
                <p className="text-sm text-blue-100/90 leading-relaxed font-medium">
                  📞 <span className="font-semibold text-white">Call Now & Save up to 20%</span> on your booking.
                </p>
                <p className="text-xs text-white/60 flex items-center justify-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-secondary-400" />
                  Available 24/7 across the USA.
                </p>
              </div>

              {/* Call Now Button */}
              <a
                href="tel:+18663815675"
                className="relative inline-flex items-center justify-center gap-2.5 w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-lg py-4 px-6 rounded-2xl shadow-lg shadow-emerald-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-emerald-400 animate-pulse hover:animate-none"
              >
                <Phone className="w-5 h-5 fill-current" />
                <span>Call Now +18663815675</span>
              </a>

              <div className="mt-4 flex items-center justify-center gap-1 text-[11px] text-white/50">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                No obligations · Instant reservation support
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LimitedTimeOfferModal;
