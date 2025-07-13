"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

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
        <h1
          className="text-3xl font-normal uppercase text-transparent bg-gradient-to-r from-[#FFD166] via-[#F79F79] to-[#F786A3] bg-clip-text"
          style={{
            fontFamily: "'Press Start 2P', 'VT323', monospace",
            imageRendering: "pixelated",
          }}
        >
          retro
        </h1>
        {/* Navigation */}
        <motion.nav
          className="flex justify-between items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        >
          <div className="flex space-x-8">
            <a
              href="#"
              className="text-[#A0A0A0] hover:text-[#EAEAEA] transition-colors"
              style={{
                fontFamily: "'Press Start 2P', 'VT323', monospace",
                fontSize: "18px",
                textDecoration: "none",
                imageRendering: "pixelated",
              }}
            >
              Home
            </a>
            <a
              href="#"
              className="text-[#A0A0A0] hover:text-[#EAEAEA] transition-colors"
              style={{
                fontFamily: "'Press Start 2P', 'VT323', monospace",
                fontSize: "18px",
                textDecoration: "none",
                imageRendering: "pixelated",
              }}
            >
              Dashboard
            </a>
            <a
              href="#"
              className="text-[#A0A0A0] hover:text-[#EAEAEA] transition-colors"
              style={{
                fontFamily: "'Press Start 2P', 'VT323', monospace",
                fontSize: "18px",
                textDecoration: "none",
                imageRendering: "pixelated",
              }}
            >
              Settings
            </a>
            <a
              href="#"
              className="text-[#A0A0A0] hover:text-[#EAEAEA] transition-colors"
              style={{
                fontFamily: "'Press Start 2P', 'VT323', monospace",
                fontSize: "18px",
                textDecoration: "none",
                imageRendering: "pixelated",
              }}
            >
              Log out
            </a>
            <time
              className="text-lg text-[#A0A0A0]"
              style={{
                fontFamily: "'Press Start 2P', 'VT323', monospace",
                imageRendering: "pixelated",
              }}
            >
              {currentTime}
            </time>
          </div>
        </motion.nav>
      </div>

      {/* Animated Border */}
      <motion.hr
        className="h-0.5 bg-[#666666] border-none"
        style={{ imageRendering: "pixelated" }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      />
    </header>
  );
}
