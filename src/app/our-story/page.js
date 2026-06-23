import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function OurStoryPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#F5F1E8' }}>
      <Header />
      <main style={{ flex: 1, padding: '12rem 2rem 6rem', maxWidth: '800px', margin: '0 auto', color: '#1C1C1A' }}>
        <h1 className="cine-hero-sm" style={{ marginBottom: '4rem' }}>Our Story</h1>
        
        <section style={{ marginBottom: '6rem' }}>
          <h2 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#B38A3D', marginBottom: '1.5rem' }}>The Problem</h2>
          <p style={{ fontSize: '1.4rem', lineHeight: '1.6', color: 'rgba(28, 28, 26, 0.9)', marginBottom: '1.5rem' }}>
            The global spice trade has commodified turmeric to the point of unrecognizability. Extracted, diluted, and mass-produced.
          </p>
        </section>

        <section style={{ marginBottom: '6rem' }}>
          <h2 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#B38A3D', marginBottom: '1.5rem' }}>Our Belief</h2>
          <p style={{ fontSize: '1.4rem', lineHeight: '1.6', color: 'rgba(28, 28, 26, 0.9)' }}>
            Extraordinary ingredients begin in extraordinary places. They are not engineered; they are discovered.
          </p>
        </section>

        <section style={{ marginBottom: '6rem' }}>
          <h2 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#B38A3D', marginBottom: '1.5rem' }}>Origin Matters</h2>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: 'rgba(28, 28, 26, 0.7)' }}>
            We traveled to the remote highlands of Northeast India to source the legendary Lakadong turmeric. Our mission is to bridge the gap between ancient, verified origins and modern wellness.
          </p>
        </section>

        <section style={{ borderTop: '1px solid rgba(179, 138, 61, 0.2)', paddingTop: '4rem' }}>
          <h2 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#B38A3D', marginBottom: '2rem' }}>Founder's Note</h2>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.6', color: 'rgba(28, 28, 26, 0.9)', fontStyle: 'italic', marginBottom: '1rem' }}>
            "I did not start Paradise Organics to sell turmeric. I started it because remarkable ingredients deserve remarkable recognition."
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
