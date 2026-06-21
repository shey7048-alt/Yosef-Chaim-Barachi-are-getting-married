import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

interface CelebrationTriggerProps {
  timeOffset?: number;
}

const AUDIO_SOURCES = [
  '/src/assets/images/wedding_song.mp3',
  '/src/assets/images/wedding_song.wav',
  '/src/assets/images/celebration.mp3',
  '/wedding_song.mp3',
  '/celebration.mp3',
  'https://archive.org/download/weddingmarch_202003/wedding%20march.mp3' // High-quality elegant wedding march fallback
];

export default function CelebrationTrigger({ timeOffset = 0 }: CelebrationTriggerProps) {
  const [shouldShowOverlay, setShouldShowOverlay] = useState<boolean>(false);

  useEffect(() => {
    // 1. Confirm if current date is exactly June 21, 2026
    const serverDate = new Date(Date.now() + timeOffset);
    const isJune21_2026 = 
      serverDate.getFullYear() === 2026 &&
      serverDate.getMonth() === 5 && // June is index 5
      serverDate.getDate() === 21;

    // 2. Check if the experience has already triggered in this browser session
    const hasTriggeredInSession = sessionStorage.getItem('wedding_celebration_triggered_20260621');

    if (isJune21_2026 && !hasTriggeredInSession) {
      setShouldShowOverlay(true);
    }
  }, [timeOffset]);

  const triggerBrutalConfetti = () => {
    // Massive immediate center burst with theme colors (Gold, White, Cream, Soft Rose)
    const customColors = ['#dbb67a', '#ffffff', '#faf8f4', '#f1e2cd', '#e26d5c'];
    
    confetti({
      particleCount: 220,
      spread: 120,
      origin: { y: 0.4 },
      colors: customColors,
      scalar: 1.2
    });

    // Angle cannon from bottom-left corner shooting diagonally right-up
    confetti({
      particleCount: 120,
      angle: 60,
      spread: 90,
      origin: { x: 0, y: 0.9 },
      colors: customColors,
      scalar: 1.1
    });

    // Angle cannon from bottom-right corner shooting diagonally left-up
    confetti({
      particleCount: 120,
      angle: 120,
      spread: 90,
      origin: { x: 1, y: 0.9 },
      colors: customColors,
      scalar: 1.1
    });

    // Continuous rain over 3.5 seconds
    const duration = 3500;
    const animationEnd = Date.now() + duration;

    const intervalId = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(intervalId);
        return;
      }

      const randomX = Math.random();
      confetti({
        particleCount: 3,
        angle: 270, // Rain downwards
        spread: 40,
        origin: { x: randomX, y: -0.1 },
        colors: customColors,
        startVelocity: 15,
        gravity: 0.8
      });
    }, 50);
  };

  const handleFirstInteraction = () => {
    // Prevent subsequent double triggers
    setShouldShowOverlay(false);
    sessionStorage.setItem('wedding_celebration_triggered_20260621', 'true');

    // 1. Play Audio with resilient fallback chains
    const audio = new Audio();
    audio.volume = 0.8;
    
    let sourceIndex = 0;
    const playNextSource = () => {
      if (sourceIndex < AUDIO_SOURCES.length) {
        const sourceUrl = AUDIO_SOURCES[sourceIndex];
        audio.src = sourceUrl;
        
        audio.play()
          .then(() => {
            console.log(`[Celebration] Successfully playing audio: ${sourceUrl}`);
          })
          .catch((err) => {
            console.warn(`[Celebration] Play failed for source: ${sourceUrl}. Trying next fallback.`, err);
            sourceIndex++;
            playNextSource();
          });
      }
    };

    playNextSource();

    // 2. Trigger high-impact, brutal screen confetti
    triggerBrutalConfetti();
  };

  if (!shouldShowOverlay) return null;

  return (
    <div 
      id="invisible-celebration-trigger"
      onClick={handleFirstInteraction}
      onTouchStart={handleFirstInteraction}
      className="fixed inset-0 z-[120] cursor-pointer bg-transparent pointer-events-auto"
      title="לחץ כאן כדי להתחיל את חגיגת החתונה"
    />
  );
}
