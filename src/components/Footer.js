'use client';

import React from 'react';
import { Layers, Mail, Phone, MapPin, Shield, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{
      margin: '0',
      padding: '56px 32px 32px',
      background: 'var(--bg-secondary)',
      borderTop: '1px solid var(--border-glass)',
      display: 'flex',
      flexDirection: 'column',
      gap: '40px',
    }}>
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '40px',
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              background: 'var(--accent-purple)',
              width: '36px', height: '36px', borderRadius: '9px',
              display: 'flex', justifyContent: 'center', alignItems: 'center',
              boxShadow: 'var(--shadow-neon-purple)', flexShrink: 0,
            }}>
              <Layers style={{ color: '#ffffff', width: '17px', height: '17px' }} />
            </div>
            <h2 style={{ fontSize: '1.2rem' }}>
              <span className="text-gradient">AdNazar</span>
            </h2>
          </div>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: '1.75', maxWidth: '300px' }}>
            India&apos;s next-generation tech-enabled OOH Advertising Marketplace. Bridging billboard hosts and growing brands with 3D previews, real-time analytics, and instant booking.
          </p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <span className="badge badge-purple">Three.js 3D</span>
            <span className="badge badge-cyan">GPS Map</span>
            <span className="badge badge-emerald">Live Analytics</span>
          </div>
        </div>

        {/* Sectors */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '0.88rem', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', fontWeight: '700', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Target Sectors
          </h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
            <li>🏢 Real Estate &amp; Commercial Launches</li>
            <li>🛍️ Local Businesses &amp; Retail Outlets</li>
            <li>🗳️ Political &amp; Public Awareness Campaigns</li>
            <li>🎉 Entertainment Events &amp; Concerts</li>
            <li>🍽️ Restaurant &amp; Food Brand Promotions</li>
          </ul>
        </div>

        {/* Contact */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '0.88rem', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', fontWeight: '700', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Contact &amp; Support
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
            <p style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Mail style={{ width: '15px', height: '15px', color: 'var(--accent-saffron)', flexShrink: 0 }} />
              support@adnazar.in
            </p>
            <p style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Phone style={{ width: '15px', height: '15px', color: 'var(--accent-purple)', flexShrink: 0 }} />
              +91 1800 233 4567 (Toll-Free)
            </p>
            <p style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <MapPin style={{ width: '15px', height: '15px', color: 'var(--accent-rose)', flexShrink: 0 }} />
              Connaught Place, New Delhi, India
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
        <div style={{ height: '1px', background: 'var(--border-glass)', marginBottom: '24px' }} />
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          fontSize: '0.78rem',
          color: 'var(--text-muted)',
        }}>
          <p>© 2026 AdNazar Technologies Private Limited. All rights reserved.</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <p style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
              <Shield style={{ width: '13px', height: '13px', color: 'var(--accent-emerald)' }} />
              Secure Razorpay Gateway
            </p>
            <p style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              Made with <Heart style={{ width: '12px', height: '12px', color: 'var(--accent-rose)', fill: 'var(--accent-rose)', margin: '0 2px' }} /> in India
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
