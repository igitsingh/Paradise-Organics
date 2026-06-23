import Link from 'next/link';

export default function PrivacyPolicy() {
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
        <h1 className="cine-hero-sm" style={{ marginBottom: '2rem' }}>Privacy Policy</h1>
        <p style={{ marginBottom: '2rem', color: 'rgba(245, 241, 232, 0.7)' }}>Effective Date: [Insert Date]</p>
        
        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#B38A3D' }}>1. Introduction</h2>
          <p style={{ lineHeight: '1.6', marginBottom: '1rem' }}>
            Welcome to Paradise Organics. We respect your privacy and are committed to protecting your personal data globally. This policy outlines how we handle your personal information in compliance with the <strong>California Consumer Privacy Act (CCPA/CPRA)</strong>, the <strong>UK General Data Protection Regulation (UK GDPR)</strong>, the <strong>UAE Personal Data Protection Law (PDPL)</strong>, and the <strong>Digital Personal Data Protection Act of India (DPDPA)</strong>.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#B38A3D' }}>2. Information We Collect</h2>
          <p style={{ lineHeight: '1.6', marginBottom: '1rem' }}>
            We collect information that you voluntarily provide to us (such as your name, email, and shipping address when making a reservation or purchase) and data collected automatically via cookies (such as IP address, device type, and browsing behavior on our site).
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#B38A3D' }}>3. Your Global Rights</h2>
          <ul style={{ lineHeight: '1.6', paddingLeft: '1.5rem' }}>
            <li style={{ marginBottom: '0.5rem' }}><strong>UK / EU (GDPR):</strong> You have the right to access, rectify, erase, and restrict the processing of your data. You may withdraw consent at any time.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>USA (CCPA):</strong> You have the right to know what personal information is collected, the right to delete it, and the right to opt-out of the "sale" or "sharing" of your personal information.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>UAE (PDPL):</strong> You have the right to obtain information about your data, request correction, restrict processing, and request data portability.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>India (DPDPA):</strong> You have the right to access information about your personal data, right to correction/erasure, and the right to grievance redressal.</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#B38A3D' }}>4. Cross-Border Transfers</h2>
          <p style={{ lineHeight: '1.6', marginBottom: '1rem' }}>
            Your data may be transferred to and maintained on servers located outside of your state, province, country, or other governmental jurisdiction. We ensure appropriate safeguards are in place for all international transfers as required by applicable laws.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#B38A3D' }}>5. Contact Us</h2>
          <p style={{ lineHeight: '1.6', marginBottom: '1rem' }}>
            For any privacy-related requests or grievances, please contact our Data Protection Officer at: <a href="mailto:privacy@paradiseorganics.com" style={{ color: '#B38A3D', textDecoration: 'underline' }}>privacy@paradiseorganics.com</a>.
          </p>
        </section>
        
        <p style={{ fontStyle: 'italic', color: 'rgba(245, 241, 232, 0.5)', marginTop: '4rem', fontSize: '0.8rem' }}>Note: This is a boilerplate policy. Please have this reviewed by your legal counsel to ensure complete accuracy and compliance for your specific operations.</p>
      </main>
    </>
  );
}
