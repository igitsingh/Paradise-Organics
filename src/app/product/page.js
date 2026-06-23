import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ProductPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#F5F1E8' }}>
      <Header />
      <main style={{ flex: 1, padding: '12rem 2rem 6rem', maxWidth: '800px', margin: '0 auto', color: '#1C1C1A' }}>
        <h1 className="cine-hero-sm" style={{ marginBottom: '1rem' }}>The Golden Root™</h1>
        <p style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#B38A3D', marginBottom: '4rem' }}>Meghalaya, India</p>

        <section style={{ marginBottom: '6rem' }}>
          <div style={{ height: '400px', backgroundColor: '#FDFBF8', border: '1px dashed rgba(179, 138, 61, 0.3)', marginBottom: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: 'rgba(179, 138, 61, 0.5)' }}>[Product Photography]</span>
          </div>
          <p style={{ fontSize: '1.4rem', lineHeight: '1.6', color: 'rgba(28, 28, 26, 0.9)', marginBottom: '1.5rem' }}>
            Cold-milled below 42°C. Never extracted. Never diluted. This is turmeric exactly as nature engineered it, featuring an unprecedented 8.1% naturally occurring curcumin.
          </p>
        </section>

        <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
          <div>
            <h2 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#B38A3D', marginBottom: '1.5rem' }}>Tasting Notes</h2>
            <p style={{ lineHeight: '1.6', color: 'rgba(245, 241, 232, 0.7)' }}>Deep earth, bright citrus, subtle pine. A complex, resinous profile only possible through high-altitude cultivation.</p>
          </div>
          <div>
            <h2 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#B38A3D', marginBottom: '1.5rem' }}>Application</h2>
            <p style={{ lineHeight: '1.6', color: 'rgba(245, 241, 232, 0.7)' }}>Ideal for clinical nutraceutical formulation, premium culinary applications, and high-end beverage programs.</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
