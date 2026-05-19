'use client';

import React, { useState } from 'react';
import { PlusCircle, Image as ImageIcon, MapPin, DollarSign, BarChart3, Wallet, Sparkles, CheckCircle2, TrendingUp, Landmark } from 'lucide-react';

export default function OwnerPortal({ billboards, onAddBillboard }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
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

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Financial metrics mock calculations
  const totalListings = billboards.length;
  const activeBookingsCount = billboards.filter(b => b.availability === 'Booked').length;
  const monthlyRevenue = billboards
    .filter(b => b.availability === 'Booked')
    .reduce((sum, b) => sum + b.price, 0);
  
  const platformCommission = monthlyRevenue * 0.12; // 12% Platform commission
  const netEarnings = monthlyRevenue - platformCommission;

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
          // Set a random high-quality billboard image as standard placeholder
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
      availability: 'Pending Approval', // Status is initially pending
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
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
          alignItems: 'center'
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
            background: 'rgba(124, 58, 237, 0.1)',
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
          alignItems: 'center'
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
            background: 'rgba(6, 182, 212, 0.1)',
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
          alignItems: 'center'
        }}>
          <div>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>GROSS MONTHLY RENT</p>
            <h3 style={{ fontSize: '1.8rem', fontWeight: '800', marginTop: '6px', color: 'var(--accent-emerald)' }}>₹{monthlyRevenue.toLocaleString()}</h3>
            <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '4px' }}>AdVantage Commission (12%): ₹{platformCommission.toLocaleString()}</p>
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
          alignItems: 'center'
        }}>
          <div>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>NET PAYOUT COMPLETED</p>
            <h3 style={{ fontSize: '1.8rem', fontWeight: '800', marginTop: '6px' }}>₹{netEarnings.toLocaleString()}</h3>
            <button
              onClick={() => alert(`Initiating direct NEFT/IMPS payout of ₹${netEarnings.toLocaleString()} to HDFC Bank A/c •••• 5690.`)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--accent-purple)',
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
              <Landmark style={{ width: '10px', height: '10px' }} /> Request Instant Withdrawal
            </button>
          </div>
          <div style={{
            width: '50px',
            height: '50px',
            borderRadius: '12px',
            background: 'rgba(15, 23, 42, 0.03)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Landmark style={{ width: '24px', height: '24px', color: 'var(--text-secondary)' }} />
          </div>
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
          <h2 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-mono)' }}>Hoarding Site Listings</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            List, update pricing calendars, and register billboard slots inside the Marketplace system.
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
          border: '1px solid rgba(124, 58, 237, 0.15)',
          background: '#ffffff',
          boxShadow: '0 10px 40px rgba(15, 23, 42, 0.08)',
          position: 'relative'
        }}>
          {showSuccess && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: '#ffffff',
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
            <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--border-glass)', paddingBottom: '12px' }}>
              🛠️ Hoarding Specification Form
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
                  style={{ appearance: 'none', background: 'var(--bg-secondary) url("data:image/svg+xml;utf8,<svg fill=\'%23475569\' height=\'24\' viewBox=\'0 0 24 24\' width=\'24\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M7 10l5 5 5-5z\'/><path d=\'M0 0h24v24H0z\' fill=\'none\'/></svg>") no-repeat 95% center' }}
                >
                  {['Ahmedabad', 'Mumbai', 'Delhi-NCR', 'Bangalore', 'Pune', 'Hyderabad'].map(c => (
                    <option key={c} value={c} style={{ background: '#ffffff', color: 'var(--text-primary)' }}>{c}</option>
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
                  style={{ appearance: 'none', background: 'var(--bg-secondary) url("data:image/svg+xml;utf8,<svg fill=\'%23475569\' height=\'24\' viewBox=\'0 0 24 24\' width=\'24\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M7 10l5 5 5-5z\'/><path d=\'M0 0h24v24H0z\' fill=\'none\'/></svg>") no-repeat 95% center' }}
                >
                  {['Highway', 'Market Area', 'IT Park / Commercial', 'School / College Area', 'Residential'].map(a => (
                    <option key={a} value={a} style={{ background: '#ffffff', color: 'var(--text-primary)' }}>{a}</option>
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
                background: 'rgba(15, 23, 42, 0.03)',
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
                    <div style={{ width: '100%', height: '6px', background: 'rgba(15,23,42,0.05)', borderRadius: '999px', overflow: 'hidden' }}>
                      <div style={{ width: `${uploadProgress}%`, height: '100%', background: 'var(--accent-purple)', borderRadius: '999px' }} />
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <img
                      src={formData.image}
                      alt="Uploaded frame preview"
                      style={{ width: '80px', height: '40px', objectFit: 'cover', borderRadius: '4px', border: '1px solid rgba(15,23,42,0.1)' }}
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
                Submit Billboard for Admin Review
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 4. Active Sites Table & Cards List */}
      <div className="glass-panel" style={{
        padding: '24px',
        border: '1px solid var(--border-glass)'
      }}>
        <h3 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-mono)', borderBottom: '1px solid var(--border-glass)', paddingBottom: '12px', marginBottom: '16px' }}>
          Site Portfolio & Operational Ratios
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {billboards.map((board) => {
            const isApproved = board.availability !== 'Pending Approval';
            return (
              <div
                key={board.id}
                className="glass-panel-hover"
                style={{
                  background: 'rgba(255, 255, 255, 0.55)',
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
                  <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginTop: '2px' }}>{board.title}</h4>
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '2px' }}>{board.location}</p>
                </div>

                {/* Specs */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '8px',
                  fontSize: '0.75rem',
                  borderTop: '1px solid rgba(15, 23, 42, 0.05)',
                  paddingTop: '8px'
                }}>
                  <div>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.65rem' }}>SIZE</span>
                    <p style={{ fontWeight: '600' }}>{board.size}</p>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.65rem' }}>MONTHLY RATE</span>
                    <p style={{ fontWeight: '700', color: 'var(--accent-emerald)' }}>₹{board.price.toLocaleString()}</p>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.65rem' }}>DAILY TRAFFIC</span>
                    <p style={{ fontWeight: '600' }}>{board.dailyTraffic.toLocaleString()}</p>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.65rem' }}>VISIBILITY</span>
                    <p style={{ fontWeight: '700', color: '#fbbf24' }}>⭐ {board.visibilityScore}%</p>
                  </div>
                </div>

                {/* Action button */}
                <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                  <button
                    onClick={() => alert(`Operational details for ${board.title} (Daily occupancy log sheet, mounting check, structures status: Good).`)}
                    className="btn-outline"
                    style={{ flex: 1, padding: '6px 12px', fontSize: '0.7rem', justifyContent: 'center' }}
                  >
                    View Logs
                  </button>
                  <button
                    onClick={() => alert(`Modify pricing calendars/terms for ${board.title}. Current monthly price is ₹${board.price.toLocaleString()}.`)}
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
