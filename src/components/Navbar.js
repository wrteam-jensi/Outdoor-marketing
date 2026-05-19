'use client';

import React from 'react';
import { Layers, User, Settings, ShieldAlert, Sparkles, LogIn } from 'lucide-react';

export default function Navbar({ activePortal, setActivePortal }) {
  return (
    <header className="glass-panel" style={{
      position: 'sticky',
      top: '16px',
      margin: '0 24px 24px 24px',
      padding: '16px 32px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: 100,
      border: '1px solid var(--border-glass)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          background: 'linear-gradient(135deg, var(--accent-purple) 0%, var(--accent-cyan) 100%)',
          width: '42px',
          height: '42px',
          borderRadius: '12px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: 'var(--shadow-neon-purple)',
        }}>
          <Layers style={{ color: '#fff', width: '22px', height: '22px' }} />
        </div>
        <div>
          <h1 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span className="text-gradient">AdVantage</span>
            <span style={{ fontSize: '0.65rem', padding: '2px 6px', background: 'rgba(15,23,42,0.05)', borderRadius: '4px', letterSpacing: '1px', fontFamily: 'var(--font-mono)', verticalAlign: 'middle', border: '1px solid rgba(15,23,42,0.08)', color: 'var(--text-secondary)' }}>v1.0</span>
          </h1>
          <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>OUTDOOR ADVERTISING PLATFORM</p>
        </div>
      </div>

      {/* Portal Switches */}
      <div style={{
        display: 'flex',
        background: 'rgba(15, 23, 42, 0.05)',
        padding: '6px',
        borderRadius: '14px',
        border: '1px solid rgba(15, 23, 42, 0.08)',
        gap: '6px'
      }}>
        <button
          onClick={() => setActivePortal('advertiser')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: activePortal === 'advertiser' ? 'linear-gradient(135deg, rgba(124,58,237,0.2) 0%, rgba(6,182,212,0.1) 100%)' : 'transparent',
            border: activePortal === 'advertiser' ? '1px solid rgba(6, 182, 212, 0.4)' : '1px solid transparent',
            color: activePortal === 'advertiser' ? 'var(--accent-cyan)' : 'var(--text-secondary)',
            padding: '8px 18px',
            borderRadius: '10px',
            fontSize: '0.85rem',
            fontWeight: '600',
            fontFamily: 'var(--font-mono)',
            cursor: 'pointer',
            transition: 'var(--transition-smooth)'
          }}
        >
          <User style={{ width: '16px', height: '16px' }} />
          Advertiser Hub
        </button>

        <button
          onClick={() => setActivePortal('owner')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: activePortal === 'owner' ? 'linear-gradient(135deg, rgba(124,58,237,0.2) 0%, rgba(6,182,212,0.1) 100%)' : 'transparent',
            border: activePortal === 'owner' ? '1px solid rgba(124, 58, 237, 0.4)' : '1px solid transparent',
            color: activePortal === 'owner' ? 'var(--accent-purple)' : 'var(--text-secondary)',
            padding: '8px 18px',
            borderRadius: '10px',
            fontSize: '0.85rem',
            fontWeight: '600',
            fontFamily: 'var(--font-mono)',
            cursor: 'pointer',
            transition: 'var(--transition-smooth)'
          }}
        >
          <Settings style={{ width: '16px', height: '16px' }} />
          Holder Owner
        </button>

        <button
          onClick={() => setActivePortal('admin')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: activePortal === 'admin' ? 'linear-gradient(135deg, rgba(244,63,94,0.15) 0%, rgba(244,63,94,0.05) 100%)' : 'transparent',
            border: activePortal === 'admin' ? '1px solid rgba(244, 63, 94, 0.4)' : '1px solid transparent',
            color: activePortal === 'admin' ? '#fb7185' : 'var(--text-secondary)',
            padding: '8px 18px',
            borderRadius: '10px',
            fontSize: '0.85rem',
            fontWeight: '600',
            fontFamily: 'var(--font-mono)',
            cursor: 'pointer',
            transition: 'var(--transition-smooth)'
          }}
        >
          <ShieldAlert style={{ width: '16px', height: '16px' }} />
          Admin Control
        </button>
      </div>

      {/* Simulated User Profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ textAlign: 'right', display: 'none', md: 'block' }}>
          <p style={{ fontSize: '0.85rem', fontWeight: '600' }}>Amit Sharma</p>
          <p style={{ fontSize: '0.7rem', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end' }}>
            <Sparkles style={{ width: '10px', height: '10px' }} /> Premium Biz
          </p>
        </div>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: '2px solid var(--accent-cyan)',
          padding: '2px',
          cursor: 'pointer',
          background: 'rgba(15,23,42,0.05)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--accent-purple) 0%, var(--accent-cyan) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.9rem',
            fontWeight: '800',
            color: '#fff'
          }}>
            AS
          </div>
        </div>
      </div>
    </header>
  );
}
