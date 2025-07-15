"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useRetroStore } from "@/store/retroStore";

export default function IcebreakerPage() {
  const router = useRouter();
  const { icebreakerResponse, setIcebreakerResponse, setStep } = useRetroStore();
  const [localResponse, setLocalResponse] = useState(icebreakerResponse);

  useEffect(() => {
    // Set current step when component mounts
    setStep('icebreaker');
  }, [setStep]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localResponse.trim()) {
      setIcebreakerResponse(localResponse.trim());
      setStep('lastRetro');
      router.push('/last-retro');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring" as const, 
        stiffness: 400, 
        damping: 30 
      }
    }
  };

  return (
    <motion.div 
      className="w-full max-w-sm sm:max-w-2xl md:max-w-4xl lg:max-w-6xl mx-auto min-h-[calc(100vh-200px)] flex flex-col justify-center items-center p-4 sm:p-6 md:p-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Main Title */}
      <motion.h1
        className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-normal uppercase tracking-wider sm:tracking-widest mb-6 sm:mb-8 md:mb-12 pixelated text-center"
        style={{
          background: "linear-gradient(to right, #FFD166, #D497E8, #5DDAA4)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent"
        }}
        variants={itemVariants}
      >
        ICEBREAKER
      </motion.h1>

      {/* Icebreaker Question Card */}
      <motion.div 
        className="w-full max-w-lg bg-transparent border-2 sm:border-3 pixelated p-4 sm:p-6 md:p-8 mb-6 sm:mb-8"
        style={{
          borderImage: "linear-gradient(90deg, #FFD166 0%, #F79F79 50%, #F786A3 100%) 1"
        }}
        variants={itemVariants}
      >
        <h2 
          className="text-lg sm:text-xl md:text-2xl font-normal uppercase tracking-wide mb-4 sm:mb-6 pixelated text-center"
          style={{
            background: "linear-gradient(90deg, #FFD166 0%, #F79F79 50%, #F786A3 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent"
          }}
        >
          QUESTION
        </h2>
        <p className="text-base-content text-sm sm:text-base md:text-lg pixelated text-center leading-relaxed">
          What&apos;s one new thing you learned this week?
        </p>
      </motion.div>

      {/* Response Form */}
      <motion.form 
        onSubmit={handleSubmit}
        className="w-full max-w-lg space-y-4 sm:space-y-6"
        variants={itemVariants}
      >
        <div>
          <label 
            htmlFor="icebreaker-response" 
            className="block text-base-content/70 text-xs sm:text-sm pixelated mb-2"
          >
            YOUR RESPONSE
          </label>
          <textarea
            id="icebreaker-response"
            value={localResponse}
            onChange={(e) => setLocalResponse(e.target.value)}
            placeholder="Share your learning experience..."
            className="
              w-full p-3 sm:p-4 bg-base-100 border-2 border-base-300 
              text-base-content pixelated text-sm sm:text-base
              focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20
              hover:border-base-content/50 transition-colors
              resize-none min-h-[120px] sm:min-h-[140px]
            "
            required
            maxLength={500}
          />
          <div className="text-right text-xs text-base-content/50 pixelated mt-1">
            {localResponse.length}/500
          </div>
        </div>

        {/* Navigation Button */}
        <motion.button
          type="submit"
          disabled={!localResponse.trim()}
          className="
            w-full sm:w-auto sm:ml-auto sm:block
            bg-transparent border-2 border-base-300 text-base-content
            hover:border-primary hover:text-primary hover:bg-primary/10
            disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-base-300 disabled:hover:text-base-content disabled:hover:bg-transparent
            px-6 sm:px-8 py-3 sm:py-4 pixelated text-sm sm:text-base font-medium
            transition-all duration-200 min-h-[44px] flex items-center justify-center
          "
          whileHover={{ 
            scale: localResponse.trim() ? 1.02 : 1,
            y: localResponse.trim() ? -1 : 0
          }}
          whileTap={{ scale: localResponse.trim() ? 0.98 : 1 }}
          aria-label="Continue to last retro review"
        >
          ABOUT LAST RETRO...
        </motion.button>
      </motion.form>

      {/* Help Text */}
      <motion.p 
        className="text-base-content/50 text-xs sm:text-sm pixelated text-center mt-6 sm:mt-8 max-w-md"
        variants={itemVariants}
      >
        This icebreaker helps the team connect before diving into the retrospective.
      </motion.p>
    </motion.div>
  );
}