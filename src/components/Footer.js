'use client';

import React from 'react';
import { Mail, Phone, MapPin, Globe, Shield, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="glass-panel" style={{
      margin: '40px 24px 24px 24px',
      padding: '40px 32px 24px 32px',
      border: '1px solid var(--border-glass)',
      display: 'flex',
      flexDirection: 'column',
      gap: '32px',
      background: 'var(--bg-glass)'
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '40px'
      }}>
        {/* About */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h2 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="text-gradient">AdNazar</span>
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            India's next-generation tech-enabled OOH (Out-of-Home) Outdoor Advertising Marketplace. We bridge the gap between billboard hosts and growing Indian enterprises using interactive 3D simulated night highways, real-time traffic statistics, and automated digital ledger bookings.
          </p>
          <div style={{ display: 'flex', gap: '12px' }}>
            <span className="badge badge-saffron">Three.js 3D</span>
            <span className="badge badge-cyan">GPS Map</span>
            <span className="badge badge-emerald">Live Analytics</span>
          </div>
        </div>

        {/* Categories */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '1rem', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>Target Sectors</h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            <li>🏢 Real Estate & Commercial Launches</li>
            <li>🛍️ Local Businesses & Retail Outlets</li>
            <li>🗳️ Political & Public Awareness Campaigns</li>
            <li>🎉 Entertainment Events & Concerts</li>
            <li>🍽️ Restaurant & Food Brand Promotions</li>
          </ul>
        </div>

        {/* Quick Links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '1rem', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>Contact & Support</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            <p style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Mail style={{ width: '16px', height: '16px', color: 'var(--accent-saffron)' }} />
              support@adnazar.in
            </p>
            <p style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Phone style={{ width: '16px', height: '16px', color: 'var(--accent-purple)' }} />
              +91 1800 233 4567 (Toll-Free)
            </p>
            <p style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <MapPin style={{ width: '16px', height: '16px', color: 'var(--accent-rose)' }} />
              Connaught Place, New Delhi, India
            </p>
          </div>
        </div>
      </div>

      <hr style={{ border: 'none', height: '1px', background: 'var(--border-glass)' }} />

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px',
        fontSize: '0.8rem',
        color: 'var(--text-muted)'
      }}>
        <p>© 2026 AdNazar Technologies Private Limited. All rights reserved.</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <p style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
            <Shield style={{ width: '14px', height: '14px', color: 'var(--accent-emerald)' }} /> Secure Razorpay Gateway Enabled
          </p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            Made with <Heart style={{ width: '12px', height: '12px', color: 'var(--accent-saffron)', fill: 'var(--accent-saffron)' }} /> in India
          </p>
        </div>
      </div>
    </footer>
  );
}
