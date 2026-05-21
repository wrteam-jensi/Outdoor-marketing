'use client';

import React, { useState } from 'react';
import { PlusCircle, Image as ImageIcon, MapPin, DollarSign, BarChart3, Wallet, Sparkles, CheckCircle2, TrendingUp, Landmark, FileText, ArrowRight, Bell, CheckCheck, XCircle, Clock, BarChart2 } from 'lucide-react';

export default function OwnerPortal({ billboards, onAddBillboard }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    city: 'Ahmedabad',
    location: '',
    size: '30x15 ft',
    price: '',
    areaType: 'Highway',
    billboardType: 'Unipole',
    dailyTraffic: '',
    audienceType: 'Professionals & Commuters',
    bestTiming: '08:00 AM - 10:00 PM',
    description: '',
    image: 'https://images.unsplash.com/photo-1541535650810-10d26f5c2ab3?auto=format&fit=crop&w=800&q=80'
  });

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Bank payout states
  const [bankLinked, setBankLinked] = useState(false);
  const [upiHandle, setUpiHandle] = useState('amit@okaxis');
  const [ifscCode, setIfscCode] = useState('HDFC0001234');
  const [showBankSetup, setShowBankSetup] = useState(false);

  // Booking requests mock data
  const [bookingRequests, setBookingRequests] = useState([
    { id: 'REQ-8821', advertiser: 'Rohan Mehta', company: 'UrbanEats India', billboard: 'S.G. Highway Digital Unipole', duration: '2 Months', amount: 150000, status: 'Pending', date: '2026-05-20' },
    { id: 'REQ-7743', advertiser: 'Sneha Patel', company: 'ZenWear Fashion', billboard: 'Juhu Circle Premium Hoarding', duration: '1 Month', amount: 250000, status: 'Pending', date: '2026-05-19' },
    { id: 'REQ-6654', advertiser: 'Kunal Desai', company: 'TechBridge Labs', billboard: 'Gachibowli Ring Road Digital Wall', duration: '3 Months', amount: 450000, status: 'Accepted', date: '2026-05-17' },
  ]);

  const handleRequestAction = (id, action) => {
    setBookingRequests(prev => prev.map(r => r.id === id ? { ...r, status: action === 'accept' ? 'Accepted' : 'Declined' } : r));
  };

  // Monthly earnings for chart (last 6 months)
  const earningsChart = [
    { month: 'Dec', amount: 85000 },
    { month: 'Jan', amount: 110000 },
    { month: 'Feb', amount: 95000 },
    { month: 'Mar', amount: 130000 },
    { month: 'Apr', amount: 120000 },
    { month: 'May', amount: monthlyRevenue || 150000 },
  ];
  const chartMax = Math.max(...earningsChart.map(e => e.amount));
  
  // Financial metrics mock calculations
  const totalListings = billboards.length;
  const activeBookingsCount = billboards.filter(b => b.availability === 'Booked').length;
  const monthlyRevenue = billboards
    .filter(b => b.availability === 'Booked')
    .reduce((sum, b) => sum + b.price, 0) || 150000;
  
  const platformCommission = monthlyRevenue * 0.12; // 12% Platform commission
  const netEarnings = monthlyRevenue - platformCommission;
  const pendingRequests = bookingRequests.filter(r => r.status === 'Pending').length;

  // Handle form field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Mock upload progress
  const triggerImageUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          const mockImages = [
            'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1572248522899-40d874feb91c?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=800&q=80'
          ];
          setFormData(prev => ({ ...prev, image: mockImages[Math.floor(Math.random() * mockImages.length)] }));
          return 100;
        }
        return prev + 25;
      });
    }, 300);
  };

  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.location || !formData.price || !formData.dailyTraffic) {
      alert('Please fill out all fields first!');
      return;
    }

    const newBoard = {
      ...formData,
      id: `bb-custom-${Math.floor(100 + Math.random() * 900)}`,
      price: parseInt(formData.price),
      dailyTraffic: parseInt(formData.dailyTraffic),
      availability: 'Pending Approval',
      visibilityScore: Math.floor(82 + Math.random() * 16),
      reviews: 0,
      bookingCount: 0,
      ownerName: 'Amit Sharma',
      ownerContact: '+91 98765 43210'
    };

    if (onAddBillboard) {
      onAddBillboard(newBoard);
    }

    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setShowAddForm(false);
      // Reset form
      setFormData({
        title: '',
        city: 'Ahmedabad',
        location: '',
        size: '30x15 ft',
        price: '',
        areaType: 'Highway',
        dailyTraffic: '',
        audienceType: 'Professionals & Commuters',
        bestTiming: '08:00 AM - 10:00 PM',
        description: '',
        image: 'https://images.unsplash.com/photo-1541535650810-10d26f5c2ab3?auto=format&fit=crop&w=800&q=80'
      });
    }, 3000);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* 1. Host Dashboard Financial Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '20px'
      }}>
        {/* Metric Card 1 */}
        <div className="glass-panel" style={{
          padding: '24px',
          border: '1px solid var(--border-glass)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'var(--bg-glass)'
        }}>
          <div>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>TOTAL OWNED SITES</p>
            <h3 style={{ fontSize: '1.8rem', fontWeight: '800', marginTop: '6px' }}>{totalListings}</h3>
            <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '4px' }}>Active listings approved on-road</p>
          </div>
          <div style={{
            width: '50px',
            height: '50px',
            borderRadius: '12px',
            background: 'rgba(99, 102, 241, 0.1)',
            color: 'var(--accent-purple)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <BarChart3 style={{ width: '24px', height: '24px' }} />
          </div>
        </div>

        {/* Metric Card 2 */}
        <div className="glass-panel" style={{
          padding: '24px',
          border: '1px solid var(--border-glass)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'var(--bg-glass)'
        }}>
          <div>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>ACTIVE RENTALS</p>
            <h3 style={{ fontSize: '1.8rem', fontWeight: '800', marginTop: '6px', color: 'var(--accent-cyan)' }}>{activeBookingsCount}</h3>
            <p style={{ fontSize: '0.65rem', color: 'var(--accent-cyan)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '3px' }}>
              <TrendingUp style={{ width: '10px', height: '10px' }} /> Occupancy Rate: {((activeBookingsCount / Math.max(1, totalListings)) * 100).toFixed(0)}%
            </p>
          </div>
          <div style={{
            width: '50px',
            height: '50px',
            borderRadius: '12px',
            background: 'rgba(59, 130, 246, 0.1)',
            color: 'var(--accent-cyan)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Wallet style={{ width: '24px', height: '24px' }} />
          </div>
        </div>

        {/* Metric Card 3 */}
        <div className="glass-panel" style={{
          padding: '24px',
          border: '1px solid var(--border-glass)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'var(--bg-glass)'
        }}>
          <div>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>GROSS MONTHLY RENT</p>
            <h3 style={{ fontSize: '1.8rem', fontWeight: '800', marginTop: '6px', color: 'var(--accent-emerald)' }}>₹{monthlyRevenue.toLocaleString()}</h3>
            <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '4px' }}>AdNazar Commission (12%): ₹{platformCommission.toLocaleString()}</p>
          </div>
          <div style={{
            width: '50px',
            height: '50px',
            borderRadius: '12px',
            background: 'rgba(16, 185, 129, 0.1)',
            color: 'var(--accent-emerald)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <DollarSign style={{ width: '24px', height: '24px' }} />
          </div>
        </div>

        {/* Metric Card 4 */}
        <div className="glass-panel" style={{
          padding: '24px',
          border: '1px solid var(--border-glass)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'var(--bg-glass)'
        }}>
          <div>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>NET PAYOUT AVAILABLE</p>
            <h3 style={{ fontSize: '1.8rem', fontWeight: '800', marginTop: '6px', color: 'var(--accent-saffron)' }}>₹{netEarnings.toLocaleString()}</h3>
            <button
              onClick={() => {
                if (!bankLinked) {
                  setShowBankSetup(true);
                } else {
                  alert(`Direct NEFT transfer of ₹${netEarnings.toLocaleString()} initiated to bank account linked with IFSC code: ${ifscCode}. Status: Processing...`);
                }
              }}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--accent-saffron)',
                fontSize: '0.65rem',
                fontWeight: '700',
                textDecoration: 'underline',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '3px',
                marginTop: '4px'
              }}
            >
              <Landmark style={{ width: '10px', height: '10px' }} /> {bankLinked ? 'Request Direct NEFT Payout' : 'Link Payout Bank Account First'}
            </button>
          </div>
          <div style={{
            width: '50px',
            height: '50px',
            borderRadius: '12px',
            background: 'rgba(249, 115, 22, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-saffron)'
          }}>
            <Landmark style={{ width: '24px', height: '24px' }} />
          </div>
        </div>
      </div>

      {/* Bank Account Linking Setup Panel */}
      {showBankSetup && (
        <div className="glass-panel" style={{
          padding: '24px',
          border: '1px solid var(--accent-saffron)',
          background: 'rgba(249, 115, 22, 0.03)'
        }}>
          <h3 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-saffron)' }}>
            <Landmark style={{ width: '18px', height: '18px' }} /> Indian Banking Settlement Setup
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            AdNazar settles payouts directly through IMPS/NEFT transfers. Provide your details below.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            marginTop: '16px'
          }}>
            <div>
              <span className="label-text">IFSC CODE</span>
              <input
                type="text"
                className="input-field"
                value={ifscCode}
                onChange={(e) => setIfscCode(e.target.value.toUpperCase())}
                placeholder="e.g. HDFC0001234"
              />
            </div>
            <div>
              <span className="label-text">SETTLEMENT UPI ID</span>
              <input
                type="text"
                className="input-field"
                value={upiHandle}
                onChange={(e) => setUpiHandle(e.target.value)}
                placeholder="e.g. name@okaxis"
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '16px', justifyContent: 'flex-end' }}>
            <button
              onClick={() => setShowBankSetup(false)}
              className="btn-outline"
              style={{ padding: '8px 16px', fontSize: '0.8rem' }}
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (ifscCode.length < 11 || !upiHandle.includes('@')) {
                  alert('Please enter a valid 11-digit IFSC code and UPI ID.');
                  return;
                }
                setBankLinked(true);
                setShowBankSetup(false);
                alert('Settlement Bank Account successfully linked with AdNazar Node!');
              }}
              className="btn-neon-saffron"
              style={{ padding: '8px 20px', fontSize: '0.8rem' }}
            >
              Verify & Link Account
            </button>
          </div>
        </div>
      )}

      {/* ── BOOKING REQUESTS PANEL ── */}
      <div className="glass-panel" style={{ padding: '24px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)' }}>
              <Bell style={{ color: 'var(--accent-cyan)', width: '18px', height: '18px' }} /> Booking Requests
            </h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '2px' }}>Advertisers who want to book your spaces.</p>
          </div>
          {pendingRequests > 0 && (
            <span className="badge badge-saffron" style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
              <Clock style={{ width: '11px', height: '11px' }} /> {pendingRequests} Pending
            </span>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {bookingRequests.map(req => (
            <div key={req.id} style={{
              display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap',
              padding: '14px 16px', borderRadius: '10px',
              background: req.status === 'Pending' ? 'rgba(99,102,241,0.04)' : req.status === 'Accepted' ? 'rgba(16,185,129,0.04)' : 'rgba(244,63,94,0.04)',
              border: `1px solid ${req.status === 'Pending' ? 'var(--border-glass)' : req.status === 'Accepted' ? 'rgba(16,185,129,0.2)' : 'rgba(244,63,94,0.2)'}`,
            }}>
              {/* Avatar */}
              <div style={{
                width: '38px', height: '38px', borderRadius: '50%', flexShrink: 0,
                background: 'linear-gradient(135deg, var(--accent-purple) 0%, var(--accent-cyan) 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.8rem', fontWeight: '800', color: '#fff'
              }}>
                {req.advertiser.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              {/* Info */}
              <div style={{ flex: 1, minWidth: '200px' }}>
                <p style={{ fontWeight: '700', fontSize: '0.88rem', color: 'var(--text-primary)' }}>{req.advertiser}</p>
                <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>{req.company} · {req.billboard}</p>
                <p style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '2px' }}>{req.duration} · {req.date}</p>
              </div>
              {/* Amount */}
              <div style={{ textAlign: 'right', minWidth: '100px' }}>
                <p style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--accent-emerald)', fontFamily: 'var(--font-mono)' }}>₹{req.amount.toLocaleString()}</p>
                <span className={`badge ${req.status === 'Accepted' ? 'badge-emerald' : req.status === 'Declined' ? 'badge-rose' : 'badge-purple'}`} style={{ fontSize: '0.6rem', marginTop: '4px', display: 'inline-block' }}>
                  {req.status}
                </span>
              </div>
              {/* Actions */}
              {req.status === 'Pending' && (
                <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                  <button onClick={() => handleRequestAction(req.id, 'accept')} className="btn-outline" style={{ padding: '6px 14px', fontSize: '0.75rem', gap: '4px', borderColor: 'rgba(16,185,129,0.4)', color: 'var(--accent-emerald)' }}>
                    <CheckCheck style={{ width: '13px', height: '13px' }} /> Accept
                  </button>
                  <button onClick={() => handleRequestAction(req.id, 'decline')} className="btn-outline" style={{ padding: '6px 14px', fontSize: '0.75rem', gap: '4px', borderColor: 'rgba(244,63,94,0.3)', color: '#fb7185' }}>
                    <XCircle style={{ width: '13px', height: '13px' }} /> Decline
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── EARNINGS CHART ── */}
      <div className="glass-panel" style={{ padding: '24px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)' }}>
        <h3 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', color: 'var(--text-primary)' }}>
          <BarChart2 style={{ color: 'var(--accent-emerald)', width: '18px', height: '18px' }} /> Monthly Earnings (Last 6 Months)
        </h3>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', height: '160px', paddingBottom: '28px', borderBottom: '1px solid var(--border-glass)' }}>
          {earningsChart.map((item, i) => {
            const heightPct = (item.amount / chartMax) * 100;
            const isLatest = i === earningsChart.length - 1;
            return (
              <div key={item.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', height: '100%', justifyContent: 'flex-end', position: 'relative' }}>
                <span style={{ position: 'absolute', top: '-20px', fontSize: '0.6rem', color: isLatest ? 'var(--accent-emerald)' : 'var(--text-muted)', fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap' }}>
                  {i > 0 && item.amount > earningsChart[i-1].amount ? '↑' : ''} ₹{(item.amount/1000).toFixed(0)}K
                </span>
                <div style={{
                  width: '100%', height: `${heightPct}%`,
                  background: isLatest ? 'linear-gradient(180deg, var(--accent-emerald) 0%, rgba(16,185,129,0.3) 100%)' : 'rgba(99,102,241,0.25)',
                  borderRadius: '6px 6px 0 0',
                  border: isLatest ? '1px solid rgba(16,185,129,0.4)' : '1px solid var(--border-glass)',
                  transition: 'height 0.5s ease', minHeight: '4px'
                }} />
                <span style={{ fontSize: '0.65rem', color: isLatest ? 'var(--accent-emerald)' : 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: isLatest ? '700' : '400' }}>{item.month}</span>
              </div>
            );
          })}
        </div>
        <div style={{ display: 'flex', gap: '24px', marginTop: '12px', fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
          <span>Net this month: <strong style={{ color: 'var(--accent-emerald)', fontFamily: 'var(--font-mono)' }}>₹{netEarnings.toLocaleString()}</strong></span>
          <span>Commission (12%): <strong style={{ color: 'var(--accent-saffron)', fontFamily: 'var(--font-mono)' }}>₹{platformCommission.toLocaleString()}</strong></span>
          <span>Trend: <strong style={{ color: 'var(--accent-cyan)' }}>↑ +25% MoM</strong></span>
        </div>
      </div>

      {/* 2. Headline and List Billboard additions trigger */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-mono)' }}>Your Hoarding Spots</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            List, update pricing structures, and manage your outdoor hoarding rentals across major Indian cities.
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(prev => !prev)}
          className="btn-neon-purple"
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <PlusCircle style={{ width: '18px', height: '18px' }} />
          {showAddForm ? 'Close Add Form' : 'Register New Billboard'}
        </button>
      </div>

      {/* 3. Add Billboard Form Panel */}
      {showAddForm && (
        <div className="glass-panel" style={{
          padding: '28px',
          border: '1px solid var(--border-glass)',
          background: 'var(--bg-secondary)',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.4)',
          position: 'relative'
        }}>
          {showSuccess && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'var(--bg-secondary)',
              borderRadius: '16px',
              zIndex: 100,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px',
              textAlign: 'center',
              padding: '24px'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
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
                <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', fontWeight: '800' }}>Listing Submitted!</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  The hoarding spot was successfully registered. Redirecting to approval queue...
                </p>
              </div>
              <span className="badge badge-purple" style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                <Sparkles style={{ width: '12px', height: '12px' }} /> Pending Admin Verification
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--border-glass)', paddingBottom: '12px', color: 'var(--text-primary)' }}>
              🛠️ Hoarding Specification Details
            </h3>

            {/* specification Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '20px'
            }}>
              <div>
                <span className="label-text">Hoarding Title / Name</span>
                <input
                  type="text"
                  name="title"
                  className="input-field"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. S.G. Highway Digital Unipole"
                  required
                />
              </div>

              <div>
                <span className="label-text">Target City</span>
                <select
                  name="city"
                  className="input-field"
                  value={formData.city}
                  onChange={handleChange}
                  style={{ appearance: 'none', background: 'var(--bg-secondary) url("data:image/svg+xml;utf8,<svg fill=\'%2394a3b8\' height=\'24\' viewBox=\'0 0 24 24\' width=\'24\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M7 10l5 5 5-5z\'/><path d=\'M0 0h24v24H0z\' fill=\'none\'/></svg>") no-repeat 95% center' }}
                >
                  {['Ahmedabad', 'Mumbai', 'Delhi-NCR', 'Bangalore', 'Pune', 'Hyderabad', 'Chennai', 'Kolkata'].map(c => (
                    <option key={c} value={c} style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <span className="label-text">Detailed Road Location</span>
                <input
                  type="text"
                  name="location"
                  className="input-field"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Near Iscon Cross Road, S.G. Highway"
                  required
                />
              </div>

              <div>
                <span className="label-text">Dimensions (Size)</span>
                <input
                  type="text"
                  name="size"
                  className="input-field"
                  value={formData.size}
                  onChange={handleChange}
                  placeholder="e.g. 30x15 ft"
                  required
                />
              </div>

              <div>
                <span className="label-text">Monthly Rental Price (₹ INR)</span>
                <input
                  type="number"
                  name="price"
                  className="input-field"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="e.g. 75000"
                  required
                />
              </div>

              <div>
                <span className="label-text">Daily Vehicle Traffic Estimate</span>
                <input
                  type="number"
                  name="dailyTraffic"
                  className="input-field"
                  value={formData.dailyTraffic}
                  onChange={handleChange}
                  placeholder="e.g. 145000"
                  required
                />
              </div>

              <div>
                <span className="label-text">Area Category / Landmark</span>
                <select
                  name="areaType"
                  className="input-field"
                  value={formData.areaType}
                  onChange={handleChange}
                  style={{ appearance: 'none', background: 'var(--bg-secondary) url("data:image/svg+xml;utf8,<svg fill=\'%2394a3b8\' height=\'24\' viewBox=\'0 0 24 24\' width=\'24\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M7 10l5 5 5-5z\'/><path d=\'M0 0h24v24H0z\' fill=\'none\'/></svg>") no-repeat 95% center' }}
                >
                  {['Highway', 'Market Area', 'IT Park / Commercial', 'School / College Area', 'Residential'].map(a => (
                    <option key={a} value={a} style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>{a}</option>
                  ))}
                </select>
              </div>

              <div>
                <span className="label-text">Billboard Type</span>
                <select
                  name="billboardType"
                  className="input-field"
                  value={formData.billboardType}
                  onChange={handleChange}
                  style={{ appearance: 'none', background: 'var(--bg-secondary) url("data:image/svg+xml;utf8,<svg fill=\'%2394a3b8\' height=\'24\' viewBox=\'0 0 24 24\' width=\'24\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M7 10l5 5 5-5z\'/><path d=\'M0 0h24v24H0z\' fill=\'none\'/></svg>") no-repeat 95% center' }}
                >
                  {['Unipole', 'Hoarding', 'Digital LED'].map(t => (
                    <option key={t} value={t} style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <span className="label-text">Audience Demographic</span>
                <input
                  type="text"
                  name="audienceType"
                  className="input-field"
                  value={formData.audienceType}
                  onChange={handleChange}
                  placeholder="e.g. IT Professionals & Shoppers"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <span className="label-text">Site Description / Value Proposition</span>
              <textarea
                name="description"
                className="input-field"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe why this billboard has great visibility, surrounding landmarks, visual range, angles..."
                rows="3"
                style={{ resize: 'vertical' }}
              />
            </div>

            {/* Photo Uploader Simulation */}
            <div>
              <span className="label-text">Upload Billboard Frame Photo</span>
              <div style={{
                display: 'flex',
                gap: '16px',
                alignItems: 'center',
                background: 'rgba(255, 255, 255, 0.02)',
                padding: '16px',
                borderRadius: '10px',
                border: '1px solid var(--border-glass)'
              }}>
                <button
                  type="button"
                  onClick={triggerImageUpload}
                  disabled={isUploading}
                  className="btn-outline"
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', fontSize: '0.8rem' }}
                >
                  <ImageIcon style={{ width: '16px', height: '16px' }} />
                  {isUploading ? 'Uploading...' : 'Select Site Image'}
                </button>
                
                {isUploading ? (
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                      <span>Progress</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '999px', overflow: 'hidden' }}>
                      <div style={{ width: `${uploadProgress}%`, height: '100%', background: 'var(--accent-purple)', borderRadius: '999px' }} />
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <img
                      src={formData.image}
                      alt="Uploaded frame preview"
                      style={{ width: '80px', height: '40px', objectFit: 'cover', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)' }}
                    />
                    <span style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)' }}>✓ Ready (Standard Mock Loaded)</span>
                  </div>
                )}
              </div>
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', borderTop: '1px solid var(--border-glass)', paddingTop: '16px' }}>
              <button
                type="button"
                className="btn-outline"
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-neon-purple"
              >
                Submit Billboard for Verification
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 4. Active Sites Table & Cards List */}
      <div className="glass-panel" style={{
        padding: '24px',
        border: '1px solid var(--border-glass)',
        background: 'var(--bg-glass)'
      }}>
        <h3 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-mono)', borderBottom: '1px solid var(--border-glass)', paddingBottom: '12px', marginBottom: '16px', color: 'var(--text-primary)' }}>
          Site Portfolio & Operational Status
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {billboards.map((board) => {
            return (
              <div
                key={board.id}
                className="glass-panel-hover"
                style={{
                  background: 'rgba(23, 21, 43, 0.4)',
                  border: '1px solid var(--border-glass)',
                  borderRadius: '12px',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}
              >
                {/* Image */}
                <div style={{ width: '100%', height: '110px', overflow: 'hidden', borderRadius: '8px', position: 'relative' }}>
                  <img src={board.image} alt={board.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: '8px', right: '8px' }}>
                    <span className={`badge ${
                      board.availability === 'Available' ? 'badge-emerald' : 
                      board.availability === 'Booked' ? 'badge-cyan' : 'badge-purple'
                    }`}>
                      {board.availability}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div>
                  <p style={{ fontSize: '0.7rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>📍 {board.city.toUpperCase()}</p>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginTop: '2px', color: 'var(--text-primary)' }}>{board.title}</h4>
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '2px' }}>{board.location}</p>
                </div>

                {/* Specs */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '8px',
                  fontSize: '0.75rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                  paddingTop: '8px'
                }}>
                  <div>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.65rem' }}>SIZE</span>
                    <p style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{board.size}</p>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.65rem' }}>MONTHLY RATE</span>
                    <p style={{ fontWeight: '700', color: 'var(--accent-emerald)' }}>₹{board.price.toLocaleString()}</p>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.65rem' }}>DAILY TRAFFIC</span>
                    <p style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{board.dailyTraffic.toLocaleString()}</p>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.65rem' }}>VISIBILITY</span>
                    <p style={{ fontWeight: '700', color: '#fbbf24' }}>⭐ {board.visibilityScore}%</p>
                  </div>
                </div>

                {/* Action button */}
                <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                  <button
                    onClick={() => alert(`Operational details for ${board.title} (Daily occupancy logs verified, structure status: Fit).`)}
                    className="btn-outline"
                    style={{ flex: 1, padding: '6px 12px', fontSize: '0.7rem', justifyContent: 'center' }}
                  >
                    View Logs
                  </button>
                  <button
                    onClick={() => {
                      const newPrice = prompt(`Enter new monthly rental price (INR ₹) for ${board.title}:`, board.price);
                      if (newPrice && !isNaN(newPrice)) {
                        alert(`Pricing updated to ₹${parseInt(newPrice).toLocaleString()}/month. Pending sync.`);
                      }
                    }}
                    className="btn-outline"
                    style={{ flex: 1, padding: '6px 12px', fontSize: '0.7rem', justifyContent: 'center', borderColor: 'var(--accent-purple)', color: 'var(--accent-purple)' }}
                  >
                    Edit Price
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
