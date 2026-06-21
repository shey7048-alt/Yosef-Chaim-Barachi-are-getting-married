import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, MapPin, Heart, BookOpen, Sparkles } from 'lucide-react';

interface InvitationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InvitationModal({ isOpen, onClose }: InvitationModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Blur Background Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-stone-950/70 backdrop-blur-md cursor-pointer"
          />

          {/* Invitation Card Body */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0, 
              transition: { type: 'spring', damping: 25, stiffness: 180 } 
            }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#fbfaf7] rounded-3xl shadow-2xl border-2 border-gold-300/40 p-6 md:p-10 text-stone-900 select-none scrollbar-thin scrollbar-thumb-gold-200"
            style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(253, 251, 244, 1) 0%, rgba(246, 242, 230, 0.95) 100%)`,
              direction: 'rtl'
            }}
          >
            {/* Fine delicate decorative gold frame borders */}
            <div className="absolute inset-3 pointer-events-none border border-gold-300/30 rounded-2xl" />
            <div className="absolute inset-4 pointer-events-none border border-gold-100/50 rounded-2xl" />

            {/* Corner floral watermarks */}
            <div className="absolute top-0 right-0 w-32 h-32 opacity-15 pointer-events-none select-none overflow-hidden">
              <svg className="w-full h-full text-gold-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="0.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v13.5M12 3.75l-4.5 4.5M12 3.75l4.5 4.5M12 16.5A4.5 4.5 0 017.5 12h9M12 16.5a4.5 4.5 0 004.5-4.5h-9" />
              </svg>
            </div>
            <div className="absolute bottom-0 left-0 w-32 h-32 opacity-15 pointer-events-none select-none overflow-hidden rotate-180">
              <svg className="w-full h-full text-gold-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="0.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v13.5M12 3.75l-4.5 4.5M12 3.75l4.5 4.5M12 16.5A4.5 4.5 0 017.5 12h9M12 16.5a4.5 4.5 0 004.5-4.5h-9" />
              </svg>
            </div>

            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-6 left-6 z-10 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
              aria-label="סגירה"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header / B'SD */}
            <div className="text-center mb-6">
              <p className="text-[10px] tracking-widest text-stone-500 font-serif">בסיעתא דשמיא</p>
              <h4 className="text-stone-850 font-serif text-lg md:text-xl font-medium tracking-wide mt-2">
                "נעלה את ירושלים על ראש שמחתנו"
              </h4>
              <div className="flex justify-center items-center gap-2 mt-1.5 opacity-70">
                <span className="h-[1px] w-12 bg-gold-200"></span>
                <p className="text-xs text-gold-700 font-bold tracking-widest">בסימן טוב ובמזל טוב</p>
                <span className="h-[1px] w-12 bg-gold-200"></span>
              </div>
            </div>

            {/* Introductory Text */}
            <div className="text-center font-serif text-sm md:text-base leading-relaxed text-stone-700 max-w-lg mx-auto mb-8 space-y-1">
              <p>בשבח ובהודיה להשי"ת על כל הטוב אשר גמלנו</p>
              <p>נתכבד להזמינכם להשתתף בשמחת כלולת בנינו היקרים</p>
            </div>

            {/* Groom and Bride Name Row - Spaced dynamically exactly like the invitation card */}
            <div className="flex flex-row justify-center items-center gap-4 md:gap-8 my-8 text-center">
              {/* Groom */}
              <div className="flex-1 text-center">
                <span className="block text-2xl md:text-4xl font-serif text-stone-900 font-bold tracking-tight">
                  יהודה יוסף חיים
                </span>
                <span className="text-xs text-stone-500 font-serif block mt-1">נ"י</span>
              </div>

              {/* Connecting Word */}
              <div className="self-center flex flex-col items-center">
                <div className="w-8 h-[1px] bg-gold-300"></div>
                <span className="text-xs italic font-serif text-gold-700 font-bold my-1 bg-white/80 px-2 py-0.5 rounded-full border border-gold-100">
                  עב"ג
                </span>
                <div className="w-8 h-[1px] bg-gold-300"></div>
              </div>

              {/* Bride */}
              <div className="flex-1 text-center">
                <span className="block text-2xl md:text-4xl font-serif text-stone-900 font-bold tracking-tight">
                  חוה ברכה
                </span>
                <span className="text-xs text-stone-500 font-serif block mt-1">תחי'</span>
              </div>
            </div>

            {/* Occasion / Location Detail */}
            <div className="text-center font-serif text-sm md:text-base text-stone-800 space-y-2 max-w-lg mx-auto mb-8 border-y border-gold-100/30 py-4">
              <p>שתתקיים בעזהי"ת בשעה טובה ומוצלחת</p>
              <p className="text-md md:text-lg font-bold text-gold-900">
                ביום שני, כ"ז באב ה'תשפ"ו (10.08.2026 למנינם)
              </p>
              
              <div className="flex flex-col items-center justify-center gap-1.5 mt-3 pt-2">
                <p className="flex items-center gap-1.5 font-bold text-stone-900 text-sm md:text-base">
                  <MapPin className="w-4 h-4 text-gold-650" />
                  <span>באולמי "אספקלריא" (היכל הנגינה)</span>
                </p>
                <p className="text-xs text-stone-500">רחוב רשב"י 21, מודיעין עילית</p>
              </div>

              <div className="inline-flex items-center gap-1.5 mt-2 bg-gold-50/60 border border-gold-200/30 px-3 py-1 rounded-full text-xs font-bold text-gold-950">
                <Clock className="w-3.5 h-3.5 text-gold-650" />
                <span>קבלת פנים וחופה בשעה 18:00</span>
              </div>
            </div>

            {/* Warm Welcome */}
            <div className="text-center font-serif text-stone-700 italic text-md md:text-lg mb-8">
              "נשמח לראותכם משתתפים בשמחתנו"
            </div>

            {/* Signatures of Parents */}
            <div className="grid grid-cols-2 gap-4 text-center font-serif text-sm md:text-base border-t border-gold-100/30 pt-6 mb-8">
              <div>
                <p className="font-bold text-stone-900">אליהו פוריס ורעיתו</p>
                <p className="text-xs text-stone-500 mt-1">הורי החתן</p>
              </div>
              <div>
                <p className="font-bold text-stone-900">גבריאל י. גולדשמידט ורעיתו</p>
                <p className="text-xs text-stone-500 mt-1">הורי הכלה</p>
              </div>
            </div>

            {/* Grandparents Details */}
            <div className="bg-stone-50/60 rounded-2xl p-4 md:p-6 border border-gold-150/20 text-center font-serif text-xs md:text-sm">
              <p className="text-gold-800 font-bold mb-3 uppercase tracking-wider text-[11px]">
                גם אנו מתכבדים להזמינכם להשתתף בשמחת כלולת נכדינו היקרים:
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="font-bold text-stone-850">הרב לוי צבי פוריס ורעיתו</p>
                  <p className="font-bold text-stone-850">שרה עמנואל</p>
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-stone-850">הרב שמואל חיים גולדשמידט</p>
                  <p className="font-bold text-stone-850">הרב יום טוב ורחל לייטנר (מולר)</p>
                </div>
              </div>
            </div>

            {/* Boxed Shabbat Aliyah details */}
            <div className="mt-8 p-4 rounded-2xl border-2 border-dashed border-gold-300/30 bg-gold-50/30 text-center font-serif relative overflow-hidden">
              <div className="absolute top-0 right-0 w-8 h-8 opacity-[0.06] select-none pointer-events-none rotate-45 transform translate-x-1 -translate-y-1">
                <Sparkles className="w-full h-full text-gold-900" />
              </div>
              <h5 className="font-bold text-gold-950 text-sm mb-1.5 flex items-center justify-center gap-1.5">
                <BookOpen className="w-4 h-4 text-gold-650" />
                <span>העליה לתורה</span>
              </h5>
              <p className="text-xs text-stone-700 leading-relaxed max-w-md mx-auto">
                העליה לתורה אי"ה בשבת פרשת ראה בבית הכנסת <strong>"קהילות יעקב"</strong>.
                <br />
                התחלת התפילה בשעה <strong>7:40</strong>.
                <br />
                קידושא רבא (לגברים) לאחר התפילה.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
