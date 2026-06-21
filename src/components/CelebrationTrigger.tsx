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
    // 1. Confirm if current date is exactly June 21, 2026 (local time)
    const localDate = new Date();
    const isJune21_2026 = 
      localDate.getFullYear() === 2026 &&
      localDate.getMonth() === 5 && // June is index 5
      localDate.getDate() === 21;

    // Trigger on June 21, 2026 on every single fresh load / return
    if (isJune21_2026) {
      setShouldShowOverlay(true);
    }
  }, [timeOffset]);

  const triggerBrutalConfetti = () => {
    const duration = 12 * 1000; // 12 seconds of spectacular celebration
    const animationEnd = Date.now() + duration;

    // Premium majestic wedding color palette (Rich gold, soft rose, white, ivory, bronze, peach)
    const customColors = ['#ffd700', '#ffb6c1', '#ffffff', '#fff0f5', '#dda0dd', '#dbb67a', '#f1e2cd'];

    // 1. Huge Initial Impact Blast
    confetti({
      particleCount: 300,
      spread: 150,
      origin: { y: 0.4 },
      colors: customColors,
      scalar: 1.3
    });

    // 2. Continuous Fireworks and Trinkets scheduler
    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = 70 * (timeLeft / duration);

      // Left Fireworks launcher
      confetti({
        particleCount,
        angle: 45,
        spread: 360,
        startVelocity: 40,
        origin: { x: Math.random() * 0.3 + 0.1, y: Math.random() * 0.4 + 0.2 },
        colors: customColors,
        scalar: 1.2
      });

      // Right Fireworks launcher
      confetti({
        particleCount,
        angle: 135,
        spread: 360,
        startVelocity: 40,
        origin: { x: Math.random() * 0.3 + 0.6, y: Math.random() * 0.4 + 0.2 },
        colors: customColors,
        scalar: 1.2
      });

      // Ambient mid-sky sparkling star trinkets
      if (Math.random() > 0.4) {
        confetti({
          particleCount: 30,
          spread: 80,
          origin: { x: Math.random() * 0.4 + 0.3, y: Math.random() * 0.3 + 0.1 },
          colors: ['#ffe4e1', '#fafad2', '#e0ffff', '#fff5ee'], // shimmering soft star trinkets
          scalar: 1.4
        });
      }
    }, 700);

    // 3. Continuous bottom side-cannons shooting upwards for extreme density
    const sideInterval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        clearInterval(sideInterval);
        return;
      }

      // Left side shooting diagonally up-right
      confetti({
        particleCount: 40,
        angle: 60,
        spread: 60,
        origin: { x: 0, y: 0.8 },
        colors: customColors,
        scalar: 1.2
      });

      // Right side shooting diagonally up-left
      confetti({
        particleCount: 40,
        angle: 120,
        spread: 60,
        origin: { x: 1, y: 0.8 },
        colors: customColors,
        scalar: 1.2
      });
    }, 1200);
  };

  const handleFirstInteraction = () => {
    // Hide the invisible overlay immediately so they can click other pages
    setShouldShowOverlay(false);

    // 1. Play Audio with fallback sequence
    const audio = new Audio();
    audio.volume = 0.85;
    
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

    // 2. Launch the astonishing multi-cannon fireworks & confetti display!
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
