'use client';

import React, { useState, useEffect } from 'react';
import { CITY_PRICING, TESTIMONIALS, HOW_IT_WORKS, INITIAL_BILLBOARDS } from '@/utils/mockData';
import { Layers, MapPin, Sparkles, ArrowRight, Star, TrendingUp, Users, BarChart2, Zap, CheckCircle2, ChevronRight, Play } from 'lucide-react';

// Animated counter hook
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
  const [activeCityIndex, setActiveCityIndex] = useState(0);

  const billboardCount = useCounter(1247, 1800, countersStarted);
  const cityCount = useCounter(28, 1200, countersStarted);
  const impressionCount = useCounter(18, 1600, countersStarted);
  const hostCount = useCounter(640, 1500, countersStarted);

  useEffect(() => {
    const timer = setTimeout(() => setCountersStarted(true), 400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCityIndex(prev => (prev + 1) % CITY_PRICING.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const featuredBoards = INITIAL_BILLBOARDS.filter(b => b.visibilityScore > 93).slice(0, 3);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>

      {/* ═══════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════ */}
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
      }}>
        {/* Animated background glows */}
        <div style={{
          position: 'absolute', top: '-100px', left: '10%',
          width: '500px', height: '500px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',
          filter: 'blur(60px)', animation: 'pulseGlow 6s ease-in-out infinite'
        }} />
        <div style={{
          position: 'absolute', bottom: '0', right: '5%',
          width: '600px', height: '600px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)',
          filter: 'blur(80px)', animation: 'pulseGlow 8s ease-in-out infinite 2s'
        }} />
        <div style={{
          position: 'absolute', top: '30%', left: '-5%',
          width: '400px', height: '400px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)',
          filter: 'blur(60px)'
        }} />

        {/* Floating billboard mockup cards */}
        <div style={{ position: 'absolute', top: '15%', left: '4%', opacity: 0.6, transform: 'rotate(-8deg)', display: 'none' }} className="hero-float-card" />

        {/* Badge */}
        <span className="badge badge-purple" style={{ display: 'inline-flex', gap: '6px', alignItems: 'center', marginBottom: '24px', fontSize: '0.75rem' }}>
          <Zap style={{ width: '12px', height: '12px' }} /> India&apos;s #1 Outdoor Advertising Marketplace
        </span>

        {/* Headline */}
        <h1 style={{
          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
          fontWeight: '900',
          lineHeight: '1.1',
          letterSpacing: '-0.03em',
          maxWidth: '900px',
          marginBottom: '24px'
        }}>
          India&apos;s Smartest{' '}
          <span className="text-gradient">Billboard Network</span>
          {' '}for Brands & Owners
        </h1>

        <p style={{
          fontSize: 'clamp(1rem, 2vw, 1.2rem)',
          color: 'var(--text-secondary)',
          maxWidth: '640px',
          lineHeight: '1.7',
          marginBottom: '40px'
        }}>
          Discover 1,200+ premium hoardings, unipoles & digital LED screens across 28 Indian cities.
          Design, preview in 3D, and go live in 48 hours.
        </p>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '64px' }}>
          <button
            onClick={() => onShowAuth('advertiser')}
            className="btn-neon-purple"
            style={{ padding: '14px 32px', fontSize: '1rem', gap: '10px' }}
          >
            <MapPin style={{ width: '18px', height: '18px' }} />
            Find Billboards
            <ArrowRight style={{ width: '16px', height: '16px' }} />
          </button>
          <button
            onClick={() => onShowAuth('host')}
            className="btn-neon-saffron"
            style={{ padding: '14px 32px', fontSize: '1rem', gap: '10px' }}
          >
            List Your Space
            <ChevronRight style={{ width: '16px', height: '16px' }} />
          </button>
          <button
            onClick={() => onShowAuth('advertiser')}
            className="btn-outline"
            style={{ padding: '14px 24px', fontSize: '1rem', gap: '10px' }}
          >
            <Play style={{ width: '16px', height: '16px' }} /> Watch Demo
          </button>
        </div>

        {/* Hero Billboard Preview Card */}
        <div style={{
          width: '100%',
          maxWidth: '960px',
          borderRadius: '20px',
          overflow: 'hidden',
          border: '1px solid var(--border-glass)',
          boxShadow: '0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(99,102,241,0.1)',
          background: 'var(--bg-secondary)',
          position: 'relative'
        }}>
          {/* Faux browser chrome */}
          <div style={{
            padding: '12px 16px',
            background: 'var(--bg-tertiary)',
            borderBottom: '1px solid var(--border-glass)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f43f5e' }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#eab308' }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }} />
            <div style={{
              flex: 1, background: 'var(--bg-primary)', borderRadius: '6px',
              padding: '4px 12px', fontSize: '0.7rem', color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)', marginLeft: '8px'
            }}>
              🔒 adnazar.in/discover
            </div>
          </div>
          {/* App preview image */}
          <div style={{ height: '340px', background: 'linear-gradient(135deg, #09090b 0%, #18181b 100%)', position: 'relative', overflow: 'hidden' }}>
            {/* Map mockup */}
            <div style={{ position: 'absolute', inset: 0, display: 'grid', gridTemplateColumns: '1fr 320px' }}>
              {/* Map area */}
              <div style={{ background: 'linear-gradient(145deg, #0f172a 0%, #1e293b 100%)', position: 'relative', overflow: 'hidden' }}>
                {/* Grid lines */}
                {[...Array(8)].map((_, i) => (
                  <div key={`h${i}`} style={{ position: 'absolute', left: 0, right: 0, top: `${i * 14}%`, height: '1px', background: 'rgba(99,102,241,0.06)' }} />
                ))}
                {[...Array(10)].map((_, i) => (
                  <div key={`v${i}`} style={{ position: 'absolute', top: 0, bottom: 0, left: `${i * 10}%`, width: '1px', background: 'rgba(99,102,241,0.06)' }} />
                ))}
                {/* Fake map pins */}
                {[
                  { top: '25%', left: '20%', color: '#10b981', label: 'Mumbai' },
                  { top: '15%', left: '55%', color: '#6366f1', label: 'Delhi' },
                  { top: '55%', left: '30%', color: '#f97316', label: 'Pune' },
                  { top: '60%', left: '45%', color: '#3b82f6', label: 'Hyd' },
                  { top: '65%', left: '65%', color: '#10b981', label: 'Chennai' },
                  { top: '30%', left: '42%', color: '#f43f5e', label: 'Ahd' },
                ].map((pin, i) => (
                  <div key={i} style={{ position: 'absolute', top: pin.top, left: pin.left, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                    <div style={{
                      width: '28px', height: '28px', borderRadius: '50% 50% 50% 0', transform: 'rotate(-45deg)',
                      background: pin.color, boxShadow: `0 0 12px ${pin.color}60`,
                      border: '2px solid rgba(255,255,255,0.2)'
                    }} />
                    <span style={{ fontSize: '0.55rem', color: pin.color, fontFamily: 'var(--font-mono)', fontWeight: '700', whiteSpace: 'nowrap' }}>{pin.label}</span>
                  </div>
                ))}
                <div style={{
                  position: 'absolute', bottom: '12px', left: '12px',
                  background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)',
                  borderRadius: '8px', padding: '6px 12px', fontSize: '0.65rem',
                  color: '#818cf8', fontFamily: 'var(--font-mono)'
                }}>
                  🗺️ 1,247 Active Locations
                </div>
              </div>
              {/* Side panel */}
              <div style={{ borderLeft: '1px solid var(--border-glass)', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'hidden' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>TOP PERFORMERS</div>
                {featuredBoards.map((board, i) => (
                  <div key={board.id} style={{
                    background: i === 0 ? 'rgba(99,102,241,0.08)' : 'rgba(255,255,255,0.02)',
                    border: `1px solid ${i === 0 ? 'rgba(99,102,241,0.25)' : 'var(--border-glass)'}`,
                    borderRadius: '10px', padding: '10px', cursor: 'pointer'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                      <div>
                        <p style={{ fontSize: '0.7rem', fontWeight: '700', color: 'var(--text-primary)', lineHeight: '1.3' }}>{board.title}</p>
                        <p style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', marginTop: '2px' }}>📍 {board.city}</p>
                      </div>
                      {i === 0 && <span className="badge badge-saffron" style={{ fontSize: '0.55rem', padding: '2px 5px', whiteSpace: 'nowrap' }}>⭐ Top</span>}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                      <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>₹{(board.price / 1000).toFixed(0)}K/mo</span>
                      <span style={{ fontSize: '0.6rem', color: '#10b981', fontFamily: 'var(--font-mono)' }}>Score: {board.visibilityScore}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          STATS COUNTER BAR
      ═══════════════════════════════════════════ */}
      <section style={{
        borderTop: '1px solid var(--border-glass)',
        borderBottom: '1px solid var(--border-glass)',
        background: 'var(--bg-glass)',
        backdropFilter: 'blur(20px)',
        padding: '40px 24px',
      }}>
        <div style={{
          maxWidth: '960px', margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '24px', textAlign: 'center'
        }}>
          {[
            { value: billboardCount, suffix: '+', label: 'Verified Billboards', color: 'var(--accent-purple)', icon: <BarChart2 style={{ width: '20px', height: '20px' }} /> },
            { value: cityCount, suffix: ' Cities', label: 'Indian Cities Covered', color: 'var(--accent-cyan)', icon: <MapPin style={{ width: '20px', height: '20px' }} /> },
            { value: impressionCount, suffix: 'M+ Daily', label: 'Vehicle Impressions', color: 'var(--accent-saffron)', icon: <TrendingUp style={{ width: '20px', height: '20px' }} /> },
            { value: hostCount, suffix: '+', label: 'Active Billboard Hosts', color: 'var(--accent-emerald)', icon: <Users style={{ width: '20px', height: '20px' }} /> },
          ].map((stat, i) => (
            <div key={i}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: stat.color, marginBottom: '8px' }}>
                {stat.icon}
              </div>
              <h3 style={{ fontSize: '2.2rem', fontWeight: '900', color: stat.color, fontFamily: 'var(--font-mono)', letterSpacing: '-0.02em' }}>
                {stat.value.toLocaleString()}{stat.suffix}
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          HOW IT WORKS
      ═══════════════════════════════════════════ */}
      <section style={{ padding: '80px 24px', maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span className="badge badge-cyan" style={{ marginBottom: '16px', display: 'inline-block' }}>Simple Process</span>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: '800', marginBottom: '12px' }}>
            How <span className="text-gradient">AdNazar</span> Works
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto' }}>
            Whether you&apos;re an advertiser or a billboard owner — getting started takes minutes.
          </p>
        </div>

        {/* Tab toggle */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '48px' }}>
          <div style={{
            display: 'flex', background: 'var(--bg-secondary)', padding: '4px',
            borderRadius: '12px', border: '1px solid var(--border-glass)', gap: '4px'
          }}>
            {[
              { key: 'advertiser', label: '🎯 For Advertisers' },
              { key: 'host', label: '🏗️ For Billboard Hosts' }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveHowTab(tab.key)}
                style={{
                  padding: '10px 24px', borderRadius: '9px', border: 'none',
                  background: activeHowTab === tab.key ? 'linear-gradient(135deg, var(--accent-purple) 0%, #4338ca 100%)' : 'transparent',
                  color: activeHowTab === tab.key ? '#fff' : 'var(--text-secondary)',
                  fontWeight: '600', fontSize: '0.9rem', cursor: 'pointer',
                  transition: 'var(--transition-smooth)', fontFamily: 'var(--font-sans)'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Steps grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
          {HOW_IT_WORKS[activeHowTab].map((step, i) => (
            <div
              key={step.step}
              className="glass-panel glass-panel-hover"
              style={{
                padding: '28px 24px',
                border: '1px solid var(--border-glass)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{
                position: 'absolute', top: '-10px', right: '-10px',
                fontSize: '4rem', opacity: 0.06, fontWeight: '900',
                fontFamily: 'var(--font-mono)', color: 'var(--accent-purple)'
              }}>
                {step.step}
              </div>
              <div style={{ fontSize: '2rem', marginBottom: '16px' }}>{step.icon}</div>
              <div style={{
                display: 'inline-block', fontSize: '0.65rem', fontFamily: 'var(--font-mono)',
                color: 'var(--accent-purple)', fontWeight: '700', letterSpacing: '0.1em',
                marginBottom: '8px'
              }}>
                STEP {step.step}
              </div>
              <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '10px', color: 'var(--text-primary)' }}>
                {step.title}
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                {step.desc}
              </p>
              {/* Connector arrow (not on last item) */}
              {i < HOW_IT_WORKS[activeHowTab].length - 1 && (
                <div style={{ position: 'absolute', right: '-14px', top: '50%', transform: 'translateY(-50%)', zIndex: 10, display: 'none' }}>
                  <ChevronRight style={{ color: 'var(--accent-purple)', opacity: 0.4 }} />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FEATURED LOCATIONS
      ═══════════════════════════════════════════ */}
      <section style={{
        padding: '80px 24px',
        background: 'radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.06) 0%, transparent 60%)',
        borderTop: '1px solid var(--border-glass)'
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="badge badge-emerald" style={{ marginBottom: '16px', display: 'inline-block' }}>Nationwide Coverage</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: '800', marginBottom: '12px' }}>
              Featured <span className="text-gradient">Locations</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto' }}>
              Premium billboard inventory across India&apos;s fastest-growing metros.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            {INITIAL_BILLBOARDS.slice(0, 6).map((board, i) => (
              <div
                key={board.id}
                className="glass-panel glass-panel-hover"
                style={{ overflow: 'hidden', border: '1px solid var(--border-glass)', cursor: 'pointer' }}
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
                    background: 'linear-gradient(0deg, rgba(9,9,11,0.8) 0%, transparent 50%)'
                  }} />
                  <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', gap: '6px' }}>
                    {board.visibilityScore > 93 && (
                      <span className="badge badge-saffron" style={{ fontSize: '0.6rem' }}>⭐ Top Performing</span>
                    )}
                    <span className={`badge ${board.availability === 'Available' ? 'badge-emerald' : 'badge-rose'}`} style={{ fontSize: '0.6rem' }}>
                      {board.availability}
                    </span>
                  </div>
                  <div style={{ position: 'absolute', bottom: '10px', left: '12px' }}>
                    <p style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-mono)' }}>📍 {board.city}</p>
                  </div>
                </div>

                <div style={{ padding: '16px' }}>
                  <h3 style={{ fontSize: '0.9rem', fontWeight: '700', marginBottom: '6px', color: 'var(--text-primary)' }}>
                    {board.title}
                  </h3>
                  <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>{board.location}</p>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.72rem' }}>
                    <div>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.6rem', display: 'block' }}>MONTHLY</span>
                      <span style={{ color: 'var(--accent-emerald)', fontWeight: '700', fontFamily: 'var(--font-mono)' }}>
                        ₹{(board.price / 1000).toFixed(0)}K
                      </span>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.6rem', display: 'block' }}>DAILY TRAFFIC</span>
                      <span style={{ color: 'var(--accent-cyan)', fontWeight: '700', fontFamily: 'var(--font-mono)' }}>
                        {(board.dailyTraffic / 1000).toFixed(0)}K
                      </span>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.6rem', display: 'block' }}>TYPE</span>
                      <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>{board.billboardType}</span>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.6rem', display: 'block' }}>SCORE</span>
                      <span style={{ color: '#fbbf24', fontWeight: '700' }}>⭐ {board.visibilityScore}%</span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => { e.stopPropagation(); onShowAuth('advertiser'); }}
                    className="btn-outline"
                    style={{ width: '100%', justifyContent: 'center', marginTop: '12px', padding: '8px', fontSize: '0.8rem' }}
                  >
                    View & Book <ArrowRight style={{ width: '14px', height: '14px' }} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TESTIMONIALS
      ═══════════════════════════════════════════ */}
      <section style={{ padding: '80px 24px', borderTop: '1px solid var(--border-glass)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="badge badge-purple" style={{ marginBottom: '16px', display: 'inline-block' }}>
              <Star style={{ width: '10px', height: '10px', display: 'inline', marginRight: '4px' }} />
              5-Star Rated
            </span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: '800', marginBottom: '12px' }}>
              Trusted by <span className="text-gradient">Brands & Hosts</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="glass-panel glass-panel-hover"
                style={{ padding: '28px', border: '1px solid var(--border-glass)', display: 'flex', flexDirection: 'column', gap: '20px' }}
              >
                {/* Stars */}
                <div style={{ display: 'flex', gap: '3px' }}>
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} style={{ width: '14px', height: '14px', fill: '#eab308', color: '#eab308' }} />
                  ))}
                </div>

                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.7', fontStyle: 'italic', flex: 1 }}>
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderTop: '1px solid var(--border-glass)', paddingTop: '16px' }}>
                  <div style={{
                    width: '44px', height: '44px', borderRadius: '50%',
                    background: t.avatarColor,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.85rem', fontWeight: '800', color: '#fff',
                    flexShrink: 0
                  }}>
                    {t.avatar}
                  </div>
                  <div>
                    <p style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--text-primary)' }}>{t.name}</p>
                    <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>{t.role} · {t.company}</p>
                  </div>
                  <span className="badge badge-cyan" style={{ marginLeft: 'auto', fontSize: '0.6rem' }}>{t.campaignType}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PRICING OVERVIEW (City-wise)
      ═══════════════════════════════════════════ */}
      <section style={{
        padding: '80px 24px',
        background: 'radial-gradient(ellipse at 50% 100%, rgba(16,185,129,0.05) 0%, transparent 60%)',
        borderTop: '1px solid var(--border-glass)'
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="badge badge-emerald" style={{ marginBottom: '16px', display: 'inline-block' }}>Transparent Pricing</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: '800', marginBottom: '12px' }}>
              City-wise <span className="text-gradient">Rate Overview</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '520px', margin: '0 auto' }}>
              Approximate monthly rates for premium billboard locations. Actual rates vary by size, traffic, and duration.
            </p>
          </div>

          <div className="glass-panel" style={{ border: '1px solid var(--border-glass)', overflow: 'hidden' }}>
            {/* Table header */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 1fr 1fr 1fr 1.4fr',
              padding: '14px 24px',
              background: 'var(--bg-tertiary)',
              borderBottom: '1px solid var(--border-glass)',
              fontSize: '0.7rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-secondary)',
              letterSpacing: '0.08em',
              gap: '8px'
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
                  transition: 'var(--transition-smooth)'
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
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>/1K views</span>
                </div>
                <span style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>{row.trafficM}</span>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.78rem' }}>{row.topArea}</span>
              </div>
            ))}
          </div>

          <p style={{ textAlign: 'center', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '16px' }}>
            * All prices are indicative. GST (18%) applicable. Final rate depends on billboard size, duration & location.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FINAL CTA SECTION
      ═══════════════════════════════════════════ */}
      <section style={{
        padding: '80px 24px',
        borderTop: '1px solid var(--border-glass)',
        background: 'radial-gradient(ellipse at 50% 50%, rgba(99,102,241,0.08) 0%, transparent 60%)',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: '64px', height: '64px', borderRadius: '18px',
            background: 'linear-gradient(135deg, var(--accent-saffron) 0%, #fff 50%, var(--accent-emerald) 100%)',
            marginBottom: '24px', padding: '3px'
          }}>
            <div style={{
              width: '100%', height: '100%', borderRadius: '15px',
              background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Layers style={{ color: 'var(--accent-saffron)', width: '28px', height: '28px' }} />
            </div>
          </div>

          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: '900', marginBottom: '16px', letterSpacing: '-0.02em' }}>
            Ready to Put Your Brand <span className="text-gradient">On Every Road?</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginBottom: '40px', lineHeight: '1.7' }}>
            Join 2,400+ brands running outdoor campaigns on AdNazar. Start for free — no setup fees, no contracts.
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '32px' }}>
            <button
              onClick={() => onShowAuth('advertiser')}
              className="btn-neon-purple"
              style={{ padding: '16px 36px', fontSize: '1.05rem' }}
            >
              <Sparkles style={{ width: '18px', height: '18px' }} />
              Start as Advertiser
            </button>
            <button
              onClick={() => onShowAuth('host')}
              className="btn-neon-saffron"
              style={{ padding: '16px 36px', fontSize: '1.05rem' }}
            >
              List My Billboard
            </button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap' }}>
            {['Free to Sign Up', 'No Long-term Contracts', 'Live in 48 Hours'].map(feature => (
              <div key={feature} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                <CheckCircle2 style={{ width: '14px', height: '14px', color: 'var(--accent-emerald)' }} />
                {feature}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
