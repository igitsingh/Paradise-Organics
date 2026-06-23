import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ImportersPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#F5F1E8' }}>
      <Header />
      <main style={{ flex: 1, padding: '12rem 2rem 6rem', maxWidth: '800px', margin: '0 auto', color: '#1C1C1A' }}>
        <h1 className="cine-hero-sm" style={{ marginBottom: '4rem' }}>For Import Partners</h1>
        
        <section style={{ marginBottom: '6rem' }}>
          <p style={{ fontSize: '1.4rem', lineHeight: '1.6', color: 'rgba(28, 28, 26, 0.9)', marginBottom: '1.5rem' }}>
            We partner with UAE importers, UK distributors, and US retail chains who understand the value of a verified origin. We supply the world's most potent Lakadong turmeric with absolute traceability.
          </p>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'rgba(28, 28, 26, 0.7)' }}>End-to-End Traceability (Farm to Export)</li>
            <li style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'rgba(28, 28, 26, 0.7)' }}>Lab Verified Curcumin Output (8.1%+)</li>
            <li style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'rgba(28, 28, 26, 0.7)' }}>Premium Origin House Documentation</li>
            <li style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'rgba(28, 28, 26, 0.7)' }}>US/UK/UAE Custom Compliance</li>
          </ul>
        </section>

        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#B38A3D', marginBottom: '2rem' }}>Commercial Specifications</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', borderTop: '1px solid rgba(179, 138, 61, 0.2)', paddingTop: '2rem' }}>
            <div><strong style={{ color: '#B38A3D' }}>MOQ:</strong> 100 kg</div>
            <div><strong style={{ color: '#B38A3D' }}>Lead Times:</strong> 14-21 Days (Air) / 45 Days (Sea)</div>
            <div><strong style={{ color: '#B38A3D' }}>Packaging:</strong> 25kg Bulk / Retail Ready</div>
            <div><strong style={{ color: '#B38A3D' }}>Certifications:</strong> NPOP, FSSAI, APEDA</div>
            <div><strong style={{ color: '#B38A3D' }}>Testing:</strong> Eurofins / SGS available</div>
            <div><strong style={{ color: '#B38A3D' }}>Logistics:</strong> CIF, FOB Mumbai/Kolkata</div>
          </div>
        </section>

        <section style={{ background: 'rgba(14, 59, 46, 0.6)', border: '1px solid rgba(179, 138, 61, 0.2)', padding: '3rem', borderRadius: '4px' }}>
          <h2 style={{ fontSize: '1.2rem', color: '#B38A3D', marginBottom: '2rem', fontFamily: 'var(--font-serif)' }}>Request Dossier</h2>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <input type="text" placeholder="Company Name" style={{ width: '100%', padding: '1rem', background: 'transparent', border: '1px solid rgba(245, 241, 232, 0.2)', color: '#F5F1E8' }} />
            <input type="email" placeholder="Corporate Email" style={{ width: '100%', padding: '1rem', background: 'transparent', border: '1px solid rgba(245, 241, 232, 0.2)', color: '#F5F1E8' }} />
            <select style={{ width: '100%', padding: '1rem', background: 'transparent', border: '1px solid rgba(245, 241, 232, 0.2)', color: '#F5F1E8' }}>
              <option value="uae" style={{ color: '#0E3B2E' }}>UAE Import</option>
              <option value="uk" style={{ color: '#0E3B2E' }}>UK Distribution</option>
              <option value="us" style={{ color: '#0E3B2E' }}>US Retail</option>
              <option value="other" style={{ color: '#0E3B2E' }}>Other</option>
            </select>
            <button type="button" className="btn-cine-primary" style={{ marginTop: '1rem' }}>Submit Request</button>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
}
