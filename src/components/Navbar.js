'use client';

import React, { useState } from 'react';
import { Layers, User, Settings, Sparkles, Sun, Moon, LogOut, LogIn, Menu, X, Palette } from 'lucide-react';

export default function Navbar({
  navbarActiveKey,
  onNavigate,
  theme,
  onThemeToggle,
  currentUser,
  onLogout,
  onShowAuth,
  onGoHome,
}) {
  const isLoggedIn = !!currentUser;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Global tabs available to everyone
  const studioTab = {
    key: 'studio',
    label: 'AI Poster Studio',
    icon: <Palette style={{ width: '15px', height: '15px' }} />,
    activeColor: 'var(--accent-saffron)',
    activeBg: 'rgba(249,115,22,0.12)',
    activeBorder: 'rgba(249,115,22,0.3)',
    view: 'studio',
    portal: null
  };

  // Roles-based tabs (only visible when logged in)
  const roleTabs = isLoggedIn ? [
    currentUser.role === 'advertiser'
      ? { key: 'advertiser', label: 'Advertiser Hub', icon: <User style={{ width: '15px', height: '15px' }} />, activeColor: 'var(--accent-cyan)', activeBg: 'rgba(6,182,212,0.12)', activeBorder: 'rgba(6,182,212,0.3)', view: 'app', portal: 'advertiser' }
      : null,
    currentUser.role === 'host'
      ? { key: 'owner', label: 'Billboard Host', icon: <Settings style={{ width: '15px', height: '15px' }} />, activeColor: 'var(--accent-purple)', activeBg: 'rgba(99,102,241,0.12)', activeBorder: 'rgba(99,102,241,0.3)', view: 'app', portal: 'owner' }
      : null,
  ].filter(Boolean) : [];

  const allTabs = [studioTab, ...roleTabs];

  return (
    <>
      <header className="glass-panel navbar-root" style={{
        position: 'sticky', top: '12px',
        margin: '0 16px 20px 16px',
        padding: '12px 20px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        zIndex: 200,
        border: '1px solid var(--border-glass)',
        background: 'var(--bg-glass)'
      }}>
        {/* Logo */}
        <button onClick={onGoHome} className="navbar-logo-btn" style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', flexShrink: 0
        }}>
          <div style={{
            background: 'linear-gradient(135deg, var(--accent-saffron) 0%, #ffffff 50%, var(--accent-emerald) 100%)',
            width: '38px', height: '38px', borderRadius: '10px',
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            boxShadow: 'var(--shadow-neon-saffron)', padding: '2px', flexShrink: 0
          }}>
            <div style={{
              background: 'var(--bg-primary)', width: '100%', height: '100%',
              borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center'
            }}>
              <Layers style={{ color: 'var(--accent-saffron)', width: '17px', height: '17px' }} />
            </div>
          </div>
          <div className="navbar-brand-text">
            <h1 style={{ fontSize: '1.3rem', lineHeight: '1.2' }}>
              <span className="text-gradient">AdNazar</span>
            </h1>
            <p style={{ fontSize: '0.55rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', letterSpacing: '0.8px' }}>
              INTELLIGENT OOH NETWORK
            </p>
          </div>
        </button>

        {/* Center tabs — desktop only */}
        <div className="navbar-tabs-desktop" style={{
          display: 'flex', background: 'rgba(255,255,255,0.02)',
          padding: '4px', borderRadius: '12px',
          border: '1px solid rgba(255,255,255,0.05)', gap: '4px'
        }}>
          {allTabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => onNavigate(tab.view, tab.portal)}
              style={{
                display: 'flex', alignItems: 'center', gap: '7px',
                background: navbarActiveKey === tab.key ? `linear-gradient(135deg,${tab.activeBg} 0%,transparent 100%)` : 'transparent',
                border: navbarActiveKey === tab.key ? `1px solid ${tab.activeBorder}` : '1px solid transparent',
                color: navbarActiveKey === tab.key ? tab.activeColor : 'var(--text-secondary)',
                padding: '7px 16px', borderRadius: '9px',
                fontSize: '0.83rem', fontWeight: '600', fontFamily: 'var(--font-mono)',
                cursor: 'pointer', transition: 'var(--transition-smooth)'
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Right controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Theme toggle */}
          <button onClick={onThemeToggle} className="icon-btn" title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}>
            {theme === 'dark'
              ? <Sun style={{ width: '15px', height: '15px', color: 'var(--accent-purple)' }} />
              : <Moon style={{ width: '15px', height: '15px', color: 'var(--accent-purple)' }} />}
          </button>

          {/* Pre-login buttons — desktop */}
          {!isLoggedIn && (
            <div className="navbar-auth-btns">
              <button onClick={() => onShowAuth('advertiser')} className="btn-outline" style={{ padding: '7px 14px', fontSize: '0.82rem', gap: '6px' }}>
                <LogIn style={{ width: '14px', height: '14px' }} /> Log In
              </button>
              <button onClick={() => onShowAuth('advertiser')} className="btn-neon-purple" style={{ padding: '7px 16px', fontSize: '0.82rem' }}>
                <Sparkles style={{ width: '13px', height: '13px' }} /> Sign Up Free
              </button>
            </div>
          )}

          {/* Post-login user info — desktop */}
          {isLoggedIn && (
            <div className="navbar-user-info" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div className="navbar-user-name" style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-primary)' }}>{currentUser.name}</p>
                <p style={{ fontSize: '0.65rem', color: currentUser.role === 'host' ? 'var(--accent-saffron)' : 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '3px', justifyContent: 'flex-end' }}>
                  <Sparkles style={{ width: '9px', height: '9px' }} />
                  {currentUser.role === 'host' ? 'Billboard Host' : 'Advertiser Pro'}
                </p>
              </div>
              {/* Avatar */}
              <div style={{
                width: '36px', height: '36px', borderRadius: '50%', flexShrink: 0,
                border: `2px solid ${currentUser.role === 'host' ? 'var(--accent-saffron)' : 'var(--accent-cyan)'}`,
                padding: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <div style={{
                  width: '100%', height: '100%', borderRadius: '50%',
                  background: currentUser.role === 'host'
                    ? 'linear-gradient(135deg,var(--accent-saffron) 0%,#eab308 100%)'
                    : 'linear-gradient(135deg,var(--accent-cyan) 0%,var(--accent-purple) 100%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.78rem', fontWeight: '800', color: '#fff'
                }}>
                  {currentUser.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                </div>
              </div>
              {/* Logout */}
              <button onClick={onLogout} className="icon-btn icon-btn-danger" title="Logout">
                <LogOut style={{ width: '14px', height: '14px' }} />
              </button>
            </div>
          )}

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMobileMenuOpen(p => !p)}
            className="icon-btn navbar-hamburger"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen
              ? <X style={{ width: '18px', height: '18px' }} />
              : <Menu style={{ width: '18px', height: '18px' }} />}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer animate-fade-in" style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          zIndex: 190, background: 'rgba(7,6,15,0.92)', backdropFilter: 'blur(20px)',
          display: 'flex', flexDirection: 'column', padding: '80px 24px 32px'
        }} onClick={() => setMobileMenuOpen(false)}>
          <div onClick={e => e.stopPropagation()} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* User info in drawer */}
            {isLoggedIn && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: '12px', padding: '16px',
                background: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--border-glass)',
                marginBottom: '8px'
              }}>
                <div style={{
                  width: '44px', height: '44px', borderRadius: '50%',
                  background: currentUser.role === 'host'
                    ? 'linear-gradient(135deg,var(--accent-saffron) 0%,#eab308 100%)'
                    : 'linear-gradient(135deg,var(--accent-cyan) 0%,var(--accent-purple) 100%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1rem', fontWeight: '800', color: '#fff', flexShrink: 0
                }}>
                  {currentUser.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{currentUser.name}</p>
                  <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>{currentUser.email}</p>
                </div>
              </div>
            )}

            {/* Portal tabs in drawer */}
            {allTabs.map(tab => (
              <button key={tab.key} onClick={() => { onNavigate(tab.view, tab.portal); setMobileMenuOpen(false); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 18px',
                  background: navbarActiveKey === tab.key ? `rgba(99,102,241,0.12)` : 'var(--bg-secondary)',
                  border: `1px solid ${navbarActiveKey === tab.key ? 'rgba(99,102,241,0.3)' : 'var(--border-glass)'}`,
                  borderRadius: '10px', cursor: 'pointer', width: '100%', textAlign: 'left',
                  color: navbarActiveKey === tab.key ? tab.activeColor : 'var(--text-primary)',
                  fontWeight: '600', fontSize: '0.95rem', fontFamily: 'var(--font-sans)'
                }}>
                {tab.icon} {tab.label}
              </button>
            ))}

            {/* Auth buttons in drawer */}
            {!isLoggedIn && (
              <>
                <button onClick={() => { onShowAuth('advertiser'); setMobileMenuOpen(false); }} className="btn-neon-purple" style={{ width: '100%', justifyContent: 'center', padding: '13px', fontSize: '0.95rem' }}>
                  <LogIn style={{ width: '16px', height: '16px' }} /> Log In as Advertiser
                </button>
                <button onClick={() => { onShowAuth('host'); setMobileMenuOpen(false); }} className="btn-neon-saffron" style={{ width: '100%', justifyContent: 'center', padding: '13px', fontSize: '0.95rem' }}>
                  List My Billboard
                </button>
              </>
            )}

            {/* Logout in drawer */}
            {isLoggedIn && (
              <button onClick={() => { onLogout(); setMobileMenuOpen(false); }} className="btn-outline"
                style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: '0.9rem', borderColor: 'rgba(244,63,94,0.3)', color: '#fb7185' }}>
                <LogOut style={{ width: '16px', height: '16px' }} /> Log Out
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
