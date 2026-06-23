import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="brand-footer">
      <div className="footer-glow" />
      <div className="footer-content">
        <div className="footer-grid">
          
          {/* Story Column */}
          <div className="footer-col footer-story">
            <h3 className="footer-brand">Paradise Organics</h3>
            <p className="footer-text">
              Origin is not a marketing word—it is a verification. Sourced directly from the ancient, monsoon-fed soils of Meghalaya, India, we bring you the world's most potent single-origin Lakadong turmeric. Because true wellness begins at the source.
            </p>
            <p className="footer-manifesto-tag">Origin Matters.</p>
          </div>

          {/* Links Columns */}
          <div className="footer-col">
            <h4 className="footer-heading">Origin House</h4>
            <Link href="/" className="footer-link">Home</Link>
            <Link href="/our-story" className="footer-link">Our Story</Link>
            <Link href="/meghalaya" className="footer-link">Meghalaya</Link>
            <Link href="/product" className="footer-link">The Golden Root</Link>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Verification</h4>
            <Link href="/impact" className="footer-link">Impact Report</Link>
            <Link href="/reports" className="footer-link">Lab Reports</Link>
            <Link href="/sourcing" className="footer-link">Sourcing Standards</Link>
            <Link href="/journal" className="footer-link">Journal</Link>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Contact</h4>
            <Link href="/importers" className="footer-link">For Importers</Link>
            <a href="mailto:concierge@paradiseorganics.com" className="footer-link">Email Us</a>
            <a href="https://wa.me/918791655851" className="footer-link">WhatsApp</a>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} Paradise Organics. All rights reserved.
          </p>
          <div className="footer-legal">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
            <Link href="/accessibility">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
