'use client';

import React from 'react';
import { Layers, User, Settings, ShieldAlert, Sparkles, Lock, Unlock, Sun, Moon } from 'lucide-react';

export default function Navbar({ activePortal, setActivePortal, isAdminUnlocked, onLockToggle, theme, onThemeToggle }) {
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
      background: 'var(--bg-glass)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Tri-color branded logo icon */}
        <div style={{
          background: 'linear-gradient(135deg, var(--accent-saffron) 0%, #ffffff 50%, var(--accent-emerald) 100%)',
          width: '42px',
          height: '42px',
          borderRadius: '12px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: 'var(--shadow-neon-saffron)',
          padding: '2px'
        }}>
          <div style={{
            background: 'var(--bg-primary)',
            width: '100%',
            height: '100%',
            borderRadius: '10px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Layers style={{ color: 'var(--accent-saffron)', width: '20px', height: '20px' }} />
          </div>
        </div>
        <div>
          <h1 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '6px', lineHeight: '1.2' }}>
            <span className="text-gradient">AdNazar</span>
          </h1>
          <p style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', letterSpacing: '1px' }}>INTELLIGENT OOH ADVERTISING NETWORK</p>
        </div>
      </div>

      {/* Portal Switches */}
      <div style={{
        display: 'flex',
        background: 'rgba(255, 255, 255, 0.02)',
        padding: '6px',
        borderRadius: '14px',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        gap: '6px'
      }}>
        <button
          onClick={() => setActivePortal('advertiser')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: activePortal === 'advertiser' ? 'linear-gradient(135deg, rgba(6,182,212,0.12) 0%, rgba(99,102,241,0.04) 100%)' : 'transparent',
            border: activePortal === 'advertiser' ? '1px solid rgba(6, 182, 212, 0.3)' : '1px solid transparent',
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
            background: activePortal === 'owner' ? 'linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(249,115,22,0.04) 100%)' : 'transparent',
            border: activePortal === 'owner' ? '1px solid rgba(99, 102, 241, 0.3)' : '1px solid transparent',
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
          Billboard Host
        </button>

        {isAdminUnlocked && (
          <button
            onClick={() => setActivePortal('admin')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: activePortal === 'admin' ? 'linear-gradient(135deg, rgba(244,63,94,0.12) 0%, rgba(244,63,94,0.04) 100%)' : 'transparent',
              border: activePortal === 'admin' ? '1px solid rgba(244, 63, 94, 0.3)' : '1px solid transparent',
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
            Admin System
          </button>
        )}
      </div>

      {/* Simulated User Profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Sleek Theme Toggle Button */}
        <button
          onClick={onThemeToggle}
          title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
          style={{
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid var(--border-glass)',
            borderRadius: '10px',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--text-primary)',
            transition: 'var(--transition-smooth)',
          }}
        >
          {theme === 'dark' ? <Sun style={{ width: '16px', height: '16px', color: 'var(--accent-purple)' }} /> : <Moon style={{ width: '16px', height: '16px', color: 'var(--accent-purple)' }} />}
        </button>

        {/* Sleek Admin Security Lock Button */}
        <button
          onClick={onLockToggle}
          title={isAdminUnlocked ? "Lock Admin Session" : "Access Admin Portal"}
          style={{
            background: isAdminUnlocked ? 'rgba(16, 185, 129, 0.08)' : 'rgba(255, 255, 255, 0.02)',
            border: isAdminUnlocked ? '1px solid rgba(16, 185, 129, 0.25)' : '1px solid var(--border-glass)',
            borderRadius: '10px',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: isAdminUnlocked ? 'var(--accent-emerald)' : 'var(--text-secondary)',
            transition: 'var(--transition-smooth)',
            boxShadow: isAdminUnlocked ? '0 0 10px rgba(16, 185, 129, 0.1)' : 'none'
          }}
        >
          {isAdminUnlocked ? <Unlock style={{ width: '16px', height: '16px' }} /> : <Lock style={{ width: '16px', height: '16px' }} />}
        </button>

        <div style={{ textAlign: 'right' }}>
          <p style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-primary)' }}>Amit Sharma</p>
          <p style={{ fontSize: '0.7rem', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end' }}>
            <Sparkles style={{ width: '10px', height: '10px' }} /> Premium Biz
          </p>
        </div>

        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: '2px solid var(--accent-saffron)',
          padding: '2px',
          cursor: 'pointer',
          background: 'rgba(255,255,255,0.02)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--accent-saffron) 0%, var(--accent-purple) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.95rem',
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
