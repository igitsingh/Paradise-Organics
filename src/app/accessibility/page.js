import Link from 'next/link';

export default function AccessibilityStatement() {
  return (
    <>
      <header className="brand-nav" style={{ background: '#0E3B2E' }}>
        <div className="brand-nav-left interactive">
          <Link href="/" className="brand-nav-logo">Paradise Organics</Link>
        </div>
        <div className="brand-nav-right interactive">
          <Link href="/" className="nav-link">← Back to Experience</Link>
        </div>
      </header>
      <main style={{ padding: '8rem 2rem', maxWidth: '800px', margin: '0 auto', minHeight: '100vh', color: '#F5F1E8' }}>
        <h1 className="cine-hero-sm" style={{ marginBottom: '2rem' }}>Accessibility Statement</h1>
        
        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#B38A3D' }}>Our Commitment</h2>
          <p style={{ lineHeight: '1.6', marginBottom: '1rem' }}>
            Paradise Organics is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards to comply with the <strong>Americans with Disabilities Act (ADA)</strong>, the <strong>UK Equality Act 2010</strong>, and the <strong>Rights of Persons with Disabilities Act (India)</strong>.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#B38A3D' }}>Conformance Status</h2>
          <p style={{ lineHeight: '1.6', marginBottom: '1rem' }}>
            The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and developers to improve accessibility for people with disabilities. It defines three levels of conformance: Level A, Level AA, and Level AAA. 
            Paradise Organics is striving towards conformance with <strong>WCAG 2.1 level AA</strong>. We have implemented keyboard-navigable components, proper ARIA labels, and focus indicators across our site.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#B38A3D' }}>Feedback</h2>
          <p style={{ lineHeight: '1.6', marginBottom: '1rem' }}>
            We welcome your feedback on the accessibility of Paradise Organics. If you encounter accessibility barriers on our digital properties, please let us know:
          </p>
          <ul style={{ lineHeight: '1.6', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>E-mail: <a href="mailto:accessibility@paradiseorganics.com" style={{ color: '#B38A3D', textDecoration: 'underline' }}>accessibility@paradiseorganics.com</a></li>
          </ul>
          <p style={{ lineHeight: '1.6' }}>We try to respond to feedback within 2 business days.</p>
        </section>
      </main>
    </>
  );
}
