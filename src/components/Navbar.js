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

  const studioTab = {
    key: 'studio',
    label: 'AI Poster Studio',
    icon: <Palette style={{ width: '14px', height: '14px' }} />,
    activeColor: 'var(--accent-saffron)',
    activeBg: 'var(--accent-saffron-glow)',
    activeBorder: 'rgba(217,119,6,0.25)',
    view: 'studio',
    portal: null,
  };

  const roleTabs = isLoggedIn ? [
    currentUser.role === 'advertiser'
      ? { key: 'advertiser', label: 'Advertiser Hub', icon: <User style={{ width: '14px', height: '14px' }} />, activeColor: 'var(--accent-cyan)', activeBg: 'var(--accent-cyan-glow)', activeBorder: 'rgba(2,132,199,0.25)', view: 'app', portal: 'advertiser' }
      : null,
    currentUser.role === 'host'
      ? { key: 'owner', label: 'Billboard Host', icon: <Settings style={{ width: '14px', height: '14px' }} />, activeColor: 'var(--accent-purple)', activeBg: 'var(--accent-purple-glow)', activeBorder: 'rgba(79,70,229,0.25)', view: 'app', portal: 'owner' }
      : null,
  ].filter(Boolean) : [];

  const allTabs = [studioTab, ...roleTabs];

  return (
    <>
      <header className="navbar-root" style={{
        position: 'sticky', top: '12px',
        margin: '0 16px 20px 16px',
        padding: '10px 18px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        zIndex: 200,
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-glass)',
        borderRadius: '12px',
        boxShadow: '0 2px 12px rgba(15,23,42,0.07), 0 1px 3px rgba(15,23,42,0.05)',
      }}>
        {/* Logo */}
        <button onClick={onGoHome} style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', flexShrink: 0,
        }}>
          <div style={{
            background: 'var(--accent-purple)',
            width: '36px', height: '36px', borderRadius: '9px',
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            boxShadow: 'var(--shadow-neon-purple)', flexShrink: 0,
          }}>
            <Layers style={{ color: '#ffffff', width: '17px', height: '17px' }} />
          </div>
          <div className="navbar-brand-text">
            <h1 style={{ fontSize: '1.2rem', lineHeight: '1.2' }}>
              <span className="text-gradient">AdNazar</span>
            </h1>
            <p style={{ fontSize: '0.52rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.8px', textTransform: 'uppercase' }}>
              Intelligent OOH Network
            </p>
          </div>
        </button>

        {/* Center tabs — desktop */}
        <div className="navbar-tabs-desktop" style={{
          display: 'flex', background: 'var(--bg-tertiary)', padding: '3px',
          borderRadius: '9px', border: '1px solid var(--border-glass)', gap: '3px',
        }}>
          {allTabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => onNavigate(tab.view, tab.portal)}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                background: navbarActiveKey === tab.key ? tab.activeBg : 'transparent',
                border: navbarActiveKey === tab.key ? `1px solid ${tab.activeBorder}` : '1px solid transparent',
                color: navbarActiveKey === tab.key ? tab.activeColor : 'var(--text-secondary)',
                padding: '6px 14px', borderRadius: '6px',
                fontSize: '0.82rem', fontWeight: '600', fontFamily: 'var(--font-mono)',
                cursor: 'pointer', transition: 'var(--transition-smooth)',
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Right controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Theme toggle */}
          <button onClick={onThemeToggle} className="icon-btn" title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}>
            {theme === 'dark'
              ? <Sun style={{ width: '14px', height: '14px' }} />
              : <Moon style={{ width: '14px', height: '14px' }} />}
          </button>

          {/* Pre-login — desktop */}
          {!isLoggedIn && (
            <div className="navbar-auth-btns">
              <button onClick={() => onShowAuth('advertiser')} className="btn-outline" style={{ padding: '6px 13px', fontSize: '0.8rem' }}>
                <LogIn style={{ width: '13px', height: '13px' }} /> Log In
              </button>
              <button onClick={() => onShowAuth('advertiser')} className="btn-neon-purple" style={{ padding: '6px 14px', fontSize: '0.8rem' }}>
                <Sparkles style={{ width: '12px', height: '12px' }} /> Sign Up Free
              </button>
            </div>
          )}

          {/* Post-login — desktop */}
          {isLoggedIn && (
            <div className="navbar-user-info" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div className="navbar-user-name" style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-primary)' }}>{currentUser.name}</p>
                <p style={{ fontSize: '0.62rem', color: currentUser.role === 'host' ? 'var(--accent-saffron)' : 'var(--accent-purple)', display: 'flex', alignItems: 'center', gap: '3px', justifyContent: 'flex-end' }}>
                  <Sparkles style={{ width: '9px', height: '9px' }} />
                  {currentUser.role === 'host' ? 'Billboard Host' : 'Advertiser Pro'}
                </p>
              </div>
              <div style={{
                width: '34px', height: '34px', borderRadius: '50%', flexShrink: 0,
                background: currentUser.role === 'host'
                  ? 'linear-gradient(135deg, var(--accent-saffron) 0%, #f59e0b 100%)'
                  : 'linear-gradient(135deg, var(--accent-purple) 0%, var(--accent-cyan) 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.75rem', fontWeight: '800', color: '#fff',
                border: '2px solid var(--border-glass)',
              }}>
                {currentUser.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
              </div>
              <button onClick={onLogout} className="icon-btn icon-btn-danger" title="Logout">
                <LogOut style={{ width: '13px', height: '13px' }} />
              </button>
            </div>
          )}

          {/* Hamburger — mobile */}
          <button
            onClick={() => setMobileMenuOpen(p => !p)}
            className="icon-btn navbar-hamburger"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen
              ? <X style={{ width: '17px', height: '17px' }} />
              : <Menu style={{ width: '17px', height: '17px' }} />}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="animate-fade-in" style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          zIndex: 190,
          background: 'rgba(15,23,42,0.5)',
          backdropFilter: 'blur(8px)',
          display: 'flex', flexDirection: 'column', padding: '80px 20px 32px',
        }} onClick={() => setMobileMenuOpen(false)}>
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: 'var(--bg-secondary)',
              borderRadius: '16px',
              border: '1px solid var(--border-glass)',
              boxShadow: '0 16px 48px rgba(15,23,42,0.15)',
              padding: '20px',
              display: 'flex', flexDirection: 'column', gap: '12px',
            }}
          >
            {isLoggedIn && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px',
                background: 'var(--bg-tertiary)', borderRadius: '10px', border: '1px solid var(--border-glass)',
                marginBottom: '4px',
              }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '50%',
                  background: currentUser.role === 'host'
                    ? 'linear-gradient(135deg, var(--accent-saffron) 0%, #f59e0b 100%)'
                    : 'linear-gradient(135deg, var(--accent-purple) 0%, var(--accent-cyan) 100%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.95rem', fontWeight: '800', color: '#fff', flexShrink: 0,
                }}>
                  {currentUser.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p style={{ fontWeight: '700', color: 'var(--text-primary)', fontSize: '0.95rem' }}>{currentUser.name}</p>
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{currentUser.email}</p>
                </div>
              </div>
            )}

            {allTabs.map(tab => (
              <button key={tab.key} onClick={() => { onNavigate(tab.view, tab.portal); setMobileMenuOpen(false); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px', padding: '13px 16px',
                  background: navbarActiveKey === tab.key ? tab.activeBg : 'var(--bg-tertiary)',
                  border: `1px solid ${navbarActiveKey === tab.key ? tab.activeBorder : 'var(--border-glass)'}`,
                  borderRadius: '9px', cursor: 'pointer', width: '100%', textAlign: 'left',
                  color: navbarActiveKey === tab.key ? tab.activeColor : 'var(--text-primary)',
                  fontWeight: '600', fontSize: '0.92rem', fontFamily: 'var(--font-sans)',
                  transition: 'var(--transition-smooth)',
                }}>
                {tab.icon} {tab.label}
              </button>
            ))}

            {!isLoggedIn && (
              <>
                <button onClick={() => { onShowAuth('advertiser'); setMobileMenuOpen(false); }} className="btn-neon-purple" style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: '0.92rem' }}>
                  <LogIn style={{ width: '15px', height: '15px' }} /> Log In as Advertiser
                </button>
                <button onClick={() => { onShowAuth('host'); setMobileMenuOpen(false); }} className="btn-neon-saffron" style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: '0.92rem' }}>
                  List My Billboard
                </button>
              </>
            )}

            {isLoggedIn && (
              <button onClick={() => { onLogout(); setMobileMenuOpen(false); }}
                style={{
                  width: '100%', justifyContent: 'center', padding: '11px',
                  fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '8px',
                  background: 'rgba(225,29,72,0.06)', border: '1px solid rgba(225,29,72,0.18)',
                  borderRadius: '9px', cursor: 'pointer', color: '#e11d48', fontWeight: '600',
                  fontFamily: 'var(--font-sans)',
                }}>
                <LogOut style={{ width: '15px', height: '15px' }} /> Log Out
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
