"use client";

import { useState } from "react";
import { Card } from "@/components/Card";
import { motion } from "framer-motion";

export default function Home() {
  const [userResponse, setUserResponse] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleReset = () => {
    setUserResponse("");
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <motion.div 
        className="w-full max-w-6xl mx-auto h-full flex flex-col justify-center items-center space-y-6 p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        <motion.h1
          className="text-gradient-primary text-5xl font-normal uppercase tracking-widest pixelated"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Thank you for sharing!
        </motion.h1>
        <motion.p
          className="text-base-content/70 text-center max-w-2xl pixelated"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Your response: &ldquo;{userResponse}&rdquo;
        </motion.p>
        <motion.button
          onClick={handleReset}
          className="bg-gradient-to-r from-sunset-start via-sunset-mid to-sunset-end text-primary-content font-bold px-6 py-3 transition-transform pixelated hover:scale-105"
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 0 15px rgba(255, 209, 102, 0.5)"
          }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 400, damping: 30 }}
          aria-label="Submit another response"
        >
          Submit Another Response
        </motion.button>
      </motion.div>
    );
  }

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

  const cardVariants = {
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
    <div className="w-full max-w-6xl mx-auto min-h-[calc(100vh-140px)] flex flex-col items-center p-8">
      {/* Main Title */}
      <motion.h1
        className="text-5xl font-normal uppercase tracking-widest mb-12 pixelated"
        style={{
          background: "linear-gradient(to right, #FFD166, #D497E8, #5DDAA4)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent"
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 400, damping: 30 }}
      >
        RETROSPECTIVE
      </motion.h1>

      {/* Cards Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl mx-auto mb-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={cardVariants}>
          <Card 
            title="WHAT WENT WELL"
            text="The team collaborated effectively."
            variant="primary"
          />
        </motion.div>
        <motion.div variants={cardVariants}>
          <Card 
            title="WHAT DIDN'T GO WELL"
            text="We missed some deadlines."
            variant="secondary"
          />
        </motion.div>
        <motion.div variants={cardVariants}>
          <Card 
            title="IDEAS FOR IMPROVEMENT"
            text="Let's improve our processes."
            variant="tertiary"
          />
        </motion.div>
      </motion.div>

      {/* Add Note Button */}
      <motion.div 
        className="w-full max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, type: "spring", stiffness: 400, damping: 30 }}
      >
        <button 
          className="bg-transparent text-base-content hover:text-primary hover:bg-base-content/10 w-full p-4 border-2 border-dashed border-base-300 hover:border-base-content transition-colors text-center pixelated"
        >
          + Add a note
        </button>
      </motion.div>

      {/* Action Items */}
      <motion.div 
        className="w-full max-w-6xl mx-auto mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, type: "spring", stiffness: 400, damping: 30 }}
      >
        <ul className="list-none pl-0 space-y-4 pixelated">
          <li className="text-base-content py-2 pixelated">
            <span className="text-base-content/70">+ </span>
            Review project outcomes
          </li>
          <li className="text-base-content py-2 pixelated">
            <span className="text-base-content/70">+ </span>
            Discuss what to improve
          </li>
          <li className="text-base-content py-2 pixelated">
            <span className="text-base-content/70">+ </span>
            Assign action items
          </li>
        </ul>
      </motion.div>
    </div>
  );
}