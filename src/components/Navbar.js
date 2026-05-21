'use client';

import React from 'react';
import { Layers, User, Settings, ShieldAlert, Sparkles, Lock, Unlock, Sun, Moon, LogOut, Home, LogIn } from 'lucide-react';

export default function Navbar({
  activePortal,
  setActivePortal,
  isAdminUnlocked,
  onLockToggle,
  theme,
  onThemeToggle,
  currentUser,
  onLogout,
  onShowAuth,
  view,
  onGoHome,
}) {
  const isLoggedIn = !!currentUser;

  return (
    <header className="glass-panel" style={{
      position: 'sticky',
      top: '16px',
      margin: '0 24px 24px 24px',
      padding: '14px 28px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: 100,
      border: '1px solid var(--border-glass)',
      background: 'var(--bg-glass)'
    }}>
      {/* Logo — always visible, clickable to home */}
      <button
        onClick={onGoHome}
        style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
      >
        <div style={{
          background: 'linear-gradient(135deg, var(--accent-saffron) 0%, #ffffff 50%, var(--accent-emerald) 100%)',
          width: '40px', height: '40px', borderRadius: '11px',
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          boxShadow: 'var(--shadow-neon-saffron)', padding: '2px', flexShrink: 0
        }}>
          <div style={{
            background: 'var(--bg-primary)', width: '100%', height: '100%', borderRadius: '9px',
            display: 'flex', justifyContent: 'center', alignItems: 'center'
          }}>
            <Layers style={{ color: 'var(--accent-saffron)', width: '18px', height: '18px' }} />
          </div>
        </div>
        <div>
          <h1 style={{ fontSize: '1.4rem', display: 'flex', alignItems: 'center', gap: '6px', lineHeight: '1.2' }}>
            <span className="text-gradient">AdNazar</span>
          </h1>
          <p style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', letterSpacing: '1px' }}>INTELLIGENT OOH NETWORK</p>
        </div>
      </button>

      {/* Center: Portal tabs — only when logged in */}
      {isLoggedIn && (
        <div style={{
          display: 'flex',
          background: 'rgba(255,255,255,0.02)',
          padding: '5px',
          borderRadius: '13px',
          border: '1px solid rgba(255,255,255,0.05)',
          gap: '4px'
        }}>
          {/* Advertiser tab */}
          {(currentUser.role === 'advertiser' || currentUser.role === 'admin') && (
            <button
              onClick={() => setActivePortal('advertiser')}
              style={{
                display: 'flex', alignItems: 'center', gap: '7px',
                background: activePortal === 'advertiser' ? 'linear-gradient(135deg,rgba(6,182,212,0.12) 0%,rgba(99,102,241,0.04) 100%)' : 'transparent',
                border: activePortal === 'advertiser' ? '1px solid rgba(6,182,212,0.3)' : '1px solid transparent',
                color: activePortal === 'advertiser' ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                padding: '7px 16px', borderRadius: '9px',
                fontSize: '0.83rem', fontWeight: '600', fontFamily: 'var(--font-mono)',
                cursor: 'pointer', transition: 'var(--transition-smooth)'
              }}
            >
              <User style={{ width: '15px', height: '15px' }} />
              Advertiser Hub
            </button>
          )}

          {/* Host tab */}
          {(currentUser.role === 'host' || currentUser.role === 'admin') && (
            <button
              onClick={() => setActivePortal('owner')}
              style={{
                display: 'flex', alignItems: 'center', gap: '7px',
                background: activePortal === 'owner' ? 'linear-gradient(135deg,rgba(99,102,241,0.12) 0%,rgba(249,115,22,0.04) 100%)' : 'transparent',
                border: activePortal === 'owner' ? '1px solid rgba(99,102,241,0.3)' : '1px solid transparent',
                color: activePortal === 'owner' ? 'var(--accent-purple)' : 'var(--text-secondary)',
                padding: '7px 16px', borderRadius: '9px',
                fontSize: '0.83rem', fontWeight: '600', fontFamily: 'var(--font-mono)',
                cursor: 'pointer', transition: 'var(--transition-smooth)'
              }}
            >
              <Settings style={{ width: '15px', height: '15px' }} />
              Billboard Host
            </button>
          )}

          {/* Admin tab — only if unlocked */}
          {isAdminUnlocked && (
            <button
              onClick={() => setActivePortal('admin')}
              style={{
                display: 'flex', alignItems: 'center', gap: '7px',
                background: activePortal === 'admin' ? 'linear-gradient(135deg,rgba(244,63,94,0.12) 0%,rgba(244,63,94,0.04) 100%)' : 'transparent',
                border: activePortal === 'admin' ? '1px solid rgba(244,63,94,0.3)' : '1px solid transparent',
                color: activePortal === 'admin' ? '#fb7185' : 'var(--text-secondary)',
                padding: '7px 16px', borderRadius: '9px',
                fontSize: '0.83rem', fontWeight: '600', fontFamily: 'var(--font-mono)',
                cursor: 'pointer', transition: 'var(--transition-smooth)'
              }}
            >
              <ShieldAlert style={{ width: '15px', height: '15px' }} />
              Admin
            </button>
          )}
        </div>
      )}

      {/* Right side controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Theme toggle */}
        <button
          onClick={onThemeToggle}
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          style={{
            background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-glass)',
            borderRadius: '9px', width: '34px', height: '34px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: 'var(--text-primary)', transition: 'var(--transition-smooth)'
          }}
        >
          {theme === 'dark'
            ? <Sun style={{ width: '15px', height: '15px', color: 'var(--accent-purple)' }} />
            : <Moon style={{ width: '15px', height: '15px', color: 'var(--accent-purple)' }} />}
        </button>

        {/* Admin lock — only when logged in as advertiser or admin role */}
        {isLoggedIn && (
          <button
            onClick={onLockToggle}
            title={isAdminUnlocked ? 'Lock Admin Session' : 'Access Admin Portal'}
            style={{
              background: isAdminUnlocked ? 'rgba(16,185,129,0.08)' : 'rgba(255,255,255,0.02)',
              border: isAdminUnlocked ? '1px solid rgba(16,185,129,0.25)' : '1px solid var(--border-glass)',
              borderRadius: '9px', width: '34px', height: '34px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
              color: isAdminUnlocked ? 'var(--accent-emerald)' : 'var(--text-secondary)',
              transition: 'var(--transition-smooth)',
              boxShadow: isAdminUnlocked ? '0 0 10px rgba(16,185,129,0.1)' : 'none'
            }}
          >
            {isAdminUnlocked
              ? <Unlock style={{ width: '15px', height: '15px' }} />
              : <Lock style={{ width: '15px', height: '15px' }} />}
          </button>
        )}

        {/* PRE-LOGIN: Login + Sign Up buttons */}
        {!isLoggedIn && (
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => onShowAuth('advertiser')}
              className="btn-outline"
              style={{ padding: '8px 16px', fontSize: '0.85rem', gap: '6px' }}
            >
              <LogIn style={{ width: '15px', height: '15px' }} />
              Log In
            </button>
            <button
              onClick={() => onShowAuth('advertiser')}
              className="btn-neon-purple"
              style={{ padding: '8px 18px', fontSize: '0.85rem' }}
            >
              <Sparkles style={{ width: '14px', height: '14px' }} />
              Sign Up Free
            </button>
          </div>
        )}

        {/* POST-LOGIN: User avatar + name + logout */}
        {isLoggedIn && (
          <>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '0.83rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                {currentUser.name}
              </p>
              <p style={{ fontSize: '0.68rem', color: currentUser.role === 'host' ? 'var(--accent-saffron)' : 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '3px', justifyContent: 'flex-end' }}>
                <Sparkles style={{ width: '9px', height: '9px' }} />
                {currentUser.role === 'host' ? 'Billboard Host' : 'Advertiser Pro'}
              </p>
            </div>

            {/* Avatar */}
            <div style={{
              width: '38px', height: '38px', borderRadius: '50%',
              border: `2px solid ${currentUser.role === 'host' ? 'var(--accent-saffron)' : 'var(--accent-cyan)'}`,
              padding: '2px', cursor: 'pointer',
              background: 'rgba(255,255,255,0.02)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <div style={{
                width: '100%', height: '100%', borderRadius: '50%',
                background: currentUser.role === 'host'
                  ? 'linear-gradient(135deg, var(--accent-saffron) 0%, #eab308 100%)'
                  : 'linear-gradient(135deg, var(--accent-cyan) 0%, var(--accent-purple) 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.85rem', fontWeight: '800', color: '#fff'
              }}>
                {currentUser.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
              </div>
            </div>

            {/* Logout */}
            <button
              onClick={onLogout}
              title="Logout"
              style={{
                background: 'rgba(244,63,94,0.06)', border: '1px solid rgba(244,63,94,0.2)',
                borderRadius: '9px', width: '34px', height: '34px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: '#fb7185', transition: 'var(--transition-smooth)'
              }}
            >
              <LogOut style={{ width: '15px', height: '15px' }} />
            </button>
          </>
        )}
      </div>
    </header>
  );
}
