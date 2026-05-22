'use client';

import React, { useState, useEffect } from 'react';
import { CITY_PRICING, TESTIMONIALS, HOW_IT_WORKS, INITIAL_BILLBOARDS } from '@/utils/mockData';
import { Layers, MapPin, Sparkles, ArrowRight, Star, TrendingUp, Users, BarChart2, Zap, CheckCircle2, ChevronRight, Play } from 'lucide-react';

function useCounter(target, duration = 2000, shouldStart = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!shouldStart) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, shouldStart]);
  return count;
}

export default function LandingPage({ onShowAuth }) {
  const [activeHowTab, setActiveHowTab] = useState('advertiser');
  const [countersStarted, setCountersStarted] = useState(false);
  const billboardCount = useCounter(1247, 1800, countersStarted);
  const cityCount = useCounter(28, 1200, countersStarted);
  const impressionCount = useCounter(18, 1600, countersStarted);
  const hostCount = useCounter(640, 1500, countersStarted);

  useEffect(() => {
    const timer = setTimeout(() => setCountersStarted(true), 400);
    return () => clearTimeout(timer);
  }, []);

  const featuredBoards = INITIAL_BILLBOARDS.filter(b => b.visibilityScore > 93).slice(0, 3);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>

      {/* ══════════════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════════════ */}
      <section style={{
        minHeight: '92vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '80px 24px 60px',
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--bg-primary)',
      }}>
        {/* Dot grid texture */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(79,70,229,0.10) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          pointerEvents: 'none',
        }} />
        {/* Soft gradient overlays */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 70% 50% at 20% 10%, rgba(79,70,229,0.06) 0%, transparent 100%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 60% 40% at 80% 90%, rgba(5,150,105,0.04) 0%, transparent 100%)',
          pointerEvents: 'none',
        }} />

        {/* Badge */}
        <span className="badge badge-purple" style={{ marginBottom: '24px', fontSize: '0.72rem' }}>
          <Zap style={{ width: '11px', height: '11px' }} />
          India&apos;s #1 Outdoor Advertising Marketplace
        </span>

        {/* Headline */}
        <h1 style={{
          fontSize: 'clamp(2.4rem, 6vw, 4.5rem)',
          fontWeight: '900',
          lineHeight: '1.08',
          letterSpacing: '-0.035em',
          maxWidth: '860px',
          marginBottom: '24px',
          color: 'var(--text-primary)',
        }}>
          India&apos;s Smartest{' '}
          <span className="text-gradient">Billboard Network</span>
          {' '}for Brands &amp; Owners
        </h1>

        <p style={{
          fontSize: 'clamp(1rem, 2vw, 1.18rem)',
          color: 'var(--text-secondary)',
          maxWidth: '580px',
          lineHeight: '1.75',
          marginBottom: '40px',
        }}>
          Discover 1,200+ premium hoardings, unipoles &amp; digital LED screens across 28 Indian cities.
          Design, preview in 3D, and go live in 48 hours.
        </p>

        {/* CTA Buttons */}
        <div className="landing-cta-group" style={{ marginBottom: '64px' }}>
          <button
            onClick={() => onShowAuth('advertiser')}
            className="btn-neon-purple"
            style={{ padding: '14px 28px', fontSize: '0.98rem' }}
          >
            <MapPin style={{ width: '17px', height: '17px' }} />
            Find Billboards
            <ArrowRight style={{ width: '15px', height: '15px' }} />
          </button>
          <button
            onClick={() => onShowAuth('host')}
            className="btn-neon-saffron"
            style={{ padding: '14px 28px', fontSize: '0.98rem' }}
          >
            List Your Space
            <ChevronRight style={{ width: '15px', height: '15px' }} />
          </button>
          <button
            onClick={() => onShowAuth('advertiser')}
            className="btn-outline"
            style={{ padding: '14px 22px', fontSize: '0.98rem' }}
          >
            <Play style={{ width: '15px', height: '15px' }} /> Watch Demo
          </button>
        </div>

        {/* Hero Browser Preview */}
        <div style={{
          width: '100%',
          maxWidth: '960px',
          borderRadius: '16px',
          overflow: 'hidden',
          border: '1px solid rgba(15,23,42,0.08)',
          boxShadow: '0 24px 64px rgba(15,23,42,0.10), 0 8px 24px rgba(15,23,42,0.05)',
          background: '#ffffff',
          position: 'relative',
          zIndex: 1,
        }}>
          {/* Browser chrome */}
          <div style={{
            padding: '12px 16px',
            background: '#f3f4f6',
            borderBottom: '1px solid rgba(15,23,42,0.08)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e' }} />
            <div style={{
              flex: 1, background: '#ffffff', borderRadius: '6px',
              padding: '4px 12px', fontSize: '0.7rem', color: '#94a3b8',
              fontFamily: 'var(--font-mono)', marginLeft: '8px',
              border: '1px solid rgba(15,23,42,0.07)',
            }}>
              🔒 adnazar.in/discover
            </div>
          </div>
          {/* App preview */}
          <div style={{ height: '340px', background: '#f8f7f2', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, display: 'grid', gridTemplateColumns: '1fr 300px' }}>
              {/* Map area */}
              <div style={{ background: 'linear-gradient(145deg, #dde3ef 0%, #e8edf7 100%)', position: 'relative', overflow: 'hidden' }}>
                {[...Array(8)].map((_, i) => (
                  <div key={`h${i}`} style={{ position: 'absolute', left: 0, right: 0, top: `${i * 14}%`, height: '1px', background: 'rgba(79,70,229,0.07)' }} />
                ))}
                {[...Array(10)].map((_, i) => (
                  <div key={`v${i}`} style={{ position: 'absolute', top: 0, bottom: 0, left: `${i * 10}%`, width: '1px', background: 'rgba(79,70,229,0.07)' }} />
                ))}
                {[
                  { top: '25%', left: '20%', color: '#059669', label: 'Mumbai' },
                  { top: '15%', left: '55%', color: '#4f46e5', label: 'Delhi' },
                  { top: '55%', left: '30%', color: '#d97706', label: 'Pune' },
                  { top: '60%', left: '45%', color: '#0284c7', label: 'Hyd' },
                  { top: '65%', left: '65%', color: '#059669', label: 'Chennai' },
                  { top: '30%', left: '42%', color: '#e11d48', label: 'Ahd' },
                ].map((pin, i) => (
                  <div key={i} style={{ position: 'absolute', top: pin.top, left: pin.left, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                    <div style={{
                      width: '26px', height: '26px', borderRadius: '50% 50% 50% 0', transform: 'rotate(-45deg)',
                      background: pin.color, boxShadow: `0 2px 8px ${pin.color}50`,
                      border: '2px solid rgba(255,255,255,0.7)',
                    }} />
                    <span style={{ fontSize: '0.55rem', color: pin.color, fontFamily: 'var(--font-mono)', fontWeight: '700', whiteSpace: 'nowrap' }}>{pin.label}</span>
                  </div>
                ))}
                <div style={{
                  position: 'absolute', bottom: '12px', left: '12px',
                  background: 'rgba(79,70,229,0.08)', border: '1px solid rgba(79,70,229,0.18)',
                  borderRadius: '8px', padding: '6px 12px', fontSize: '0.65rem',
                  color: '#4f46e5', fontFamily: 'var(--font-mono)',
                }}>
                  🗺️ 1,247 Active Locations
                </div>
              </div>
              {/* Side panel */}
              <div style={{ borderLeft: '1px solid rgba(15,23,42,0.08)', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'hidden', background: '#ffffff' }}>
                <div style={{ fontSize: '0.65rem', color: '#94a3b8', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em' }}>TOP PERFORMERS</div>
                {featuredBoards.map((board, i) => (
                  <div key={board.id} style={{
                    background: i === 0 ? 'rgba(79,70,229,0.05)' : '#f8f7f2',
                    border: `1px solid ${i === 0 ? 'rgba(79,70,229,0.18)' : 'rgba(15,23,42,0.07)'}`,
                    borderRadius: '8px', padding: '10px', cursor: 'pointer',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '6px' }}>
                      <div>
                        <p style={{ fontSize: '0.68rem', fontWeight: '700', color: '#0f172a', lineHeight: '1.3' }}>{board.title}</p>
                        <p style={{ fontSize: '0.58rem', color: '#94a3b8', marginTop: '2px' }}>📍 {board.city}</p>
                      </div>
                      {i === 0 && <span className="badge badge-saffron" style={{ fontSize: '0.52rem', padding: '2px 6px', whiteSpace: 'nowrap' }}>⭐ Top</span>}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
                      <span style={{ fontSize: '0.6rem', color: '#475569' }}>₹{(board.price / 1000).toFixed(0)}K/mo</span>
                      <span style={{ fontSize: '0.6rem', color: '#059669', fontFamily: 'var(--font-mono)', fontWeight: '700' }}>Score: {board.visibilityScore}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          STATS BAR
      ══════════════════════════════════════════════ */}
      <section style={{
        borderTop: '1px solid var(--border-glass)',
        borderBottom: '1px solid var(--border-glass)',
        background: 'var(--bg-secondary)',
        padding: '44px 24px',
      }}>
        <div style={{
          maxWidth: '900px', margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '0',
        }}>
          {[
            { value: billboardCount, suffix: '+', label: 'Verified Billboards', color: 'var(--accent-purple)', icon: <BarChart2 style={{ width: '18px', height: '18px' }} /> },
            { value: cityCount, suffix: ' Cities', label: 'Indian Cities Covered', color: 'var(--accent-cyan)', icon: <MapPin style={{ width: '18px', height: '18px' }} /> },
            { value: impressionCount, suffix: 'M+ Daily', label: 'Vehicle Impressions', color: 'var(--accent-saffron)', icon: <TrendingUp style={{ width: '18px', height: '18px' }} /> },
            { value: hostCount, suffix: '+', label: 'Active Billboard Hosts', color: 'var(--accent-emerald)', icon: <Users style={{ width: '18px', height: '18px' }} /> },
          ].map((stat, i, arr) => (
            <div key={i} style={{
              textAlign: 'center',
              padding: '0 24px',
              borderRight: i < arr.length - 1 ? '1px solid var(--border-glass)' : 'none',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', color: stat.color, marginBottom: '8px' }}>
                {stat.icon}
              </div>
              <h3 style={{ fontSize: '2rem', fontWeight: '900', color: stat.color, fontFamily: 'var(--font-mono)', letterSpacing: '-0.03em' }}>
                {stat.value.toLocaleString()}{stat.suffix}
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '4px', fontWeight: '500' }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════════════ */}
      <section style={{ padding: '88px 24px', maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '52px' }}>
          <span className="badge badge-cyan" style={{ marginBottom: '16px', display: 'inline-block' }}>Simple Process</span>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: '800', marginBottom: '12px' }}>
            How <span className="text-gradient">AdNazar</span> Works
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '480px', margin: '0 auto', lineHeight: '1.7' }}>
            Whether you&apos;re an advertiser or a billboard owner — getting started takes minutes.
          </p>
        </div>

        {/* Tab toggle */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '48px' }}>
          <div style={{
            display: 'flex', background: 'var(--bg-tertiary)', padding: '4px',
            borderRadius: '10px', border: '1px solid var(--border-glass)', gap: '4px',
          }}>
            {[
              { key: 'advertiser', label: '🎯 For Advertisers' },
              { key: 'host', label: '🏗️ For Billboard Hosts' }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveHowTab(tab.key)}
                style={{
                  padding: '9px 22px', borderRadius: '7px', border: 'none',
                  background: activeHowTab === tab.key ? 'var(--accent-purple)' : 'transparent',
                  color: activeHowTab === tab.key ? '#fff' : 'var(--text-secondary)',
                  fontWeight: '600', fontSize: '0.88rem', cursor: 'pointer',
                  transition: 'var(--transition-smooth)', fontFamily: 'var(--font-sans)',
                  boxShadow: activeHowTab === tab.key ? 'var(--shadow-neon-purple)' : 'none',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Steps */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          {HOW_IT_WORKS[activeHowTab].map((step) => (
            <div key={step.step} className="glass-panel glass-panel-hover" style={{ padding: '28px 24px', position: 'relative', overflow: 'hidden' }}>
              {/* Step number badge */}
              <div style={{
                width: '36px', height: '36px', borderRadius: '9px',
                background: 'var(--accent-purple-glow)',
                border: '1px solid rgba(79,70,229,0.18)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--accent-purple)', fontWeight: '800',
                fontFamily: 'var(--font-mono)', fontSize: '0.85rem',
                marginBottom: '16px',
              }}>
                {step.step}
              </div>
              <div style={{ fontSize: '1.8rem', marginBottom: '12px' }}>{step.icon}</div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text-primary)' }}>
                {step.title}
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.65' }}>
                {step.desc}
              </p>
              {/* Decorative large number */}
              <div style={{
                position: 'absolute', bottom: '-8px', right: '8px',
                fontSize: '5rem', fontWeight: '900', opacity: 0.04,
                fontFamily: 'var(--font-mono)', color: 'var(--accent-purple)',
                lineHeight: 1, pointerEvents: 'none',
              }}>
                {step.step}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FEATURED LOCATIONS
      ══════════════════════════════════════════════ */}
      <section style={{
        padding: '88px 24px',
        background: 'var(--bg-tertiary)',
        borderTop: '1px solid var(--border-glass)',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '52px' }}>
            <span className="badge badge-emerald" style={{ marginBottom: '16px', display: 'inline-block' }}>Nationwide Coverage</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: '800', marginBottom: '12px' }}>
              Featured <span className="text-gradient">Locations</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '480px', margin: '0 auto', lineHeight: '1.7' }}>
              Premium billboard inventory across India&apos;s fastest-growing metros.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            {INITIAL_BILLBOARDS.slice(0, 6).map((board) => (
              <div
                key={board.id}
                className="glass-panel glass-panel-hover"
                style={{ overflow: 'hidden', cursor: 'pointer' }}
                onClick={() => onShowAuth('advertiser')}
              >
                {/* Image */}
                <div style={{ height: '160px', position: 'relative', overflow: 'hidden' }}>
                  <img
                    src={board.image}
                    alt={board.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                  />
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(0deg, rgba(15,23,42,0.6) 0%, transparent 55%)',
                  }} />
                  <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', gap: '6px' }}>
                    {board.visibilityScore > 93 && (
                      <span className="badge badge-saffron" style={{ fontSize: '0.58rem' }}>⭐ Top</span>
                    )}
                    <span className={`badge ${board.availability === 'Available' ? 'badge-emerald' : 'badge-rose'}`} style={{ fontSize: '0.58rem' }}>
                      {board.availability}
                    </span>
                  </div>
                  <div style={{ position: 'absolute', bottom: '10px', left: '12px' }}>
                    <p style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.8)', fontFamily: 'var(--font-mono)', fontWeight: '600' }}>📍 {board.city}</p>
                  </div>
                </div>

                <div style={{ padding: '18px' }}>
                  <h3 style={{ fontSize: '0.9rem', fontWeight: '700', marginBottom: '4px', color: 'var(--text-primary)', lineHeight: '1.4' }}>
                    {board.title}
                  </h3>
                  <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '14px' }}>{board.location}</p>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.72rem' }}>
                    <div style={{ padding: '8px 10px', background: 'var(--bg-tertiary)', borderRadius: '6px', border: '1px solid var(--border-glass)' }}>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.58rem', display: 'block', marginBottom: '2px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Monthly</span>
                      <span style={{ color: 'var(--accent-emerald)', fontWeight: '700', fontFamily: 'var(--font-mono)' }}>
                        ₹{(board.price / 1000).toFixed(0)}K
                      </span>
                    </div>
                    <div style={{ padding: '8px 10px', background: 'var(--bg-tertiary)', borderRadius: '6px', border: '1px solid var(--border-glass)' }}>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.58rem', display: 'block', marginBottom: '2px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Daily Traffic</span>
                      <span style={{ color: 'var(--accent-cyan)', fontWeight: '700', fontFamily: 'var(--font-mono)' }}>
                        {(board.dailyTraffic / 1000).toFixed(0)}K
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => { e.stopPropagation(); onShowAuth('advertiser'); }}
                    className="btn-neon-purple"
                    style={{ width: '100%', justifyContent: 'center', marginTop: '14px', padding: '9px', fontSize: '0.8rem' }}
                  >
                    View &amp; Book <ArrowRight style={{ width: '13px', height: '13px' }} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════════ */}
      <section style={{ padding: '88px 24px', borderTop: '1px solid var(--border-glass)', background: 'var(--bg-secondary)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '52px' }}>
            <span className="badge badge-purple" style={{ marginBottom: '16px', display: 'inline-block' }}>
              <Star style={{ width: '10px', height: '10px' }} />
              5-Star Rated
            </span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: '800', marginBottom: '12px' }}>
              Trusted by <span className="text-gradient">Brands &amp; Hosts</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '460px', margin: '0 auto', lineHeight: '1.7' }}>
              Join 2,400+ businesses already running campaigns on AdNazar.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="glass-panel glass-panel-hover"
                style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '18px' }}
              >
                {/* Stars */}
                <div style={{ display: 'flex', gap: '3px' }}>
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} style={{ width: '14px', height: '14px', fill: '#f59e0b', color: '#f59e0b' }} />
                  ))}
                </div>

                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.75', fontStyle: 'italic', flex: 1 }}>
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderTop: '1px solid var(--border-glass)', paddingTop: '16px' }}>
                  <div style={{
                    width: '42px', height: '42px', borderRadius: '50%',
                    background: t.avatarColor,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.82rem', fontWeight: '800', color: '#fff', flexShrink: 0,
                  }}>
                    {t.avatar}
                  </div>
                  <div>
                    <p style={{ fontWeight: '700', fontSize: '0.88rem', color: 'var(--text-primary)' }}>{t.name}</p>
                    <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>{t.role} · {t.company}</p>
                  </div>
                  <span className="badge badge-cyan" style={{ marginLeft: 'auto', fontSize: '0.6rem' }}>{t.campaignType}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          PRICING TABLE
      ══════════════════════════════════════════════ */}
      <section style={{
        padding: '88px 24px',
        borderTop: '1px solid var(--border-glass)',
        background: 'var(--bg-primary)',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '52px' }}>
            <span className="badge badge-emerald" style={{ marginBottom: '16px', display: 'inline-block' }}>Transparent Pricing</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: '800', marginBottom: '12px' }}>
              City-wise <span className="text-gradient">Rate Overview</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto', lineHeight: '1.7' }}>
              Approximate monthly rates for premium billboard locations. Actual rates vary by size, traffic, and duration.
            </p>
          </div>

          <div className="glass-panel" style={{ overflow: 'hidden' }}>
            {/* Table header */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 1fr 1fr 1fr 1.4fr',
              padding: '14px 24px',
              background: 'var(--bg-tertiary)',
              borderBottom: '1px solid var(--border-glass)',
              fontSize: '0.68rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-muted)',
              letterSpacing: '0.08em',
              fontWeight: '700',
              gap: '8px',
            }}>
              <span>CITY</span>
              <span>MONTHLY FROM</span>
              <span>AVG CPM</span>
              <span>DAILY TRAFFIC</span>
              <span>TOP AREAS</span>
            </div>

            {CITY_PRICING.map((row, i) => (
              <div
                key={row.city}
                className="table-row-hover"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1.2fr 1fr 1fr 1fr 1.4fr',
                  padding: '16px 24px',
                  borderBottom: i < CITY_PRICING.length - 1 ? '1px solid var(--border-glass)' : 'none',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  transition: 'var(--transition-smooth)',
                }}
                onClick={() => onShowAuth('advertiser')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '1.2rem' }}>{row.flag}</span>
                  <span style={{ fontWeight: '700', color: 'var(--text-primary)', fontSize: '0.9rem' }}>{row.city}</span>
                </div>
                <span style={{ fontWeight: '700', color: 'var(--accent-emerald)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                  ₹{(row.minPrice / 1000).toFixed(0)}K – {(row.maxPrice / 1000).toFixed(0)}K
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontWeight: '700', color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>₹{row.cpm}</span>
                  <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>/1K views</span>
                </div>
                <span style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>{row.trafficM}</span>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.78rem' }}>{row.topArea}</span>
              </div>
            ))}
          </div>

          <p style={{ textAlign: 'center', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '16px' }}>
            * All prices are indicative. GST (18%) applicable. Final rate depends on billboard size, duration &amp; location.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FINAL CTA — INDIGO BLOCK
      ══════════════════════════════════════════════ */}
      <section style={{
        padding: '88px 24px',
        background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e3a8a 100%)',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: '60px', height: '60px', borderRadius: '16px',
            background: 'rgba(255,255,255,0.12)',
            border: '1px solid rgba(255,255,255,0.2)',
            marginBottom: '28px',
          }}>
            <Layers style={{ color: '#ffffff', width: '26px', height: '26px' }} />
          </div>

          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: '900', marginBottom: '16px', letterSpacing: '-0.025em', color: '#ffffff' }}>
            Ready to Put Your Brand{' '}
            <span style={{ color: '#a5b4fc' }}>On Every Road?</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.05rem', marginBottom: '40px', lineHeight: '1.75' }}>
            Join 2,400+ brands running outdoor campaigns on AdNazar. Start for free — no setup fees, no contracts.
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '36px' }}>
            <button
              onClick={() => onShowAuth('advertiser')}
              className="btn-white"
              style={{ padding: '14px 32px', fontSize: '1rem' }}
            >
              <Sparkles style={{ width: '17px', height: '17px' }} />
              Start as Advertiser
            </button>
            <button
              onClick={() => onShowAuth('host')}
              className="btn-white-outline"
              style={{ padding: '14px 32px', fontSize: '1rem' }}
            >
              List My Billboard
            </button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '28px', flexWrap: 'wrap' }}>
            {['Free to Sign Up', 'No Long-term Contracts', 'Live in 48 Hours'].map(feature => (
              <div key={feature} style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '0.82rem', color: 'rgba(255,255,255,0.65)' }}>
                <CheckCircle2 style={{ width: '14px', height: '14px', color: '#6ee7b7' }} />
                {feature}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
