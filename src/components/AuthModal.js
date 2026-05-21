'use client';

import React, { useState, useEffect } from 'react';
import { X, Mail, Lock, User, Phone, Eye, EyeOff, Sparkles, CheckCircle2, Layers, ChevronRight } from 'lucide-react';

const DEMO_USERS = {
  advertiser: { email: 'advertiser@demo.com', password: 'demo123', name: 'Priya Sharma', phone: '+91 98765 43210' },
  host: { email: 'host@demo.com', password: 'demo123', name: 'Amit Gupta', phone: '+91 91234 56789' },
};

export default function AuthModal({ onClose, onLogin, defaultRole = 'advertiser' }) {
  const [tab, setTab] = useState('login'); // 'login' | 'signup'
  const [role, setRole] = useState(defaultRole);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Signup form state
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  // Pre-fill demo credentials when tab or role changes
  useEffect(() => {
    if (tab === 'login') {
      setLoginEmail(DEMO_USERS[role].email);
      setLoginPassword(DEMO_USERS[role].password);
      setError('');
    }
  }, [tab, role]);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const handleLogin = () => {
    setError('');
    if (!loginEmail || !loginPassword) { setError('Please enter email and password.'); return; }

    const demo = DEMO_USERS[role];
    if (loginEmail !== demo.email || loginPassword !== demo.password) {
      setError(`Invalid credentials. Demo: ${demo.email} / demo123`);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin({ name: demo.name, email: demo.email, phone: demo.phone, role });
    }, 1200);
  };

  const handleSignup = () => {
    setError('');
    if (!signupName || !signupEmail || !signupPhone || !signupPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (!signupEmail.includes('@')) { setError('Please enter a valid email.'); return; }
    if (signupPassword.length < 6) { setError('Password must be at least 6 characters.'); return; }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMsg('Account created! Logging you in...');
      setTimeout(() => {
        onLogin({ name: signupName, email: signupEmail, phone: signupPhone, role });
      }, 1000);
    }, 1400);
  };

  const roleOptions = [
    { key: 'advertiser', label: 'Advertiser', desc: 'Find & book billboard locations', icon: '🎯', color: 'var(--accent-purple)' },
    { key: 'host', label: 'Billboard Host', desc: 'List & manage your properties', icon: '🏗️', color: 'var(--accent-saffron)' },
  ];

  return (
    <div
      className="auth-modal-backdrop"
      style={{
        position: 'fixed', inset: 0, zIndex: 2000,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px',
        background: 'rgba(7,6,15,0.88)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="glass-panel animate-fade-in auth-modal-card"
        style={{
          width: '100%', maxWidth: '480px',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-glass)',
          boxShadow: '0 32px 64px rgba(0,0,0,0.6)',
          overflow: 'hidden'
        }}
      >
        {/* Header bar */}
        <div style={{
          padding: '20px 28px 16px',
          borderBottom: '1px solid var(--border-glass)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          background: 'var(--bg-tertiary)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              background: 'linear-gradient(135deg, var(--accent-saffron) 0%, #fff 50%, var(--accent-emerald) 100%)',
              width: '32px', height: '32px', borderRadius: '8px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2px'
            }}>
              <div style={{
                background: 'var(--bg-primary)', width: '100%', height: '100%',
                borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Layers style={{ color: 'var(--accent-saffron)', width: '14px', height: '14px' }} />
              </div>
            </div>
            <span style={{ fontWeight: '800', fontSize: '1rem', color: 'var(--text-primary)' }}>AdNazar</span>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'transparent', border: 'none', cursor: 'pointer',
              color: 'var(--text-muted)', padding: '4px', borderRadius: '6px',
              display: 'flex', alignItems: 'center'
            }}
          >
            <X style={{ width: '18px', height: '18px' }} />
          </button>
        </div>

        <div style={{ padding: '28px' }}>
          {/* Tab switch: Login / Sign Up */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            background: 'var(--bg-tertiary)', padding: '4px',
            borderRadius: '10px', border: '1px solid var(--border-glass)',
            marginBottom: '24px', gap: '4px'
          }}>
            {['login', 'signup'].map(t => (
              <button
                key={t}
                onClick={() => { setTab(t); setError(''); setSuccessMsg(''); }}
                style={{
                  padding: '9px', border: 'none', borderRadius: '7px',
                  background: tab === t ? 'linear-gradient(135deg, var(--accent-purple) 0%, #4338ca 100%)' : 'transparent',
                  color: tab === t ? '#fff' : 'var(--text-secondary)',
                  fontWeight: '700', fontSize: '0.88rem', cursor: 'pointer',
                  transition: 'var(--transition-smooth)', fontFamily: 'var(--font-sans)'
                }}
              >
                {t === 'login' ? 'Log In' : 'Sign Up'}
              </button>
            ))}
          </div>

          {/* Title */}
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '4px', color: 'var(--text-primary)' }}>
            {tab === 'login' ? 'Welcome Back' : 'Create Your Account'}
          </h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>
            {tab === 'login'
              ? 'Log in to access your dashboard.'
              : 'Join India\'s leading outdoor ad marketplace.'}
          </p>

          {/* Role Selector */}
          <div style={{ marginBottom: '20px' }}>
            <span className="label-text" style={{ marginBottom: '8px' }}>I AM A</span>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {roleOptions.map(opt => (
                <button
                  key={opt.key}
                  onClick={() => { setRole(opt.key); setError(''); }}
                  style={{
                    padding: '12px', border: `1px solid ${role === opt.key ? opt.color : 'var(--border-glass)'}`,
                    borderRadius: '10px', cursor: 'pointer', textAlign: 'left',
                    background: role === opt.key ? `rgba(${opt.key === 'advertiser' ? '99,102,241' : '249,115,22'},0.08)` : 'transparent',
                    transition: 'var(--transition-smooth)', fontFamily: 'var(--font-sans)'
                  }}
                >
                  <div style={{ fontSize: '1.3rem', marginBottom: '4px' }}>{opt.icon}</div>
                  <div style={{ fontWeight: '700', fontSize: '0.85rem', color: role === opt.key ? opt.color : 'var(--text-primary)' }}>
                    {opt.label}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '2px' }}>{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Success message */}
          {successMsg && (
            <div style={{
              background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)',
              borderRadius: '8px', padding: '10px 14px', marginBottom: '16px',
              display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--accent-emerald)'
            }}>
              <CheckCircle2 style={{ width: '16px', height: '16px', flexShrink: 0 }} />
              {successMsg}
            </div>
          )}

          {/* Error message */}
          {error && (
            <div style={{
              background: 'rgba(244,63,94,0.08)', border: '1px solid rgba(244,63,94,0.25)',
              borderRadius: '8px', padding: '10px 14px', marginBottom: '16px',
              fontSize: '0.82rem', color: '#fb7185'
            }}>
              ⚠️ {error}
            </div>
          )}

          {/* LOGIN FORM */}
          {tab === 'login' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <span className="label-text">EMAIL ADDRESS</span>
                <div style={{ position: 'relative' }}>
                  <Mail style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: 'var(--text-muted)' }} />
                  <input
                    type="email"
                    className="input-field"
                    value={loginEmail}
                    onChange={e => { setLoginEmail(e.target.value); setError(''); }}
                    placeholder="your@email.com"
                    style={{ paddingLeft: '40px' }}
                    autoComplete="email"
                  />
                </div>
              </div>

              <div>
                <span className="label-text">PASSWORD</span>
                <div style={{ position: 'relative' }}>
                  <Lock style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: 'var(--text-muted)' }} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="input-field"
                    value={loginPassword}
                    onChange={e => { setLoginPassword(e.target.value); setError(''); }}
                    placeholder="••••••••"
                    style={{ paddingLeft: '40px', paddingRight: '40px' }}
                    autoComplete="current-password"
                    onKeyDown={e => e.key === 'Enter' && handleLogin()}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(p => !p)}
                    style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '0' }}
                  >
                    {showPassword ? <EyeOff style={{ width: '16px', height: '16px' }} /> : <Eye style={{ width: '16px', height: '16px' }} />}
                  </button>
                </div>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '6px' }}>
                  Demo hint: use <strong style={{ color: 'var(--accent-purple)' }}>demo123</strong> as password
                </p>
              </div>

              <button
                onClick={handleLogin}
                disabled={isLoading}
                className="btn-neon-purple"
                style={{ width: '100%', justifyContent: 'center', padding: '13px', marginTop: '4px', fontSize: '0.95rem' }}
              >
                {isLoading ? 'Logging in...' : (
                  <>Log In <ChevronRight style={{ width: '16px', height: '16px' }} /></>
                )}
              </button>
            </div>
          )}

          {/* SIGNUP FORM */}
          {tab === 'signup' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <span className="label-text">FULL NAME</span>
                <div style={{ position: 'relative' }}>
                  <User style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: 'var(--text-muted)' }} />
                  <input
                    type="text"
                    className="input-field"
                    value={signupName}
                    onChange={e => { setSignupName(e.target.value); setError(''); }}
                    placeholder="Your full name"
                    style={{ paddingLeft: '40px' }}
                  />
                </div>
              </div>

              <div>
                <span className="label-text">EMAIL ADDRESS</span>
                <div style={{ position: 'relative' }}>
                  <Mail style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: 'var(--text-muted)' }} />
                  <input
                    type="email"
                    className="input-field"
                    value={signupEmail}
                    onChange={e => { setSignupEmail(e.target.value); setError(''); }}
                    placeholder="your@email.com"
                    style={{ paddingLeft: '40px' }}
                  />
                </div>
              </div>

              <div>
                <span className="label-text">MOBILE NUMBER</span>
                <div style={{ position: 'relative' }}>
                  <Phone style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: 'var(--text-muted)' }} />
                  <input
                    type="tel"
                    className="input-field"
                    value={signupPhone}
                    onChange={e => { setSignupPhone(e.target.value); setError(''); }}
                    placeholder="+91 98765 43210"
                    style={{ paddingLeft: '40px' }}
                  />
                </div>
              </div>

              <div>
                <span className="label-text">CREATE PASSWORD</span>
                <div style={{ position: 'relative' }}>
                  <Lock style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: 'var(--text-muted)' }} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="input-field"
                    value={signupPassword}
                    onChange={e => { setSignupPassword(e.target.value); setError(''); }}
                    placeholder="Min 6 characters"
                    style={{ paddingLeft: '40px', paddingRight: '40px' }}
                    onKeyDown={e => e.key === 'Enter' && handleSignup()}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(p => !p)}
                    style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '0' }}
                  >
                    {showPassword ? <EyeOff style={{ width: '16px', height: '16px' }} /> : <Eye style={{ width: '16px', height: '16px' }} />}
                  </button>
                </div>
              </div>

              <button
                onClick={handleSignup}
                disabled={isLoading}
                className="btn-neon-purple"
                style={{ width: '100%', justifyContent: 'center', padding: '13px', marginTop: '4px', fontSize: '0.95rem' }}
              >
                {isLoading ? 'Creating Account...' : (
                  <><Sparkles style={{ width: '16px', height: '16px' }} /> Create Account</>
                )}
              </button>
            </div>
          )}

          {/* Bottom toggle */}
          <p style={{ textAlign: 'center', fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '20px' }}>
            {tab === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => { setTab(tab === 'login' ? 'signup' : 'login'); setError(''); }}
              style={{ background: 'none', border: 'none', color: 'var(--accent-purple)', fontWeight: '700', cursor: 'pointer', fontSize: '0.78rem', textDecoration: 'underline', fontFamily: 'var(--font-sans)' }}
            >
              {tab === 'login' ? 'Sign Up for Free' : 'Log In instead'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
