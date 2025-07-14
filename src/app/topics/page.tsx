"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useRetroStore } from "@/store/retroStore";
import { FormModal } from "@/components/ui/Modal";

interface TopicGroupProps {
  topic: string;
  cards: Array<{ id: string; content: string; category: 'good' | 'bad' | 'change' }>;
  votes: number;
  canVote: boolean;
  onVote: () => void;
  onCreateActionItem: () => void;
}

function TopicGroup({ topic, cards, votes, canVote, onVote, onCreateActionItem }: TopicGroupProps) {

  const getCardClasses = (category: 'good' | 'bad' | 'change') => {
    const baseClasses = "bg-transparent p-3 sm:p-4 pixelated min-h-[100px] border-2 relative";
    
    switch (category) {
      case 'good':
        return `${baseClasses} border-gradient-primary`;
      case 'bad':
        return `${baseClasses} border-gradient-secondary`;
      case 'change':
        return `${baseClasses} border-gradient-tertiary`;
      default:
        return baseClasses;
    }
  };

  return (
    <motion.div 
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      {/* Topic Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 p-4 bg-base-200/30 border border-base-300">
        <div className="flex items-center gap-3">
          <h3 
            className="text-lg sm:text-xl font-medium pixelated uppercase tracking-wide"
            style={{
              background: "linear-gradient(90deg, #FFD166 0%, #F79F79 50%, #F786A3 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent"
            }}
          >
            {topic}
          </h3>
          
          {votes > 0 && (
            <motion.span 
              className="bg-primary text-primary-content px-2 py-1 text-xs pixelated"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              {votes} vote{votes !== 1 ? 's' : ''}
            </motion.span>
          )}
        </div>

        <div className="flex gap-2 sm:gap-3">
          <motion.button
            onClick={onVote}
            disabled={!canVote}
            className={`
              px-3 sm:px-4 py-2 pixelated text-xs sm:text-sm transition-all
              min-h-[40px] sm:min-h-[44px] flex items-center justify-center
              ${canVote 
                ? 'bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-primary-content' 
                : 'bg-base-300 border-2 border-base-300 text-base-content/50 cursor-not-allowed'
              }
            `}
            whileHover={canVote ? { scale: 1.05 } : {}}
            whileTap={canVote ? { scale: 0.95 } : {}}
            aria-label={`Vote for ${topic}`}
          >
            VOTE
          </motion.button>

          <motion.button
            onClick={onCreateActionItem}
            className="
              px-3 sm:px-4 py-2 bg-transparent border-2 border-base-300 
              text-base-content hover:border-tertiary hover:text-tertiary hover:bg-tertiary/10
              pixelated text-xs sm:text-sm transition-all
              min-h-[40px] sm:min-h-[44px] flex items-center justify-center
            "
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`Create action item for ${topic}`}
          >
            CREATE ACTION ITEM
          </motion.button>
        </div>
      </div>

      {/* Cards for this topic */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        <AnimatePresence>
          {cards.map((card) => (
            <motion.div
              key={card.id}
              className={getCardClasses(card.category)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              <p className="text-base-content leading-relaxed pixelated text-sm">
                {card.content}
              </p>
              
              {/* Category indicator */}
              <div className="absolute top-2 right-2">
                <span className={`
                  inline-block w-3 h-3 
                  ${card.category === 'good' ? 'bg-primary' : ''}
                  ${card.category === 'bad' ? 'bg-secondary' : ''}
                  ${card.category === 'change' ? 'bg-tertiary' : ''}
                `} />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

interface ActionItemCardProps {
  actionItem: { id: string; content: string; topic: string };
}

function ActionItemCard({ actionItem }: ActionItemCardProps) {
  return (
    <motion.div
      className="
        bg-transparent p-4 sm:p-6 border-3 pixelated
        min-h-[120px] relative overflow-hidden
      "
      style={{
        borderImage: "linear-gradient(45deg, #FFD166 0%, #F79F79 25%, #D497E8 50%, #A29BFE 75%, #5DDAA4 100%) 1"
      }}
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 30,
        duration: 0.6
      }}
      layout
    >
      {/* Epic background effect */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          background: "linear-gradient(45deg, #FFD166 0%, #F79F79 25%, #D497E8 50%, #A29BFE 75%, #5DDAA4 100%)"
        }}
      />
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">⚡</span>
          <span 
            className="text-xs sm:text-sm pixelated uppercase tracking-wide font-bold"
            style={{
              background: "linear-gradient(45deg, #FFD166 0%, #F79F79 25%, #D497E8 50%, #A29BFE 75%, #5DDAA4 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent"
            }}
          >
            ACTION ITEM • {actionItem.topic}
          </span>
        </div>
        
        <p className="text-base-content leading-relaxed pixelated text-sm sm:text-base font-medium">
          {actionItem.content}
        </p>
      </div>
    </motion.div>
  );
}

export default function TopicsPage(): JSX.Element {
  const router = useRouter();
  const { 
    retroCards, 
    votes, 
    availableVotes, 
    actionItems, 
    voteForTopic, 
    addActionItem, 
    setStep 
  } = useRetroStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string>('');

  useEffect(() => {
    setStep('topics');
  }, [setStep]);

  // Group cards by topic
  const topicGroups = useMemo(() => {
    const groups: { [topic: string]: typeof retroCards } = {};
    
    retroCards.forEach(card => {
      if (card.topic) {
        if (!groups[card.topic]) {
          groups[card.topic] = [];
        }
        groups[card.topic].push(card);
      }
    });

    return Object.entries(groups).map(([topic, cards]) => ({
      topic,
      cards,
      votes: votes[topic] || 0
    }));
  }, [retroCards, votes]);

  const handleVote = (topic: string) => {
    if (availableVotes > 0) {
      voteForTopic(topic);
    }
  };

  const handleCreateActionItem = (topic: string) => {
    setSelectedTopic(topic);
    setIsModalOpen(true);
  };

  const handleSaveActionItem = (formData: FormData) => {
    const content = formData.get('content') as string;
    if (content && selectedTopic) {
      addActionItem({ content: content.trim(), topic: selectedTopic });
      setIsModalOpen(false);
      setSelectedTopic('');
    }
  };

  const handleContinue = () => {
    setStep('checkout');
    router.push('/checkout');
  };

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
        {/* Header */}
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
            TOPICS & VOTING
          </h1>
          
          <div className="flex items-center gap-2 bg-base-200/50 px-4 py-2 border border-base-300">
            <span className="text-base-content/70 pixelated text-sm">VOTES:</span>
            <span 
              className="text-lg font-bold pixelated"
              style={{
                color: availableVotes > 0 ? '#FFD166' : '#A0A0A0'
              }}
            >
              {availableVotes}/3
            </span>
          </div>
        </motion.div>

        {/* Topic Groups */}
        <motion.div className="space-y-8 flex-grow" variants={containerVariants}>
          {topicGroups.length > 0 ? (
            topicGroups.map(({ topic, cards, votes: topicVotes }) => (
              <TopicGroup
                key={topic}
                topic={topic}
                cards={cards}
                votes={topicVotes}
                canVote={availableVotes > 0}
                onVote={() => handleVote(topic)}
                onCreateActionItem={() => handleCreateActionItem(topic)}
              />
            ))
          ) : (
            <motion.div 
              className="text-center py-12"
              variants={itemVariants}
            >
              <p className="text-base-content/60 pixelated text-sm sm:text-base">
                No topics found. Go back to the real retro and click &ldquo;SORT&rdquo; to group your cards by topics.
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Action Items Section */}
        {actionItems.length > 0 && (
          <motion.div 
            className="mt-8 sm:mt-12"
            variants={itemVariants}
          >
            <h2 
              className="text-lg sm:text-xl md:text-2xl font-normal uppercase tracking-wide mb-6 pixelated text-center"
              style={{
                background: "linear-gradient(45deg, #FFD166 0%, #F79F79 25%, #D497E8 50%, #A29BFE 75%, #5DDAA4 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent"
              }}
            >
              ACTION ITEMS
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <AnimatePresence>
                {actionItems.map((item) => (
                  <ActionItemCard key={item.id} actionItem={item} />
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* Navigation */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-between mt-8 pt-6 border-t border-base-300"
          variants={itemVariants}
        >
          <motion.button
            onClick={() => {
              setStep('realRetro');
              router.push('/real-retro');
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
            ← BACK TO RETRO
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
            CHECK OUT
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Action Item Creation Modal */}
      <FormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTopic('');
        }}
        onSubmit={handleSaveActionItem}
        title={`Create Action Item - ${selectedTopic}`}
        submitLabel="Create Action Item"
      >
        <div>
          <label htmlFor="content" className="block text-base-content/70 text-sm pixelated mb-2">
            ACTION ITEM DESCRIPTION
          </label>
          <textarea
            id="content"
            name="content"
            placeholder="Describe what action should be taken..."
            className="
              w-full p-3 bg-base-100 border-2 border-base-300 
              text-base-content pixelated text-sm
              focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20
              resize-none min-h-[120px]
            "
            required
            maxLength={300}
          />
          <p className="text-xs text-base-content/50 pixelated mt-1">
            Describe a specific action that can be taken to address issues in this topic.
          </p>
        </div>
      </FormModal>
    </>
  );
}