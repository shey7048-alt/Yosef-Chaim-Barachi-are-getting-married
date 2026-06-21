import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

interface CelebrationTriggerProps {
  timeOffset?: number;
}

// Resilient list of premium cached wedding march and romantic celebration direct MP3 streams
const AUDIO_SOURCES = [
  'https://archive.org/download/weddingmarch_202003/wedding%20march.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
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
    const duration = 12 * 1000; // 12 seconds of breathtaking visual celebration
    const animationEnd = Date.now() + duration;

    // Majestic color scheme (Imperial gold, sparkling platinum white, peach, blush pink, violet)
    const customColors = ['#ffd700', '#ffb6c1', '#ffffff', '#fff0f5', '#dda0dd', '#dbb67a', '#f1e2cd'];

    // 1. Initial Massive Screen Burst
    confetti({
      particleCount: 350,
      spread: 160,
      origin: { y: 0.35 },
      colors: customColors,
      scalar: 1.4
    });

    // 2. High-impact Fireworks Launchers
    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const strength = (timeLeft / duration);
      const particleCount = Math.floor(80 * strength) + 15;

      // Random sparks shooting from the left hemisphere
      confetti({
        particleCount,
        angle: 50,
        spread: 360,
        startVelocity: 42,
        origin: { x: Math.random() * 0.3 + 0.1, y: Math.random() * 0.4 + 0.2 },
        colors: customColors,
        scalar: 1.3
      });

      // Random sparks shooting from the right hemisphere
      confetti({
        particleCount,
        angle: 130,
        spread: 360,
        startVelocity: 42,
        origin: { x: Math.random() * 0.3 + 0.6, y: Math.random() * 0.3 + 0.2 },
        colors: customColors,
        scalar: 1.3
      });

      // Joyous falling celebration star clusters
      if (Math.random() > 0.35) {
        confetti({
          particleCount: 40,
          spread: 90,
          origin: { x: Math.random() * 0.6 + 0.2, y: Math.random() * 0.2 },
          colors: ['#ffe4e1', '#fafad2', '#ffffea', '#f0f8ff'], 
          scalar: 1.5,
          gravity: 0.6
        });
      }
    }, 650);

    // 3. Side cannons for intense continuous volume
    const sideInterval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        clearInterval(sideInterval);
        return;
      }

      // Left-corner sweep
      confetti({
        particleCount: 45,
        angle: 55,
        spread: 55,
        origin: { x: 0, y: 0.85 },
        colors: customColors,
        scalar: 1.2
      });

      // Right-corner sweep
      confetti({
        particleCount: 45,
        angle: 125,
        spread: 55,
        origin: { x: 1, y: 0.85 },
        colors: customColors,
        scalar: 1.2
      });
    }, 1100);
  };

  const handleFirstInteraction = () => {
    // Dismiss the click/touch capture immediately so user has normal access to the site controls
    setShouldShowOverlay(false);

    // 1. Play Dynamic Synthesized physical Bell Harmonies immediately (0ms delay)
    playInstantWeddingSynthBells();

    // 2. Play cached audio backings resiliently
    const audioObj = new Audio();
    audioObj.volume = 0.9;
    audioObj.crossOrigin = 'anonymous';
    
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

    // 3. Trigger the high-density premium visual confetti & firework extravaganza!
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
