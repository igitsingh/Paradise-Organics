import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollController({ state3D, overlayRef }) {
  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    // ─── Camera Keyframes ───────────────────────────────────
    const camS1  = isMobile ? { x: 0, y: 100, z: 140 } : { x: 0, y: 80, z: 100 };
    const camS2  = isMobile ? { x: 0, y: 45,  z: 90  } : { x: 0, y: 35, z: 60  };
    const camS3  = isMobile ? { x: 0, y: 16,  z: 30  } : { x: 0, y: 12, z: 22  };
    const camS4  = isMobile ? { x: 0, y: 8,   z: 15  } : { x: 0, y: 6,  z: 10  };
    const camS5  = isMobile ? { x: 0, y: -4,  z: 11  } : { x: 0, y: -4, z: 8   };
    const camS6  = isMobile ? { x: 0, y: -9.5,z: 9   } : { x: 0, y: -9.5,z: 6  };
    const camS7  = isMobile ? { x: 0, y:-10.0,z: 3.5 } : { x: 0.8,y:-10.0,z: 2.2};
    const camS8  = isMobile ? { x: 0, y:-14.0,z: 6.0 } : { x:-0.5,y:-14.0,z: 4.5};
    const camS9  = isMobile ? { x: 0, y:-20.0,z: 6.8 } : { x: 0, y:-20.0,z: 4.8 };
    const camS10 = isMobile ? { x:-0.2,y:-19.7,z:5.8 } : { x:-1.2,y:-19.7,z:3.8 };
    const camS11 = isMobile ? { x: 0, y:-19.8,z:5.6  } : { x:-1.4,y:-19.8,z:3.6 };

    state3D.cameraPos.x = camS1.x;
    state3D.cameraPos.y = camS1.y;
    state3D.cameraPos.z = camS1.z;

    // ─── Lenis Smooth Scroll ─────────────────────────────────
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    // ─── Element Refs ────────────────────────────────────────
    const wrapper = overlayRef.current;
    if (!wrapper) return;

    // Scene 1
    const s1Prelude1  = wrapper.querySelector('.s1-prelude');
    const s1Prelude2  = wrapper.querySelector('.s1-prelude-2');
    const s1Brand     = wrapper.querySelector('.s1-brand');
    const s1Tagline   = wrapper.querySelector('.s1-tagline');
    const s1Cue       = wrapper.querySelector('.s1-cue');

    // Scene 2
    const s2Content   = wrapper.querySelector('#scene-2 .scene-content');
    const s2Line1     = wrapper.querySelector('.s2-line-1');
    const s2Line2     = wrapper.querySelector('.s2-line-2');
    const s2Line3     = wrapper.querySelector('.s2-line-3');
    const tw1         = wrapper.querySelector('.tw-1');
    const tw2         = wrapper.querySelector('.tw-2');
    const tw3         = wrapper.querySelector('.tw-3');
    const tw4         = wrapper.querySelector('.tw-4');
    const s2Hook      = wrapper.querySelector('.s2-hook');
    const s2Hook2     = wrapper.querySelector('.s2-hook-2');
    const s2Until     = wrapper.querySelector('.s2-until');

    // Scene 3
    const s3Content   = wrapper.querySelector('#scene-3 .scene-content');
    const fText1      = wrapper.querySelector('.f-text-1');
    const fText1b     = wrapper.querySelector('.f-text-1b');
    const fText2      = wrapper.querySelector('.f-text-2');
    const fText2b     = wrapper.querySelector('.f-text-2b');
    const fText3      = wrapper.querySelector('.f-text-3');
    const fText3b     = wrapper.querySelector('.f-text-3b');
    const fText4      = wrapper.querySelector('.f-text-4');
    const fText4b     = wrapper.querySelector('.f-text-4b');
    const fText5      = wrapper.querySelector('.f-text-5');

    // Scene 4
    const s4Bridge    = wrapper.querySelector('.s4-bridge');

    // Scene 5, 6, 8
    const s5          = wrapper.querySelector('#scene-5 .scene-content');
    const s6          = wrapper.querySelector('#scene-6 .scene-content');
    const s8          = wrapper.querySelector('#scene-8 .scene-content');

    // Scene 9, 10
    const s9          = wrapper.querySelector('#scene-9 .scene-content');
    const s10         = wrapper.querySelector('#scene-10 .scene-content');

    // ─── Initial State Setup for staggered text elements ────
    // All text that enters via scrollTrigger timeline starts below
    gsap.set([
      s2Line1, s2Line2, s2Line3,
      tw1, tw2, tw3, tw4,
      s2Hook, s2Hook2, s2Until,
    ], { opacity: 0, y: 20 });

    gsap.set([
      fText1, fText1b, fText2, fText2b,
      fText3, fText3b, fText4, fText4b, fText5,
    ], { opacity: 0, y: 16 });

    gsap.set(s4Bridge, { opacity: 0, y: 16 });


    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.scroll-spacer',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.4,
        invalidateOnRefresh: true,
      }
    });

    // ───────────────────────────────────────────────────────────
    // SCENE 1 — Hero initial reveal (animate in on page load, not scroll)
    // Staggered entry before scroll begins
    // ───────────────────────────────────────────────────────────
    gsap.set([s1Prelude1, s1Prelude2, s1Brand, s1Tagline, s1Cue], { opacity: 0, y: 20 });
    gsap.to(s1Prelude1, { opacity: 1, y: 0, duration: 2.0, delay: 0.6, ease: 'power2.out' });
    gsap.to(s1Prelude2, { opacity: 1, y: 0, duration: 2.0, delay: 1.3, ease: 'power2.out' });
    gsap.to(s1Brand,    { opacity: 1, y: 0, duration: 1.8, delay: 2.4, ease: 'power2.out' });
    gsap.to(s1Tagline,  { opacity: 1, y: 0, duration: 1.5, delay: 3.2, ease: 'power2.out' });
    gsap.to(s1Cue,      { opacity: 0.35, y: 0, duration: 1.2, delay: 4.0, ease: 'power2.out' });

    // Scene 1 fades out on first scroll
    tl.to('#scene-1 .scene-content', { opacity: 0, y: -40, duration: 1 }, 0)
      .to(state3D.cameraPos, { x: camS2.x, y: camS2.y, z: camS2.z, duration: 2, ease: 'power1.inOut' }, 0)
      .to(state3D.cameraTarget, { x: 0, y: 5, z: 0, duration: 2, ease: 'power1.inOut' }, 0)
      .to(state3D, { fogDensity: 0.008, duration: 2 }, 0);

    // ───────────────────────────────────────────────────────────
    // SCENE 2 — Civilisation Argument
    // ───────────────────────────────────────────────────────────
    tl.to(s2Content, { opacity: 1, duration: 0.5 }, 1)
      // Sequential reveal of editorial lines
      .to(s2Line1, { opacity: 1, y: 0, duration: 1 }, 1.2)
      .to(s2Line1, { opacity: 0, y: -15, duration: 0.8 }, 2.4)
      .to(s2Line2, { opacity: 1, y: 0, duration: 1 }, 2.6)
      .to(s2Line2, { opacity: 0, y: -15, duration: 0.8 }, 3.8)
      .to(s2Line3, { opacity: 1, y: 0, duration: 1 }, 4.0)
      .to(s2Line3, { opacity: 0, y: -15, duration: 0.8 }, 5.2)
      // Terroir words — cascade in then out
      .to(tw1, { opacity: 1, y: 0, duration: 0.8 }, 5.4)
      .to(tw1, { opacity: 0, duration: 0.5 }, 6.0)
      .to(tw2, { opacity: 1, y: 0, duration: 0.8 }, 6.1)
      .to(tw2, { opacity: 0, duration: 0.5 }, 6.7)
      .to(tw3, { opacity: 1, y: 0, duration: 0.8 }, 6.8)
      .to(tw3, { opacity: 0, duration: 0.5 }, 7.4)
      .to(tw4, { opacity: 1, y: 0, duration: 0.8 }, 7.5)
      .to(tw4, { opacity: 0, duration: 0.5 }, 8.1)
      // Hook lines
      .to(s2Hook,  { opacity: 1, y: 0, duration: 1 }, 8.3)
      .to(s2Hook2, { opacity: 1, y: 0, duration: 1 }, 9.0)
      .to([s2Hook, s2Hook2], { opacity: 0, y: -15, duration: 0.8 }, 10.2)
      .to(s2Until, { opacity: 1, y: 0, duration: 1 }, 10.5)
      .to(s2Content, { opacity: 0, duration: 0.8 }, 11.5)
      // Camera descent
      .to(state3D.cameraPos, { x: camS3.x, y: camS3.y, z: camS3.z, duration: 5, ease: 'power1.inOut' }, 1.5)
      .to(state3D.cameraTarget, { x: 0, y: 0, z: 0, duration: 5, ease: 'power1.inOut' }, 1.5)
      .to(state3D, { terrainGlow: 0.8, duration: 3 }, 3.5);

    // ───────────────────────────────────────────────────────────
    // SCENE 3 — The Terroir
    // ───────────────────────────────────────────────────────────
    tl.to(s3Content, { opacity: 1, duration: 0.5 }, 12.0)
      .to(fText1,  { opacity: 1, y: 0, duration: 1 }, 12.2)
      .to(fText1b, { opacity: 1, y: 0, duration: 1 }, 12.8)
      .to([fText1, fText1b], { opacity: 0, y: -12, duration: 0.8 }, 14.0)
      .to(fText2,  { opacity: 1, y: 0, duration: 1 }, 14.2)
      .to(fText2b, { opacity: 1, y: 0, duration: 1 }, 14.8)
      .to([fText2, fText2b], { opacity: 0, y: -12, duration: 0.8 }, 16.0)
      .to(fText3,  { opacity: 1, y: 0, duration: 1 }, 16.2)
      .to(fText3b, { opacity: 1, y: 0, duration: 1 }, 17.0)
      .to([fText3, fText3b], { opacity: 0, y: -12, duration: 0.8 }, 18.2)
      .to(fText4,  { opacity: 1, y: 0, duration: 1 }, 18.4)
      .to(fText4b, { opacity: 1, y: 0, duration: 1 }, 19.0)
      .to([fText4, fText4b], { opacity: 0, y: -12, duration: 0.8 }, 20.2)
      .to(fText5,  { opacity: 1, y: 0, duration: 1 }, 20.4)
      .to(s3Content, { opacity: 0, duration: 0.8 }, 22.5)
      // Camera approach to field
      .to(state3D.cameraPos, { x: camS4.x, y: camS4.y, z: camS4.z, duration: 6, ease: 'none' }, 12.0)
      .to(state3D.cameraTarget, { x: 0, y: 0, z: 0, duration: 6, ease: 'none' }, 12.0);

    // ───────────────────────────────────────────────────────────
    // SCENE 4 — Earth Transition (Bridge + Dive underground)
    // ───────────────────────────────────────────────────────────
    tl.to('#scene-4 .scene-content', { opacity: 1, duration: 0.5 }, 23.0)
      .to(s4Bridge, { opacity: 1, y: 0, duration: 1 }, 23.2)
      .to(s4Bridge, { opacity: 0, y: -15, duration: 0.8 }, 24.8)
      .to('#scene-4 .scene-content', { opacity: 0, duration: 0.5 }, 25.2)
      .to(state3D.cameraPos, { x: camS5.x, y: camS5.y, z: camS5.z, duration: 2.5, ease: 'power2.in' }, 23.5)
      .to(state3D.cameraTarget, { x: 0, y: -5, z: 0, duration: 2.5, ease: 'power2.in' }, 23.5)
      .to(state3D, { terrainOpacity: 0, duration: 2 }, 24.0)
      .to(state3D, { soilOpacity: 1, duration: 2 }, 24.0)
      .to(state3D, { fogDensity: 0.04, duration: 2 }, 23.5);

    // ───────────────────────────────────────────────────────────
    // SCENE 5 — Discovery (Golden Root underground)
    // ───────────────────────────────────────────────────────────
    tl.to(s5, { opacity: 1, x: 0, duration: 1.5 }, 26.5)
      .to(s5, { opacity: 0, x: -50, duration: 1.2 }, 29.5)
      .to(state3D.cameraPos, { x: camS6.x, y: camS6.y, z: camS6.z, duration: 3, ease: 'power1.out' }, 26.5)
      .to(state3D.cameraTarget, { x: 0, y: -10, z: 0, duration: 3, ease: 'power1.out' }, 26.5)
      .to(state3D, { rootOpacity: 1, duration: 2 }, 26.5);

    // ───────────────────────────────────────────────────────────
    // SCENE 6 — Root close-up (Rare by Nature)
    // ───────────────────────────────────────────────────────────
    tl.to(s6, { opacity: 1, x: 0, duration: 1.5 }, 31.0)
      .to(s6, { opacity: 0, x: 50, duration: 1.2 }, 34.0)
      .to(state3D.cameraPos, { x: camS7.x, y: camS7.y, z: camS7.z, duration: 3, ease: 'power1.inOut' }, 31.0)
      .to(state3D.cameraTarget, { x: 0, y: -10, z: 0, duration: 3, ease: 'power1.inOut' }, 31.0);

    // ───────────────────────────────────────────────────────────
    // SCENE 7 — Transformation (Visual alchemy — breathing space)
    // ───────────────────────────────────────────────────────────
    tl.to(state3D, { rootDissolve: 1, duration: 3, ease: 'power1.inOut' }, 35.5)
      .to(state3D, { powderSwirl: 1, duration: 3 }, 35.5)
      .to(state3D.cameraPos, { x: camS8.x, y: camS8.y, z: camS8.z, duration: 4, ease: 'power1.inOut' }, 35.5)
      .to(state3D.cameraTarget, { x: 0, y: -16.0, z: 0, duration: 4, ease: 'power1.inOut' }, 35.5)
      .to(state3D, { soilOpacity: 0.2, duration: 3 }, 35.5)
      .to(state3D, { fogDensity: 0.02, duration: 3 }, 35.5);

    // ───────────────────────────────────────────────────────────
    // SCENE 8 — Product Reveal (Every Number. A Name Behind It.)
    // ───────────────────────────────────────────────────────────
    tl.to(s8, { opacity: 1, x: 0, duration: 2 }, 39.5)
      .to(s8, { opacity: 0, x: -50, duration: 1.5 }, 43.5)
      .to(state3D, { powderSwirl: 0, duration: 3 }, 39.5)
      .to(state3D, { productOpacity: 1, duration: 2 }, 39.5)
      .to(state3D.cameraPos, { x: camS9.x, y: camS9.y, z: camS9.z, duration: 3.5, ease: 'power2.out' }, 39.5)
      .to(state3D.cameraTarget, { x: 0, y: -20.0, z: 0, duration: 3.5, ease: 'power2.out' }, 39.5);

    // ───────────────────────────────────────────────────────────
    // SCENE 9 — Chain of Trust
    // ───────────────────────────────────────────────────────────
    tl.to(s9, { opacity: 1, y: 0, duration: 2 }, 45.0)
      .to(s9, { opacity: 0, y: -50, duration: 2 }, 50.0)
      .to(state3D.cameraPos, { x: camS10.x, y: camS10.y, z: camS10.z, duration: 4, ease: 'power1.inOut' }, 45.0)
      .to(state3D.cameraTarget, { x: isMobile ? 0 : 0.4, y: -20.0, z: 0, duration: 4, ease: 'power1.inOut' }, 45.0)
      .to(state3D, { productRotation: Math.PI * 1.5, duration: 5, ease: 'none' }, 44.5);

    // ───────────────────────────────────────────────────────────
    // SCENE 10 — Final Frame + Priority Access + Manifesto
    // ───────────────────────────────────────────────────────────
    tl.to(s10, { opacity: 1, y: 0, duration: 2 }, 52.0)
      .to(state3D.cameraPos, { x: camS11.x, y: camS11.y, z: camS11.z, duration: 3, ease: 'power2.out' }, 52.0)
      .to(state3D.cameraTarget, { x: isMobile ? 0 : 0.3, y: -20.0, z: 0, duration: 3, ease: 'power2.out' }, 52.0)
      .to(state3D, { productRotation: Math.PI * 2.0, duration: 3, ease: 'power1.out' }, 52.0);

    // ─── Cleanup ─────────────────────────────────────────────
    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [state3D, overlayRef]);

  return null;
}
