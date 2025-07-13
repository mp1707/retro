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
    <header className="flex justify-between items-center p-4 bg-white border-b">
      <h1 className="text-xl font-semibold">retro</h1>
      <time className="text-sm font-mono">{currentTime}</time>
    </header>
  );
}