import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

interface CelebrationTriggerProps {
  timeOffset?: number;
}

// Resilient list of premium cached wedding march and romantic celebration direct MP3 streams
const AUDIO_SOURCES = [
  'https://archive.org/download/PachelbelCanonInD_201901/Pachelbel%20Canon%20in%20D.mp3', // Premium exquisite Canon in D wedding classic
  'https://archive.org/download/weddingmarch_202003/wedding%20march.mp3', // High fidelity Mendelssohn Wedding March
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', // Sparkling beautiful piano/guitar beat fallback
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
];

export default function CelebrationTrigger({ timeOffset = 0 }: CelebrationTriggerProps) {
  const [shouldShowOverlay, setShouldShowOverlay] = useState<boolean>(false);

  useEffect(() => {
    // 1. Confirm if current date is exactly June 21, 2026 (local client time)
    const localDate = new Date();
    const isJune21_2026 = 
      localDate.getFullYear() === 2026 &&
      localDate.getMonth() === 5 && // June is index 5
      localDate.getDate() === 21;

    // Always keep active on the date 21/06/2026 for every visitor, every refresh
    if (isJune21_2026) {
      setShouldShowOverlay(true);
    }
  }, [timeOffset]);

  // Generates sparkling physical wedding bells in real-time using browser's built-in Web Audio synthesis to bypass cold network latency
  const playInstantWeddingSynthBells = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const now = ctx.currentTime;

      // Romantic major arpeggio note frequencies: C5, E5, G5, C6, G5, C6, E6
      const bellPitches = [523.25, 659.25, 783.99, 1046.50, 783.99, 1046.50, 1318.51];
      
      bellPitches.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const subOsc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        // Pure chime bell tone mixed with a warm lower harmony
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + index * 0.18);
        
        subOsc.type = 'triangle';
        subOsc.frequency.setValueAtTime(freq / 2, now + index * 0.18);

        // Chime attack-decay volume envelope
        gain.gain.setValueAtTime(0, now + index * 0.18);
        gain.gain.linearRampToValueAtTime(0.2, now + index * 0.18 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.18 + 1.5);
        
        osc.connect(gain);
        subOsc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start(now + index * 0.18);
        subOsc.start(now + index * 0.18);
        
        osc.stop(now + index * 0.18 + 1.6);
        subOsc.stop(now + index * 0.18 + 1.6);
      });
    } catch (error) {
      console.warn('[Celebration] Synth bells skipped:', error);
    }
  };

  const triggerBrutalConfetti = () => {
    const duration = 35 * 1000; // 35 seconds of breathtaking visual celebration
    const animationEnd = Date.now() + duration;

    // Rich blazing fire colors: Gold, brilliant crimson, hot orange, spark-white, glowing amber, sunset gold
    const fieryColors = ['#ff4500', '#ff8c00', '#ffd700', '#ffffff', '#ff1493', '#ffaa00', '#e26d5c'];

    // Helper to launch a spectacular real-time firework shell with upward rocket trail and spherical starburst peak explosion
    const launchSingleFirework = (xOffset: number) => {
      const peakY = Math.random() * 0.35 + 0.15; // explode at this height (15% to 50% from top)
      const steps = 10;
      
      // 1. Sparkly rocket trail going upwards
      for (let i = 0; i < steps; i++) {
        setTimeout(() => {
          const currentY = 1.0 - (1.0 - peakY) * (i / steps);
          confetti({
            particleCount: 6,
            angle: 90,
            spread: 15,
            startVelocity: 8,
            origin: { x: xOffset, y: currentY },
            colors: ['#ffd700', '#ff4500', '#ffaa00'],
            gravity: 0.7,
            scalar: 0.9
          });
        }, i * 45);
      }

      // 2. The main explosive firework burst at the peak coordinate after the trail rises
      setTimeout(() => {
        // High-contrast vibrant colors for realistic majestic firework shells
        const fireworkPalettes = [
          ['#ff4500', '#ff8c00', '#ffd700', '#ffffff', '#ff1493'], // Fiery sunset
          ['#00ffff', '#1e90ff', '#00ff80', '#ffffff', '#ffebcd'], // Majestic neon marine
          ['#da70d6', '#8a2be2', '#ff00ff', '#ffffff', '#ffd700'], // Royal violet & sparkling imperial gold
          ['#ff0055', '#ff77aa', '#ffffea', '#ffd700', '#dbb67a']  // Rose gold glow
        ];
        
        const selectedPalette = fireworkPalettes[Math.floor(Math.random() * fireworkPalettes.length)];

        // Core starburst
        confetti({
          particleCount: 160,
          spread: 360,
          startVelocity: 42,
          origin: { x: xOffset, y: peakY },
          colors: selectedPalette,
          scalar: 1.4,
          gravity: 0.75,
          drift: (Math.random() - 0.5) * 0.4
        });

        // Outer sparkling crackle rings (leaves trailing shimmering space dust)
        confetti({
          particleCount: 80,
          spread: 360,
          startVelocity: 58,
          origin: { x: xOffset, y: peakY },
          colors: ['#ffffff', '#ffebcd', '#ffd700', '#fff8dc'],
          scalar: 1.1,
          gravity: 0.9,
          drift: (Math.random() - 0.5) * 0.6
        });
      }, steps * 45 + 50);
    };

    // 1. Initial Massive Screen-wide Open Shell
    confetti({
      particleCount: 450,
      spread: 180,
      origin: { y: 0.3 },
      colors: fieryColors,
      scalar: 1.5,
      gravity: 0.8
    });

    // 2. High-intensity Explosive Firework Scheduler (זיקוקי דינור עוצמתיים)
    // Launches a majestic climbing firework every 600ms
    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      // Launch rocket at random horizontal position
      const launchX = Math.random() * 0.76 + 0.12; // safe bounds
      launchSingleFirework(launchX);
    }, 600);

    // 3. Left and Right Majestic Ground Fire Fountains
    const fountainInterval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        clearInterval(fountainInterval);
        return;
      }

      // Left Spark Fountain
      confetti({
        particleCount: 75,
        angle: 65,
        spread: 40,
        startVelocity: 52,
        origin: { x: 0, y: 0.9 },
        colors: fieryColors,
        scalar: 1.35
      });

      // Right Spark Fountain
      confetti({
        particleCount: 75,
        angle: 115,
        spread: 40,
        startVelocity: 52,
        origin: { x: 1, y: 0.9 },
        colors: fieryColors,
        scalar: 1.35
      });
    }, 850);
  };

  const handleFirstInteraction = () => {
    // Dismiss the click/touch capture immediately so user has normal access to the site controls
    setShouldShowOverlay(false);

    // 1. Play cached wedding song / audio stream resiliently
    const audioObj = new Audio();
    audioObj.volume = 0.95;
    
    let sourceIdx = 0;
    const playResiliently = () => {
      if (sourceIdx < AUDIO_SOURCES.length) {
        const urlString = AUDIO_SOURCES[sourceIdx];
        audioObj.src = urlString;
        
        audioObj.play()
          .then(() => {
            console.log(`[Celebration] Now streaming: ${urlString}`);
          })
          .catch((playErr) => {
            console.warn(`[Celebration] Audio load failed for source: ${urlString}. Proceeding to fallback link.`, playErr);
            sourceIdx++;
            playResiliently();
          });
      }
    };

    playResiliently();

    // 2. Trigger the high-density premium visual confetti & firework extravaganza!
    triggerBrutalConfetti();
  };

  if (!shouldShowOverlay) return null;

  return (
    <div 
      id="invisible-celebration-trigger"
      onClick={handleFirstInteraction}
      onTouchStart={handleFirstInteraction}
      className="fixed inset-0 z-[120] cursor-pointer bg-transparent pointer-events-auto"
      title="חגיגות חתונה - לחצי ובואי נחגוג!"
    />
  );
}
