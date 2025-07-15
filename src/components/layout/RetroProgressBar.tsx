"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useRetroStore, RetroStep } from "@/store/retroStore";

// Icon component for pixelarticons SVGs with gradient support
function PixelIcon({ name, className, style, gradientType }: { 
  name: string; 
  className?: string; 
  style?: React.CSSProperties;
  gradientType?: 'primary' | 'secondary' | 'tertiary' | 'none';
}) {
  // Define gradient colors based on design system
  const getGradientStyle = () => {
    if (gradientType === 'primary') {
      return {
        filter: 'brightness(0) saturate(100%) invert(84%) sepia(55%) saturate(405%) hue-rotate(316deg) brightness(105%) contrast(101%)', // Primary gradient approximation
      };
    } else if (gradientType === 'secondary') {
      return {
        filter: 'brightness(0) saturate(100%) invert(60%) sepia(77%) saturate(1278%) hue-rotate(254deg) brightness(98%) contrast(103%)', // Secondary gradient approximation
      };
    } else if (gradientType === 'tertiary') {
      return {
        filter: 'brightness(0) saturate(100%) invert(64%) sepia(85%) saturate(355%) hue-rotate(78deg) brightness(98%) contrast(95%)', // Tertiary gradient approximation
      };
    }
    return {};
  };

  return (
    <img
      src={`/icons/${name}.svg`}
      alt=""
      className={`${className} pixelated`}
      style={{ 
        imageRendering: "pixelated", 
        ...getGradientStyle(),
        ...style 
      }}
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

  // Helper function to get step state styling
  const getStepStyling = (index: number) => {
    const isActive = index === currentStepIndex;
    const isCompleted = index < currentStepIndex;
    const isUpcoming = index > currentStepIndex;

    if (isActive) {
      return {
        borderClass: "border-gradient-primary border-2 md:border-3",
        textClass: "text-gradient-primary",
        numberClass: "text-gradient-primary",
        iconGradientType: 'primary' as const,
        iconOpacity: 1
      };
    } else if (isCompleted) {
      return {
        borderClass: "border-gradient-secondary border-2",
        textClass: "text-gradient-secondary",
        numberClass: "text-gradient-secondary",
        iconGradientType: 'secondary' as const,
        iconOpacity: 1
      };
    } else if (isUpcoming) {
      return {
        borderClass: "border-gradient-tertiary border-1",
        textClass: "text-base-content/60",
        numberClass: "text-base-content/60",
        iconGradientType: 'tertiary' as const,
        iconOpacity: 0.6
      };
    } else {
      return {
        borderClass: "border-base-300 border-1",
        textClass: "text-base-content/40",
        numberClass: "text-base-content/40",
        iconGradientType: 'none' as const,
        iconOpacity: 0.4
      };
    }
  };

  // Helper function to get connection line styling
  const getConnectionStyling = (index: number) => {
    const isActive = index === currentStepIndex;
    const isCompleted = index < currentStepIndex;

    if (isCompleted) {
      return "linear-gradient(90deg, #F79F79 0%, #D497E8 50%, #A29BFE 100%)";
    } else if (isActive) {
      return "linear-gradient(90deg, #FFD166 0%, #F79F79 50%, #F786A3 100%)";
    } else {
      return "transparent";
    }
  };

  return (
    <motion.div
      className="w-full bg-transparent border-b-2 border-base-300/50 py-4 sm:py-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-sm sm:max-w-2xl md:max-w-4xl lg:max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Mobile View - Sleek Minimalist Progress */}
        <div className="block sm:hidden">
          <div className="flex items-center justify-between mb-4">
            <div className="text-base-content/60 text-xs pixelated font-medium">
              Step {currentStepIndex + 1} of {steps.length}
            </div>
            <div className="text-gradient-primary text-sm pixelated font-bold">
              {steps[currentStepIndex]?.label}
            </div>
          </div>
          
          {/* Sleek Progress Icons */}
          <div className="flex items-center justify-center gap-3">
            {steps.map((step, index) => {
              const styling = getStepStyling(index);
              const isActive = index === currentStepIndex;
              
              return (
                <motion.button
                  key={step.id}
                  onClick={() => handleStepClick(step)}
                  className={`
                    relative flex items-center justify-center
                    w-8 h-8 sm:w-10 sm:h-10
                    bg-transparent ${styling.borderClass}
                    pixelated transition-all duration-300
                    hover:scale-110 active:scale-95
                  `}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`Go to ${step.label}`}
                >
                  <PixelIcon 
                    name={step.icon} 
                    className="w-4 h-4"
                    gradientType={styling.iconGradientType}
                    style={{ opacity: styling.iconOpacity }}
                  />
                  
                  {/* Active step pulse effect */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 border-gradient-primary border-1"
                      animate={{ 
                        scale: [1, 1.3, 1],
                        opacity: [0.8, 0.2, 0.8]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Desktop View - Sleek Horizontal Progress */}
        <div className="hidden sm:flex items-center justify-between">
          {steps.map((step, index) => {
            const styling = getStepStyling(index);
            const isActive = index === currentStepIndex;
            const isCompleted = index < currentStepIndex;

            return (
              <div key={step.id} className="flex items-center">
                {/* Step Circle with Number/Icon */}
                <motion.button
                  onClick={() => handleStepClick(step)}
                  className={`
                    relative flex items-center justify-center
                    min-h-[44px] min-w-[44px] md:h-12 md:w-12 lg:h-14 lg:w-14
                    bg-transparent ${styling.borderClass}
                    pixelated transition-all duration-300
                    hover:scale-105 active:scale-95
                  `}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`Go to ${step.label}`}
                >
                  {/* Always show the original retro icon */}
                  <PixelIcon 
                    name={step.icon} 
                    className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6"
                    gradientType={styling.iconGradientType}
                    style={{ opacity: styling.iconOpacity }}
                  />

                  {/* Active step pulse ring */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 border-gradient-primary border-1"
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
                </motion.button>

                {/* Step Label */}
                <div className="ml-3 mr-6">
                  <div className={`text-xs sm:text-sm lg:text-base pixelated font-medium ${styling.textClass}`}>
                    {step.label}
                  </div>
                </div>

                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="flex-1 mx-4 relative">
                    <div className="h-0.5 bg-base-300/50 relative overflow-hidden">
                      <motion.div
                        className="h-full absolute inset-0"
                        style={{
                          background: getConnectionStyling(index)
                        }}
                        initial={{ width: 0 }}
                        animate={{
                          width: isCompleted ? "100%" : isActive ? "50%" : "0%",
                        }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                      />
                      
                      {/* Subtle animated pulse for active connection */}
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 overflow-hidden"
                        >
                          <motion.div
                            className="absolute w-2 h-full opacity-60"
                            style={{
                              background: "linear-gradient(90deg, transparent 0%, #FFD166 50%, transparent 100%)",
                            }}
                            animate={{
                              x: ["-100%", "200%"],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "linear"
                            }}
                          />
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
