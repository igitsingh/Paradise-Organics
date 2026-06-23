import Link from 'next/link';

export default function TermsOfService() {
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
        <h1 className="cine-hero-sm" style={{ marginBottom: '2rem' }}>Terms of Service</h1>
        <p style={{ marginBottom: '2rem', color: 'rgba(245, 241, 232, 0.7)' }}>Effective Date: [Insert Date]</p>
        
        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#B38A3D' }}>1. Acceptance of Terms</h2>
          <p style={{ lineHeight: '1.6', marginBottom: '1rem' }}>
            By accessing or using the Paradise Organics website, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not access the service.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#B38A3D' }}>2. Use of the Site</h2>
          <p style={{ lineHeight: '1.6', marginBottom: '1rem' }}>
            The content on this site is for informational and shopping purposes only. You agree to use the site only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use of the site.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#B38A3D' }}>3. Products and Reservations</h2>
          <p style={{ lineHeight: '1.6', marginBottom: '1rem' }}>
            Our single-origin Lakadong turmeric is offered in limited batches. Submitting a reservation does not guarantee product availability. We reserve the right to refuse or cancel any order for any reason.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#B38A3D' }}>4. Governing Law</h2>
          <p style={{ lineHeight: '1.6', marginBottom: '1rem' }}>
            These terms are governed by the laws of your applicable jurisdiction, recognizing international e-commerce protections for consumers in the USA, UK, UAE, and India.
          </p>
        </section>

        <p style={{ fontStyle: 'italic', color: 'rgba(245, 241, 232, 0.5)', marginTop: '4rem', fontSize: '0.8rem' }}>Note: This is a boilerplate document. Please have this reviewed by your legal counsel.</p>
      </main>
    </>
  );
}
