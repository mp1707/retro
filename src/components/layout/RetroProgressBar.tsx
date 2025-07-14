"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useRetroStore, RetroStep } from "@/store/retroStore";

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
    icon: "💬",
    route: "/",
  },
  {
    id: "lastRetro",
    label: "Last Retro",
    icon: "⏪",
    route: "/last-retro",
  },
  {
    id: "realRetro",
    label: "Real Retro",
    icon: "📝",
    route: "/real-retro",
  },
  {
    id: "topics",
    label: "Topics",
    icon: "🗳️",
    route: "/topics",
  },
  {
    id: "checkout",
    label: "Checkout",
    icon: "✅",
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
      className="w-full bg-base-200/50 border-b border-base-300 py-4 sm:py-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-sm sm:max-w-2xl md:max-w-4xl lg:max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Mobile View - Simplified */}
        <div className="block sm:hidden">
          <div className="flex items-center justify-between">
            <div className="text-base-content/70 text-xs pixelated">
              Step {currentStepIndex + 1} of {steps.length}
            </div>
            <div className="text-base-content text-sm pixelated font-bold">
              {steps[currentStepIndex]?.label}
            </div>
          </div>
          <div className="mt-2 w-full bg-base-300 h-1">
            <motion.div
              className="h-full"
              style={{
                background:
                  "linear-gradient(90deg, #FFD166 0%, #F79F79 50%, #F786A3 100%)",
              }}
              initial={{ width: 0 }}
              animate={{
                width: `${((currentStepIndex + 1) / steps.length) * 100}%`,
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
        </div>

        {/* Desktop View - Full Progress Bar */}
        <div className="hidden sm:flex items-center justify-between">
          {steps.map((step, index) => {
            const isActive = step.id === currentStep;
            const isCompleted = index < currentStepIndex;

            return (
              <div key={step.id} className="flex items-center">
                {/* Step Icon */}
                <motion.button
                  onClick={() => handleStepClick(step)}
                  className={`
                    relative flex items-center justify-center
                    min-h-[44px] min-w-[44px] md:h-12 md:w-12 lg:h-14 lg:w-14
                    rounded-none border-2 pixelated
                    transition-all duration-200
                    ${
                      isActive
                        ? "border-primary bg-primary/20 text-primary scale-110"
                        : isCompleted
                        ? "border-base-content/60 bg-base-content/10 text-base-content/80 hover:border-base-content hover:bg-base-content/20"
                        : "border-base-300 bg-base-100 text-base-content/50 hover:border-base-content/50"
                    }
                  `}
                  whileHover={{ scale: isActive ? 1.1 : 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`Go to ${step.label}`}
                >
                  <span className="text-lg md:text-xl lg:text-2xl">
                    {step.icon}
                  </span>

                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 }}
                    />
                  )}
                </motion.button>

                {/* Step Label */}
                <div className="ml-3 mr-6">
                  <div
                    className={`
                    text-xs sm:text-sm lg:text-base pixelated font-medium
                    ${isActive ? "text-primary" : "text-base-content/70"}
                  `}
                  >
                    {step.label}
                  </div>
                </div>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="flex-1 mx-4">
                    <div className="h-0.5 bg-base-300 relative">
                      <motion.div
                        className="h-full"
                        style={{
                          background:
                            "linear-gradient(90deg, #FFD166 0%, #F79F79 50%, #F786A3 100%)",
                        }}
                        initial={{ width: 0 }}
                        animate={{
                          width: isCompleted ? "100%" : isActive ? "50%" : "0%",
                        }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                      />
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
