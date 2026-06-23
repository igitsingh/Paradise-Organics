import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollController({ state3D, overlayRef }) {
  useEffect(() => {
    // ─── Camera Keyframes ────────────────────────────────────
    
    // The Lakadong Field center where the underground journey happens
    const fieldX = 800;
    const fieldZ = 400;
    
    // Cinematic Sweeping Descent Camera Path
    const camS1 = { x: 800, y: 1200, z: 2500 }; // Cinematic angled high view showing mountains in back
    const camS2 = { x: 800, y: 600, z: 1200 };  // Flying forward and down over the massive field
    const camS3 = { x: 800, y: 150, z: 600 };   // Gliding just above the tiny glowing crops
    const camS4 = { x: 800, y: -10, z: 400 };   // Hovering right above the ONE main glowing circle
    const camS5 = { x: 800, y: -24, z: 406 };   // Underground viewing the root
    const camFinal = { x: 802, y: -34.5, z: 404.5 }; // Viewing the final product jar

    // Targets
    const targetSurface = { x: 800, y: -20, z: 400 }; // The terrain surface center
    const targetRoot = { x: 800, y: -25, z: 400 };    // The root underground
    const targetProduct = { x: 800, y: -35, z: 400 }; // The product jar

    state3D.cameraPos.x = camS1.x;
    state3D.cameraPos.y = camS1.y;
    state3D.cameraPos.z = camS1.z;
    state3D.cameraTarget.x = targetSurface.x;
    state3D.cameraTarget.y = targetSurface.y;
    state3D.cameraTarget.z = targetSurface.z;

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
    gsap.set(c1Headline, { opacity: 0, y: 50, clipPath: 'inset(100% 0% 0% 0%)' });
    gsap.set(c1Sub, { opacity: 0, y: 30, filter: 'blur(10px)' });
    gsap.set(c1Cue, { opacity: 0, y: 20 });
    
    gsap.to(c1Cue, { opacity: 0.5, y: 0, duration: 1.5, delay: 1.0, ease: 'power2.out' });

    // S2 Meghalaya
    const c2qAll = qAll('#scene-2 .cine-line, #scene-2 .cine-line-gold');
    gsap.set(c2qAll, { opacity: 0, y: 40, filter: 'blur(5px)' });

    // S3 Golden Root Sequence
    const c3wAll = qAll('#scene-3 .cine-word');
    const c3name = q('.c3-name');
    gsap.set(c3wAll, { opacity: 0, y: 30, scale: 0.95, filter: 'blur(10px)' });
    gsap.set(c3name, { opacity: 0, scale: 0.9, letterSpacing: '0em', filter: 'blur(20px)' });

    // S4 Proof
    const c4title = q('.c4-title');
    const c4items = qAll('.c4-item');
    gsap.set(c4title, { opacity: 0, y: 30, clipPath: 'inset(100% 0% 0% 0%)' });
    gsap.set(c4items, { opacity: 0, y: 20, filter: 'blur(5px)' });

    // S5 Why Origin
    const c5qAll = qAll('#scene-5 .cine-line, #scene-5 .cine-line-gold');
    gsap.set(c5qAll, { opacity: 0, y: 30, filter: 'blur(10px)' });

    // S6 Farmers
    const c6bg = q('.c6-bg');
    const c6text = q('.c6-text');
    gsap.set(c6bg, { opacity: 0, scale: 1.1, filter: 'blur(10px)' });
    gsap.set(c6text, { opacity: 0, y: 40, filter: 'blur(10px)' });

    // S7 Importers
    const c7box = q('#scene-7 .scene-content');
    gsap.set(c7box, { opacity: 0, y: 50, scale: 0.95 });

    // S8 Impact
    const c8title = q('.c8-title');
    const c8stats = qAll('.c8-stat');
    gsap.set(c8title, { opacity: 0, y: 30, letterSpacing: '0.5em' });
    gsap.set(c8stats, { opacity: 0, y: 30, filter: 'blur(5px)' });

    // S9 Founder
    const c9photo = q('.c9-photo');
    const c9text = q('.c9-text');
    gsap.set(c9photo, { opacity: 0, scale: 0.8, filter: 'blur(10px)' });
    gsap.set(c9text, { opacity: 0, y: 30, filter: 'blur(5px)' });

    // S10 Future
    const c10today = q('.c10-today');
    const c10tomorrow = q('.c10-tomorrow');
    const c10cta = q('.c10-cta');
    gsap.set([c10today, c10tomorrow, c10cta], { opacity: 0, y: 30, filter: 'blur(5px)' });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.scroll-spacer',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.0,
      }
    });

    // 0 - 10: Dive through clouds, reveal Origin Matters
    tl.to(state3D.cameraPos, { ...camS2, duration: 10, ease: 'power2.inOut' }, 0)
      .to(state3D, { fogDensity: 0.0001, duration: 8 }, 0)
      .to(state3D, { terrainGlow: 0.8, duration: 8 }, 2)
      .to(c1Headline, { opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5 }, 2)
      .to(c1Sub, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.5 }, 2.5)
      .to('#scene-1 .scene-content', { opacity: 0, y: -50, duration: 2 }, 5);

    // 6 - 29: Scrollytelling while diving straight into the field
    tl.to(sections[0], { opacity: 1, duration: 1 }, 6)
      // 1. Rain
      .to(c2qAll[0], { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.5, ease: 'power3.out' }, 6)
      .to(state3D, { cloudColor: 0.2, rainIntensity: 1, duration: 2 }, 6)

      // 2. Mist & closer to crops
      .to(c2qAll[1], { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.5, ease: 'power3.out' }, 10)
      .to(state3D.cameraPos, { ...camS3, duration: 8, ease: 'power1.inOut' }, 6)
      .to(state3D, { fogDensity: 0.0008, duration: 4 }, 10)

      // 3. See the glowing circles under the crops
      .to(c2qAll[2], { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.5, ease: 'power3.out' }, 14)
      .to(c2qAll[3], { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.5, ease: 'power3.out' }, 18)
      .to(c2qAll[4], { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.5, ease: 'power3.out' }, 22)

      // 4. Hover over the one main glowing circle
      .to(state3D.cameraPos, { ...camS4, duration: 8, ease: 'power2.inOut' }, 15)

      // 5. Dive underground
      .to(state3D, { terrainOpacity: 0, duration: 2 }, 24)
      .to(state3D.cameraPos, { ...camS5, duration: 5, ease: 'power3.inOut' }, 24)
      .to(state3D.cameraTarget, { ...targetRoot, duration: 5, ease: 'power3.inOut' }, 24)
      .to(sections[0], { opacity: 0, y: -30, duration: 2 }, 28);

    // 30 - 40: S3 Golden Root sequence (Origin -> Product)
    tl.to(sections[1], { opacity: 1, duration: 1 }, 30)
      .to(c3wAll[0], { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 1.5, ease: 'power2.out' }, 30.5)
      .to(c3wAll[0], { opacity: 0, y: -20, scale: 1.05, filter: 'blur(10px)', duration: 1.5, ease: 'power2.in' }, 31.5)
      .to(c3wAll[1], { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 1.5, ease: 'power2.out' }, 32)
      .to(c3wAll[1], { opacity: 0, y: -20, scale: 1.05, filter: 'blur(10px)', duration: 1.5, ease: 'power2.in' }, 33)
      .to(c3wAll[2], { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 1.5, ease: 'power2.out' }, 33.5)
      .to(c3wAll[2], { opacity: 0, y: -20, scale: 1.05, filter: 'blur(10px)', duration: 1.5, ease: 'power2.in' }, 34.5)
      .to(c3wAll[3], { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 1.5, ease: 'power2.out' }, 35)
      .to(c3wAll[3], { opacity: 0, y: -20, scale: 1.05, filter: 'blur(10px)', duration: 1.5, ease: 'power2.in' }, 36)
      .to(c3wAll[4], { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 1.5, ease: 'power2.out' }, 36.5)
      .to(c3wAll[4], { opacity: 0, y: -20, scale: 1.05, filter: 'blur(10px)', duration: 1.5, ease: 'power2.in' }, 37.5)
      .to(c3name, { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 2.5, ease: 'power4.out' }, 38)
      .to(sections[1], { opacity: 0, duration: 1.5 }, 40)
      
      // Root opacity fade in
      .to(state3D, { rootOpacity: 1, duration: 2.5 }, 30)
      
      // Dissolve root into powder (33-37)
      .to(state3D, { rootDissolve: 1, powderSwirl: 1, duration: 4, ease: 'power1.inOut' }, 33)
      .to(state3D.cameraPos, { x: 801, y: -29.0, z: 404.5, duration: 4, ease: 'power1.inOut' }, 33)
      .to(state3D.cameraTarget, { x: 800, y: -31, z: 400, duration: 4 }, 33)
      .to(state3D, { soilOpacity: 0.15, fogDensity: 0.018, duration: 4 }, 33)
      
      // Powder forms into jar (37-40)
      .to(state3D, { powderSwirl: 0, productOpacity: 1, duration: 3 }, 37)
      .to(state3D.cameraPos, { ...camFinal, duration: 3, ease: 'power2.inOut' }, 37)
      .to(state3D.cameraTarget, { ...targetProduct, duration: 3 }, 37);

    // 40 - 50: S4 Proof & Transparency (Apple style)
    tl.to(sections[2], { opacity: 1, duration: 1 }, 42)
      .to(c4title, { opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: 'power3.out' }, 42.5)
      .to(c4items, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.5, stagger: 0.2, ease: 'power2.out' }, 43.5)
      .to(sections[2], { opacity: 0, duration: 1.5 }, 49);

    // 50 - 60: S5 Why Origin Matters (Wine, Coffee...)
    tl.to(sections[3], { opacity: 1, duration: 1 }, 51)
      .to(c5qAll[0], { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.5, ease: 'power3.out' }, 51.5)
      .to(c5qAll[1], { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.5, ease: 'power3.out' }, 53)
      .to(c5qAll[2], { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.5, ease: 'power3.out' }, 54.5)
      .to(c5qAll[3], { opacity: 1, y: 0, filter: 'blur(0px)', duration: 2.0, ease: 'power4.out' }, 56.5)
      .to(sections[3], { opacity: 0, duration: 1.5 }, 59);

    // 60 - 70: S6 Farmers (Dark overlay with bg)
    tl.to(sections[4], { opacity: 1, duration: 1 }, 61)
      .to(c6bg, { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 3, ease: 'power2.out' }, 61)
      .to(c6text, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 2, ease: 'power3.out' }, 62)
      .to(state3D, { productRotation: Math.PI * 0.5, duration: 9, ease: 'none' }, 61)
      .to(sections[4], { opacity: 0, duration: 1.5 }, 68);

    // 70 - 80: S7 Importers (Sleek card layout)
    tl.to(sections[5], { opacity: 1, duration: 1 }, 71)
      .to(c7box, { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: 'power3.out' }, 71.5)
      .to(state3D, { productRotation: Math.PI * 1.0, duration: 9, ease: 'none' }, 71)
      .to(sections[5], { opacity: 0, duration: 1.5 }, 78);

    // 80 - 90: S8 Impact (Typography driven numbers)
    tl.to(sections[6], { opacity: 1, duration: 1 }, 81)
      .to(c8title, { opacity: 1, y: 0, letterSpacing: '0em', duration: 1.5, ease: 'power3.out' }, 81.5)
      .to(c8stats, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.5, stagger: 0.3, ease: 'power2.out' }, 82.5)
      .to(state3D, { productRotation: Math.PI * 1.5, duration: 9, ease: 'none' }, 81)
      .to(sections[6], { opacity: 0, duration: 1.5 }, 88);

    // 90 - 95: S9 Founder (Photo + Quote)
    tl.to(sections[7], { opacity: 1, duration: 1 }, 90)
      .to(c9photo, { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.5, ease: 'power2.out' }, 90.5)
      .to(c9text, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.5, ease: 'power3.out' }, 91)
      .to(state3D, { productRotation: Math.PI * 2.0, duration: 5, ease: 'none' }, 90)
      .to(sections[7], { opacity: 0, duration: 1 }, 94);

    // 95 - 100: S10 The Future (Final CTA)
    tl.to(sections[8], { opacity: 1, duration: 0.5 }, 95)
      .to(c10today, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.5, ease: 'power3.out' }, 95)
      .to(c10tomorrow, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.5, ease: 'power3.out' }, 96)
      .to(c10cta, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.5, ease: 'power2.out' }, 97.5);

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [state3D, overlayRef]);

  return null;
}
