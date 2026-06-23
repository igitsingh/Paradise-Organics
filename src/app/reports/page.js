import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ReportsPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#F5F1E8' }}>
      <Header />
      <main style={{ flex: 1, padding: '12rem 2rem 6rem', maxWidth: '800px', margin: '0 auto', color: '#1C1C1A' }}>
        <h1 className="cine-hero-sm" style={{ marginBottom: '4rem' }}>Lab Reports</h1>
        <div style={{ height: '400px', backgroundColor: 'rgba(28, 28, 26, 0.05)', border: '1px dashed rgba(179, 138, 61, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(179, 138, 61, 0.5)' }}>
          [Downloadable HPLC Curcumin & Heavy Metal Certificates]
        </div>
      </main>
      <Footer />
    </div>
  );
}
