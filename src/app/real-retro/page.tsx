"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useRetroStore } from "@/store/retroStore";

interface AddCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (content: string) => void;
  category: 'good' | 'bad' | 'change';
  title: string;
}

function AddCardModal({ isOpen, onClose, onSave, title }: AddCardModalProps) {
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSave(content.trim());
      setContent("");
      onClose();
    }
  };

  const handleClose = () => {
    setContent("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
      >
        <motion.div
          className="bg-base-100 border-2 border-base-300 p-6 w-full max-w-md pixelated"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="text-lg font-medium text-base-content pixelated mb-4 uppercase">
            {title}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter your note..."
                className="
                  w-full p-3 bg-base-100 border-2 border-base-300 
                  text-base-content pixelated text-sm
                  focus:border-primary focus:outline-none
                  resize-none min-h-[100px]
                "
                autoFocus
                required
                maxLength={300}
              />
              <div className="text-right text-xs text-base-content/50 pixelated mt-1">
                {content.length}/300
              </div>
            </div>
            
            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={handleClose}
                className="
                  px-4 py-2 bg-transparent border-2 border-base-300 
                  text-base-content hover:border-base-content/80
                  pixelated text-sm transition-colors min-h-[44px]
                "
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!content.trim()}
                className="
                  px-4 py-2 bg-primary text-primary-content 
                  hover:bg-primary/90 disabled:opacity-50
                  pixelated text-sm transition-colors min-h-[44px]
                "
              >
                Save
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

interface RetroCardDisplayProps {
  card: { id: string; content: string; topic?: string };
  variant: 'primary' | 'secondary' | 'tertiary';
}

function RetroCardDisplay({ card, variant }: RetroCardDisplayProps) {
  const getCardClasses = () => {
    const baseClasses = "bg-transparent p-4 sm:p-5 md:p-6 pixelated min-h-[120px] flex flex-col border-2 md:border-[3px] border-solid";
    
    switch (variant) {
      case "primary":
        return `${baseClasses} border-gradient-primary`;
      case "secondary":
        return `${baseClasses} border-gradient-secondary`;
      case "tertiary":
        return `${baseClasses} border-gradient-tertiary`;
      default:
        return baseClasses;
    }
  };

  return (
    <motion.div
      className={getCardClasses()}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      <p className="text-base-content leading-relaxed pixelated text-sm sm:text-base flex-grow">
        {card.content}
      </p>
      {card.topic && (
        <div className="mt-3 pt-2 border-t border-base-300">
          <span className="inline-block bg-primary/20 text-primary px-2 py-1 text-xs pixelated uppercase">
            {card.topic}
          </span>
        </div>
      )}
    </motion.div>
  );
}

export default function RealRetroPage(): JSX.Element {
  const router = useRouter();
  const { retroCards, addRetroCard, addTopicsToCards, setStep } = useRetroStore();
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    category: 'good' | 'bad' | 'change' | null;
    title: string;
  }>({
    isOpen: false,
    category: null,
    title: ""
  });

  useEffect(() => {
    setStep('realRetro');
  }, [setStep]);

  const openModal = (category: 'good' | 'bad' | 'change', title: string) => {
    setModalState({ isOpen: true, category, title });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, category: null, title: "" });
  };

  const saveCard = (content: string) => {
    if (modalState.category) {
      addRetroCard({ content, category: modalState.category });
    }
  };

  const handleSort = () => {
    addTopicsToCards('Testing');
  };

  const handleContinue = () => {
    setStep('topics');
    router.push('/topics');
  };

  const goodCards = retroCards.filter(card => card.category === 'good');
  const badCards = retroCards.filter(card => card.category === 'bad');
  const changeCards = retroCards.filter(card => card.category === 'change');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  return (
    <>
      <motion.div 
        className="w-full max-w-sm sm:max-w-2xl md:max-w-4xl lg:max-w-6xl mx-auto min-h-[calc(100vh-200px)] flex flex-col p-4 sm:p-6 md:p-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header with Title and Sort Button */}
        <motion.div 
          className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 gap-4"
          variants={itemVariants}
        >
          <h1
            className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-normal uppercase tracking-wider pixelated text-center sm:text-left"
            style={{
              background: "linear-gradient(to right, #FFD166, #D497E8, #5DDAA4)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent"
            }}
          >
            THE REAL RETRO
          </h1>
          
          <motion.button
            onClick={handleSort}
            className="
              bg-transparent border-2 border-base-300 text-base-content
              hover:border-primary hover:text-primary hover:bg-primary/10
              px-4 sm:px-6 py-2 sm:py-3 pixelated text-sm sm:text-base
              transition-all duration-200 min-h-[44px] flex items-center justify-center
            "
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            aria-label="Sort cards by topic"
          >
            SORT
          </motion.button>
        </motion.div>

        {/* Three Column Layout */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 flex-grow"
          variants={containerVariants}
        >
          {/* Good Column */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h2 
              className="text-lg sm:text-xl md:text-2xl font-normal uppercase tracking-wide pixelated text-center mb-4"
              style={{
                background: "linear-gradient(90deg, #FFD166 0%, #F79F79 50%, #F786A3 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent"
              }}
            >
              WAS LIEF GUT?
            </h2>
            
            <button
              onClick={() => openModal('good', 'Was lief gut?')}
              className="
                w-full p-4 sm:p-5 md:p-6 border-2 border-dashed border-base-300 
                hover:border-primary hover:bg-primary/5 text-base-content hover:text-primary
                transition-colors text-center pixelated min-h-[120px] 
                flex items-center justify-center text-sm sm:text-base
              "
            >
              + HINZUFÜGEN
            </button>
            
            <div className="space-y-4">
              <AnimatePresence>
                {goodCards.map((card) => (
                  <RetroCardDisplay key={card.id} card={card} variant="primary" />
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Bad Column */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h2 
              className="text-lg sm:text-xl md:text-2xl font-normal uppercase tracking-wide pixelated text-center mb-4"
              style={{
                background: "linear-gradient(90deg, #F79F79 0%, #D497E8 50%, #A29BFE 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent"
              }}
            >
              WAS LIEF SCHLECHT?
            </h2>
            
            <button
              onClick={() => openModal('bad', 'Was lief schlecht?')}
              className="
                w-full p-4 sm:p-5 md:p-6 border-2 border-dashed border-base-300 
                hover:border-secondary hover:bg-secondary/5 text-base-content hover:text-secondary
                transition-colors text-center pixelated min-h-[120px] 
                flex items-center justify-center text-sm sm:text-base
              "
            >
              + HINZUFÜGEN
            </button>
            
            <div className="space-y-4">
              <AnimatePresence>
                {badCards.map((card) => (
                  <RetroCardDisplay key={card.id} card={card} variant="secondary" />
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Change Column */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h2 
              className="text-lg sm:text-xl md:text-2xl font-normal uppercase tracking-wide pixelated text-center mb-4"
              style={{
                background: "linear-gradient(90deg, #97CC04 0%, #5DDAA4 50%, #46B2E8 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent"
              }}
            >
              WAS KÖNNEN WIR ÄNDERN?
            </h2>
            
            <button
              onClick={() => openModal('change', 'Was können wir ändern?')}
              className="
                w-full p-4 sm:p-5 md:p-6 border-2 border-dashed border-base-300 
                hover:border-tertiary hover:bg-tertiary/5 text-base-content hover:text-tertiary
                transition-colors text-center pixelated min-h-[120px] 
                flex items-center justify-center text-sm sm:text-base
              "
            >
              + HINZUFÜGEN
            </button>
            
            <div className="space-y-4">
              <AnimatePresence>
                {changeCards.map((card) => (
                  <RetroCardDisplay key={card.id} card={card} variant="tertiary" />
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>

        {/* Navigation */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-between mt-8 pt-6 border-t border-base-300"
          variants={itemVariants}
        >
          <motion.button
            onClick={() => {
              setStep('lastRetro');
              router.push('/last-retro');
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
          >
            ← BACK TO LAST RETRO
          </motion.button>

          <motion.button
            onClick={handleContinue}
            className="
              order-1 sm:order-2 w-full sm:w-auto
              bg-transparent border-2 border-primary text-primary
              hover:bg-primary hover:text-primary-content
              px-6 sm:px-8 py-3 sm:py-4 pixelated text-sm sm:text-base font-medium
              transition-all duration-200 min-h-[44px] flex items-center justify-center
            "
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
          >
            VOTING
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Modal */}
      <AddCardModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        onSave={saveCard}
        category={modalState.category!}
        title={modalState.title}
      />
    </>
  );
}