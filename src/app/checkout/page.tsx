"use client";

import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useRetroStore } from "@/store/retroStore";

export default function CheckoutPage(): JSX.Element {
  const router = useRouter();
  const { 
    icebreakerResponse,
    retroCards, 
    actionItems, 
    votes,
    setStep,
    resetStore 
  } = useRetroStore();

  useEffect(() => {
    setStep('checkout');
  }, [setStep]);

  // Calculate session statistics
  const sessionStats = useMemo(() => {
    const totalCards = retroCards.length;
    const totalVotes = Object.values(votes).reduce((sum, count) => sum + count, 0);
    const totalActionItems = actionItems.length;
    const topicsCount = new Set(retroCards.map(card => card.topic).filter(Boolean)).size;

    return {
      totalCards,
      totalVotes,
      totalActionItems,
      topicsCount
    };
  }, [retroCards, votes, actionItems]);

  const handleStartOver = () => {
    resetStore();
    router.push('/');
  };

  const handleBackToTopics = () => {
    setStep('topics');
    router.push('/topics');
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
        type: "spring", 
        stiffness: 400, 
        damping: 30 
      }
    }
  };

  const statsVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 30,
        delay: 0.3
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
      {/* Celebration Title */}
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
        RETROSPECTIVE COMPLETE! 🎉
      </motion.h1>

      {/* Final Question Card */}
      <motion.div 
        className="w-full max-w-2xl bg-transparent border-2 sm:border-3 pixelated p-6 sm:p-8 md:p-10 mb-8 sm:mb-12"
        style={{
          borderImage: "linear-gradient(90deg, #FFD166 0%, #F79F79 50%, #F786A3 100%) 1"
        }}
        variants={itemVariants}
      >
        <h2 
          className="text-lg sm:text-xl md:text-2xl font-normal uppercase tracking-wide mb-6 sm:mb-8 pixelated text-center"
          style={{
            background: "linear-gradient(90deg, #FFD166 0%, #F79F79 50%, #F786A3 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent"
          }}
        >
          FINAL QUESTION
        </h2>
        <p className="text-base-content text-base sm:text-lg md:text-xl pixelated text-center leading-relaxed mb-6">
          What are you most looking forward to in the next sprint?
        </p>
        <p className="text-base-content/70 text-sm sm:text-base pixelated text-center leading-relaxed">
          Take a moment to think about the positive changes and improvements that lie ahead. 
          Share this energy with your team as you move forward together.
        </p>
      </motion.div>

      {/* Session Summary */}
      <motion.div 
        className="w-full max-w-3xl grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12"
        variants={statsVariants}
      >
        <div className="bg-transparent border-2 border-primary/30 p-4 text-center">
          <div 
            className="text-2xl sm:text-3xl font-bold pixelated mb-2"
            style={{ color: '#FFD166' }}
          >
            {sessionStats.totalCards}
          </div>
          <div className="text-base-content/70 pixelated text-xs sm:text-sm uppercase">
            Cards Created
          </div>
        </div>

        <div className="bg-transparent border-2 border-secondary/30 p-4 text-center">
          <div 
            className="text-2xl sm:text-3xl font-bold pixelated mb-2"
            style={{ color: '#D497E8' }}
          >
            {sessionStats.topicsCount}
          </div>
          <div className="text-base-content/70 pixelated text-xs sm:text-sm uppercase">
            Topics Discussed
          </div>
        </div>

        <div className="bg-transparent border-2 border-tertiary/30 p-4 text-center">
          <div 
            className="text-2xl sm:text-3xl font-bold pixelated mb-2"
            style={{ color: '#5DDAA4' }}
          >
            {sessionStats.totalVotes}
          </div>
          <div className="text-base-content/70 pixelated text-xs sm:text-sm uppercase">
            Votes Cast
          </div>
        </div>

        <div className="bg-transparent border-2 border-base-300 p-4 text-center">
          <div 
            className="text-2xl sm:text-3xl font-bold pixelated mb-2"
            style={{ color: '#46B2E8' }}
          >
            {sessionStats.totalActionItems}
          </div>
          <div className="text-base-content/70 pixelated text-xs sm:text-sm uppercase">
            Action Items
          </div>
        </div>
      </motion.div>

      {/* Icebreaker Reminder */}
      {icebreakerResponse && (
        <motion.div 
          className="w-full max-w-2xl bg-base-200/30 border border-base-300 p-4 sm:p-6 mb-8"
          variants={itemVariants}
        >
          <h3 className="text-base-content/80 pixelated text-sm uppercase mb-3 text-center">
            Your Icebreaker Response
          </h3>
          <p className="text-base-content pixelated text-sm sm:text-base text-center italic">
            &ldquo;{icebreakerResponse}&rdquo;
          </p>
        </motion.div>
      )}

      {/* Navigation Actions */}
      <motion.div 
        className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full max-w-lg"
        variants={itemVariants}
      >
        <motion.button
          onClick={handleBackToTopics}
          className="
            order-2 sm:order-1 w-full
            bg-transparent border-2 border-base-300 text-base-content
            hover:border-base-content hover:text-base-content
            px-6 py-3 sm:py-4 pixelated text-sm sm:text-base
            transition-all duration-200 min-h-[44px] flex items-center justify-center
          "
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          aria-label="Review topics and action items"
        >
          ← REVIEW RESULTS
        </motion.button>

        <motion.button
          onClick={handleStartOver}
          className="
            order-1 sm:order-2 w-full
            bg-transparent border-2 border-primary text-primary
            hover:bg-primary hover:text-primary-content
            px-6 py-3 sm:py-4 pixelated text-sm sm:text-base font-medium
            transition-all duration-200 min-h-[44px] flex items-center justify-center
          "
          whileHover={{ 
            scale: 1.02,
            y: -1
          }}
          whileTap={{ scale: 0.98 }}
          aria-label="Start a new retrospective session"
        >
          START NEW RETRO
        </motion.button>
      </motion.div>

      {/* Thank You Message */}
      <motion.div 
        className="text-center mt-8 sm:mt-12"
        variants={itemVariants}
      >
        <p className="text-base-content/60 pixelated text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
          Thank you for taking the time to reflect and improve together. 
          Great teams are built through honest communication and continuous growth.
        </p>
      </motion.div>

      {/* Subtle celebration animation */}
      <motion.div
        className="absolute top-20 left-1/2 transform -translate-x-1/2 text-4xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: [0, 1, 0], y: [-20, -60, -100] }}
        transition={{ 
          duration: 3, 
          delay: 1,
          ease: "easeOut"
        }}
      >
        ✨
      </motion.div>

      <motion.div
        className="absolute top-32 right-1/4 text-3xl"
        initial={{ opacity: 0, rotate: 0 }}
        animate={{ 
          opacity: [0, 1, 0], 
          rotate: [0, 180, 360],
          y: [0, -30, -60] 
        }}
        transition={{ 
          duration: 2.5, 
          delay: 1.5,
          ease: "easeOut"
        }}
      >
        🎊
      </motion.div>

      <motion.div
        className="absolute top-32 left-1/4 text-3xl"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: [0, 1, 0], 
          scale: [0, 1.2, 0],
          y: [0, -40, -80] 
        }}
        transition={{ 
          duration: 2, 
          delay: 2,
          ease: "easeOut"
        }}
      >
        🌟
      </motion.div>
    </motion.div>
  );
}