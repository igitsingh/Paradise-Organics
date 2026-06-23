import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function SourcingPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#F5F1E8' }}>
      <Header />
      <main style={{ flex: 1, padding: '12rem 2rem 6rem', maxWidth: '800px', margin: '0 auto', color: '#1C1C1A' }}>
        <h1 className="cine-hero-sm" style={{ marginBottom: '4rem' }}>Sourcing Standards</h1>
        <p style={{ fontSize: '1.4rem', lineHeight: '1.6', color: 'rgba(28, 28, 26, 0.9)' }}>
          Our standards exceed organic certification. We practice regenerative agriculture, harvest exclusively in the winter, and mandate cold-milling below 42°C to ensure volatile essential oils are preserved.
        </p>
      </main>
      <Footer />
    </div>
  );
}
