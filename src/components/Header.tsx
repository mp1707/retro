"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const [currentTime, setCurrentTime] = useState<string>("");

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

  return (
    <header className="w-full">
      {/* Main Header */}
      <div className="flex justify-between items-center p-6">
        <h1 className="text-gradient-primary text-3xl pixelated">
          retro
        </h1>
        {/* Navigation */}
        <motion.nav
          className="flex justify-between items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        >
          <div className="flex items-center space-x-8">
            <a href="#" className="text-lg text-base-content/70 hover:text-base-content hover:underline transition-colors pixelated">
              Home
            </a>
            <a href="#" className="text-lg text-base-content/70 hover:text-base-content hover:underline transition-colors pixelated">
              Dashboard
            </a>
            <a href="#" className="text-lg text-base-content/70 hover:text-base-content hover:underline transition-colors pixelated">
              Settings
            </a>
            <a href="#" className="text-lg text-base-content/70 hover:text-base-content hover:underline transition-colors pixelated">
              Log out
            </a>
            <time className="text-lg text-base-content/70 pixelated">
              {currentTime}
            </time>
            <ThemeToggle />
          </div>
        </motion.nav>
      </div>

      {/* Animated Border */}
      <motion.hr
        className="h-0.5 bg-base-300 border-none pixelated"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      />
    </header>
  );
}