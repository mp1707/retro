"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"retrodark" | "retrolight">("retrodark");

  useEffect(() => {
    setMounted(true);
    
    // Get initial theme from data attribute (server-rendered)
    const currentTheme = document.documentElement.getAttribute("data-theme") as "retrodark" | "retrolight";
    const initialTheme = currentTheme || "retrodark";
    
    // Check if we should update based on localStorage or system preference
    try {
      const savedTheme = localStorage.getItem("theme") as "retrodark" | "retrolight";
      const validThemes = ["retrodark", "retrolight"];
      
      if (savedTheme && validThemes.includes(savedTheme)) {
        // Use saved theme
        if (savedTheme !== initialTheme) {
          setTheme(savedTheme);
          document.documentElement.setAttribute("data-theme", savedTheme);
          return;
        }
      } else {
        // Use system preference
        const systemTheme = window.matchMedia("(prefers-color-scheme: light)").matches ? "retrolight" : "retrodark";
        if (systemTheme !== initialTheme) {
          setTheme(systemTheme);
          document.documentElement.setAttribute("data-theme", systemTheme);
          return;
        }
      }
    } catch {
      // localStorage not available, use default
    }
    
    // Use the server-rendered theme
    setTheme(initialTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "retrodark" ? "retrolight" : "retrodark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  if (!mounted) {
    return (
      <div className="btn bg-transparent border-2 border-base-300 text-base-content hover:border-base-content px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm w-16 sm:w-20 md:w-24 min-h-[44px] flex items-center justify-center">
        <span className="uppercase tracking-wider">DARK</span>
      </div>
    );
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className="btn bg-transparent border-2 border-base-300 text-base-content hover:border-base-content px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm relative inline-flex items-center justify-center pixelated min-h-[44px] min-w-[44px] w-16 sm:w-20 md:w-24"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      aria-label={`Switch to ${theme === "retrodark" ? "light" : "dark"} theme`}
      title={`Current theme: ${theme === "retrodark" ? "dark" : "light"}. Click to switch to ${theme === "retrodark" ? "light" : "dark"} theme.`}
    >
      <span className="uppercase tracking-wider text-center">
        {theme === "retrodark" ? (
          <span className="block">
            <span className="hidden sm:inline">DARK</span>
            <span className="sm:hidden">D</span>
          </span>
        ) : (
          <span className="block">
            <span className="hidden sm:inline">LIGHT</span>
            <span className="sm:hidden">L</span>
          </span>
        )}
      </span>
    </motion.button>
  );
}