import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ContactPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1, padding: '12rem 2rem 6rem', maxWidth: '1000px', margin: '0 auto', color: '#F5F1E8', display: 'flex', flexWrap: 'wrap', gap: '4rem' }}>
        
        <div style={{ flex: '1 1 400px' }}>
          <h1 className="cine-hero-sm" style={{ marginBottom: '1.5rem', textAlign: 'left' }}>Contact Us</h1>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: 'rgba(245, 241, 232, 0.8)', marginBottom: '3rem' }}>
            Whether you are inquiring about a personal allocation or a commercial export order, our concierge is here to assist you.
          </p>

          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(245, 241, 232, 0.5)', marginBottom: '0.5rem' }}>Email</h3>
            <a href="mailto:concierge@paradiseorganics.com" style={{ fontSize: '1.2rem', color: '#B38A3D', textDecoration: 'none' }}>concierge@paradiseorganics.com</a>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(245, 241, 232, 0.5)', marginBottom: '0.5rem' }}>WhatsApp</h3>
            <a href="https://wa.me/918791655851" target="_blank" rel="noreferrer" style={{ fontSize: '1.2rem', color: '#B38A3D', textDecoration: 'none' }}>+91 87916 55851</a>
          </div>
          
          <div>
            <h3 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(245, 241, 232, 0.5)', marginBottom: '0.5rem' }}>Headquarters</h3>
            <p style={{ fontSize: '1.1rem', color: 'rgba(245, 241, 232, 0.9)', lineHeight: '1.5' }}>
              Shillong, Meghalaya<br/>India
            </p>
          </div>
        </div>

        <div style={{ flex: '1 1 400px', background: 'rgba(14, 59, 46, 0.4)', border: '1px solid rgba(179, 138, 61, 0.15)', padding: '3rem', borderRadius: '4px', backdropFilter: 'blur(10px)' }}>
          <h2 style={{ fontSize: '1.5rem', color: '#B38A3D', marginBottom: '2rem', fontFamily: 'var(--font-serif)' }}>Inquiry Form</h2>
          
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label htmlFor="name" style={{ display: 'block', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(245, 241, 232, 0.7)', marginBottom: '0.5rem' }}>Full Name</label>
              <input type="text" id="name" style={{ width: '100%', padding: '0.8rem', background: 'transparent', border: '1px solid rgba(245, 241, 232, 0.2)', color: '#F5F1E8', outline: 'none' }} />
            </div>

            <div>
              <label htmlFor="email" style={{ display: 'block', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(245, 241, 232, 0.7)', marginBottom: '0.5rem' }}>Email Address</label>
              <input type="email" id="email" style={{ width: '100%', padding: '0.8rem', background: 'transparent', border: '1px solid rgba(245, 241, 232, 0.2)', color: '#F5F1E8', outline: 'none' }} />
            </div>

            <div>
              <label htmlFor="inquiry-type" style={{ display: 'block', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(245, 241, 232, 0.7)', marginBottom: '0.5rem' }}>Inquiry Type</label>
              <select id="inquiry-type" style={{ width: '100%', padding: '0.8rem', background: 'transparent', border: '1px solid rgba(245, 241, 232, 0.2)', color: '#F5F1E8', outline: 'none', appearance: 'none' }}>
                <option value="personal" style={{ color: '#0E3B2E' }}>Personal Reservation</option>
                <option value="wholesale" style={{ color: '#0E3B2E' }}>Wholesale / Export</option>
                <option value="other" style={{ color: '#0E3B2E' }}>Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" style={{ display: 'block', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(245, 241, 232, 0.7)', marginBottom: '0.5rem' }}>Message</label>
              <textarea id="message" rows="4" style={{ width: '100%', padding: '0.8rem', background: 'transparent', border: '1px solid rgba(245, 241, 232, 0.2)', color: '#F5F1E8', outline: 'none', resize: 'vertical' }}></textarea>
            </div>

            <button type="button" className="btn-cine-primary" style={{ marginTop: '1rem', border: 'none', cursor: 'pointer' }}>Send Inquiry</button>
          </form>
        </div>

      </main>
      <Footer />
    </div>
  );
}
