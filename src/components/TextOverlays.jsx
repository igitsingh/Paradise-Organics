import React, { forwardRef } from 'react';

const TextOverlays = forwardRef(({ soundActive, onToggleSound }, ref) => {
  return (
    <div ref={ref} className="ui-overlay">

      {/* ─── Navigation ─── */}
      <nav className="brand-nav">
        <div className="brand-nav-logo">Paradise Organics</div>
        <div className="brand-nav-tagline">Origin Matters.</div>
        <button
          className="sound-toggle interactive"
          onClick={onToggleSound}
          aria-label={soundActive ? 'Mute' : 'Unmute'}
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

      <div className="ambient-vignette" />
      <div className="gold-glow-overlay" />

      <div className="scroll-wrapper">

        {/* ══════════════════════════════════════════════
            SCENE 1 — THE GOLDEN SPHERE
            Emotional: Curiosity → Mystery
            3D Visual: Glowing golden sphere in sky
        ══════════════════════════════════════════════ */}
        <section id="scene-1" className="scroll-section cine-center" style={{ opacity: 1, visibility: 'visible' }}>
          <div className="scene-content cine-stack">
            <p className="cine-whisper c1-origin">Origin Matters.</p>
            <h1 className="cine-hero c1-brand">Paradise<br />Organics</h1>
            <p className="cine-sub c1-tagline">The Golden Root™</p>
            <p className="cine-descend c1-cue">↓</p>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            SCENE 2 — DESCENT INTO EARTH
            Emotional: Mystery deepens
            3D Visual: Camera descending through clouds/sky toward terrain
        ══════════════════════════════════════════════ */}
        <section id="scene-2" className="scroll-section cine-center">
          <div className="scene-content cine-stack">
            <p className="cine-line c2-q1">Not every origin</p>
            <p className="cine-line c2-q2">tells its story.</p>
            <p className="cine-pause c2-q3">Some must be found.</p>
            <p className="cine-line-gold c2-q4">We found ours.</p>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            SCENE 3 — APPROACHING THE EARTH
            Emotional: Discovery begins
            3D Visual: Terrain field below, camera descending fast
        ══════════════════════════════════════════════ */}
        <section id="scene-3" className="scroll-section cine-center">
          <div className="scene-content cine-stack">
            <p className="cine-whisper c3-label">Northeast India.</p>
            <p className="cine-hero-sm c3-place">Meghalaya.</p>
            <p className="cine-data c3-elev">4,600 ft</p>
            <p className="cine-whisper c3-desc">Ancient soil. Monsoon-fed. Irreplaceable.</p>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            SCENE 4 — BREAKING THROUGH EARTH
            Emotional: Descent, anticipation
            3D Visual: Diving underground, terrain disappears
        ══════════════════════════════════════════════ */}
        <section id="scene-4" className="scroll-section cine-center">
          <div className="scene-content cine-stack">
            <p className="cine-line c4-q1">Below the surface.</p>
            <p className="cine-line-dim c4-q2">Below the ordinary.</p>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            SCENE 5 — ROOT DISCOVERY
            Emotional: Explorer discovers something rare
            3D Visual: Underground cavern, roots glowing
        ══════════════════════════════════════════════ */}
        <section id="scene-5" className="scroll-section cine-center">
          <div className="scene-content cine-stack">
            <p className="cine-line c5-q1">This is where</p>
            <p className="cine-line c5-q2">rare begins.</p>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            SCENE 6 — THE GOLDEN ROOT REVEAL
            Emotional: Climax — Respect + Authority
            3D Visual: Root close-up, macro detail, gold glow
        ══════════════════════════════════════════════ */}
        <section id="scene-6" className="scroll-section cine-center">
          <div className="scene-content cine-stack">
            <p className="cine-word c6-w1">Rare.</p>
            <p className="cine-word c6-w2">Verified.</p>
            <p className="cine-word c6-w3">Irreplaceable.</p>
            <p className="cine-reveal c6-name">The Golden Root™</p>
            <p className="cine-whisper c6-origin">Lakadong · Meghalaya · India</p>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            SCENE 7 — CURCUMIN AUTHORITY + TRANSFORMATION
            Emotional: Respect → Authority
            3D Visual: Root dissolves, powder swirls
        ══════════════════════════════════════════════ */}
        <section id="scene-7" className="scroll-section cine-center">
          <div className="scene-content cine-stack">
            <p className="cine-line c7-q1">Some roots contain gold.</p>
            <p className="cine-line-gold c7-q2">This one is gold.</p>
            <p className="cine-number c7-num">8.1<span className="cine-number-unit">%</span></p>
            <p className="cine-data-label c7-label">Curcumin.</p>
            <p className="cine-compare c7-compare">The world average: 2%.</p>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            SCENE 8 — PRODUCT FORMATION
            Emotional: Desire begins
            3D Visual: Powder gathers, product jar materialises
        ══════════════════════════════════════════════ */}
        <section id="scene-8" className="scroll-section cine-center">
          <div className="scene-content cine-stack">
            <p className="cine-line c8-q1">Nothing added.</p>
            <p className="cine-line c8-q2">Nothing removed.</p>
            <p className="cine-whisper c8-q3">Cold-pressed. Below 42°C.</p>
            <p className="cine-line-gold c8-q4">The curcumin survives.</p>
            <p className="cine-whisper c8-q5">Intact.</p>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            SCENE 9 — PRODUCT REVEAL + IMPORTER TRUST
            Emotional: Trust + Authority
            3D Visual: Product rotating, fully revealed
        ══════════════════════════════════════════════ */}
        <section id="scene-9" className="scroll-section cine-center">
          <div className="scene-content cine-stack">
            <p className="cine-reveal c9-brand">The Golden Root™</p>
            <p className="cine-whisper c9-by">By Paradise Organics.</p>

            <div className="cine-trust-row">
              <div className="cine-trust-pill">
                <span className="trust-num">01</span>
                <span className="trust-text">Every batch numbered.</span>
              </div>
              <div className="cine-trust-pill">
                <span className="trust-num">02</span>
                <span className="trust-text">Every number traceable.</span>
              </div>
              <div className="cine-trust-pill">
                <span className="trust-num">03</span>
                <span className="trust-text">From root to record.</span>
              </div>
            </div>

            <p className="cine-cert c9-cert">NABL Certified · CoA Available · Export Ready</p>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            SCENE 10 — INVITATION + MANIFESTO
            Emotional: Desire → Action → Belonging
            3D Visual: Final product close-up
        ══════════════════════════════════════════════ */}
        <section id="scene-10" className="scroll-section cine-center">
          <div className="scene-content cine-stack scene-10-content">

            <div className="invitation-block">
              <p className="cine-whisper">This is not a waitlist.</p>
              <p className="cine-line-gold">This is a reservation.</p>
              <p className="cine-whisper" style={{ marginTop: '0.5rem' }}>
                Batch PO-LKD-026 · Winter 2025
              </p>
            </div>

            <div className="cine-cta-group interactive">
              <button
                className="btn-cine-primary"
                id="cta-allocate"
                onClick={() => alert('Securing your allocation... coming soon.')}
              >
                Request Yours
              </button>
              <button
                className="btn-cine-ghost"
                id="cta-explore"
                onClick={() => alert('Exploring origin... coming soon.')}
              >
                Explore The Origin
              </button>
            </div>

            <div className="manifesto-block">
              <p className="manifesto-line">Origin is not a marketing word.</p>
              <p className="manifesto-line">It is a verification.</p>
              <div className="manifesto-mark">
                <span className="manifesto-brand">Paradise Organics</span>
                <span className="manifesto-loc">Meghalaya, India</span>
              </div>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
});

TextOverlays.displayName = 'TextOverlays';
export default TextOverlays;
