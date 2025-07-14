"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useRetroStore, RetroStep } from "@/store/retroStore";

// Icon component for pixelarticons SVGs
function PixelIcon({ name, className }: { name: string; className?: string }) {
  return (
    <img
      src={`/icons/${name}.svg`}
      alt=""
      className={`${className} pixelated`}
      style={{ imageRendering: "pixelated" }}
    />
  );
}

interface ProgressStep {
  id: RetroStep;
  label: string;
  icon: string;
  route: string;
}

const steps: ProgressStep[] = [
  {
    id: "icebreaker",
    label: "Icebreaker",
    icon: "comment",
    route: "/",
  },
  {
    id: "lastRetro",
    label: "Last Retro",
    icon: "prev",
    route: "/last-retro",
  },
  {
    id: "realRetro",
    label: "Real Retro",
    icon: "edit-box",
    route: "/real-retro",
  },
  {
    id: "topics",
    label: "Topics",
    icon: "inbox",
    route: "/topics",
  },
  {
    id: "checkout",
    label: "Checkout",
    icon: "check",
    route: "/checkout",
  },
];

export function RetroProgressBar() {
  const router = useRouter();
  const { currentStep, setStep } = useRetroStore();

  const handleStepClick = (step: ProgressStep) => {
    setStep(step.id);
    router.push(step.route);
  };

  const currentStepIndex = steps.findIndex((step) => step.id === currentStep);

  return (
    <motion.div
      className="w-full bg-base-200/30 border-b-2 border-base-300 py-4 sm:py-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-sm sm:max-w-2xl md:max-w-4xl lg:max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Mobile View - Enhanced Segmented Progress */}
        <div className="block sm:hidden">
          <div className="flex items-center justify-between mb-3">
            <div className="text-gradient-tertiary text-xs sm:text-sm pixelated font-medium">
              Step {currentStepIndex + 1} of {steps.length}
            </div>
            <div className="text-gradient-primary text-sm sm:text-base pixelated font-bold">
              {steps[currentStepIndex]?.label}
            </div>
          </div>
          
          {/* Segmented Progress Indicator */}
          <div className="flex gap-1">
            {steps.map((_, index) => {
              const isActive = index === currentStepIndex;
              const isCompleted = index < currentStepIndex;
              
              return (
                <motion.div
                  key={index}
                  className={`
                    flex-1 h-2 pixelated relative overflow-hidden
                    ${isCompleted ? 'bg-base-300' : isActive ? 'bg-base-300' : 'bg-base-300/50'}
                  `}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <motion.div
                    className="h-full"
                    style={{
                      background: isCompleted 
                        ? "linear-gradient(90deg, #F79F79 0%, #D497E8 50%, #A29BFE 100%)" // Secondary (Orchid)
                        : isActive 
                        ? "linear-gradient(90deg, #FFD166 0%, #F79F79 50%, #F786A3 100%)" // Primary (Sunset)
                        : "transparent"
                    }}
                    initial={{ width: 0 }}
                    animate={{
                      width: isCompleted ? "100%" : isActive ? "100%" : "0%",
                    }}
                    transition={{ 
                      delay: index * 0.1 + 0.2, 
                      duration: 0.5, 
                      ease: "easeInOut" 
                    }}
                  />
                  
                  {/* Active step pulse effect */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0"
                      style={{
                        background: "linear-gradient(90deg, #FFD166 0%, #F79F79 50%, #F786A3 100%)",
                      }}
                      animate={{ opacity: [0.3, 0.7, 0.3] }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Desktop View - Enhanced Full Progress Bar */}
        <div className="hidden sm:flex items-center justify-between">
          {steps.map((step, index) => {
            const isActive = step.id === currentStep;
            const isCompleted = index < currentStepIndex;

            return (
              <div key={step.id} className="flex items-center">
                {/* Step Icon Button */}
                <motion.button
                  onClick={() => handleStepClick(step)}
                  className={`
                    relative flex items-center justify-center
                    min-h-[44px] min-w-[44px] md:h-12 md:w-12 lg:h-16 lg:w-16
                    pixelated transition-all duration-300
                    ${
                      isActive
                        ? "border-gradient-primary bg-transparent scale-110 shadow-lg"
                        : isCompleted
                        ? "border-gradient-secondary bg-transparent hover:scale-105"
                        : "border-2 border-base-300 bg-transparent hover:border-base-content/50 hover:scale-105"
                    }
                  `}
                  style={{
                    background: isActive 
                      ? "linear-gradient(90deg, #FFD166 0%, #F79F79 50%, #F786A3 100%)" 
                      : isCompleted 
                      ? "linear-gradient(90deg, #F79F79 0%, #D497E8 50%, #A29BFE 100%)" 
                      : "transparent"
                  }}
                  whileHover={{ 
                    scale: isActive ? 1.15 : 1.08,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`Go to ${step.label}`}
                >
                  <PixelIcon 
                    name={step.icon} 
                    className={`
                      w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8
                      ${isActive || isCompleted ? "filter brightness-0" : ""}
                    `}
                  />

                  {/* Active step pulse ring */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 border-2 border-gradient-primary"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.8, 0.3, 0.8]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  )}

                  {/* Step number indicator */}
                  <div 
                    className={`
                      absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center
                      text-xs pixelated font-bold rounded-none
                      ${isActive 
                        ? "bg-primary text-primary-content" 
                        : isCompleted 
                        ? "bg-secondary text-secondary-content"
                        : "bg-base-300 text-base-content/70"
                      }
                    `}
                  >
                    {index + 1}
                  </div>
                </motion.button>

                {/* Step Label */}
                <div className="ml-3 mr-6">
                  <div
                    className={`
                      text-xs sm:text-sm lg:text-base pixelated font-medium
                      ${isActive 
                        ? "text-gradient-primary" 
                        : isCompleted 
                        ? "text-gradient-secondary" 
                        : "text-base-content/70"
                      }
                    `}
                  >
                    {step.label}
                  </div>
                </div>

                {/* Enhanced Connector Line */}
                {index < steps.length - 1 && (
                  <div className="flex-1 mx-4 relative">
                    <div className="h-1 bg-base-300 relative overflow-hidden">
                      <motion.div
                        className="h-full absolute inset-0"
                        style={{
                          background: isCompleted 
                            ? "linear-gradient(90deg, #F79F79 0%, #D497E8 50%, #A29BFE 100%)" // Secondary (Orchid)
                            : isActive 
                            ? "linear-gradient(90deg, #FFD166 0%, #F79F79 50%, #F786A3 100%)" // Primary (Sunset)
                            : "transparent"
                        }}
                        initial={{ width: 0 }}
                        animate={{
                          width: isCompleted ? "100%" : isActive ? "50%" : "0%",
                        }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                      />
                      
                      {/* Animated flowing dots for active connection */}
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 overflow-hidden"
                        >
                          {[...Array(3)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute w-1 h-1 bg-white rounded-none top-0"
                              animate={{
                                x: [0, "300%"],
                                opacity: [0, 1, 0]
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.6,
                                ease: "linear"
                              }}
                            />
                          ))}
                        </motion.div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
