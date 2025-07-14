"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  showCloseButton?: boolean;
}

export function Modal({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'md',
  showCloseButton = true 
}: ModalProps): JSX.Element | null {
  
  if (!isOpen) return null;

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-full max-w-sm';
      case 'md':
        return 'w-full max-w-md';
      case 'lg':
        return 'w-full max-w-lg';
      default:
        return 'w-full max-w-md';
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleBackdropClick}
        aria-modal="true"
        role="dialog"
        aria-labelledby="modal-title"
      >
        <motion.div
          className={`
            bg-base-100 border-2 border-base-300 pixelated
            ${getSizeClasses()}
          `}
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-base-300">
            <h2 
              id="modal-title"
              className="text-lg sm:text-xl font-medium text-base-content pixelated uppercase tracking-wide"
            >
              {title}
            </h2>
            
            {showCloseButton && (
              <motion.button
                onClick={onClose}
                className="
                  ml-4 p-2 text-base-content/70 hover:text-base-content 
                  hover:bg-base-200 transition-colors pixelated
                  min-h-[44px] min-w-[44px] flex items-center justify-center
                "
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Close modal"
              >
                ✕
              </motion.button>
            )}
          </div>

          {/* Modal Content */}
          <div className="p-4 sm:p-6">
            {children}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Form-specific modal for common use cases
interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => void;
  title: string;
  submitLabel?: string;
  cancelLabel?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export function FormModal({
  isOpen,
  onClose,
  onSubmit,
  title,
  submitLabel = 'Save',
  cancelLabel = 'Cancel',
  children,
  size = 'md'
}: FormModalProps): JSX.Element | null {
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit(formData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size={size} showCloseButton={false}>
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        {/* Form Content */}
        <div>
          {children}
        </div>
        
        {/* Form Actions */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end pt-4 border-t border-base-300">
          <motion.button
            type="button"
            onClick={onClose}
            className="
              order-2 sm:order-1 w-full sm:w-auto
              px-4 sm:px-6 py-3 bg-transparent border-2 border-base-300 
              text-base-content hover:border-base-content/80 hover:text-base-content
              pixelated text-sm sm:text-base transition-colors 
              min-h-[44px] flex items-center justify-center
            "
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {cancelLabel}
          </motion.button>
          
          <motion.button
            type="submit"
            className="
              order-1 sm:order-2 w-full sm:w-auto
              px-4 sm:px-6 py-3 bg-primary text-primary-content 
              hover:bg-primary/90 pixelated text-sm sm:text-base 
              transition-colors min-h-[44px] flex items-center justify-center
            "
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {submitLabel}
          </motion.button>
        </div>
      </form>
    </Modal>
  );
}

// Confirmation modal for destructive actions
interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'default' | 'danger';
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'default'
}: ConfirmModalProps): JSX.Element | null {
  
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const getConfirmButtonClasses = () => {
    const baseClasses = "order-1 sm:order-2 w-full sm:w-auto px-4 sm:px-6 py-3 pixelated text-sm sm:text-base transition-colors min-h-[44px] flex items-center justify-center";
    
    return variant === 'danger'
      ? `${baseClasses} bg-error text-error-content hover:bg-error/90`
      : `${baseClasses} bg-primary text-primary-content hover:bg-primary/90`;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <div className="space-y-4 sm:space-y-6">
        <p className="text-base-content pixelated text-sm sm:text-base leading-relaxed">
          {message}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end pt-4 border-t border-base-300">
          <motion.button
            onClick={onClose}
            className="
              order-2 sm:order-1 w-full sm:w-auto
              px-4 sm:px-6 py-3 bg-transparent border-2 border-base-300 
              text-base-content hover:border-base-content/80 hover:text-base-content
              pixelated text-sm sm:text-base transition-colors 
              min-h-[44px] flex items-center justify-center
            "
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {cancelLabel}
          </motion.button>
          
          <motion.button
            onClick={handleConfirm}
            className={getConfirmButtonClasses()}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {confirmLabel}
          </motion.button>
        </div>
      </div>
    </Modal>
  );
}