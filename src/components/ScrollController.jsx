import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Lenis from 'lenis';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function ScrollController({ state3D, overlayRef }) {
  useEffect(() => {
    // Check if device is mobile (portrait aspect ratio or narrow viewport)
    const isMobile = window.innerWidth < 768;

    // Define responsive camera coordinates
    const camS1 = isMobile ? { x: 0, y: 100, z: 140 } : { x: 0, y: 80, z: 100 };
    const camS2 = isMobile ? { x: 0, y: 45, z: 90 } : { x: 0, y: 35, z: 60 };
    const camS3 = isMobile ? { x: 0, y: 16, z: 30 } : { x: 0, y: 12, z: 22 };
    const camS4 = isMobile ? { x: 0, y: 8, z: 15 } : { x: 0, y: 6, z: 10 };
    const camS5 = isMobile ? { x: 0, y: -4, z: 11 } : { x: 0, y: -4, z: 8 };
    const camS6 = isMobile ? { x: 0, y: -9.5, z: 9 } : { x: 0, y: -9.5, z: 6 };
    const camS7 = isMobile ? { x: 0, y: -10.0, z: 3.5 } : { x: 0.8, y: -10.0, z: 2.2 };
    const camS8 = isMobile ? { x: 0, y: -14.0, z: 6.0 } : { x: -0.5, y: -14.0, z: 4.5 };
    const camS9 = isMobile ? { x: 0, y: -20.0, z: 6.8 } : { x: 0, y: -20.0, z: 4.8 };
    const camS10 = isMobile ? { x: -0.2, y: -19.7, z: 5.8 } : { x: -1.2, y: -19.7, z: 3.8 };
    const camS11 = isMobile ? { x: 0, y: -19.8, z: 5.6 } : { x: -1.4, y: -19.8, z: 3.6 };

    // Set initial positions
    state3D.cameraPos.x = camS1.x;
    state3D.cameraPos.y = camS1.y;
    state3D.cameraPos.z = camS1.z;

    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth exponential easing
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
    });

    // Synchronize Lenis scrolling with ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Run Lenis in the GSAP ticker
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Disable standard lag on GSAP ticker
    gsap.ticker.lagSmoothing(0);

    // 2. Select overlay text sections
    const wrapper = overlayRef.current;
    if (!wrapper) return;

    const s1 = wrapper.querySelector('#scene-1 .scene-content');
    const s2 = wrapper.querySelector('#scene-2 .scene-content');
    const s3_1 = wrapper.querySelector('#scene-3 .f-text-1');
    const s3_2 = wrapper.querySelector('#scene-3 .f-text-2');
    const s3_3 = wrapper.querySelector('#scene-3 .f-text-3');
    const s5 = wrapper.querySelector('#scene-5 .scene-content');
    const s6 = wrapper.querySelector('#scene-6 .scene-content');
    const s8 = wrapper.querySelector('#scene-8 .scene-content');
    const s9 = wrapper.querySelector('#scene-9 .scene-content');
    const s10 = wrapper.querySelector('#scene-10 .scene-content');

    // Create the master timeline linked to scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.scroll-spacer',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2, // smooth scrubbing
        invalidateOnRefresh: true,
      }
    });

    // SCENE 1 -> 2 (Sky to Descent)
    // Progress 0% to 10%
    tl.to(s1, { opacity: 0, y: -50, duration: 1 }, 0)
      .to(state3D.cameraPos, { x: camS2.x, y: camS2.y, z: camS2.z, duration: 2, ease: 'power1.inOut' }, 0)
      .to(state3D.cameraTarget, { x: 0, y: 5, z: 0, duration: 2, ease: 'power1.inOut' }, 0)
      .to(state3D, { fogDensity: 0.008, duration: 2 }, 0);

    // SCENE 2 -> 3 (Descent to Field)
    // Progress 10% to 25%
    tl.to(s2, { opacity: 1, y: 0, duration: 1 }, 1)
      .to(s2, { opacity: 0, y: -30, duration: 1 }, 2)
      .to(state3D.cameraPos, { x: camS3.x, y: camS3.y, z: camS3.z, duration: 2, ease: 'power1.inOut' }, 1)
      .to(state3D.cameraTarget, { x: 0, y: 0, z: 0, duration: 2, ease: 'power1.inOut' }, 1)
      .to(state3D, { terrainGlow: 0.8, duration: 2 }, 1.5);

    // SCENE 3 (The Field Text sequence)
    // Progress 25% to 40%
    tl.to(s3_1, { opacity: 1, duration: 1 }, 3)
      .to(s3_1, { opacity: 0, duration: 1 }, 4)
      .to(s3_2, { opacity: 1, duration: 1 }, 4.5)
      .to(s3_2, { opacity: 0, duration: 1 }, 5.5)
      .to(s3_3, { opacity: 1, duration: 1 }, 6)
      .to(s3_3, { opacity: 0, duration: 1 }, 7)
      .to(state3D.cameraPos, { x: camS4.x, y: camS4.y, z: camS4.z, duration: 4, ease: 'none' }, 3)
      .to(state3D.cameraTarget, { x: 0, y: 0, z: 0, duration: 4, ease: 'none' }, 3);

    // SCENE 4 (Earth Transition - Dive into ground)
    // Progress 40% to 50%
    tl.to(state3D.cameraPos, { x: camS5.x, y: camS5.y, z: camS5.z, duration: 2, ease: 'power2.in' }, 7.5)
      .to(state3D.cameraTarget, { x: 0, y: -5, z: 0, duration: 2, ease: 'power2.in' }, 7.5)
      .to(state3D, { terrainOpacity: 0, duration: 1.5 }, 8)
      .to(state3D, { soilOpacity: 1, duration: 1.5 }, 8)
      .to(state3D, { fogDensity: 0.04, duration: 2 }, 7.5);

    // SCENE 5 (Discovery - Underground Cavern)
    // Progress 50% to 60%
    tl.to(s5, { opacity: 1, x: 0, duration: 1.5 }, 9.5)
      .to(s5, { opacity: 0, x: -50, duration: 1.5 }, 11.5)
      .to(state3D.cameraPos, { x: camS6.x, y: camS6.y, z: camS6.z, duration: 3, ease: 'power1.out' }, 9.5)
      .to(state3D.cameraTarget, { x: 0, y: -10, z: 0, duration: 3, ease: 'power1.out' }, 9.5)
      .to(state3D, { rootOpacity: 1, duration: 2 }, 9.5);

    // SCENE 6 (The Golden Root - Close-up)
    // Progress 60% to 70%
    tl.to(s6, { opacity: 1, x: 0, duration: 1.5 }, 13.0)
      .to(s6, { opacity: 0, x: 50, duration: 1.5 }, 15.0)
      .to(state3D.cameraPos, { x: camS7.x, y: camS7.y, z: camS7.z, duration: 3, ease: 'power1.inOut' }, 13.0)
      .to(state3D.cameraTarget, { x: 0, y: -10, z: 0, duration: 3, ease: 'power1.inOut' }, 13.0);

    // SCENE 7 (Transformation - Root to Powder)
    // Progress 70% to 80%
    tl.to(state3D, { rootDissolve: 1, duration: 3, ease: 'power1.inOut' }, 16.5)
      .to(state3D, { powderSwirl: 1, duration: 3 }, 16.5)
      .to(state3D.cameraPos, { x: camS8.x, y: camS8.y, z: camS8.z, duration: 4, ease: 'power1.inOut' }, 16.5)
      .to(state3D.cameraTarget, { x: 0, y: -16.0, z: 0, duration: 4, ease: 'power1.inOut' }, 16.5)
      .to(state3D, { soilOpacity: 0.2, duration: 3 }, 16.5)
      .to(state3D, { fogDensity: 0.02, duration: 3 }, 16.5);

    // SCENE 8 (Product Reveal - Powder gathers)
    // Progress 80% to 90%
    tl.to(s8, { opacity: 1, x: 0, duration: 2 }, 20.5)
      .to(s8, { opacity: 0, x: -50, duration: 1.5 }, 23.0)
      .to(state3D, { powderSwirl: 0, duration: 3 }, 20.5)
      .to(state3D, { productOpacity: 1, duration: 2 }, 20.5)
      .to(state3D.cameraPos, { x: camS9.x, y: camS9.y, z: camS9.z, duration: 3.5, ease: 'power2.out' }, 20.5)
      .to(state3D.cameraTarget, { x: 0, y: -20.0, z: 0, duration: 3.5, ease: 'power2.out' }, 20.5);

    // SCENE 9 (Origin Verified - Cards grid)
    // Progress 90% to 95%
    tl.to(s9, { opacity: 1, y: 0, duration: 2 }, 24.5)
      .to(s9, { opacity: 0, y: -50, duration: 2 }, 27.5)
      .to(state3D.cameraPos, { x: camS10.x, y: camS10.y, z: camS10.z, duration: 4, ease: 'power1.inOut' }, 24.5)
      .to(state3D.cameraTarget, { x: isMobile ? 0 : 0.4, y: -20.0, z: 0, duration: 4, ease: 'power1.inOut' }, 24.5)
      .to(state3D, { productRotation: Math.PI * 1.5, duration: 5, ease: 'none' }, 24.0);

    // SCENE 10 (Final Frame - Massive product & CTA)
    // Progress 95% to 100%
    tl.to(s10, { opacity: 1, y: 0, duration: 2 }, 29.5)
      .to(state3D.cameraPos, { x: camS11.x, y: camS11.y, z: camS11.z, duration: 3, ease: 'power2.out' }, 29.5)
      .to(state3D.cameraTarget, { x: isMobile ? 0 : 0.3, y: -20.0, z: 0, duration: 3, ease: 'power2.out' }, 29.5)
      .to(state3D, { productRotation: Math.PI * 2.0, duration: 3, ease: 'power1.out' }, 29.5);

    // Clean up
    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [state3D, overlayRef]);

  return null;
}
