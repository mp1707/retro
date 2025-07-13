"use client";

import { useState, useEffect } from "react";

export function Header() {
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit"
      });
      setCurrentTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="flex justify-between items-center p-6 border-b-2 border-[#666666]" style={{ imageRendering: 'pixelated' }}>
      <h1 
        className="text-3xl font-normal uppercase text-transparent bg-gradient-to-r from-[#FFD166] via-[#F79F79] to-[#F786A3] bg-clip-text"
        style={{ fontFamily: "'Pixel Operator', 'Press Start 2P', 'Silkscreen', 'VT323', monospace" }}
      >
        retro
      </h1>
      <time 
        className="text-lg text-[#A0A0A0]"
        style={{ fontFamily: "'Pixel Operator', 'Press Start 2P', 'Silkscreen', 'VT323', monospace" }}
      >
        {currentTime}
      </time>
    </header>
  );
}