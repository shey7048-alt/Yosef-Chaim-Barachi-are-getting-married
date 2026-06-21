import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
// @ts-ignore
import weddingInvitation from '../assets/images/wedding_invitation.jpg';

interface InvitationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InvitationModal({ isOpen, onClose }: InvitationModalProps) {
  // Pre-load the wedding invitation image immediately on mount so it opens with zero latency
  useEffect(() => {
    const img = new Image();
    img.src = weddingInvitation;
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-55 flex items-center justify-center p-2 sm:p-4">
          {/* Subtle click-to-close backdrop with no heavy colors or blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/15 cursor-zoom-out"
          />

          {/* Clean floating container with no frames, shadows, or pop-up wrappers */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              transition: { duration: 0.15, ease: "easeOut" }
            }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.1 } }}
            className="relative z-10 w-full max-w-lg max-h-[95vh] flex items-center justify-center select-none"
          >
            {/* The absolute raw original invitation image floating naturally */}
            <img
              src={weddingInvitation}
              alt="הזמנת חתונה רשמית"
              referrerPolicy="no-referrer"
              className="w-full h-auto max-h-[90vh] object-contain cursor-zoom-out"
              onClick={onClose}
            />

            {/* Minimal floating close icon, clean & lightweight */}
            <button 
              onClick={onClose}
              className="absolute -top-12 sm:top-2 left-1/2 -translate-x-1/2 sm:left-auto sm:-right-12 p-2 rounded-full bg-white/80 hover:bg-white text-stone-800 border border-stone-200/50 cursor-pointer shadow-sm transition-colors"
              title="סגור"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

