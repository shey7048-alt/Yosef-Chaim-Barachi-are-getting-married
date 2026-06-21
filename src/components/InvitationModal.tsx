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
          {/* Smooth, high-performance dark overlay with subtle backdrop-blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-sm cursor-zoom-out"
          />

          {/* Beautifully centered image with lightweight spring exit to prevent lagging */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              transition: { duration: 0.18, ease: "easeOut" }
            }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.12 } }}
            className="relative z-10 w-full max-w-lg max-h-[92vh] flex items-center justify-center select-none"
          >
            {/* The actual original uploaded invitation image */}
            <img
              src={weddingInvitation}
              alt="הזמנת חתונה רשמית"
              referrerPolicy="no-referrer"
              className="w-full h-auto max-h-[85vh] object-contain rounded-xl shadow-2xl cursor-zoom-out border border-white/10"
              onClick={onClose}
            />

            {/* Float Close Button for touch devices or immediate accessibility */}
            <button 
              onClick={onClose}
              className="absolute -bottom-14 sm:top-2 left-1/2 -translate-x-1/2 sm:left-auto sm:-right-14 p-2.5 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 transition-colors text-white border border-white/20 cursor-pointer shadow-lg"
              title="סגור"
            >
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

