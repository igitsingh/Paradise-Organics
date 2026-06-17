import React, { forwardRef } from 'react';

const TextOverlays = forwardRef(({ soundActive, onToggleSound }, ref) => {
  return (
    <div ref={ref} className="ui-overlay">

      {/* ─── Navigation Header ─── */}
      <nav className="brand-nav">
        <div className="brand-nav-logo">Paradise Organics</div>
        <div className="brand-nav-tagline">Origin Matters.</div>
        <button
          className="sound-toggle interactive"
          onClick={onToggleSound}
          aria-label={soundActive ? 'Mute soundtrack' : 'Unmute soundtrack'}
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

      {/* ─── Vignettes ─── */}
      <div className="ambient-vignette" />
      <div className="gold-glow-overlay" />

      {/* ─── Scroll Wrapper ─── */}
      <div className="scroll-wrapper">

        {/* ═══════════════════════════════════════════════════
            SCENE 1 — THE INVISIBLE OPENING
            Hero: Pattern Interruption. Force stillness before desire.
        ═══════════════════════════════════════════════════ */}
        <section id="scene-1" className="scroll-section" style={{ opacity: 1, visibility: 'visible' }}>
          <div className="scene-content scene-1-content">
            <p className="text-prelude s1-prelude">Above the cloud line, before the world wakes —</p>
            <p className="text-prelude s1-prelude-2">— something extraordinary is waiting.</p>
            <h1 className="title-main s1-brand">Paradise Organics</h1>
            <p className="subtitle-main s1-tagline">O&thinsp;R&thinsp;I&thinsp;G&thinsp;I&thinsp;N &nbsp; M&thinsp;A&thinsp;T&thinsp;T&thinsp;E&thinsp;R&thinsp;S.</p>
            <p className="text-whisper s1-cue">Scroll to descend.</p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            SCENE 2 — THE CIVILISATION ARGUMENT
            Origin Story: The Dom Pérignon principle.
        ═══════════════════════════════════════════════════ */}
        <section id="scene-2" className="scroll-section">
          <div className="scene-content scene-2-content" style={{ opacity: 0 }}>
            <p className="text-editorial s2-line-1">
              The world's most coveted products<br />share a single truth.
            </p>
            <p className="text-editorial s2-line-2">
              They are not defined by what they are.
            </p>
            <p className="text-editorial s2-line-3">
              They are defined by<br /><em>where they come from.</em>
            </p>

            <div className="terroir-words">
              <span className="terroir-word tw-1">Bordeaux.</span>
              <span className="terroir-word tw-2">Islay.</span>
              <span className="terroir-word tw-3">Madagascar.</span>
              <span className="terroir-word tw-4">Darjeeling.</span>
            </div>

            <p className="text-editorial s2-hook">
              Turmeric has been traded for 4,000 years.
            </p>
            <p className="text-editorial-small s2-hook-2">
              Yet we have never demanded to know where it grows.
            </p>
            <p className="text-editorial s2-until">Until now.</p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            SCENE 3 — THE TERROIR (The Field)
            Meghalaya: Scarcity of Knowledge. Insider privilege.
        ═══════════════════════════════════════════════════ */}
        <section id="scene-3" className="scroll-section">
          <div className="scene-content scene-3-content" style={{ opacity: 0 }}>
            <p className="text-location f-text-1" style={{ opacity: 0 }}>Northeast India.</p>
            <p className="text-editorial-small f-text-1b" style={{ opacity: 0 }}>
              The most biodiverse corner of the subcontinent.
            </p>

            <p className="text-location f-text-2" style={{ opacity: 0 }}>The Jaintia Hills.</p>
            <div className="data-cluster f-text-2b" style={{ opacity: 0 }}>
              <span className="data-line">Elevation: 4,600 ft</span>
              <span className="data-line">Annual rainfall: among the highest on earth</span>
            </div>

            <p className="text-editorial f-text-3" style={{ opacity: 0 }}>
              In soil this rich —<br />
              with rain this precise —<br />
              and winters this cold —<br />
              turmeric doesn't grow.
            </p>
            <p className="text-editorial-focus f-text-3b" style={{ opacity: 0 }}>It concentrates.</p>

            <p className="text-location f-text-4" style={{ opacity: 0 }}>Lakadong.</p>
            <p className="text-editorial-small f-text-4b" style={{ opacity: 0 }}>
              A single cultivar. Grown in fewer than forty villages.<br />Nowhere else on earth.
            </p>

            <div className="stat-comparison f-text-5" style={{ opacity: 0 }}>
              <div className="stat-row">
                <span className="stat-label">Commercial turmeric</span>
                <span className="stat-value stat-low">1% – 3% curcumin</span>
              </div>
              <div className="stat-row stat-highlight-row">
                <span className="stat-label">Lakadong Turmeric</span>
                <span className="stat-value stat-high">7.5% – 9.2% curcumin</span>
              </div>
              <p className="stat-conclusion">This is not a difference in quality.<br />This is a difference in category.</p>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            SCENE 4 — EARTH TRANSITION (Visual only — breathing space)
        ═══════════════════════════════════════════════════ */}
        <section id="scene-4" className="scroll-section">
          <div className="scene-content" style={{ opacity: 0 }}>
            <p className="text-editorial s4-bridge" style={{ opacity: 0 }}>
              Most ingredients arrive in a warehouse.<br />
              <em>This one has to be found.</em>
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            SCENE 5 — THE UNDERGROUND REVELATION
            Discovery of The Golden Root™
        ═══════════════════════════════════════════════════ */}
        <section id="scene-5" className="scroll-section" style={{ justifyContent: 'flex-start', paddingLeft: '8%' }}>
          <div className="scene-content glass-card" style={{ opacity: 0 }}>
            <span className="card-eyebrow">Subterranean Discovery</span>
            <h2 className="heading-scene">The Golden Root™</h2>
            <p className="text-description">
              Beneath the Jaintia Hills — still connected to the land that made it — this root does not merely grow. It accumulates the rarest mineral signature in the world of botanicals.
            </p>
            <p className="text-whisper-card">This is what origin looks like.</p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            SCENE 6 — THE ROOT CLOSE-UP
            The Labour Principle — process visible = value rises
        ═══════════════════════════════════════════════════ */}
        <section id="scene-6" className="scroll-section" style={{ justifyContent: 'flex-end', paddingRight: '8%' }}>
          <div className="scene-content glass-card" style={{ opacity: 0 }}>
            <span className="card-eyebrow">Scientific Selection</span>
            <h2 className="heading-scene">Rare by Nature.</h2>
            <p className="text-description">
              Lakadong is a slow-growing cultivar. It cannot be forced. It cannot be scaled. It takes one growing season to produce what most roots cannot achieve in a lifetime.
            </p>
            <div className="provenance-line">
              <span>Single Origin</span>
              <span className="prov-dot">·</span>
              <span>Lakadong Variety</span>
              <span className="prov-dot">·</span>
              <span>Meghalaya Highlands</span>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            SCENE 7 — TRANSFORMATION (Visual only — alchemy breathing space)
        ═══════════════════════════════════════════════════ */}
        <section id="scene-7" className="scroll-section">
          <div className="scene-content" style={{ opacity: 0 }} />
        </section>

        {/* ═══════════════════════════════════════════════════
            SCENE 8 — PRODUCT REVEAL & VERIFICATION
            Rational confidence — authority bias + social proof
        ═══════════════════════════════════════════════════ */}
        <section id="scene-8" className="scroll-section" style={{ justifyContent: 'flex-start', paddingLeft: '8%' }}>
          <div className="scene-content glass-card" style={{ opacity: 0 }}>
            <span className="card-eyebrow">Curcumin Verified</span>
            <h2 className="heading-scene">Every Number.<br />A Name Behind It.</h2>
            <p className="text-description" style={{ marginBottom: '1.5rem' }}>
              Every batch is independently tested. Every result is published. We cold-process below 42°C — preserving 100% of the curcumin that most powders sacrifice to heat.
            </p>
            <div className="spec-grid">
              <div className="spec-item">
                <p className="spec-label">Variety</p>
                <p className="spec-value">Lakadong Premium</p>
              </div>
              <div className="spec-item">
                <p className="spec-label">Curcumin</p>
                <p className="spec-value">7.5% – 9.2% Verified</p>
              </div>
              <div className="spec-item">
                <p className="spec-label">Processing</p>
                <p className="spec-value">Cold-pressed, &lt;42°C</p>
              </div>
              <div className="spec-item">
                <p className="spec-label">Traceability</p>
                <p className="spec-value">100% Single Origin</p>
              </div>
            </div>
            <div className="batch-tag">
              <span className="batch-code">Batch PO-LKD-026 · Harvest: Winter 2025</span>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            SCENE 9 — THE CHAIN OF TRUST
            Traceability — Transparency Paradox
        ═══════════════════════════════════════════════════ */}
        <section id="scene-9" className="scroll-section" style={{ justifyContent: 'center' }}>
          <div className="scene-content scene-9-content" style={{ opacity: 0 }}>
            <h2 className="heading-scene" style={{ textAlign: 'center', marginBottom: '0.5rem' }}>The Chain of Trust.</h2>
            <p className="text-editorial-small s9-intro" style={{ textAlign: 'center', marginBottom: '3rem', color: 'var(--color-ivory-dim)' }}>
              Most brands cannot tell you which farm grew your ingredient.<br />We can.
            </p>

            <div className="trust-chain">
              <div className="trust-node">
                <div className="trust-node-marker">01</div>
                <div className="trust-node-body">
                  <h3 className="trust-node-title">Jaintia Hills Cooperative</h3>
                  <p className="trust-node-desc">Fourteen smallholder farmers. Named. Located. Partnered directly.</p>
                </div>
              </div>
              <div className="trust-connector" />
              <div className="trust-node">
                <div className="trust-node-marker">02</div>
                <div className="trust-node-body">
                  <h3 className="trust-node-title">Harvest Record</h3>
                  <p className="trust-node-desc">Batch PO-LKD-026. October 2025. Hand-harvested at peak curcumin.</p>
                </div>
              </div>
              <div className="trust-connector" />
              <div className="trust-node">
                <div className="trust-node-marker">03</div>
                <div className="trust-node-body">
                  <h3 className="trust-node-title">Laboratory Certificate</h3>
                  <p className="trust-node-desc">Third-party NABL-accredited analysis. Curcumin: 8.1%. Published.</p>
                </div>
              </div>
              <div className="trust-connector" />
              <div className="trust-node">
                <div className="trust-node-marker">04</div>
                <div className="trust-node-body">
                  <h3 className="trust-node-title">Your Shipment</h3>
                  <p className="trust-node-desc">Full documentation available. CoA, origin certificate, phytosanitary clearance.</p>
                </div>
              </div>
            </div>

            <p className="text-whisper" style={{ textAlign: 'center', marginTop: '2.5rem' }}>
              For premium buyers, importers, and private label partners — this is what accountability looks like.
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            SCENE 10 — PRIORITY ACCESS (Scarcity Revelation + CTA)
            The waitlist as an honour, not a disappointment.
        ═══════════════════════════════════════════════════ */}
        <section id="scene-10" className="scroll-section">
          <div className="scene-content scene-10-content" style={{ opacity: 0 }}>

            <div className="finale-text-group">
              <span className="card-eyebrow" style={{ display: 'block', textAlign: 'center', marginBottom: '1.5rem' }}>
                Available in Limited Batches
              </span>
              <h1 className="title-main" style={{ fontSize: 'clamp(2.2rem, 5vw, 4.5rem)', marginBottom: '0.5rem' }}>
                Paradise Organics
              </h1>
              <p className="subtitle-main" style={{ margin: '0 0 2rem 0' }}>
                The Golden Root™
              </p>

              <p className="text-editorial-small" style={{ textAlign: 'center', maxWidth: '520px', margin: '0 auto 0.75rem', color: 'var(--color-ivory-dim)' }}>
                Each harvest yields a finite number of batches.
              </p>
              <p className="text-editorial-small" style={{ textAlign: 'center', maxWidth: '520px', margin: '0 auto 0.5rem', color: 'var(--color-ivory-dim)' }}>
                Batch PO-LKD-026 is the current allocation.
              </p>
              <p className="text-editorial-small" style={{ textAlign: 'center', maxWidth: '520px', margin: '0 auto 2rem', color: 'var(--color-ivory-dim)' }}>
                The next harvest is seven months away.
              </p>
            </div>

            <div className="priority-callout">
              <p className="priority-statement">Priority Access is not a newsletter.</p>
              <p className="priority-statement-sub">It is a reservation — for people who understand that the best things in the world cannot be manufactured on demand.</p>
            </div>

            <div className="buttons-group interactive">
              <button
                className="btn-gold"
                id="cta-explore"
                onClick={() => alert('Exploring the Meghalaya Highlands Origin... coming soon.')}
              >
                Explore The Origin
              </button>
              <button
                className="btn-outline"
                id="cta-allocate"
                onClick={() => alert('Securing priority allocation... coming soon.')}
              >
                Secure My Allocation
              </button>
            </div>

            <p className="text-whisper" style={{ textAlign: 'center', marginTop: '2rem' }}>
              We will never contact you for any other reason.
            </p>

            {/* Footer Manifesto */}
            <div className="footer-manifesto">
              <p className="manifesto-line">We believe the world deserves to know where its most powerful ingredients grow.</p>
              <p className="manifesto-line">We believe a farmer's name is as important as a curcumin percentage.</p>
              <p className="manifesto-line">We believe that when origin is verified, quality cannot be faked.</p>
              <div className="manifesto-brand">
                <span className="manifesto-brand-name">Paradise Organics</span>
                <span className="manifesto-brand-tag">Meghalaya, India · Est. 2024</span>
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
