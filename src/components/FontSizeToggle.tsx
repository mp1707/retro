"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

type FontScale = "sm" | "md";

const FONT_SCALES = {
  sm: { label: "SM", scale: 0.875 },
  md: { label: "MD", scale: 1.0 }
} as const;

export function FontSizeToggle() {
  const [mounted, setMounted] = useState(false);
  const [fontScale, setFontScale] = useState<FontScale>("md");

  useEffect(() => {
    setMounted(true);
    // Get initial font scale from localStorage or data attribute
    const savedScale = localStorage.getItem("fontScale") as FontScale;
    const currentScale = document.documentElement.getAttribute("data-font-scale") as FontScale;
    const initialScale = savedScale && savedScale in FONT_SCALES ? savedScale : currentScale || "md";
    setFontScale(initialScale);
  }, []);

  const handleScaleChange = (newScale: FontScale) => {
    setFontScale(newScale);
    localStorage.setItem("fontScale", newScale);
    document.documentElement.setAttribute("data-font-scale", newScale);
  };

  const toggleScale = () => {
    const newScale = fontScale === "sm" ? "md" : "sm";
    handleScaleChange(newScale);
  };

  if (!mounted) {
    return (
      <div className="btn bg-transparent border-2 border-base-300 text-base-content hover:border-base-content px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm w-16 sm:w-20 md:w-24 min-h-[44px] flex items-center justify-center">
        <span className="uppercase tracking-wider">MD</span>
      </div>
    );
  }

  return (
    <motion.button
      onClick={toggleScale}
      className="btn bg-transparent border-2 border-base-300 text-base-content hover:border-base-content px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm relative inline-flex items-center justify-center pixelated min-h-[44px] min-w-[44px] w-16 sm:w-20 md:w-24"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      aria-label={`Switch to ${fontScale === "sm" ? "medium" : "small"} font size`}
      title={`Current font size: ${FONT_SCALES[fontScale].label} (${Math.round(FONT_SCALES[fontScale].scale * 100)}%). Click to switch to ${fontScale === "sm" ? "medium" : "small"} size.`}
    >
      <span className="uppercase tracking-wider text-center">
        {FONT_SCALES[fontScale].label}
      </span>
    </motion.button>
  );
}