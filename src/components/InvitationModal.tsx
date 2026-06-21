import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, FileText, Sparkles } from 'lucide-react';

interface InvitationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Support multiple common paths to auto-resolve what they uploaded to GitHub/Vercel
const POTENTIAL_PATHS = [
  '/src/assets/images/wedding_invitation.jpg',
  '/src/assets/images/wedding_invitation.png',
  '/src/assets/images/wedding_invitation.jpeg',
  '/src/assets/images/invitation.jpg',
  '/src/assets/images/invitation.png',
  '/src/assets/images/invitation.jpeg',
  '/src/assets/images/wedding_chuppah_1781997597704.jpg' // In case they overwrote the original chuppah background
];

export default function InvitationModal({ isOpen, onClose }: InvitationModalProps) {
  const [pathIndex, setPathIndex] = useState(0);
  const [hasError, setHasError] = useState(false);

  const handleImageError = () => {
    if (pathIndex < POTENTIAL_PATHS.length - 1) {
      setPathIndex(prev => prev + 1);
    } else {
      setHasError(true);
    }
  };

  const currentPath = POTENTIAL_PATHS[pathIndex];

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
                  src={currentPath}
                  alt="הזמנת חתונה"
                  onError={handleImageError}
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
                  הקובץ ייטען כאן בצורה מושלמת כאשר הוא יועלה לשרת.
                </p>
                
                <div className="p-4 bg-stone-50 rounded-xl border border-stone-200/30 text-right max-w-sm mx-auto text-xs space-y-2">
                  <p className="font-bold text-stone-800 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-gold-650" />
                    <span>הנחיות להעלאת הקובץ:</span>
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-stone-600 pr-1">
                    <li>ודא ששם הקובץ שהעלית ל-GitHub הוא בדיוק <code className="font-mono bg-stone-200/60 px-1 rounded text-red-700">wedding_invitation.jpg</code></li>
                    <li>הקובץ צריך להיות בתוך התיקייה <code className="font-mono bg-stone-200/60 px-1 rounded text-stone-800">src/assets/images/</code></li>
                    <li>אנו תומכים בסיומות נפוצות: <code className="font-mono bg-stone-200/40 px-1 rounded">.jpg</code>, <code className="font-mono bg-stone-200/40 px-1 rounded">.jpeg</code>, או <code className="font-mono bg-stone-200/40 px-1 rounded">.png</code>.</li>
                  </ul>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
