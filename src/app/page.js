'use client';

import React, { useState, useRef, useEffect } from 'react';
import SceneContainer from '@/components/SceneContainer';
import TextOverlays from '@/components/TextOverlays';
import ScrollController from '@/components/ScrollController';

export default function Home() {
  const overlayRef = useRef(null);
  const audioCtxRef = useRef(null);
  const gainNodeRef = useRef(null);
  const oscNodesRef = useRef([]);

  const [soundActive, setSoundActive] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Initialize 3D State Object that is animated by GSAP and read by Three.js
  const state3D = useRef({
    cameraPos: { x: 0, y: 80, z: 100 },
    cameraTarget: { x: 0, y: 0, z: 0 },
    fogDensity: 0.003,
    terrainGlow: 0,
    soilOpacity: 0,
    terrainOpacity: 1,
    rootOpacity: 0,
    rootDissolve: 0,
    powderSwirl: 0,
    productOpacity: 0,
    productRotation: 0,
  }).current;

  useEffect(() => {
    setIsClient(true);
    return () => {
      // Clean up audio nodes on unmount
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  // Web Audio Procedural Sound Generator (wind rustling and soft forest drone chords)
  const toggleSound = () => {
    if (!soundActive) {
      if (!audioCtxRef.current) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioContext();
        audioCtxRef.current = ctx;

        // Master Gain Node
        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0, ctx.currentTime);
        masterGain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 1.5);
        masterGain.connect(ctx.destination);
        gainNodeRef.current = masterGain;

        // 1. Wind Noise Node (using generated white noise + bandpass filter)
        const bufferSize = ctx.sampleRate * 2;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }
        const noiseNode = ctx.createBufferSource();
        noiseNode.buffer = noiseBuffer;
        noiseNode.loop = true;

        const filterNode = ctx.createBiquadFilter();
        filterNode.type = 'bandpass';
        filterNode.frequency.setValueAtTime(250, ctx.currentTime);
        filterNode.Q.setValueAtTime(1.2, ctx.currentTime);

        // Wind gusting modulator (very slow oscillator)
        const modulatorNode = ctx.createOscillator();
        modulatorNode.frequency.setValueAtTime(0.06, ctx.currentTime);
        const modulatorGain = ctx.createGain();
        modulatorGain.gain.setValueAtTime(120, ctx.currentTime);

        modulatorNode.connect(modulatorGain);
        modulatorGain.connect(filterNode.frequency);
        noiseNode.connect(filterNode);
        filterNode.connect(masterGain);

        modulatorNode.start();
        noiseNode.start();

        // Save nodes for cleanup
        oscNodesRef.current.push(modulatorNode, noiseNode);

        // 2. Slow breathing forest drone pad chords (frequencies mapping to A major pentatonic)
        const frequencies = [110.0, 165.0, 220.0, 329.63];
        frequencies.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          const oscGain = ctx.createGain();
          oscGain.gain.setValueAtTime(0, ctx.currentTime);
          
          osc.connect(oscGain);
          oscGain.connect(masterGain);
          osc.start();
          oscNodesRef.current.push(osc);

          // Loop function to animate volume envelope of chord notes
          const modulateVolume = () => {
            if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') return;
            const now = ctx.currentTime;
            const targetVol = 0.01 + Math.random() * 0.035;
            const duration = 4.0 + Math.random() * 4.0;
            const fadeOutDuration = 4.0 + Math.random() * 4.0;
            
            oscGain.gain.linearRampToValueAtTime(targetVol, now + duration);
            oscGain.gain.linearRampToValueAtTime(0.002, now + duration + fadeOutDuration);

            // Reschedule
            setTimeout(modulateVolume, (duration + fadeOutDuration + 2) * 1000);
          };
          
          // Trigger initial modulation with stagger
          setTimeout(modulateVolume, idx * 1000);
        });

      } else {
        audioCtxRef.current.resume();
        gainNodeRef.current.gain.linearRampToValueAtTime(0.2, audioCtxRef.current.currentTime + 1.0);
      }
      setSoundActive(true);
    } else {
      // Mute audio
      if (audioCtxRef.current && gainNodeRef.current) {
        gainNodeRef.current.gain.linearRampToValueAtTime(0, audioCtxRef.current.currentTime + 1.0);
        setTimeout(() => {
          if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
            audioCtxRef.current.suspend();
          }
        }, 1100);
      }
      setSoundActive(false);
    }
  };

  return (
    <main style={{ position: 'relative', width: '100%', minHeight: '100vh', backgroundColor: '#01110a' }}>
      
      {/* Scroll Spacer in normal document flow to create scroll depth */}
      <div className="scroll-spacer" style={{ height: '1000vh', width: '100%', pointerEvents: 'none' }} />
      
      {/* 3D WebGL Canvas Layer */}
      {isClient && <SceneContainer state3D={state3D} />}

      {/* HTML Overlay Text & Cards Layer */}
      <TextOverlays 
        ref={overlayRef} 
        soundActive={soundActive} 
        onToggleSound={toggleSound} 
      />

      {/* Scroll timeline coordinator linking scrollbar to 3D state */}
      {isClient && (
        <ScrollController 
          state3D={state3D} 
          overlayRef={overlayRef} 
        />
      )}
      
    </main>
  );
}
