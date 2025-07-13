"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"retrodark" | "retrolight">("retrodark");

  useEffect(() => {
    setMounted(true);
    // Get initial theme from localStorage or system preference
    const savedTheme = localStorage.getItem("theme") as "retrodark" | "retrolight";
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
      const systemTheme = window.matchMedia("(prefers-color-scheme: light)").matches ? "retrolight" : "retrodark";
      setTheme(systemTheme);
      document.documentElement.setAttribute("data-theme", systemTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "retrodark" ? "retrolight" : "retrodark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  if (!mounted) {
    return (
      <div className="btn bg-transparent border-2 border-base-300 text-base-content hover:border-base-content px-4 py-2 text-sm w-24">
        <span className="uppercase tracking-wider">DARK</span>
      </div>
    );
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className="btn bg-transparent border-2 border-base-300 text-base-content hover:border-base-content px-4 py-2 text-sm relative inline-flex items-center justify-center pixelated"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${theme === "retrodark" ? "light" : "dark"} theme`}
      title={`Current theme: ${theme === "retrodark" ? "dark" : "light"}. Click to switch to ${theme === "retrodark" ? "light" : "dark"} theme.`}
    >
      <span className="uppercase tracking-wider">
        {theme === "retrodark" ? "DARK" : "LIGHT"}
      </span>
    </motion.button>
  );
}