'use client';

import React, { useState, useRef, useEffect } from 'react';
import MapView from './MapView';
import Billboard3DPreview from './Billboard3DPreview';
import PosterDesigner from './PosterDesigner';
import SmartAnalytics from './SmartAnalytics';
import { CreditCard, ShoppingBag, Calendar, CheckCircle2, Ticket, Printer, ArrowRight, Sparkles, FileSpreadsheet, Lock, Activity, Eye, Play, Pause, Heart, Download, Filter, X, Bell, Star, SlidersHorizontal, TrendingUp } from 'lucide-react';

export default function AdvertiserPortal({ billboards, bookings, onBookBillboard, theme, currentUser, preLoadedPoster, clearPreLoadedPoster, hostUpgradeStatus, onRequestHostUpgrade, onUpgradeToHost }) {
  const [activeTab, setActiveTab] = useState('book'); // 'book', 'active-campaigns', 'saved'
  const [activeBillboard, setActiveBillboard] = useState(billboards[0]);
  const [posterDataUrl, setPosterDataUrl] = useState('');

  // Handle pre-loaded poster URL from AI Poster Studio
  useEffect(() => {
    if (preLoadedPoster) {
      setPosterDataUrl(preLoadedPoster);
      setTimeout(() => {
        addToast('Poster design imported from Creative Studio!', 'success');
      }, 500);
      clearPreLoadedPoster();
    }
  }, [preLoadedPoster]);
  const [printOption, setPrintOption] = useState('OptionA'); // 'OptionA' (AdNazar Prints) or 'OptionB' (Owner Prints)
  const [bookingMonths, setBookingMonths] = useState(1);
  const [startDate, setStartDate] = useState('2026-06-01');
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [paymentStep, setPaymentStep] = useState('summary'); // 'summary', 'gateway', 'success'
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi', 'card', 'netbanking'
  const [upiId, setUpiId] = useState('amit@okaxis');
  const [bookingId, setBookingId] = useState('');

  // ── Smart Filters ──
  const [showFilters, setShowFilters] = useState(false);
  const [filterCity, setFilterCity] = useState('All');
  const [filterBudgetMax, setFilterBudgetMax] = useState(500000);
  const [filterTrafficMin, setFilterTrafficMin] = useState(0);
  const [filterType, setFilterType] = useState('All');

  // ── Saved billboards ──
  const [savedIds, setSavedIds] = useState(new Set());
  const toggleSave = (id) => setSavedIds(prev => {
    const next = new Set(prev);
    if (next.has(id)) next.delete(id); else next.add(id);
    return next;
  });

  // ── Notification toasts ──
  const [toasts, setToasts] = useState([]);
  const addToast = (msg, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, msg, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4500);
  };

  // Filtered billboards
  const CITIES = ['All', ...Array.from(new Set(billboards.map(b => b.city)))];
  const TYPES = ['All', 'Unipole', 'Hoarding', 'Digital LED'];
  const filteredBillboards = billboards.filter(b => {
    if (filterCity !== 'All' && b.city !== filterCity) return false;
    if (b.price > filterBudgetMax) return false;
    if (b.dailyTraffic < filterTrafficMin) return false;
    if (filterType !== 'All' && b.billboardType !== filterType) return false;
    return true;
  });
  const savedBillboards = billboards.filter(b => savedIds.has(b.id));

  // Live Campaigns simulation states
  const [activeCampaigns, setActiveCampaigns] = useState([
    {
      id: 'CAM-9081',
      title: 'Koramangala 80ft Road Junction',
      city: 'Bangalore',
      impressions: 1420500,
      ctr: 1.45,
      leads: 20590,
      daysRemaining: 18,
      status: 'Active'
    },
    {
      id: 'CAM-7221',
      title: 'FC Road Youth Central Unipole',
      city: 'Pune',
      impressions: 489200,
      ctr: 0.98,
      leads: 4790,
      daysRemaining: 5,
      status: 'Active'
    }
  ]);

  const canvasRef = useRef(null);

  // Dynamic impressions counter tick simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCampaigns(prev =>
        prev.map(c => {
          if (c.status === 'Active') {
            const addedImpressions = Math.floor(Math.random() * 8 + 3);
            const addedLeads = Math.random() > 0.7 ? 1 : 0;
            return {
              ...c,
              impressions: c.impressions + addedImpressions,
              leads: c.leads + addedLeads
            };
          }
          return c;
        })
      );
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  // Parse size helper
  const parseSize = (sizeStr) => {
    try {
      const dimensions = sizeStr.split(' ')[0].split('x');
      const w = parseInt(dimensions[0]);
      const h = parseInt(dimensions[1]);
      return w * h; // sq. ft.
    } catch {
      return 300; // fallback sq. ft.
    }
  };

  const sqFt = parseSize(activeBillboard.size);
  const baseRental = activeBillboard.price * bookingMonths;
  const posterDesignFee = posterDataUrl.includes('data:image') ? 999 : 0;
  const printingMountFee = printOption === 'OptionA' ? sqFt * 45 : 4000;
  
  const discount = couponApplied ? baseRental * 0.1 : 0;
  const subtotal = baseRental + posterDesignFee + printingMountFee - discount;
  const gst = subtotal * 0.18;
  const totalPayable = subtotal + gst;

  // Handle coupon apply
  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === 'FIRSTAD10' || couponCode.toUpperCase() === 'STARTUP') {
      setCouponApplied(true);
    } else {
      alert('Invalid Promo Code! Use "FIRSTAD10" for a 10% startup discount.');
    }
  };

  const handlePayNow = () => {
    setPaymentStep('gateway');
  };

  const submitPayment = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      const generatedId = `ADN-${Math.floor(100000 + Math.random() * 900000)}`;
      setBookingId(generatedId);
      setPaymentStep('success');
      
      // Add campaign to live tracker
      const newCamp = {
        id: `CAM-${Math.floor(1000 + Math.random() * 9000)}`,
        title: activeBillboard.title,
        city: activeBillboard.city,
        impressions: 0,
        ctr: parseFloat((0.8 + Math.random() * 0.9).toFixed(2)),
        leads: 0,
        daysRemaining: bookingMonths * 30,
        status: 'Active'
      };
      setActiveCampaigns(prev => [newCamp, ...prev]);

      if (onBookBillboard) {
        onBookBillboard(activeBillboard.id, generatedId);
      }

      // Notification toasts
      addToast(`🎉 Campaign live! ${activeBillboard.title} is now active.`, 'success');
      if (newCamp.ctr < 1.0) {
        setTimeout(() => addToast('⚠️ Low CTR detected on new campaign. Consider premium location.', 'warning'), 3000);
      }
    }, 2000);
  };

  // Export Proposal PDF (mock)
  const handleExportPDF = () => {
    addToast(`📄 Proposal PDF for "${activeBillboard.title}" downloaded!`, 'success');
  };

  // Toggle active campaign pause/play
  const toggleCampaignStatus = (id) => {
    setActiveCampaigns(prev =>
      prev.map(c => {
        if (c.id === id) {
          return {
            ...c,
            status: c.status === 'Active' ? 'Paused' : 'Active'
          };
        }
        return c;
      })
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

      {/* Notification Toasts */}
      <div style={{ position: 'fixed', top: '90px', right: '24px', zIndex: 3000, display: 'flex', flexDirection: 'column', gap: '10px', pointerEvents: 'none' }}>
        {toasts.map(toast => (
          <div key={toast.id} className="glass-panel animate-fade-in" style={{
            padding: '12px 18px', maxWidth: '360px', pointerEvents: 'auto',
            border: `1px solid ${toast.type === 'warning' ? 'rgba(249,115,22,0.4)' : 'rgba(16,185,129,0.3)'}`,
            background: toast.type === 'warning' ? 'rgba(249,115,22,0.08)' : 'rgba(16,185,129,0.08)',
            display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.82rem',
            color: toast.type === 'warning' ? 'var(--accent-saffron)' : 'var(--accent-emerald)'
          }}>
            <Bell style={{ width: '14px', height: '14px', flexShrink: 0 }} />
            {toast.msg}
          </div>
        ))}
      </div>

      {/* Tab workspace controller */}
      <div className="portal-tab-bar">
        {[
          { key: 'book', label: '🔍 Design & Book', badge: null },
          { key: 'active-campaigns', label: '📈 Live Campaigns', badge: 'Live' },
          { key: 'saved', label: '❤️ Saved', badge: savedIds.size > 0 ? String(savedIds.size) : null },
          { key: 'become-host', label: '🏗️ Become a Host', badge: hostUpgradeStatus === 'approved' ? '✓' : hostUpgradeStatus === 'pending' ? '…' : null },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              background: 'transparent', border: 'none',
              borderBottom: activeTab === tab.key ? '2px solid var(--accent-purple)' : '2px solid transparent',
              color: activeTab === tab.key ? 'var(--text-primary)' : 'var(--text-muted)',
              padding: '8px 18px 14px 18px', fontSize: '0.9rem',
              fontFamily: 'var(--font-mono)', fontWeight: '600', cursor: 'pointer',
              transition: 'var(--transition-smooth)', display: 'flex', alignItems: 'center', gap: '8px'
            }}
          >
            {tab.label}
            {tab.badge && <span className="badge badge-emerald" style={{ fontSize: '0.6rem', padding: '1px 6px' }}>{tab.badge}</span>}
          </button>
        ))}
      </div>

      {/* ── SAVED BILLBOARDS TAB ── */}
      {activeTab === 'saved' && (
        <div className="glass-panel" style={{ padding: '28px', border: '1px solid var(--border-glass)' }}>
          <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-mono)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Heart style={{ color: '#fb7185', fill: '#fb7185' }} /> Saved Billboards ({savedBillboards.length})
          </h3>
          {savedBillboards.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px', color: 'var(--text-muted)' }}>
              <Heart style={{ width: '40px', height: '40px', margin: '0 auto 12px', opacity: 0.3 }} />
              <p>No saved billboards yet. Click the ❤️ on any billboard card to save it.</p>
            </div>
          ) : (
            <div className="saved-grid">
              {savedBillboards.map(board => (
                <div key={board.id} className="glass-panel-hover" style={{ border: '1px solid rgba(251,113,133,0.2)', borderRadius: '12px', overflow: 'hidden' }}>
                  <div style={{ height: '130px', position: 'relative' }}>
                    <img src={board.image} alt={board.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <button onClick={() => toggleSave(board.id)} style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(0,0,0,0.5)', border: 'none', borderRadius: '6px', padding: '4px', cursor: 'pointer' }}>
                      <Heart style={{ width: '14px', height: '14px', color: '#fb7185', fill: '#fb7185' }} />
                    </button>
                  </div>
                  <div style={{ padding: '14px' }}>
                    <p style={{ fontSize: '0.7rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>📍 {board.city}</p>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: '700', margin: '4px 0' }}>{board.title}</h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', fontWeight: '700', fontFamily: 'var(--font-mono)' }}>₹{board.price.toLocaleString()}/mo</p>
                    <button onClick={() => { setActiveBillboard(board); setActiveTab('book'); }} className="btn-neon-purple" style={{ width: '100%', justifyContent: 'center', marginTop: '10px', padding: '8px', fontSize: '0.78rem' }}>
                      Book This Billboard <ArrowRight style={{ width: '13px', height: '13px' }} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── BECOME A HOST TAB ── */}
      {activeTab === 'become-host' && (
        <div className="glass-panel animate-fade-in" style={{ padding: '40px 32px', border: '1px solid var(--border-glass)', maxWidth: '640px', margin: '0 auto', width: '100%' }}>
          {hostUpgradeStatus === null && (
            <>
              <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <div style={{ fontSize: '3.5rem', marginBottom: '16px' }}>🏗️</div>
                <h2 style={{ fontSize: '1.6rem', fontWeight: '800', marginBottom: '10px' }}>Become a Billboard Host</h2>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', maxWidth: '440px', margin: '0 auto' }}>
                  Own outdoor spaces? List your billboards on AdNazar and start earning passive income from brands looking for premium visibility.
                </p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '32px' }}>
                {[
                  { icon: '💰', title: 'Earn Monthly', desc: 'Get paid every month for your billboard space' },
                  { icon: '📊', title: 'Live Analytics', desc: 'Track impressions, bookings & revenue in real-time' },
                  { icon: '🤝', title: 'Vetted Brands', desc: 'Only quality advertisers approved by AdNazar' },
                  { icon: '⚡', title: 'Instant Listing', desc: 'Your billboard goes live within 24 hours' },
                ].map(b => (
                  <div key={b.title} style={{ padding: '16px', background: 'var(--bg-tertiary)', borderRadius: '10px', border: '1px solid var(--border-glass)' }}>
                    <div style={{ fontSize: '1.5rem', marginBottom: '6px' }}>{b.icon}</div>
                    <p style={{ fontWeight: '700', fontSize: '0.85rem', color: 'var(--text-primary)', marginBottom: '4px' }}>{b.title}</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{b.desc}</p>
                  </div>
                ))}
              </div>
              <button onClick={onRequestHostUpgrade} className="btn-neon-saffron" style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '1rem' }}>
                🚀 Request Host Access
              </button>
              <p style={{ textAlign: 'center', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '14px' }}>
                Review typically completes in a few moments. No paperwork needed.
              </p>
            </>
          )}
          {hostUpgradeStatus === 'pending' && (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ fontSize: '3rem', marginBottom: '16px', display: 'inline-block' }}>⏳</div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '10px' }}>Request Under Review</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '24px' }}>
                Your host upgrade request is being reviewed. This usually takes just a few seconds…
              </p>
              <div style={{ height: '6px', background: 'var(--bg-tertiary)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '60%', background: 'var(--accent-saffron)', borderRadius: '3px' }} />
              </div>
            </div>
          )}
          {hostUpgradeStatus === 'approved' && (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ fontSize: '3.5rem', marginBottom: '16px' }}>🎉</div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '10px', color: 'var(--accent-emerald)' }}>You&apos;re Approved!</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '28px' }}>
                Congratulations! Your host account is ready. Switch to the Host Dashboard to list your billboards and start earning.
              </p>
              <button onClick={onUpgradeToHost} className="btn-neon-purple" style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '1rem' }}>
                Open Host Dashboard →
              </button>
            </div>
          )}
        </div>
      )}

      {activeTab === 'book' ? (
        /* ------------------ DESIGN & BOOK WORKSPACE ------------------ */
        <>
          {/* 0. Smart Filters Panel */}
          <div className="glass-panel" style={{ padding: '16px 20px', border: '1px solid var(--border-glass)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: showFilters ? '16px' : '0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <SlidersHorizontal style={{ width: '16px', height: '16px', color: 'var(--accent-purple)' }} />
                <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>Smart Filters</span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  {filteredBillboards.length} of {billboards.length} locations match
                </span>
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                {(filterCity !== 'All' || filterBudgetMax < 500000 || filterTrafficMin > 0 || filterType !== 'All') && (
                  <button onClick={() => { setFilterCity('All'); setFilterBudgetMax(500000); setFilterTrafficMin(0); setFilterType('All'); }} className="btn-outline" style={{ padding: '5px 10px', fontSize: '0.72rem', gap: '4px', borderColor: 'rgba(244,63,94,0.3)', color: '#fb7185' }}>
                    <X style={{ width: '11px', height: '11px' }} /> Clear Filters
                  </button>
                )}
                <button onClick={() => setShowFilters(p => !p)} className="btn-outline" style={{ padding: '5px 12px', fontSize: '0.78rem', gap: '6px' }}>
                  <Filter style={{ width: '13px', height: '13px' }} />
                  {showFilters ? 'Hide' : 'Show Filters'}
                </button>
              </div>
            </div>

            {showFilters && (
              <div className="filter-grid" style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '16px' }}>
                {/* City filter */}
                <div>
                  <span className="label-text">CITY / AREA</span>
                  <select className="input-field" value={filterCity} onChange={e => setFilterCity(e.target.value)} style={{ appearance: 'none', background: 'var(--bg-secondary)' }}>
                    {CITIES.map(c => <option key={c} value={c} style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>{c}</option>)}
                  </select>
                </div>

                {/* Billboard Type */}
                <div>
                  <span className="label-text">BILLBOARD TYPE</span>
                  <select className="input-field" value={filterType} onChange={e => setFilterType(e.target.value)} style={{ appearance: 'none', background: 'var(--bg-secondary)' }}>
                    {TYPES.map(t => <option key={t} value={t} style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>{t}</option>)}
                  </select>
                </div>

                {/* Budget slider */}
                <div>
                  <span className="label-text">MAX BUDGET: ₹{(filterBudgetMax / 1000).toFixed(0)}K/mo</span>
                  <input type="range" min="10000" max="500000" step="5000" value={filterBudgetMax}
                    onChange={e => setFilterBudgetMax(Number(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--accent-purple)', marginTop: '8px' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    <span>₹10K</span><span>₹5L</span>
                  </div>
                </div>

                {/* Min Traffic */}
                <div>
                  <span className="label-text">MIN DAILY TRAFFIC: {filterTrafficMin > 0 ? `${(filterTrafficMin/1000).toFixed(0)}K+` : 'Any'}</span>
                  <input type="range" min="0" max="200000" step="10000" value={filterTrafficMin}
                    onChange={e => setFilterTrafficMin(Number(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--accent-cyan)', marginTop: '8px' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    <span>Any</span><span>200K+</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 1. Map Navigation Block */}
          <MapView
            billboards={filteredBillboards}
            activeBillboard={activeBillboard}
            setActiveBillboard={setActiveBillboard}
            theme={theme}
          />

          {/* 2. Double-Engine Design Studio Frame */}
          <div className="design-studio-grid">
            <PosterDesigner
              canvasRef={canvasRef}
              onPosterChange={(dataUrl) => setPosterDataUrl(dataUrl)}
            />

            <Billboard3DPreview
              canvasRef={canvasRef}
              posterDataUrl={posterDataUrl}
              activeBillboard={activeBillboard}
              theme={theme}
            />
          </div>

          {/* 3. Smart Analytics Integration + active billboard header */}
          <div className="glass-panel" style={{ padding: '16px 20px', border: '1px solid var(--border-glass)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: '700' }}>{activeBillboard.title}</h3>
                  {activeBillboard.visibilityScore > 93 && (
                    <span className="badge badge-saffron" style={{ fontSize: '0.6rem', display: 'inline-flex', gap: '3px', alignItems: 'center' }}>
                      <TrendingUp style={{ width: '9px', height: '9px' }} /> Top Performing
                    </span>
                  )}
                  {activeBillboard.billboardType && (
                    <span className="badge badge-cyan" style={{ fontSize: '0.6rem' }}>{activeBillboard.billboardType}</span>
                  )}
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>📍 {activeBillboard.location} · ₹{activeBillboard.price.toLocaleString()}/mo</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => toggleSave(activeBillboard.id)} className="btn-outline" style={{ padding: '7px 14px', fontSize: '0.78rem', gap: '6px', borderColor: savedIds.has(activeBillboard.id) ? '#fb7185' : undefined, color: savedIds.has(activeBillboard.id) ? '#fb7185' : undefined }}>
                <Heart style={{ width: '14px', height: '14px', fill: savedIds.has(activeBillboard.id) ? '#fb7185' : 'none', color: '#fb7185' }} />
                {savedIds.has(activeBillboard.id) ? 'Saved' : 'Save'}
              </button>
              <button onClick={handleExportPDF} className="btn-outline" style={{ padding: '7px 14px', fontSize: '0.78rem', gap: '6px' }}>
                <Download style={{ width: '14px', height: '14px' }} /> Export Proposal
              </button>
            </div>
          </div>

          <SmartAnalytics activeBillboard={activeBillboard} />

          {/* 4. Booking Configurator */}
          <div className="glass-panel booking-config-grid" style={{
            padding: '28px',
            border: '1px solid var(--border-glass)',
          }}>
            {/* Selection Configuration options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShoppingBag style={{ color: 'var(--accent-cyan)' }} /> Campaign Configurator
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  Configure timeline calendars, premium printing dispatches, and campaign promo credits.
                </p>
              </div>

              <div className="campaign-date-grid">
                <div>
                  <span className="label-text">Select Campaign Start Date</span>
                  <input
                    type="date"
                    className="input-field"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    min="2026-06-01"
                  />
                </div>
                <div>
                  <span className="label-text">Campaign Duration</span>
                  <select
                    className="input-field"
                    value={bookingMonths}
                    onChange={(e) => setBookingMonths(parseInt(e.target.value))}
                    style={{ appearance: 'none', background: 'var(--bg-secondary) url("data:image/svg+xml;utf8,<svg fill=\'%2394a3b8\' height=\'24\' viewBox=\'0 0 24 24\' width=\'24\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M7 10l5 5 5-5z\'/><path d=\'M0 0h24v24H0z\' fill=\'none\'/></svg>") no-repeat 95% center' }}
                  >
                    {[1, 2, 3, 6, 12].map(m => (
                      <option key={m} value={m} style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>{m} {m === 1 ? 'Month' : 'Months'}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Printing Options */}
              <div>
                <span className="label-text" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Printer style={{ width: '14px', height: '14px', color: 'var(--accent-purple)' }} /> Choose Printing & Installation Service
                </span>
                <div className="print-options-grid">
                  {/* Option A */}
                  <div
                    onClick={() => setPrintOption('OptionA')}
                    style={{
                      padding: '16px',
                      borderRadius: '12px',
                      background: printOption === 'OptionA' ? 'rgba(6, 182, 212, 0.08)' : 'rgba(255,255,255,0.01)',
                      border: printOption === 'OptionA' ? '1px solid var(--accent-cyan)' : '1px solid var(--border-glass)',
                      cursor: 'pointer',
                      transition: 'var(--transition-smooth)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <p style={{ fontWeight: '700', fontSize: '0.85rem' }}>Option A: AdNazar Print & Mount</p>
                      <input type="radio" checked={printOption === 'OptionA'} readOnly style={{ accentColor: 'var(--accent-cyan)' }} />
                    </div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '6px' }}>
                      Printed on industrial weatherproof vinyl and professionally mounted on site. Includes full placement photo proof.
                    </p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', fontWeight: '700', marginTop: '8px', fontFamily: 'var(--font-mono)' }}>
                      ₹45 / sq ft (Total: ₹{(sqFt * 45).toLocaleString()})
                    </p>
                  </div>

                  {/* Option B */}
                  <div
                    onClick={() => setPrintOption('OptionB')}
                    style={{
                      padding: '16px',
                      borderRadius: '12px',
                      background: printOption === 'OptionB' ? 'rgba(99, 102, 241, 0.08)' : 'rgba(255,255,255,0.01)',
                      border: printOption === 'OptionB' ? '1px solid var(--accent-purple)' : '1px solid var(--border-glass)',
                      cursor: 'pointer',
                      transition: 'var(--transition-smooth)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <p style={{ fontWeight: '700', fontSize: '0.85rem' }}>Option B: Self-Print / Host Handled</p>
                      <input type="radio" checked={printOption === 'OptionB'} readOnly style={{ accentColor: 'var(--accent-purple)' }} />
                    </div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '6px' }}>
                      You handle printing and courier the sheets to host site. The host handles mounting at standard labor fee.
                    </p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--accent-purple)', fontWeight: '700', marginTop: '8px', fontFamily: 'var(--font-mono)' }}>
                      Flat Mounting Labor: ₹4,000
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Invoice Calculator Side panel */}
            <div style={{
              padding: '24px',
              background: 'rgba(0, 0, 0, 0.25)',
              border: '1px solid var(--border-glass)',
              borderRadius: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              <h4 style={{ fontSize: '1rem', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileSpreadsheet style={{ width: '18px', height: '18px', color: 'var(--accent-emerald)' }} /> Campaign Bill Details
              </h4>

              {/* Pricing parameters */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.8rem', borderBottom: '1px solid var(--border-glass)', paddingBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Base Rent ({activeBillboard.size}) x {bookingMonths}m</span>
                  <span>₹{baseRental.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Poster Studio Design Surcharge</span>
                  <span>{posterDesignFee > 0 ? `₹${posterDesignFee}` : 'Free (Upload)'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Printing & Physical Mounting</span>
                  <span>₹{printingMountFee.toLocaleString()}</span>
                </div>
                
                {couponApplied && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--accent-emerald)', fontWeight: '600' }}>
                    <span>10% Promo Discount Applied</span>
                    <span>-₹{discount.toLocaleString()}</span>
                  </div>
                )}
              </div>

              {/* Subtotal & GST */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8rem', borderBottom: '1px solid var(--border-glass)', paddingBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Taxable Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>OOH Advertising GST (18%)</span>
                  <span>₹{gst.toLocaleString()}</span>
                </div>
              </div>

              {/* Total */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.95rem', fontWeight: '700', fontFamily: 'var(--font-mono)' }}>TOTAL PAYABLE</span>
                <span style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>
                  ₹{totalPayable.toLocaleString()}
                </span>
              </div>

              {/* Promo Codes */}
              <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                <input
                  type="text"
                  placeholder="PROMO CODE (e.g. FIRSTAD10)"
                  className="input-field"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  style={{ padding: '8px 12px', fontSize: '0.75rem' }}
                />
                <button
                  onClick={handleApplyCoupon}
                  className="btn-outline"
                  style={{ padding: '8px 14px', fontSize: '0.75rem' }}
                >
                  Apply
                </button>
              </div>

              {/* Proceed Button */}
              <button
                onClick={handlePayNow}
                className="btn-neon-purple"
                disabled={activeBillboard.availability !== 'Available'}
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  padding: '14px',
                  marginTop: '8px',
                  opacity: activeBillboard.availability !== 'Available' ? 0.5 : 1,
                  cursor: activeBillboard.availability !== 'Available' ? 'not-allowed' : 'pointer'
                }}
              >
                {activeBillboard.availability === 'Available' ? (
                  <>Secure Checkout with Razorpay <ArrowRight style={{ width: '16px', height: '16px' }} /></>
                ) : (
                  'This Hoarding is Already Booked'
                )}
              </button>

              <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textAlign: 'center', display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'center' }}>
                <Lock style={{ width: '10px', height: '10px' }} /> 256-Bit SSL Encrypted Transactions
              </p>
            </div>
          </div>
        </>
      ) : (
        /* ------------------ LIVE CAMPAIGNS TRACKER ------------------ */
        <div className="glass-panel" style={{
          padding: '28px',
          border: '1px solid var(--border-glass)',
          background: 'rgba(15, 14, 28, 0.4)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Activity style={{ color: 'var(--accent-emerald)', animation: 'pulse 1.5s infinite' }} /> Active Outdoor Campaigns
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Real-time tracking of impressions, clicks, and estimated leads from on-road traffic nodes.
              </p>
            </div>
            <span className="badge badge-emerald" style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
              <Eye style={{ width: '12px', height: '12px' }} /> Live IoT Sensors Synced
            </span>
          </div>

          <div className="campaign-cards-grid">
            {activeCampaigns.map((camp) => {
              const isPaused = camp.status === 'Paused';
              return (
                <div
                  key={camp.id}
                  className="glass-panel-hover"
                  style={{
                    background: 'rgba(23, 21, 43, 0.4)',
                    border: '1px solid var(--border-glass)',
                    borderRadius: '12px',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <span style={{ fontSize: '0.65rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>ID: {camp.id}</span>
                      <h4 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--text-primary)' }}>{camp.title}</h4>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px' }}>📍 {camp.city}, India</p>
                    </div>

                    <span className={`badge ${isPaused ? 'badge-rose' : 'badge-emerald'}`}>
                      {camp.status}
                    </span>
                  </div>

                  {/* Operational stats */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '12px',
                    background: 'var(--bg-tertiary)',
                    padding: '12px',
                    borderRadius: '8px',
                    fontSize: '0.75rem'
                  }}>
                    <div>
                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.65rem' }}>TOTAL IMPRESSIONS</span>
                      <p style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-primary)', marginTop: '2px', fontFamily: 'var(--font-mono)' }}>
                        {camp.impressions.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.65rem' }}>ESTIMATED CTR</span>
                      <p style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--accent-cyan)', marginTop: '2px', fontFamily: 'var(--font-mono)' }}>
                        {camp.ctr}%
                      </p>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.65rem' }}>LEADS GENERATED</span>
                      <p style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--accent-emerald)', marginTop: '2px', fontFamily: 'var(--font-mono)' }}>
                        {camp.leads.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.65rem' }}>DAYS REMAINING</span>
                      <p style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--accent-saffron)', marginTop: '2px', fontFamily: 'var(--font-mono)' }}>
                        {camp.daysRemaining} Days
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      onClick={() => toggleCampaignStatus(camp.id)}
                      className="btn-outline"
                      style={{
                        flex: 1,
                        padding: '8px',
                        fontSize: '0.75rem',
                        justifyContent: 'center',
                        color: isPaused ? 'var(--accent-emerald)' : 'var(--accent-rose)',
                        borderColor: isPaused ? 'rgba(16,185,129,0.3)' : 'rgba(244,63,94,0.3)'
                      }}
                    >
                      {isPaused ? (
                        <>Play Campaign</>
                      ) : (
                        <>Pause Campaign</>
                      )}
                    </button>
                    <button
                      onClick={() => alert(`Downloading official PDF GST invoice receipt for ${camp.id}... Done.`)}
                      className="btn-outline"
                      style={{ flex: 1, padding: '8px', fontSize: '0.75rem', justifyContent: 'center' }}
                    >
                      GST Invoice
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 5. Razorpay Checkout Modal Sandbox */}
      {paymentStep !== 'summary' && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(7, 6, 15, 0.85)',
          backdropFilter: 'blur(10px)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px'
        }}>
          {paymentStep === 'gateway' ? (
            /* Razorpay Layout */
            <div className="glass-panel" style={{
              width: '100%',
              maxWidth: '460px',
              padding: '28px',
              border: '1px solid rgba(6, 182, 212, 0.25)',
              background: 'var(--bg-secondary)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}>
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '1px', fontFamily: 'var(--font-mono)' }}>RAZORPAY SECURE GATEWAY</p>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '800' }}>AdNazar Checkout</h3>
                </div>
                <div style={{
                  background: 'linear-gradient(135deg, var(--accent-saffron) 0%, var(--accent-emerald) 100%)',
                  padding: '2px 8px',
                  borderRadius: '6px',
                  fontSize: '0.7rem',
                  fontWeight: '700',
                  color: '#fff'
                }}>
                  RAZORPAY
                </div>
              </div>

              {/* Order total info banner */}
              <div style={{
                padding: '12px 16px',
                background: 'var(--bg-tertiary)',
                borderRadius: '8px',
                border: '1px solid var(--border-glass)',
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.85rem'
              }}>
                <span style={{ color: 'var(--text-secondary)' }}>Amount Payable (Incl GST)</span>
                <span style={{ fontWeight: '800', color: 'var(--accent-cyan)' }}>₹{totalPayable.toLocaleString()}</span>
              </div>

              {/* Payment Tabs selector */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: '8px',
                background: 'var(--bg-primary)',
                padding: '4px',
                borderRadius: '8px',
                border: '1px solid var(--border-glass)'
              }}>
                {['upi', 'card', 'netbanking'].map((method) => (
                  <button
                    key={method}
                    onClick={() => setPaymentMethod(method)}
                    style={{
                      padding: '8px',
                      border: 'none',
                      borderRadius: '6px',
                      background: paymentMethod === method ? 'rgba(99,102,241,0.15)' : 'transparent',
                      color: paymentMethod === method ? 'var(--text-primary)' : 'var(--text-secondary)',
                      fontSize: '0.75rem',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'var(--transition-smooth)'
                    }}
                  >
                    {method.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Method Sandbox content */}
              <div style={{ minHeight: '100px' }}>
                {paymentMethod === 'upi' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <span className="label-text">Enter UPI Virtual Address</span>
                    <input
                      type="text"
                      className="input-field"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="e.g. yourname@okaxis"
                    />
                    <p style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>
                      ⚡ Instant verification with Google Pay, PhonePe, Paytm, or BHIM.
                    </p>
                  </div>
                )}
                {paymentMethod === 'card' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div>
                      <span className="label-text">Cardholder Name</span>
                      <input type="text" className="input-field" placeholder="Amit Sharma" readOnly />
                    </div>
                    <div>
                      <span className="label-text">Card Number</span>
                      <input type="text" className="input-field" placeholder="4532 •••• •••• 8901" readOnly />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      <div>
                        <span className="label-text">Expiry Date</span>
                        <input type="text" className="input-field" placeholder="09/30" readOnly />
                      </div>
                      <div>
                        <span className="label-text">CVV Code</span>
                        <input type="password" className="input-field" placeholder="•••" readOnly />
                      </div>
                    </div>
                  </div>
                )}
                {paymentMethod === 'netbanking' && (
                  <div>
                    <span className="label-text">Select Primary Indian Bank</span>
                    <select className="input-field" style={{ appearance: 'none', background: 'var(--bg-tertiary)' }}>
                      <option style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>State Bank of India (SBI)</option>
                      <option style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>HDFC Bank Ltd</option>
                      <option style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>ICICI Bank</option>
                      <option style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>Axis Bank</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Pay actions */}
              <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                <button
                  className="btn-outline"
                  onClick={() => setPaymentStep('summary')}
                  disabled={isCheckingOut}
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  Cancel
                </button>
                <button
                  className="btn-neon-purple"
                  onClick={submitPayment}
                  disabled={isCheckingOut}
                  style={{ flex: 1.5, justifyContent: 'center' }}
                >
                  {isCheckingOut ? 'Processing UPI API...' : `Pay ₹${totalPayable.toLocaleString()}`}
                </button>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px', fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                <Lock style={{ width: '12px', height: '12px' }} /> PCI-DSS Compliant Gateway Security
              </div>
            </div>
          ) : (
            /* Payment Success Screen */
            <div className="glass-panel" style={{
              width: '100%',
              maxWidth: '460px',
              padding: '32px',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              background: 'var(--bg-secondary)',
              boxShadow: '0 15px 40px rgba(16, 185, 129, 0.15)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: '20px'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'rgba(16, 185, 129, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-emerald)'
              }}>
                <CheckCircle2 style={{ width: '40px', height: '40px' }} />
              </div>

              <div>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', fontWeight: '800' }}>Campaign Launched!</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  Your outdoor advertisement booking has been registered successfully.
                </p>
              </div>

              <div style={{
                width: '100%',
                background: 'var(--bg-tertiary)',
                padding: '16px',
                borderRadius: '12px',
                border: '1px solid var(--border-glass)',
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                fontSize: '0.80rem'
              }}>
                <div style={{ display: 'flex', justify: 'space-between', borderBottom: '1px dashed var(--border-glass)', paddingBottom: '6px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>BOOKING INVOICE ID</span>
                  <span style={{ fontWeight: '700', color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>{bookingId}</span>
                </div>
                <div style={{ display: 'flex', justify: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Hoarding Site</span>
                  <span style={{ fontWeight: '600' }}>{activeBillboard.title}</span>
                </div>
                <div style={{ display: 'flex', justify: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Launch Date</span>
                  <span style={{ fontWeight: '600' }}>{startDate}</span>
                </div>
                <div style={{ display: 'flex', justify: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Duration Term</span>
                  <span style={{ fontWeight: '600' }}>{bookingMonths} {bookingMonths === 1 ? 'Month' : 'Months'}</span>
                </div>
                <div style={{ display: 'flex', justify: 'space-between', borderTop: '1px solid var(--border-glass)', paddingTop: '6px', fontWeight: '700' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Amount Paid (Net)</span>
                  <span style={{ color: 'var(--accent-emerald)' }}>₹{totalPayable.toLocaleString()}</span>
                </div>
              </div>

              <div style={{
                padding: '12px',
                background: 'rgba(99, 102, 241, 0.08)',
                borderRadius: '8px',
                border: '1px solid rgba(99, 102, 241, 0.15)',
                fontSize: '0.75rem',
                color: 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Sparkles style={{ width: '16px', height: '16px', color: 'var(--accent-purple)' }} />
                <span>Next Step: Our team is prepping the vinyl prints! Check Live tracker.</span>
              </div>

              <button
                className="btn-neon-purple"
                onClick={() => {
                  setPaymentStep('summary');
                  setActiveTab('active-campaigns');
                }}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Go to Campaigns Tracker
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
