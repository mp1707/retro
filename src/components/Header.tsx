"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SettingsModal } from "./SettingsModal";

export function Header() {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      });
      setCurrentTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const openSettingsModal = () => {
    setIsSettingsModalOpen(true);
    setIsMobileMenuOpen(false); // Close mobile menu when opening settings
  };

  const closeSettingsModal = () => {
    setIsSettingsModalOpen(false);
  };

  return (
    <header className="w-full">
      {/* Main Header */}
      <div className="flex justify-between items-center p-4 sm:p-6">
        <h1 className="text-gradient-primary text-xl sm:text-2xl md:text-3xl pixelated">
          retro
        </h1>
        
        {/* Desktop Navigation */}
        <motion.nav
          className="hidden lg:flex justify-between items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        >
          <div className="flex items-center space-x-6 lg:space-x-8">
            <a href="#" className="text-lg text-base-content/70 hover:text-base-content hover:underline transition-colors pixelated">
              Home
            </a>
            <a href="#" className="text-lg text-base-content/70 hover:text-base-content hover:underline transition-colors pixelated">
              Dashboard
            </a>
            <button 
              onClick={openSettingsModal}
              className="text-lg text-base-content/70 hover:text-base-content hover:underline transition-colors pixelated bg-transparent border-none cursor-pointer"
            >
              Settings
            </button>
            <a href="#" className="text-lg text-base-content/70 hover:text-base-content hover:underline transition-colors pixelated">
              Log out
            </a>
            <time className="text-lg text-base-content/70 pixelated">
              {currentTime}
            </time>
          </div>
        </motion.nav>

        {/* Mobile Header - Clock and Menu Button */}
        <div className="lg:hidden flex items-center space-x-4">
          <time className="text-sm text-base-content/70 pixelated">
            {currentTime}
          </time>
          <button
            onClick={toggleMobileMenu}
            className="p-2 text-base-content/70 hover:text-base-content transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center pixelated"
            aria-label="Toggle mobile menu"
          >
            <motion.div
              animate={isMobileMenuOpen ? "open" : "closed"}
              className="w-6 h-6 flex flex-col justify-center items-center"
            >
              <motion.span
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: 45, y: 6 }
                }}
                className="w-6 h-0.5 bg-current block origin-center pixelated"
                style={{ imageRendering: 'pixelated' }}
              />
              <motion.span
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 }
                }}
                className="w-6 h-0.5 bg-current block mt-1 pixelated"
                style={{ imageRendering: 'pixelated' }}
              />
              <motion.span
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: -45, y: -6 }
                }}
                className="w-6 h-0.5 bg-current block mt-1 origin-center pixelated"
                style={{ imageRendering: 'pixelated' }}
              />
            </motion.div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-base-100 border-t border-base-300 pixelated"
          >
            <nav className="p-4 space-y-4">
              <a 
                href="#" 
                className="block text-base-content/70 hover:text-base-content transition-colors min-h-[44px] flex items-center pixelated text-base"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </a>
              <a 
                href="#" 
                className="block text-base-content/70 hover:text-base-content transition-colors min-h-[44px] flex items-center pixelated text-base"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </a>
              <button 
                onClick={openSettingsModal}
                className="block text-base-content/70 hover:text-base-content transition-colors min-h-[44px] flex items-center pixelated text-base bg-transparent border-none cursor-pointer w-full text-left"
              >
                Settings
              </button>
              <a 
                href="#" 
                className="block text-base-content/70 hover:text-base-content transition-colors min-h-[44px] flex items-center pixelated text-base"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Log out
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animated Border */}
      <motion.hr
        className="h-px sm:h-0.5 bg-base-300 border-none pixelated"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      />

      {/* Settings Modal */}
      <SettingsModal 
        isOpen={isSettingsModalOpen} 
        onClose={closeSettingsModal} 
      />
    </header>
  );
}