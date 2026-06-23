import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ImpactPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#F5F1E8' }}>
      <Header />
      <main style={{ flex: 1, padding: '12rem 2rem 6rem', maxWidth: '800px', margin: '0 auto', color: '#1C1C1A' }}>
        <h1 className="cine-hero-sm" style={{ marginBottom: '4rem' }}>Impact Report</h1>
        
        <section style={{ marginBottom: '6rem' }}>
          <p style={{ fontSize: '1.4rem', lineHeight: '1.6', color: 'rgba(28, 28, 26, 0.9)', marginBottom: '1.5rem' }}>
            We believe an ingredient is only as potent as the ecosystem that created it. Our supply chain is designed to enrich, not extract.
          </p>
        </section>

        <section style={{ marginBottom: '6rem' }}>
          <h2 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#B38A3D', marginBottom: '2rem' }}>2025 Milestones</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem' }}>
            <div>
              <p style={{ fontSize: '3rem', color: '#F5F1E8', marginBottom: '0.5rem' }}>45</p>
              <p style={{ color: 'rgba(245, 241, 232, 0.6)' }}>Partner Farmers</p>
            </div>
            <div>
              <p style={{ fontSize: '3rem', color: '#F5F1E8', marginBottom: '0.5rem' }}>3x</p>
              <p style={{ color: 'rgba(245, 241, 232, 0.6)' }}>Fair Trade Premium</p>
            </div>
            <div>
              <p style={{ fontSize: '3rem', color: '#F5F1E8', marginBottom: '0.5rem' }}>100%</p>
              <p style={{ color: 'rgba(245, 241, 232, 0.6)' }}>Traceable Supply</p>
            </div>
          </div>
        </section>

        <section>
          <h2 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#B38A3D', marginBottom: '1.5rem' }}>Future Goals</h2>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: 'rgba(28, 28, 26, 0.7)' }}>
            Expanding regenerative agriculture practices across 100 acres in the Jaintia Hills. Initiating community-funded solar drying facilities.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
