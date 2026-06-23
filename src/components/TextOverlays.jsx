import React, { forwardRef } from 'react';

const TextOverlays = forwardRef((props, ref) => {
  return (
    <div ref={ref} className="ui-overlay">

      <div className="ambient-vignette" />
      <div className="gold-glow-overlay" />

      <div className="scroll-wrapper">

        {/* ══════════════════════════════════════════════
            SECTION 1 — HERO
        ══════════════════════════════════════════════ */}
        <section id="scene-1" className="scroll-section cine-center" style={{ opacity: 1, visibility: 'visible' }}>
          <div className="scene-content cine-stack">
            <h1 className="cine-hero c1-headline" style={{ fontSize: '5rem', marginBottom: '1rem' }}>Origin Matters.</h1>
            <p className="cine-line c1-sub" style={{ fontSize: '1.5rem', color: 'rgba(245, 241, 232, 0.8)' }}>
              Some places create ingredients the world cannot replicate.
            </p>
            <p className="cine-descend c1-cue" style={{ marginTop: '4rem' }}>↓</p>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            SECTION 2 — MEGHALAYA
        ══════════════════════════════════════════════ */}
        <section id="scene-2" className="scroll-section cine-center">
          <div className="scene-content cine-stack">
            <p className="cine-line c2-q1">Rain.</p>
            <p className="cine-line c2-q2">Mist.</p>
            <p className="cine-line c2-q3">Mountains.</p>
            <p className="cine-line c2-q4">Altitude.</p>
            <p className="cine-line c2-q5">Soil.</p>
            <p className="cine-line-gold c2-q6" style={{ marginTop: '2rem', fontSize: '2rem' }}>Before there was turmeric, there was Meghalaya.</p>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            SECTION 3 — THE GOLDEN ROOT REVEAL
        ══════════════════════════════════════════════ */}
        <section id="scene-3" className="scroll-section cine-center">
          <div className="scene-content cine-stack">
            <p className="cine-word c3-w1">Origin.</p>
            <p className="cine-word c3-w2">Soil.</p>
            <p className="cine-word c3-w3">Farmers.</p>
            <p className="cine-word c3-w4">Harvest.</p>
            <p className="cine-word c3-w5">Processing.</p>
            <p className="cine-reveal c3-name" style={{ marginTop: '2rem', fontSize: '3rem', color: '#BF930F' }}>The Golden Root™</p>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            SECTION 4 — PROOF & TRANSPARENCY
        ══════════════════════════════════════════════ */}
        <section id="scene-4" className="scroll-section cine-right">
          <div className="scene-content cine-stack" style={{ width: '100%', maxWidth: '800px', textAlign: 'left' }}>
            <h2 className="c4-title" style={{ fontSize: '2.5rem', color: '#BF930F', marginBottom: '3rem', borderBottom: '1px solid rgba(179, 138, 61, 0.3)', paddingBottom: '1rem' }}>Proof & Transparency</h2>
            <div className="c4-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <div className="c4-item">
                <p style={{ color: 'rgba(245, 241, 232, 0.5)', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.8rem' }}>Curcumin</p>
                <p style={{ fontSize: '2rem', color: '#F5F1E8' }}>8.1% Verified</p>
              </div>
              <div className="c4-item">
                <p style={{ color: 'rgba(245, 241, 232, 0.5)', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.8rem' }}>Heavy Metals</p>
                <p style={{ fontSize: '1.5rem', color: '#F5F1E8' }}>Undetected</p>
              </div>
              <div className="c4-item">
                <p style={{ color: 'rgba(245, 241, 232, 0.5)', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.8rem' }}>Traceability</p>
                <p style={{ fontSize: '1.5rem', color: '#F5F1E8' }}>Farm-to-Jar</p>
              </div>
              <div className="c4-item">
                <p style={{ color: 'rgba(245, 241, 232, 0.5)', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.8rem' }}>Processing</p>
                <p style={{ fontSize: '1.5rem', color: '#F5F1E8' }}>Cold-milled &lt; 42°C</p>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            SECTION 5 — WHY ORIGIN MATTERS
        ══════════════════════════════════════════════ */}
        <section id="scene-5" className="scroll-section">
          <div className="scene-content" style={{ width: '100vw', height: '100vh', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center', paddingRight: '10vw' }}>
            <div className="c5-bg" data-speed="-0.5" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, overflow: 'hidden' }}>
              <img src="/images/Turmeric-Revolution.jpg.jpg" alt="Turmeric Revolution" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(14, 59, 46, 0.4)' }} />
            </div>
            <div className="cine-stack" data-speed="0.3" style={{ textAlign: 'center', zIndex: 1, padding: '3rem', background: 'rgba(14, 59, 46, 0.7)', backdropFilter: 'blur(10px)', borderRadius: '4px', border: '1px solid rgba(179, 138, 61, 0.3)', maxWidth: '500px' }}>
              <p className="cine-line c5-q1" style={{ fontSize: '2rem', color: 'rgba(245, 241, 232, 0.9)' }}>Wine has origin.</p>
              <p className="cine-line c5-q2" style={{ fontSize: '2rem', color: 'rgba(245, 241, 232, 0.9)' }}>Coffee has origin.</p>
              <p className="cine-line c5-q3" style={{ fontSize: '2rem', color: 'rgba(245, 241, 232, 0.9)' }}>Chocolate has origin.</p>
              <p className="cine-line-gold c5-q4" style={{ fontSize: '3rem', marginTop: '2rem', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>Why not turmeric?</p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            SECTION 6 — THE FARMERS
        ══════════════════════════════════════════════ */}
        <section id="scene-6" className="scroll-section cine-center">
          <div className="scene-content" style={{ width: '100vw', height: '100vh', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', paddingBottom: '10vh' }}>
            <div className="c6-bg" data-speed="-0.4" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, overflow: 'hidden' }}>
              <img src="/images/happy-indian-farmer-at-green-turmeric-agriculture-2026-03-09-05-22-20-utc.jpg" alt="Indian farmers at green turmeric agriculture" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }} />
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to top, rgba(14, 59, 46, 0.9) 0%, transparent 60%)' }} />
            </div>
            <div className="c6-text" data-speed="0.2" style={{ textAlign: 'center', zIndex: 1, padding: '2rem' }}>
              <p className="cine-line" style={{ fontSize: '4rem', color: '#F5F1E8', lineHeight: 1.1, textShadow: '0 4px 20px rgba(0,0,0,0.8)', margin: 0 }}>
                Cultivated by generations.
              </p>
              <p style={{ fontSize: '4rem', color: '#F5F1E8', fontFamily: 'var(--font-serif)', fontStyle: 'italic', textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}>
                Honored by us.
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            SECTION 7 — FOR IMPORT PARTNERS
        ══════════════════════════════════════════════ */}
        <section id="scene-7" className="scroll-section cine-right">
          <div className="scene-content cine-stack" style={{ width: '100%', maxWidth: '800px', textAlign: 'left', background: 'rgba(14, 59, 46, 0.8)', padding: '4rem', border: '1px solid rgba(179, 138, 61, 0.3)', backdropFilter: 'blur(10px)' }}>
            <h2 className="c7-title" style={{ fontSize: '2rem', color: '#BF930F', marginBottom: '2rem' }}>For Import Partners</h2>
            <div className="c7-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <div><strong style={{ color: '#F5F1E8' }}>Capacity:</strong> <span style={{ color: 'rgba(245, 241, 232, 0.7)' }}>20 MT / Annual</span></div>
              <div><strong style={{ color: '#F5F1E8' }}>MOQ:</strong> <span style={{ color: 'rgba(245, 241, 232, 0.7)' }}>100 kg</span></div>
              <div><strong style={{ color: '#F5F1E8' }}>Formats:</strong> <span style={{ color: 'rgba(245, 241, 232, 0.7)' }}>Retail / Bulk 25kg</span></div>
              <div><strong style={{ color: '#F5F1E8' }}>Documents:</strong> <span style={{ color: 'rgba(245, 241, 232, 0.7)' }}>CoA, Phyto, Origin</span></div>
            </div>
            <button className="btn-cine-primary c7-btn" style={{ marginTop: '3rem' }}>Request Import Dossier</button>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            SECTION 8 — IMPACT REPORT PREVIEW
        ══════════════════════════════════════════════ */}
        <section id="scene-8" className="scroll-section cine-right">
          <div className="scene-content cine-stack" style={{ textAlign: 'center' }}>
            <h2 className="c8-title" style={{ fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#BF930F', marginBottom: '3rem' }}>Annual Impact</h2>
            <div style={{ display: 'flex', gap: '4rem', justifyContent: 'center' }}>
              <div className="c8-stat">
                <p style={{ fontSize: '4rem', color: '#F5F1E8', lineHeight: '1' }}>45</p>
                <p style={{ color: 'rgba(245, 241, 232, 0.6)', marginTop: '1rem' }}>Farmers Supported</p>
              </div>
              <div className="c8-stat">
                <p style={{ fontSize: '4rem', color: '#F5F1E8', lineHeight: '1' }}>3x</p>
                <p style={{ color: 'rgba(245, 241, 232, 0.6)', marginTop: '1rem' }}>Premium Paid</p>
              </div>
              <div className="c8-stat">
                <p style={{ fontSize: '4rem', color: '#F5F1E8', lineHeight: '1' }}>100%</p>
                <p style={{ color: 'rgba(245, 241, 232, 0.6)', marginTop: '1rem' }}>Traceable Supply</p>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            SECTION 9 — FOUNDER LETTER
        ══════════════════════════════════════════════ */}
        <section id="scene-9" className="scroll-section cine-right">
          <div className="scene-content cine-stack" style={{ maxWidth: '600px' }}>
            <div className="c9-photo" style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: 'rgba(179, 138, 61, 0.1)', border: '1px solid rgba(179, 138, 61, 0.3)', margin: '0 auto 2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(179, 138, 61, 0.5)' }}>[Photo]</div>
            <p className="c9-text" style={{ fontSize: '1.4rem', lineHeight: '1.8', color: 'rgba(245, 241, 232, 0.9)', fontStyle: 'italic' }}>
              "I did not start Paradise Organics to sell turmeric. I started it because remarkable ingredients deserve remarkable recognition."
            </p>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            SECTION 10 — FUTURE OF PARADISE
        ══════════════════════════════════════════════ */}
        <section id="scene-10" className="scroll-section cine-right">
          <div className="scene-content cine-stack">
            <p className="cine-line c10-today" style={{ fontSize: '1.5rem', color: 'rgba(245, 241, 232, 0.6)' }}>Today: Lakadong Turmeric.</p>
            <p className="cine-line-gold c10-tomorrow" style={{ fontSize: '2.5rem', marginTop: '1rem' }}>Tomorrow: Exceptional ingredients from extraordinary origins.</p>
            
            <div className="c10-cta" style={{ marginTop: '4rem' }}>
              <button className="btn-cine-primary" style={{ marginRight: '1rem' }}>Discover The Origin</button>
              <button className="btn-cine-ghost">View The Journal</button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
});

TextOverlays.displayName = 'TextOverlays';
export default TextOverlays;
