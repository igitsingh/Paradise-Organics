import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

// ─── Helper: animate a line in, hold, then out ─────────────────
// Returns the out-start position for chaining
function cineBeat(tl, el, inAt, holdFor = 1.2, outDur = 0.6) {
  tl.to(el, { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' }, inAt);
  tl.to(el, { opacity: 0, y: -10, duration: outDur, ease: 'power2.in' }, inAt + holdFor);
  return inAt + holdFor + outDur;
}

export default function ScrollController({ state3D, overlayRef }) {
  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    // ─── Camera Keyframes ────────────────────────────────────
    const camS1  = isMobile ? { x: 0, y: 100, z: 140 } : { x: 0, y: 80,   z: 100 };
    const camS2  = isMobile ? { x: 0, y: 45,  z: 90  } : { x: 0, y: 35,   z: 60  };
    const camS3  = isMobile ? { x: 0, y: 16,  z: 30  } : { x: 0, y: 12,   z: 22  };
    const camS4  = isMobile ? { x: 0, y: 8,   z: 15  } : { x: 0, y: 6,    z: 10  };
    const camS5  = isMobile ? { x: 0, y: -4,  z: 11  } : { x: 0, y: -4,   z: 8   };
    const camS6  = isMobile ? { x: 0, y: -9.5,z: 9   } : { x: 0, y: -9.5, z: 6   };
    const camS7  = isMobile ? { x: 0, y:-10.0,z: 3.5 } : { x: 0.8, y:-10.0, z: 2.2 };
    const camS8  = isMobile ? { x: 0, y:-14.0,z: 6.0 } : { x:-0.5, y:-14.0, z: 4.5 };
    const camS9  = isMobile ? { x: 0, y:-20.0,z: 6.8 } : { x: 0,   y:-20.0, z: 4.8 };
    const camS10 = isMobile ? { x:-0.2,y:-19.7,z:5.8 } : { x:-1.2, y:-19.7, z: 3.8 };
    const camS11 = isMobile ? { x: 0, y:-19.8,z:5.6  } : { x:-1.4, y:-19.8, z: 3.6 };

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

    // ─── Element refs ────────────────────────────────────────
    const wrapper = overlayRef.current;
    if (!wrapper) return;

    const q = (sel) => wrapper.querySelector(sel);

    // Scene 1 — Hero
    const c1Origin  = q('.c1-origin');
    const c1Brand   = q('.c1-brand');
    const c1Tagline = q('.c1-tagline');
    const c1Cue     = q('.c1-cue');

    // Scene 2 — Descent
    const s2Content = q('#scene-2 .scene-content');
    const c2q1 = q('.c2-q1');
    const c2q2 = q('.c2-q2');
    const c2q3 = q('.c2-q3');
    const c2q4 = q('.c2-q4');

    // Scene 3 — Meghalaya
    const s3Content = q('#scene-3 .scene-content');
    const c3label   = q('.c3-label');
    const c3place   = q('.c3-place');
    const c3elev    = q('.c3-elev');
    const c3desc    = q('.c3-desc');

    // Scene 4 — Earth transition
    const s4Content = q('#scene-4 .scene-content');
    const c4q1 = q('.c4-q1');
    const c4q2 = q('.c4-q2');

    // Scene 5 — Root discovery
    const s5Content = q('#scene-5 .scene-content');
    const c5q1 = q('.c5-q1');
    const c5q2 = q('.c5-q2');

    // Scene 6 — Golden Root reveal (CLIMAX)
    const s6Content = q('#scene-6 .scene-content');
    const c6w1    = q('.c6-w1');
    const c6w2    = q('.c6-w2');
    const c6w3    = q('.c6-w3');
    const c6name  = q('.c6-name');
    const c6origin= q('.c6-origin');

    // Scene 7 — Curcumin authority + transformation
    const s7Content = q('#scene-7 .scene-content');
    const c7q1    = q('.c7-q1');
    const c7q2    = q('.c7-q2');
    const c7num   = q('.c7-num');
    const c7label = q('.c7-label');
    const c7comp  = q('.c7-compare');

    // Scene 8 — Formation
    const s8Content = q('#scene-8 .scene-content');
    const c8q1 = q('.c8-q1');
    const c8q2 = q('.c8-q2');
    const c8q3 = q('.c8-q3');
    const c8q4 = q('.c8-q4');
    const c8q5 = q('.c8-q5');

    // Scene 9 — Product reveal + trust
    const s9Content  = q('#scene-9 .scene-content');
    const c9brand    = q('.c9-brand');
    const c9by       = q('.c9-by');
    const trustRow   = q('.cine-trust-row');
    const c9cert     = q('.c9-cert');

    // Scene 10 — Invitation + manifesto
    const s10Content   = q('#scene-10 .scene-content');
    const inviteBlock  = q('.invitation-block');
    const ctaGroup     = q('.cine-cta-group');
    const manifestoBlock = q('.manifesto-block');

    // ─── Set initial states ──────────────────────────────────
    // All scroll-driven elements start invisible, shifted down
    const scrollEls = [
      c2q1, c2q2, c2q3, c2q4,
      c3label, c3place, c3elev, c3desc,
      c4q1, c4q2,
      c5q1, c5q2,
      c6w1, c6w2, c6w3, c6name, c6origin,
      c7q1, c7q2, c7label, c7comp,
      c8q1, c8q2, c8q3, c8q4, c8q5,
      c9brand, c9by, trustRow, c9cert,
      inviteBlock, ctaGroup, manifestoBlock,
    ].filter(Boolean);

    gsap.set(scrollEls, { opacity: 0, y: 18 });
    // Big number: starts large + invisible, scales down on entry for impact
    if (c7num) gsap.set(c7num, { opacity: 0, y: 0, scale: 1.25 });

    // ─── Scene 1: load animation (not scroll-driven) ──────────
    gsap.set([c1Origin, c1Brand, c1Tagline, c1Cue], { opacity: 0, y: 18 });
    gsap.to(c1Origin,  { opacity: 1, y: 0, duration: 1.8, delay: 0.5, ease: 'power2.out' });
    gsap.to(c1Brand,   { opacity: 1, y: 0, duration: 2.2, delay: 1.2, ease: 'power2.out' });
    gsap.to(c1Tagline, { opacity: 1, y: 0, duration: 1.6, delay: 2.6, ease: 'power2.out' });
    gsap.to(c1Cue,     { opacity: 1, y: 0, duration: 1.0, delay: 3.8, ease: 'power2.out' });

    // ─── Master Timeline ─────────────────────────────────────
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.scroll-spacer',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5,
        invalidateOnRefresh: true,
      }
    });

    // ══════════════════════════════════════════════════════════
    // SCENE 1 → 2  (t=0 → 2)
    // 3D: Sphere descends, camera moves to terrain altitude
    // ══════════════════════════════════════════════════════════
    tl.to('#scene-1 .scene-content', { opacity: 0, y: -30, duration: 1 }, 0)
      .to(state3D.cameraPos, { ...camS2, duration: 2.5, ease: 'power1.inOut' }, 0)
      .to(state3D.cameraTarget, { x: 0, y: 5, z: 0, duration: 2.5, ease: 'power1.inOut' }, 0)
      .to(state3D, { fogDensity: 0.007, duration: 2 }, 0);

    // ══════════════════════════════════════════════════════════
    // SCENE 2 — DESCENT  (t=1 → 8)
    // Copy: "Not every origin / tells its story. / Some must be found. / We found ours."
    // ══════════════════════════════════════════════════════════
    tl.to(s2Content, { opacity: 1, duration: 0.4 }, 1.0)
      // Line 1 + 2 together (same thought)
      .to(c2q1, { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' }, 1.2)
      .to(c2q2, { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' }, 1.8)
      .to([c2q1, c2q2], { opacity: 0, y: -10, duration: 0.6 }, 3.4)
      // Line 3 — pause beat
      .to(c2q3, { opacity: 1, y: 0, duration: 1.0, ease: 'power2.out' }, 4.0)
      .to(c2q3, { opacity: 0, y: -10, duration: 0.6 }, 5.5)
      // Line 4 — gold emphasis
      .to(c2q4, { opacity: 1, y: 0, duration: 1.0, ease: 'power2.out' }, 6.0)
      .to(s2Content, { opacity: 0, duration: 0.7 }, 7.5)
      // 3D camera: descend toward terrain
      .to(state3D.cameraPos, { ...camS3, duration: 5, ease: 'power1.inOut' }, 1.5)
      .to(state3D.cameraTarget, { x: 0, y: 0, z: 0, duration: 5 }, 1.5)
      .to(state3D, { terrainGlow: 0.7, duration: 4 }, 2.5);

    // ══════════════════════════════════════════════════════════
    // SCENE 3 — MEGHALAYA  (t=8 → 16)
    // Copy: "Northeast India." → "Meghalaya." → "4,600 ft" → "Ancient soil..."
    // ══════════════════════════════════════════════════════════
    tl.to(s3Content, { opacity: 1, duration: 0.4 }, 8.0)
      .to(c3label, { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' }, 8.2)
      .to(c3label, { opacity: 0, y: -10, duration: 0.6 }, 9.5)
      .to(c3place, { opacity: 1, y: 0, duration: 1.1, ease: 'power2.out' }, 9.8)
      .to(c3elev,  { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' }, 10.6)
      .to([c3place, c3elev], { opacity: 0, y: -10, duration: 0.6 }, 12.0)
      .to(c3desc,  { opacity: 1, y: 0, duration: 1.0, ease: 'power2.out' }, 12.5)
      .to(s3Content, { opacity: 0, duration: 0.7 }, 15.0)
      // 3D camera: hover over field
      .to(state3D.cameraPos, { ...camS4, duration: 5.5, ease: 'none' }, 8.0)
      .to(state3D.cameraTarget, { x: 0, y: 0, z: 0, duration: 5.5 }, 8.0);

    // ══════════════════════════════════════════════════════════
    // SCENE 4 — EARTH TRANSITION  (t=16 → 20)
    // Copy: "Below the surface. / Below the ordinary."
    // 3D: Camera dives through terrain
    // ══════════════════════════════════════════════════════════
    tl.to(s4Content, { opacity: 1, duration: 0.4 }, 16.0)
      .to(c4q1, { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' }, 16.2)
      .to(c4q2, { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' }, 17.0)
      .to(s4Content, { opacity: 0, duration: 0.7 }, 18.5)
      // 3D: plunge
      .to(state3D.cameraPos, { ...camS5, duration: 3, ease: 'power3.in' }, 16.5)
      .to(state3D.cameraTarget, { x: 0, y: -5, z: 0, duration: 3, ease: 'power3.in' }, 16.5)
      .to(state3D, { terrainOpacity: 0, duration: 2 }, 17.0)
      .to(state3D, { soilOpacity: 1,     duration: 2 }, 17.0)
      .to(state3D, { fogDensity: 0.045,  duration: 2 }, 16.5);

    // ══════════════════════════════════════════════════════════
    // SCENE 5 — ROOT DISCOVERY  (t=20 → 24)
    // Copy: "This is where / rare begins."
    // 3D: Underground cavern, roots appear
    // ══════════════════════════════════════════════════════════
    tl.to(s5Content, { opacity: 1, duration: 0.4 }, 20.0)
      .to(c5q1, { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' }, 20.2)
      .to(c5q2, { opacity: 1, y: 0, duration: 1.1, ease: 'power2.out' }, 21.2)
      .to(s5Content, { opacity: 0, duration: 0.8 }, 23.0)
      // 3D: enter cavern, roots glow
      .to(state3D.cameraPos, { ...camS6, duration: 3, ease: 'power1.out' }, 20.0)
      .to(state3D.cameraTarget, { x: 0, y: -10, z: 0, duration: 3 }, 20.0)
      .to(state3D, { rootOpacity: 1, duration: 2.5 }, 20.0);

    // ══════════════════════════════════════════════════════════
    // SCENE 6 — THE GOLDEN ROOT REVEAL — CLIMAX  (t=24 → 34)
    // Copy: "Rare." → "Verified." → "Irreplaceable." → "The Golden Root™"
    // Each word arrives alone. Full silence. Then: the name.
    // ══════════════════════════════════════════════════════════
    tl.to(s6Content, { opacity: 1, duration: 0.4 }, 24.0)
      // Three ascending words — each alone on screen
      .to(c6w1, { opacity: 1, y: 0, duration: 1.0, ease: 'power2.out' }, 24.2)
      .to(c6w1, { opacity: 0, y: -12, duration: 0.7 }, 25.6)
      .to(c6w2, { opacity: 1, y: 0, duration: 1.0, ease: 'power2.out' }, 26.2)
      .to(c6w2, { opacity: 0, y: -12, duration: 0.7 }, 27.6)
      .to(c6w3, { opacity: 1, y: 0, duration: 1.0, ease: 'power2.out' }, 28.2)
      .to(c6w3, { opacity: 0, y: -12, duration: 0.7 }, 29.6)
      // The Name — held long, golden
      .to(c6name,   { opacity: 1, y: 0, duration: 1.4, ease: 'power2.out' }, 30.2)
      .to(c6origin, { opacity: 1, y: 0, duration: 1.0, ease: 'power2.out' }, 31.4)
      .to(s6Content, { opacity: 0, duration: 0.8 }, 33.0)
      // 3D: extreme close-up of root
      .to(state3D.cameraPos, { ...camS7, duration: 4, ease: 'power1.inOut' }, 24.0)
      .to(state3D.cameraTarget, { x: 0, y: -10, z: 0, duration: 4 }, 24.0);

    // ══════════════════════════════════════════════════════════
    // SCENE 7 — CURCUMIN AUTHORITY  (t=34 → 44)
    // Copy: "Some roots contain gold." → "This one IS gold." → [8.1%] → label → compare
    // 3D: Root dissolves → powder swirls
    // ══════════════════════════════════════════════════════════
    tl.to(s7Content, { opacity: 1, duration: 0.4 }, 34.0)
      .to(c7q1, { opacity: 1, y: 0, duration: 1.0, ease: 'power2.out' }, 34.2)
      .to(c7q1, { opacity: 0, y: -10, duration: 0.6 }, 35.5)
      .to(c7q2, { opacity: 1, y: 0, duration: 1.0, ease: 'power2.out' }, 36.0)
      .to(c7q2, { opacity: 0, y: -10, duration: 0.6 }, 37.2)
      // BIG NUMBER — drops in from above, scale treatment
      .to(c7num,   { opacity: 1, y: 0, scale: 1, duration: 1.3, ease: 'power3.out' }, 37.8)
      .to(c7label, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 38.8)
      .to(c7comp,  { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 39.6)
      .to(s7Content, { opacity: 0, duration: 0.8 }, 43.0)
      // 3D: transformation
      .to(state3D, { rootDissolve: 1, duration: 3.5, ease: 'power1.inOut' }, 34.5)
      .to(state3D, { powderSwirl: 1,  duration: 3.5 }, 34.5)
      .to(state3D.cameraPos, { ...camS8, duration: 4.5, ease: 'power1.inOut' }, 34.5)
      .to(state3D.cameraTarget, { x: 0, y: -16, z: 0, duration: 4.5 }, 34.5)
      .to(state3D, { soilOpacity: 0.15, duration: 3 }, 34.5)
      .to(state3D, { fogDensity: 0.018, duration: 3 }, 34.5);

    // ══════════════════════════════════════════════════════════
    // SCENE 8 — FORMATION  (t=44 → 52)
    // Copy: "Nothing added. / Nothing removed. / Cold-pressed. / The curcumin survives. / Intact."
    // 3D: Powder gathers → product forms
    // ══════════════════════════════════════════════════════════
    tl.to(s8Content, { opacity: 1, duration: 0.4 }, 44.0)
      .to(c8q1, { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' }, 44.2)
      .to(c8q2, { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' }, 44.9)
      .to([c8q1, c8q2], { opacity: 0, y: -10, duration: 0.6 }, 46.2)
      .to(c8q3, { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' }, 46.8)
      .to(c8q3, { opacity: 0, y: -10, duration: 0.5 }, 48.0)
      .to(c8q4, { opacity: 1, y: 0, duration: 1.0, ease: 'power2.out' }, 48.5)
      .to(c8q5, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 49.4)
      .to(s8Content, { opacity: 0, duration: 0.8 }, 51.5)
      // 3D: powder → product
      .to(state3D, { powderSwirl: 0, productOpacity: 1, duration: 3.5 }, 44.5)
      .to(state3D.cameraPos, { ...camS9, duration: 4, ease: 'power2.out' }, 44.5)
      .to(state3D.cameraTarget, { x: 0, y: -20, z: 0, duration: 4 }, 44.5);

    // ══════════════════════════════════════════════════════════
    // SCENE 9 — PRODUCT REVEAL + TRUST  (t=52 → 62)
    // Copy: "The Golden Root™" → "By Paradise Organics." → trust pills → cert line
    // 3D: Product rotates fully
    // ══════════════════════════════════════════════════════════
    tl.to(s9Content, { opacity: 1, duration: 0.4 }, 52.0)
      .to(c9brand,   { opacity: 1, y: 0, duration: 1.3, ease: 'power2.out' }, 52.2)
      .to(c9by,      { opacity: 1, y: 0, duration: 1.0, ease: 'power2.out' }, 53.4)
      // Pause — product holds — then trust reveals
      .to(trustRow,  { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out' }, 55.5)
      .to(c9cert,    { opacity: 1, y: 0, duration: 1.0, ease: 'power2.out' }, 57.0)
      .to(s9Content, { opacity: 0, duration: 0.8 }, 61.0)
      // 3D
      .to(state3D.cameraPos, { ...camS10, duration: 4, ease: 'power1.inOut' }, 52.0)
      .to(state3D.cameraTarget, { x: isMobile ? 0 : 0.4, y: -20, z: 0, duration: 4 }, 52.0)
      .to(state3D, { productRotation: Math.PI * 1.5, duration: 6, ease: 'none' }, 52.0);

    // ══════════════════════════════════════════════════════════
    // SCENE 10 — INVITATION + MANIFESTO  (t=62 → end)
    // Copy: invitation block → CTA → manifesto
    // ══════════════════════════════════════════════════════════
    tl.to(s10Content, { opacity: 1, duration: 0.4 }, 62.0)
      .to(inviteBlock,    { opacity: 1, y: 0, duration: 1.3, ease: 'power2.out' }, 62.2)
      .to(ctaGroup,       { opacity: 1, y: 0, duration: 1.1, ease: 'power2.out' }, 63.8)
      .to(manifestoBlock, { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out' }, 65.5)
      // 3D: final frame
      .to(state3D.cameraPos, { ...camS11, duration: 3.5, ease: 'power2.out' }, 62.0)
      .to(state3D.cameraTarget, { x: isMobile ? 0 : 0.3, y: -20, z: 0, duration: 3.5 }, 62.0)
      .to(state3D, { productRotation: Math.PI * 2.0, duration: 3.5, ease: 'power1.out' }, 62.0);

    // ─── Cleanup ──────────────────────────────────────────────
    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [state3D, overlayRef]);

  return null;
}
