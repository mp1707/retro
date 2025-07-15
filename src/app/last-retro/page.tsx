"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useRetroStore } from "@/store/retroStore";
import { Card } from "@/components/Card";

export default function LastRetroPage() {
  const router = useRouter();
  const { lastRetroActionItems, setStep } = useRetroStore();

  useEffect(() => {
    // Set current step when component mounts
    setStep('lastRetro');
  }, [setStep]);

  const handleContinue = () => {
    setStep('realRetro');
    router.push('/real-retro');
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
      className="w-full max-w-sm sm:max-w-2xl md:max-w-4xl lg:max-w-6xl mx-auto min-h-[calc(100vh-200px)] flex flex-col p-4 sm:p-6 md:p-8"
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
        LAST RETRO&apos;S ACTION ITEMS
      </motion.h1>

      {/* Action Items Cards */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-6 lg:gap-8 w-full mb-8 sm:mb-12"
        variants={containerVariants}
      >
        {lastRetroActionItems.map((item, index) => (
          <motion.div 
            key={item.id} 
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -2 }}
            transition={{ type: "spring" as const, stiffness: 400, damping: 30 }}
          >
            <Card 
              title={`✓ ${item.topic.toUpperCase()}`}
              text={item.content}
              variant={index % 2 === 0 ? "primary" : "secondary"}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Status Message */}
      <motion.div 
        className="text-center mb-8 sm:mb-12"
        variants={itemVariants}
      >
        <div className="bg-transparent border-2 border-base-300 p-4 sm:p-6 pixelated max-w-2xl mx-auto">
          <p className="text-base-content/80 text-sm sm:text-base pixelated leading-relaxed">
            Great work on completing these action items from our last retrospective! 
            <br className="hidden sm:block" />
            Now let&apos;s dive into this sprint&apos;s retrospective.
          </p>
        </div>
      </motion.div>

      {/* Navigation Area */}
      <motion.div 
        className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-between mt-auto pt-4 sm:pt-6"
        variants={itemVariants}
      >
        {/* Back to Previous Step */}
        <motion.button
          onClick={() => {
            setStep('icebreaker');
            router.push('/');
          }}
          className="
            order-2 sm:order-1 w-full sm:w-auto
            bg-transparent border-2 border-base-300/60 text-base-content/70
            hover:border-base-content/80 hover:text-base-content
            px-4 sm:px-6 py-3 pixelated text-sm sm:text-base
            transition-all duration-200 min-h-[44px] flex items-center justify-center
          "
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          aria-label="Go back to icebreaker"
        >
          ← BACK TO ICEBREAKER
        </motion.button>

        {/* Continue Button */}
        <motion.button
          onClick={handleContinue}
          className="
            order-1 sm:order-2 w-full sm:w-auto
            bg-transparent border-2 border-primary text-primary
            hover:bg-primary hover:text-primary-content
            px-6 sm:px-8 py-3 sm:py-4 pixelated text-sm sm:text-base font-medium
            transition-all duration-200 min-h-[44px] flex items-center justify-center
          "
          whileHover={{ 
            scale: 1.02,
            y: -1
          }}
          whileTap={{ scale: 0.98 }}
          aria-label="Continue to retrospective"
        >
          THE REAL RETRO!
        </motion.button>
      </motion.div>

      {/* Help Text */}
      <motion.p 
        className="text-base-content/50 text-xs sm:text-sm pixelated text-center mt-6 sm:mt-8 max-w-lg mx-auto"
        variants={itemVariants}
      >
        These completed action items show the progress made since our last retrospective session.
      </motion.p>
    </motion.div>
  );
}