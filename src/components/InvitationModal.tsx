import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, FileText, Sparkles } from 'lucide-react';
// @ts-ignore
import weddingInvitation from '../assets/images/wedding_invitation.jpg';

interface InvitationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InvitationModal({ isOpen, onClose }: InvitationModalProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-55 flex items-center justify-center p-4">
          {/* Subtle slow fade-in overlay with beautiful backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-stone-900/75 backdrop-blur-md cursor-pointer"
          />

          {/* Invitation Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0, 
              transition: { type: 'spring', damping: 28, stiffness: 220 } 
            }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-[#faf8f4] rounded-2xl shadow-2xl border border-stone-200/50 p-4 md:p-6 text-stone-850 select-none scrollbar-none"
            style={{
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3), inset 0 0 40px rgba(255, 255, 255, 0.5)',
              direction: 'rtl'
            }}
          >
            {/* Fine border lines wrapping the paper content */}
            <div className="absolute inset-2 pointer-events-none border border-stone-200/40 rounded-xl" />
            
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-4 left-4 z-20 p-2 rounded-full bg-white/80 hover:bg-stone-100 transition-colors text-stone-600 hover:text-stone-900 shadow-sm cursor-pointer"
              title="סגור"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Display original image of the invitation */}
            {!hasError ? (
              <div className="flex justify-center items-center w-full rounded-lg overflow-hidden border border-stone-200/40 bg-white">
                <img
                  src={weddingInvitation}
                  alt="הזמנת חתונה"
                  onError={() => setHasError(true)}
                  referrerPolicy="no-referrer"
                  className="w-full h-auto max-h-[80vh] object-contain"
                />
              </div>
            ) : (
              // Beautiful elegant fallback if none of the images exist in progress yet
              <div className="py-12 px-6 text-center font-serif">
                <div className="w-16 h-16 mx-auto bg-gold-50 rounded-full flex items-center justify-center border border-gold-200/40 mb-4 animate-pulse">
                  <FileText className="w-8 h-8 text-gold-600" />
                </div>
                <h4 className="text-stone-850 text-lg font-bold mb-2">קובץ ההזמנה המקורית</h4>
                <p className="text-stone-650 text-xs md:text-sm leading-relaxed max-w-xs mx-auto mb-6">
                  אנא ודא שקובץ ההזמנה הועלה כראוי לשרת.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
