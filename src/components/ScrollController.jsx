import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollController({ state3D, overlayRef }) {
  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    // ─── Camera Keyframes ────────────────────────────────────
    // We slow down the 3D transition so it anchors effectively behind S6-S10.
    const camS1  = isMobile ? { x: 0, y: 100, z: 140 } : { x: 0, y: 80,   z: 100 };
    const camS2  = isMobile ? { x: 0, y: 45,  z: 90  } : { x: 0, y: 35,   z: 60  };
    const camS3  = isMobile ? { x: 0, y: 16,  z: 30  } : { x: 0, y: 12,   z: 22  };
    const camS4  = isMobile ? { x: 0, y: 8,   z: 15  } : { x: 0, y: 6,    z: 10  };
    const camS5  = isMobile ? { x: 0, y: -4,  z: 11  } : { x: 0, y: -4,   z: 8   };
    const camS6  = isMobile ? { x: 0, y: -9.5,z: 9   } : { x: 0, y: -9.5, z: 6   };
    
    // Final product frames anchor for the remaining sections
    const camFinal = isMobile ? { x:-0.2,y:-19.7,z:5.8 } : { x: 2.0, y:-19.7, z: 4.5 };

    state3D.cameraPos.x = camS1.x;
    state3D.cameraPos.y = camS1.y;
    state3D.cameraPos.z = camS1.z;

    // ─── Lenis ───────────────────────────────────────────────
    const lenis = new Lenis({
      duration: 1.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.4,
    });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    const wrapper = overlayRef.current;
    if (!wrapper) return;
    const q = (sel) => wrapper.querySelector(sel);
    const qAll = (sel) => wrapper.querySelectorAll(sel);

    // Initial opacity reset
    const sections = [
      q('#scene-2 .scene-content'),
      q('#scene-3 .scene-content'),
      q('#scene-4 .scene-content'),
      q('#scene-5 .scene-content'),
      q('#scene-6 .scene-content'),
      q('#scene-7 .scene-content'),
      q('#scene-8 .scene-content'),
      q('#scene-9 .scene-content'),
      q('#scene-10 .scene-content')
    ];
    gsap.set(sections, { opacity: 0 });

    // S1 Hero Elements
    const c1Headline = q('.c1-headline');
    const c1Sub = q('.c1-sub');
    const c1Cue = q('.c1-cue');
    gsap.set([c1Headline, c1Sub, c1Cue], { opacity: 0, y: 20 });
    
    gsap.to(c1Headline, { opacity: 1, y: 0, duration: 1.5, delay: 0.5, ease: 'power2.out' });
    gsap.to(c1Sub, { opacity: 1, y: 0, duration: 1.5, delay: 1.0, ease: 'power2.out' });
    gsap.to(c1Cue, { opacity: 0.5, y: 0, duration: 1.5, delay: 2.0, ease: 'power2.out' });

    // S2 Meghalaya
    const c2qAll = qAll('#scene-2 .cine-line, #scene-2 .cine-line-gold');
    gsap.set(c2qAll, { opacity: 0, y: 20 });

    // S3 Golden Root Sequence
    const c3wAll = qAll('#scene-3 .cine-word');
    const c3name = q('.c3-name');
    gsap.set(c3wAll, { opacity: 0, y: 20 });
    gsap.set(c3name, { opacity: 0, scale: 0.95 });

    // S4 Proof
    const c4title = q('.c4-title');
    const c4items = qAll('.c4-item');
    gsap.set(c4title, { opacity: 0, y: 20 });
    gsap.set(c4items, { opacity: 0, y: 20 });

    // S5 Why Origin
    const c5qAll = qAll('#scene-5 .cine-line, #scene-5 .cine-line-gold');
    gsap.set(c5qAll, { opacity: 0, y: 20 });

    // S6 Farmers
    const c6bg = q('.c6-bg');
    const c6text = q('.c6-text');
    gsap.set(c6bg, { opacity: 0, scale: 1.05 });
    gsap.set(c6text, { opacity: 0, y: 20 });

    // S7 Importers
    const c7box = q('#scene-7 .scene-content');
    gsap.set(c7box, { opacity: 0, y: 30 });

    // S8 Impact
    const c8title = q('.c8-title');
    const c8stats = qAll('.c8-stat');
    gsap.set(c8title, { opacity: 0, y: 20 });
    gsap.set(c8stats, { opacity: 0, y: 20 });

    // S9 Founder
    const c9photo = q('.c9-photo');
    const c9text = q('.c9-text');
    gsap.set([c9photo, c9text], { opacity: 0, y: 20 });

    // S10 Future
    const c10today = q('.c10-today');
    const c10tomorrow = q('.c10-tomorrow');
    const c10cta = q('.c10-cta');
    gsap.set([c10today, c10tomorrow, c10cta], { opacity: 0, y: 20 });


    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.scroll-spacer',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.0,
      }
    });

    // We stretch the timeline to 100 units for ease.
    
    // 0 - 10: Fade out S1, move camera to S2
    tl.to('#scene-1 .scene-content', { opacity: 0, y: -50, duration: 5 }, 0)
      .to(state3D.cameraPos, { ...camS2, duration: 10, ease: 'power1.inOut' }, 0)
      .to(state3D.cameraTarget, { x: 0, y: 5, z: 0, duration: 10, ease: 'power1.inOut' }, 0)
      .to(state3D, { fogDensity: 0.007, duration: 8 }, 0)
      .to(state3D, { terrainGlow: 0.7, duration: 8 }, 2);

    // 10 - 20: S2 Meghalaya Reveal + Dive into earth
    tl.to(sections[0], { opacity: 1, duration: 1 }, 10)
      .to(c2qAll[0], { opacity: 1, y: 0, duration: 1.5 }, 11)
      .to(c2qAll[1], { opacity: 1, y: 0, duration: 1.5 }, 12)
      .to(c2qAll[2], { opacity: 1, y: 0, duration: 1.5 }, 13)
      .to(c2qAll[3], { opacity: 1, y: 0, duration: 1.5 }, 14)
      .to(c2qAll[4], { opacity: 1, y: 0, duration: 1.5 }, 15)
      .to(c2qAll[5], { opacity: 1, y: 0, duration: 2.0 }, 16)
      .to(sections[0], { opacity: 0, y: -30, duration: 2 }, 19)
      .to(state3D.cameraPos, { ...camS4, duration: 5, ease: 'power1.inOut' }, 10)
      .to(state3D.cameraTarget, { x: 0, y: 0, z: 0, duration: 5 }, 10)
      // Dive below surface
      .to(state3D.cameraPos, { ...camS5, duration: 5, ease: 'power3.in' }, 15)
      .to(state3D.cameraTarget, { x: 0, y: -5, z: 0, duration: 5, ease: 'power3.in' }, 15)
      .to(state3D, { terrainOpacity: 0, duration: 4 }, 15)
      .to(state3D, { soilOpacity: 1, duration: 4 }, 15)
      .to(state3D, { fogDensity: 0.045, duration: 4 }, 15);

    // 20 - 30: S3 Golden Root sequence (Origin -> Product)
    tl.to(sections[1], { opacity: 1, duration: 1 }, 20)
      .to(c3wAll[0], { opacity: 1, y: 0, duration: 1 }, 20.5)
      .to(c3wAll[0], { opacity: 0, y: -10, duration: 1 }, 21.5)
      .to(c3wAll[1], { opacity: 1, y: 0, duration: 1 }, 22)
      .to(c3wAll[1], { opacity: 0, y: -10, duration: 1 }, 23)
      .to(c3wAll[2], { opacity: 1, y: 0, duration: 1 }, 23.5)
      .to(c3wAll[2], { opacity: 0, y: -10, duration: 1 }, 24.5)
      .to(c3wAll[3], { opacity: 1, y: 0, duration: 1 }, 25)
      .to(c3wAll[3], { opacity: 0, y: -10, duration: 1 }, 26)
      .to(c3wAll[4], { opacity: 1, y: 0, duration: 1 }, 26.5)
      .to(c3wAll[4], { opacity: 0, y: -10, duration: 1 }, 27.5)
      .to(c3name, { opacity: 1, scale: 1, duration: 1.5 }, 28)
      .to(sections[1], { opacity: 0, duration: 1.5 }, 30)
      
      // Reveal the root (20-23)
      .to(state3D.cameraPos, { ...camS6, duration: 3, ease: 'power1.out' }, 20)
      .to(state3D.cameraTarget, { x: 0, y: -10, z: 0, duration: 3 }, 20)
      .to(state3D, { rootOpacity: 1, duration: 2.5 }, 20)
      
      // Dissolve root into powder (23-27)
      .to(state3D, { rootDissolve: 1, duration: 4, ease: 'power1.inOut' }, 23)
      .to(state3D, { powderSwirl: 1, duration: 4 }, 23)
      .to(state3D.cameraPos, { x: -0.5, y: -14.0, z: 4.5, duration: 4, ease: 'power1.inOut' }, 23)
      .to(state3D.cameraTarget, { x: 0, y: -16, z: 0, duration: 4 }, 23)
      .to(state3D, { soilOpacity: 0.15, duration: 4 }, 23)
      .to(state3D, { fogDensity: 0.018, duration: 4 }, 23)
      
      // Powder forms into jar (27-30)
      .to(state3D, { powderSwirl: 0, productOpacity: 1, duration: 3 }, 27)
      .to(state3D.cameraPos, { ...camFinal, duration: 3, ease: 'power2.inOut' }, 27)
      .to(state3D.cameraTarget, { x: isMobile ? 0 : 1.8, y: -20, z: 0, duration: 3 }, 27);

    // 30 - 40: S4 Proof & Transparency (Apple style)
    tl.to(sections[2], { opacity: 1, duration: 1 }, 32)
      .to(c4title, { opacity: 1, y: 0, duration: 1.5 }, 32.5)
      .to(c4items, { opacity: 1, y: 0, duration: 1, stagger: 0.5 }, 33.5)
      .to(sections[2], { opacity: 0, duration: 1.5 }, 39);

    // 40 - 50: S5 Why Origin Matters (Wine, Coffee...)
    tl.to(sections[3], { opacity: 1, duration: 1 }, 41)
      .to(c5qAll[0], { opacity: 1, y: 0, duration: 1.5 }, 41.5)
      .to(c5qAll[1], { opacity: 1, y: 0, duration: 1.5 }, 43)
      .to(c5qAll[2], { opacity: 1, y: 0, duration: 1.5 }, 44.5)
      .to(c5qAll[3], { opacity: 1, y: 0, duration: 2.0 }, 46.5)
      .to(sections[3], { opacity: 0, duration: 1.5 }, 49);

    // 50 - 60: S6 Farmers (Dark overlay with bg)
    tl.to(sections[4], { opacity: 1, duration: 1 }, 51)
      .to(c6bg, { opacity: 1, scale: 1, duration: 2, ease: 'power1.out' }, 51.5)
      .to(c6text, { opacity: 1, y: 0, duration: 1.5 }, 53)
      .to(sections[4], { opacity: 0, duration: 1.5 }, 59);

    // 60 - 70: S7 Importers B2B Block
    tl.to(sections[5], { opacity: 1, duration: 1 }, 61)
      .to(c7box, { opacity: 1, y: 0, duration: 2 }, 61.5)
      .to(sections[5], { opacity: 0, duration: 1.5 }, 69);

    // 70 - 80: S8 Impact Report Preview
    tl.to(sections[6], { opacity: 1, duration: 1 }, 71)
      .to(c8title, { opacity: 1, y: 0, duration: 1.5 }, 71.5)
      .to(c8stats, { opacity: 1, y: 0, duration: 1.5, stagger: 0.5 }, 73)
      .to(sections[6], { opacity: 0, duration: 1.5 }, 79);

    // 80 - 90: S9 Founder Letter
    tl.to(sections[7], { opacity: 1, duration: 1 }, 81)
      .to(c9photo, { opacity: 1, y: 0, duration: 1.5 }, 81.5)
      .to(c9text, { opacity: 1, y: 0, duration: 2 }, 83)
      .to(sections[7], { opacity: 0, duration: 1.5 }, 89);

    // 90 - 100: S10 Future of Paradise
    tl.to(sections[8], { opacity: 1, duration: 1 }, 91)
      .to(c10today, { opacity: 1, y: 0, duration: 1.5 }, 91.5)
      .to(c10tomorrow, { opacity: 1, y: 0, duration: 2 }, 93.5)
      .to(c10cta, { opacity: 1, y: 0, duration: 1.5 }, 95.5);

    // Constant slow product rotation throughout remaining sections
    tl.to(state3D, { productRotation: Math.PI * 4, duration: 80, ease: 'none' }, 20);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [state3D, overlayRef]);

  return null;
}
