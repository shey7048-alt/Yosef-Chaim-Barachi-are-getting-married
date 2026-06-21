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

    // Rich blazing fire colors: Gold, brilliant crimson, hot orange, spark-white, glowing amber, sunset gold
    const fieryColors = ['#ff4500', '#ff8c00', '#ffd700', '#ffffff', '#ff1493', '#ffaa00', '#e26d5c'];

    // 1. Initial Mega Blazing Firework Shell
    confetti({
      particleCount: 450,
      spread: 180,
      origin: { y: 0.3 },
      colors: fieryColors,
      scalar: 1.5,
      gravity: 0.8
    });

    // 2. High-intensity Explosive Firework Launcher Loop
    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const strength = (timeLeft / duration);
      // More intense particles earlier in the launch
      const burstParticleCount = Math.floor(110 * strength) + 30;

      // Simulate a realistic glowing firework shell exploding in the sky
      const randomX = Math.random() * 0.8 + 0.1; // random spot in sky
      const randomY = Math.random() * 0.4 + 0.15;

      // Main spherical firework blast core
      confetti({
        particleCount: burstParticleCount,
        angle: 360 * Math.random(),
        spread: 360,
        startVelocity: 45,
        origin: { x: randomX, y: randomY },
        colors: fieryColors,
        scalar: 1.4,
        gravity: 0.7,
        drift: Math.random() > 0.5 ? 0.3 : -0.3
      });

      // Shimmering outer sparks of the firework shell (white-hot embers)
      if (Math.random() > 0.3) {
        confetti({
          particleCount: Math.floor(burstParticleCount / 2),
          spread: 360,
          startVelocity: 60, // Faster outer ring expanding
          origin: { x: randomX, y: randomY },
          colors: ['#ffffff', '#ffebcd', '#ffd700', '#ffe4b5'],
          scalar: 1.2,
          gravity: 0.9
        });
      }

      // Rising spark rocket trails rising from bottom to emulate real firework launches
      confetti({
        particleCount: 15,
        angle: 90 + (Math.random() * 15 - 7.5), // straight up with slight deviation
        spread: 15,
        startVelocity: 55,
        origin: { x: randomX, y: 1.0 }, // launch from bottom screen edge
        colors: ['#ffd700', '#ff4500', '#ffffff'],
        scalar: 1.0,
        gravity: 1.2
      });
    }, 550);

    // 3. Left and Right Massive Continuous Ground Fire Fountains
    const fountainInterval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        clearInterval(fountainInterval);
        return;
      }

      // Left Fire Flare (spark fountain shooting up-right)
      confetti({
        particleCount: 65,
        angle: 65,
        spread: 45,
        startVelocity: 50,
        origin: { x: 0, y: 0.9 },
        colors: fieryColors,
        scalar: 1.3
      });

      // Right Fire Flare (spark fountain shooting up-left)
      confetti({
        particleCount: 65,
        angle: 115,
        spread: 45,
        startVelocity: 50,
        origin: { x: 1, y: 0.9 },
        colors: fieryColors,
        scalar: 1.3
      });
    }, 900);
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
