import React, { forwardRef } from 'react';

const TextOverlays = forwardRef(({ soundActive, onToggleSound }, ref) => {
  return (
    <div ref={ref} className="ui-overlay">
      {/* Navigation Header */}
      <nav className="brand-nav">
        <div className="brand-nav-logo">Paradise Organics</div>
        <div className="brand-nav-tagline">Origin Matters.</div>
        <button 
          className="sound-toggle interactive" 
          onClick={onToggleSound} 
          aria-label={soundActive ? "Mute soundtrack" : "Unmute soundtrack"}
        >
          {soundActive ? (
            <svg className="sound-icon" viewBox="0 0 24 24">
              <path d="M6 9H2v6h4l5 5V4L6 9zm8 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
            </svg>
          ) : (
            <svg className="sound-icon" viewBox="0 0 24 24">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.21.05-.42.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
            </svg>
          )}
        </button>
      </nav>

      {/* Foreground vignettes to frame the layout */}
      <div className="ambient-vignette" />
      <div className="gold-glow-overlay" />

      {/* Main overlay wrapper */}
      <div className="scroll-wrapper">
        
        {/* SCENE 1 — SKY */}
        <section id="scene-1" className="scroll-section" style={{ opacity: 1, visibility: 'visible' }}>
          <div className="scene-content">
            <h1 className="title-main">Paradise Organics</h1>
            <p className="subtitle-main">Origin Matters.</p>
          </div>
        </section>

        {/* SCENE 2 — DESCENT */}
        <section id="scene-2" className="scroll-section">
          <div className="scene-content" style={{ opacity: 0 }}>
            <p className="text-editorial">"Every extraordinary ingredient begins somewhere."</p>
          </div>
        </section>

        {/* SCENE 3 — THE FIELD */}
        <section id="scene-3" className="scroll-section">
          <div className="scene-content" style={{ opacity: 0, position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="field-text-group" style={{ textAlign: 'center' }}>
              <p className="text-editorial f-text-1" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', opacity: 0 }}>
                "The world knows wine by its vineyard."
              </p>
              <p className="text-editorial f-text-2" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', opacity: 0 }}>
                "The world knows coffee by its region."
              </p>
              <p className="text-editorial f-text-3" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', opacity: 0 }}>
                "The world knows vanilla by its origin."
              </p>
            </div>
          </div>
        </section>

        {/* SCENE 4 — EARTH TRANSITION (Mainly visual, no text) */}
        <section id="scene-4" className="scroll-section">
          <div className="scene-content" style={{ opacity: 0 }} />
        </section>

        {/* SCENE 5 — DISCOVERY */}
        <section id="scene-5" className="scroll-section" style={{ justifyContent: 'flex-start', paddingLeft: '8%' }}>
          <div className="scene-content glass-card" style={{ opacity: 0 }}>
            <h2 className="heading-scene">Subterranean Discovery</h2>
            <p className="text-description">
              Hidden beneath the lush, misty hills of Meghalaya, India... lies a root untouched by modernity. Deep within mineral-rich soils, nature crafts its golden treasure.
            </p>
          </div>
        </section>

        {/* SCENE 6 — THE GOLDEN ROOT */}
        <section id="scene-6" className="scroll-section" style={{ justifyContent: 'flex-end', paddingRight: '8%' }}>
          <div className="scene-content glass-card" style={{ opacity: 0 }}>
            <span style={{ fontSize: '0.75rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--color-gold)', display: 'block', marginBottom: '0.5rem' }}>Scientific Selection</span>
            <h2 className="heading-scene">The Golden Root™</h2>
            <p className="text-description">
              Lakadong Turmeric is legendary for its deep golden hue and unparalleled purity. A slow-growing cultivar nourished purely by monsoon rain and wild mountain organic matter.
            </p>
          </div>
        </section>

        {/* SCENE 7 — TRANSFORMATION (Visual particle swirl, no text) */}
        <section id="scene-7" className="scroll-section">
          <div className="scene-content" style={{ opacity: 0 }} />
        </section>

        {/* SCENE 8 — PRODUCT REVEAL */}
        <section id="scene-8" className="scroll-section" style={{ justifyContent: 'flex-start', paddingLeft: '8%' }}>
          <div className="scene-content glass-card" style={{ opacity: 0 }}>
            <h2 className="heading-scene">Curcumin Verified</h2>
            <p className="text-description" style={{ marginBottom: '1.5rem' }}>
              We transform the raw root into a pure, micronized gold powder, preserving its molecular potency.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', borderTop: '1px solid rgba(223, 185, 77, 0.2)', paddingTop: '1rem' }}>
              <div>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Variety</p>
                <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem' }}>Lakadong Premium</p>
              </div>
              <div>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Curcumin</p>
                <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem' }}>7.5% - 9.2% Verified</p>
              </div>
              <div>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Elevation</p>
                <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem' }}>4,500 ft Highlands</p>
              </div>
              <div>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Traceability</p>
                <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem' }}>100% Single Origin</p>
              </div>
            </div>
          </div>
        </section>

        {/* SCENE 9 — ORIGIN VERIFIED */}
        <section id="scene-9" className="scroll-section" style={{ justifyContent: 'center' }}>
          <div className="scene-content" style={{ opacity: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <h2 className="heading-scene" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>Laboratory Verified</h2>
            
            <div className="cards-grid" style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '1100px', padding: '0 20px' }}>
              
              <div className="glass-card card-item" style={{ flex: '1 1 280px', maxWidth: '340px', padding: '1.8rem' }}>
                <p style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', color: 'var(--color-gold)', marginBottom: '0.5rem' }}>01</p>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: '400', fontSize: '1.25rem', marginBottom: '0.5rem' }}>Curcumin Verification</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-ivory-dim)', lineHeight: '1.5' }}>Independent chemical testing verifies curcumin concentrations exceeding standard agricultural averages by up to 300%.</p>
              </div>
              
              <div className="glass-card card-item" style={{ flex: '1 1 280px', maxWidth: '340px', padding: '1.8rem' }}>
                <p style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', color: 'var(--color-gold)', marginBottom: '0.5rem' }}>02</p>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: '400', fontSize: '1.25rem', marginBottom: '0.5rem' }}>Complete Traceability</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-ivory-dim)', lineHeight: '1.5' }}>Each batch is serialized back to the individual smallholder cooperative, ensuring strict supply chain integrity from harvest to bottle.</p>
              </div>

              <div className="glass-card card-item" style={{ flex: '1 1 280px', maxWidth: '340px', padding: '1.8rem' }}>
                <p style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', color: 'var(--color-gold)', marginBottom: '0.5rem' }}>03</p>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: '400', fontSize: '1.25rem', marginBottom: '0.5rem' }}>Purity Assurance</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-ivory-dim)', lineHeight: '1.5' }}>Zero heavy metals, additives, or adulterants. Every shipment undergoes full spectrum lab tests matching export standards.</p>
              </div>

            </div>
          </div>
        </section>

        {/* SCENE 10 — FINAL FRAME */}
        <section id="scene-10" className="scroll-section">
          <div className="scene-content" style={{ opacity: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '1rem' }}>Available in Limited Batches</span>
            <h1 className="title-main" style={{ fontSize: '4rem' }}>Paradise Organics</h1>
            <p className="subtitle-main" style={{ margin: '0.5rem 0 2rem 0' }}>The Golden Root™ — Origin Matters.</p>
            <div className="buttons-group interactive">
              <button className="btn-gold" onClick={() => alert("Exploring the Meghalaya Highlands Origin... coming soon.")}>Explore The Origin</button>
              <button className="btn-outline" onClick={() => alert("Requesting priority allocation list access... coming soon.")}>Request Priority Access</button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
});

TextOverlays.displayName = 'TextOverlays';

export default TextOverlays;
