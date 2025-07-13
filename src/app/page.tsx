"use client";

import { useState } from "react";
import { Card } from "@/components/Card";
import { motion } from "framer-motion";

export default function Home() {
  const [userResponse, setUserResponse] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserResponse(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!userResponse.trim()) return;

    setIsSubmitted(true);
    console.log("User response:", userResponse);
  };

  const handleReset = () => {
    setUserResponse("");
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <motion.div 
        className="w-full h-full flex flex-col justify-center items-center space-y-6 p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        <motion.h1
          className="text-3xl text-transparent bg-gradient-to-r from-[#FFD166] via-[#F79F79] to-[#F786A3] bg-clip-text uppercase font-normal"
          style={{
            fontFamily: "'Press Start 2P', 'VT323', monospace",
            imageRendering: "pixelated",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Thank you for sharing!
        </motion.h1>
        <motion.p
          className="text-[#A0A0A0] text-lg text-center max-w-2xl"
          style={{
            fontFamily: "'Press Start 2P', 'VT323', monospace",
            lineHeight: 1.5,
            imageRendering: "pixelated",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Your response: "{userResponse}"
        </motion.p>
        <motion.button
          onClick={handleReset}
          className="px-6 py-3 border-none cursor-pointer text-[#1A1A1A] font-bold"
          style={{
            background: "var(--gradient-primary)",
            fontFamily: "'Press Start 2P', 'VT323', monospace",
            fontSize: "16px",
            imageRendering: "pixelated",
          }}
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
        type: "spring", 
        stiffness: 400, 
        damping: 30 
      }
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-100px)] flex flex-col items-center p-8">
      {/* Navigation */}
      <motion.nav 
        className="w-full max-w-6xl mb-8 flex justify-between items-center"
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
              textDecoration: "none"
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
              textDecoration: "none"
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
              textDecoration: "none"
            }}
          >
            Settings
          </a>
        </div>
        <a 
          href="#" 
          className="text-[#A0A0A0] hover:text-[#EAEAEA] transition-colors"
          style={{ 
            fontFamily: "'Press Start 2P', 'VT323', monospace",
            fontSize: "18px",
            textDecoration: "none"
          }}
        >
          Log out
        </a>
      </motion.nav>

      {/* Divider */}
      <motion.hr 
        className="w-full max-w-6xl h-0.5 bg-[#666666] border-none mb-8"
        style={{ imageRendering: "pixelated" }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      />

      {/* Main Title */}
      <motion.h1
        className="text-5xl font-normal uppercase mb-12 text-transparent bg-clip-text"
        style={{
          background: "linear-gradient(90deg, #FFD166 0%, #F79F79 25%, #D497E8 50%, #A29BFE 75%, #46B2E8 100%)",
          backgroundClip: "text",
          fontFamily: "'Press Start 2P', 'VT323', monospace",
          letterSpacing: "0.1em",
          imageRendering: "pixelated"
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 400, damping: 30 }}
      >
        RETROSPECTIVE
      </motion.h1>

      {/* Cards Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full mb-8"
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
        className="w-full max-w-6xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, type: "spring", stiffness: 400, damping: 30 }}
      >
        <div 
          className="p-4 border-2 border-dashed border-[#666666] text-center cursor-pointer hover:border-[#A0A0A0] transition-colors"
          style={{ imageRendering: "pixelated" }}
        >
          <span 
            className="text-[#A0A0A0] text-lg"
            style={{ 
              fontFamily: "'Press Start 2P', 'VT323', monospace",
              imageRendering: "pixelated"
            }}
          >
            + Add a note
          </span>
        </div>
      </motion.div>

      {/* Action Items */}
      <motion.div 
        className="w-full max-w-6xl mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 400, damping: 30 }}
      >
        <ul 
          className="space-y-2"
          style={{ 
            fontFamily: "'Press Start 2P', 'VT323', monospace",
            listStyle: "none",
            paddingLeft: 0
          }}
        >
          <li className="text-[#EAEAEA] text-base">
            <span className="text-[#A0A0A0]">+ </span>
            Review project outcomes
          </li>
          <li className="text-[#EAEAEA] text-base">
            <span className="text-[#A0A0A0]">+ </span>
            Discuss what to improve
          </li>
          <li className="text-[#EAEAEA] text-base">
            <span className="text-[#A0A0A0]">+ </span>
            Assign action items
          </li>
        </ul>
      </motion.div>
    </div>
  );
}
