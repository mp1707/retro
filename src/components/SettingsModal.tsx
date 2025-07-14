"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { FontSizeToggle } from "./FontSizeToggle";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle ESC key press
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  // Handle click outside modal
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  // Focus management
  useEffect(() => {
    if (isOpen && modalRef.current) {
      const firstFocusableElement = modalRef.current.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) as HTMLElement;
      firstFocusableElement?.focus();
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40 pixelated"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleBackdropClick}
          />
          
          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pixelated"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ 
              type: "spring", 
              stiffness: 400, 
              damping: 30,
              duration: window.matchMedia("(max-width: 640px)").matches ? 0.3 : 0.4
            }}
          >
            <div
              ref={modalRef}
              className="bg-base-100 border-gradient-primary w-full max-w-sm sm:max-w-md md:max-w-lg p-4 sm:p-6 md:p-8 pixelated"
              role="dialog"
              aria-modal="true"
              aria-labelledby="settings-title"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-6 sm:mb-8">
                <h2 
                  id="settings-title"
                  className="text-gradient-primary text-lg sm:text-xl md:text-2xl uppercase tracking-wider pixelated"
                >
                  Settings
                </h2>
                <motion.button
                  onClick={onClose}
                  className="btn bg-transparent border-2 border-base-300 text-base-content hover:border-base-content p-2 text-xs sm:text-sm min-h-[44px] min-w-[44px] flex items-center justify-center pixelated"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label="Close settings"
                >
                  <span className="text-lg leading-none">×</span>
                </motion.button>
              </div>

              {/* Settings Content */}
              <div className="space-y-6 sm:space-y-8">
                {/* Font Size Setting */}
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-base-content text-sm sm:text-base uppercase tracking-wider pixelated">
                    Font Size
                  </h3>
                  <div className="flex justify-start">
                    <FontSizeToggle />
                  </div>
                </div>

                {/* Theme Setting */}
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-base-content text-sm sm:text-base uppercase tracking-wider pixelated">
                    Theme
                  </h3>
                  <div className="flex justify-start">
                    <ThemeToggle />
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-base-300">
                <motion.button
                  onClick={onClose}
                  className="w-full bg-transparent border-2 border-base-300 text-base-content hover:border-base-content hover:bg-base-200 px-4 py-3 sm:py-4 text-sm sm:text-base uppercase tracking-wider pixelated min-h-[44px] transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Done
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}