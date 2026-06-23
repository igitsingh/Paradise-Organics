'use client';

import React, { useState, useEffect } from 'react';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if consent has already been given or denied
    const consentStatus = localStorage.getItem('po_cookie_consent');
    if (!consentStatus) {
      setShowBanner(true);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('po_cookie_consent', 'all');
    // Here we would initialize analytics/marketing scripts
    setShowBanner(false);
  };

  const handleRejectAll = () => {
    localStorage.setItem('po_cookie_consent', 'essential');
    // Here we would ensure no non-essential scripts run
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="cookie-banner-overlay" role="dialog" aria-modal="true" aria-label="Cookie Consent">
      <div className="cookie-banner-content">
        <h2 className="cookie-banner-title">Your Privacy & Consent</h2>
        <p className="cookie-banner-text">
          To provide the best possible experience across our digital properties, we use cookies to personalize content, analyze traffic, and ensure secure operations. 
          By clicking &quot;Accept All&quot;, you consent to our use of these technologies in accordance with global privacy regulations (including GDPR, CCPA, PDPL, and DPDP Act). 
          You may also choose to only allow essential cookies.
        </p>
        <div className="cookie-banner-actions">
          <button className="btn-cine-primary" onClick={handleAcceptAll}>
            Accept All
          </button>
          <button className="btn-cine-ghost" onClick={handleRejectAll}>
            Reject Non-Essential
          </button>
        </div>
        <div className="cookie-banner-links">
          <a href="/privacy" className="footer-link" style={{ fontSize: '0.7rem' }}>Read our Privacy Policy</a>
        </div>
      </div>
    </div>
  );
}
