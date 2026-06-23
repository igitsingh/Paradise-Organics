import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function MeghalayaPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#F5F1E8' }}>
      <Header />
      <main style={{ flex: 1, padding: '12rem 2rem 6rem', maxWidth: '800px', margin: '0 auto', color: '#1C1C1A' }}>
        <h1 className="cine-hero-sm" style={{ marginBottom: '4rem' }}>Meghalaya</h1>
        <p style={{ fontSize: '1.4rem', lineHeight: '1.6', color: 'rgba(28, 28, 26, 0.9)' }}>
          Known as the "Abode of Clouds". The unique combination of extreme monsoon rainfall, high altitude, and ancient, unpolluted soil creates the perfect environmental stress for the Lakadong turmeric rhizome to overproduce defensive curcumin compounds.
        </p>
      </main>
      <Footer />
    </div>
  );
}
