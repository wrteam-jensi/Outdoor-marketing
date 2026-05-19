'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AdvertiserPortal from '@/components/AdvertiserPortal';
import OwnerPortal from '@/components/OwnerPortal';
import AdminPortal from '@/components/AdminPortal';
import { INITIAL_BILLBOARDS } from '@/utils/mockData';
import { Sparkles, BarChart2, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function Home() {
  const [activePortal, setActivePortal] = useState('advertiser');
  const [billboards, setBillboards] = useState(INITIAL_BILLBOARDS);
  
  // Security Authentication states
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);
  const [showAdminAuth, setShowAdminAuth] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');

  // Lock session or open auth passcode prompt
  const handleLockToggle = () => {
    if (isAdminUnlocked) {
      setIsAdminUnlocked(false);
      if (activePortal === 'admin') {
        setActivePortal('advertiser');
      }
    } else {
      setShowAdminAuth(true);
    }
  };

  // Submit passcode
  const handleAuthSubmit = () => {
    if (passcode.toLowerCase() === 'admin' || passcode === 'admin123') {
      setIsAdminUnlocked(true);
      setShowAdminAuth(false);
      setActivePortal('admin');
      setPasscode('');
      setError('');
    } else {
      setError('ACCESS DENIED: Invalid passcode key.');
    }
  };

  // Seed initial ledger bookings so admin starts with beautiful stats
  const [bookings, setBookings] = useState([
    {
      id: 'ADV-592031',
      boardTitle: 'Cyber Hub Entrance Mega Board',
      city: 'Delhi-NCR',
      totalPaid: 213388, // rental + print fee + GST
      status: 'Secured'
    },
    {
      id: 'ADV-402915',
      boardTitle: 'Koramangala 80ft Road Junction',
      city: 'Bangalore',
      totalPaid: 112088,
      status: 'Secured'
    }
  ]);

  // Advertiser hooks: book billboard
  const handleBookBillboard = (boardId, generatedBookingId) => {
    setBillboards(prev =>
      prev.map(b => (b.id === boardId ? { ...b, availability: 'Booked' } : b))
    );

    const bookedBoard = billboards.find(b => b.id === boardId);
    if (bookedBoard) {
      // Create ledger transaction row
      const gstRate = 0.18;
      const subtotal = bookedBoard.price + 4000; // price + standard mounting
      const totalPaid = subtotal + subtotal * gstRate;

      setBookings(prev => [
        {
          id: generatedBookingId,
          boardTitle: bookedBoard.title,
          city: bookedBoard.city,
          totalPaid: Math.floor(totalPaid),
          status: 'Secured'
        },
        ...prev
      ]);
    }
  };

  // Owner hooks: add new billboard pending approval
  const handleAddBillboard = (newBoard) => {
    setBillboards(prev => [...prev, newBoard]);
  };

  // Admin hooks: approve billboard
  const handleApproveBillboard = (boardId) => {
    setBillboards(prev =>
      prev.map(b => (b.id === boardId ? { ...b, availability: 'Available' } : b))
    );
  };

  // Admin hooks: reject/delete billboard
  const handleRejectBillboard = (boardId) => {
    setBillboards(prev => prev.filter(b => b.id !== boardId));
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      
      {/* Immersive Header Navigation */}
      <Navbar 
        activePortal={activePortal} 
        setActivePortal={setActivePortal} 
        isAdminUnlocked={isAdminUnlocked}
        onLockToggle={handleLockToggle}
      />

      {/* Main Container */}
      <main style={{ flex: 1, padding: '0 24px', maxWidth: '1440px', margin: '0 auto', width: '100%' }}>
        
        {/* Advertiser Portal View */}
        {activePortal === 'advertiser' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            
            {/* Startup Banner Hero Section */}
            <div className="glass-panel" style={{
              padding: '48px 32px',
              border: '1px solid var(--border-glass)',
              background: 'radial-gradient(circle at 80% 20%, rgba(6,182,212,0.08) 0%, transparent 60%), radial-gradient(circle at 10% 80%, rgba(124,58,237,0.08) 0%, transparent 60%), rgba(255, 255, 255, 0.75)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: '20px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Subtle design accents */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'linear-gradient(90deg, var(--accent-purple) 0%, var(--accent-cyan) 100%)'
              }} />

              <span className="badge badge-purple" style={{ display: 'inline-flex', gap: '6px', alignItems: 'center' }}>
                <Sparkles style={{ width: '12px', height: '12px' }} /> Next-Generation OOH Marketplace
              </span>

              <h2 style={{ fontSize: '2.5rem', fontWeight: '800', maxWidth: '800px', lineHeight: '1.2' }}>
                Revolutionizing <span className="text-gradient">Outdoor Advertising</span> Across India
              </h2>
              
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', maxWidth: '650px' }}>
                Discover premium roadside unipoles, create stunning campaign graphics in our layout studio, and preview them instantly in standard 3D simulated night highways before booking.
              </p>

              {/* Counter details */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '24px',
                width: '100%',
                maxWidth: '750px',
                marginTop: '16px',
                borderTop: '1px solid var(--border-glass)',
                paddingTop: '28px'
              }}>
                <div>
                  <h4 style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--accent-cyan)' }}>1.2M+</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>DAILY VEHICLE IMPRESSIONS</p>
                </div>
                <div>
                  <h4 style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--accent-purple)' }}>100%</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>3D PREVIEW SIMULATION</p>
                </div>
                <div>
                  <h4 style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--accent-emerald)' }}>6+ Cities</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>MAJOR METRO DENSITIES</p>
                </div>
                <div>
                  <h4 style={{ fontSize: '1.6rem', fontWeight: '800' }}>₹0 Fee</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>LISTINGS REGISTRATION</p>
                </div>
              </div>
            </div>

            {/* Main interactive Advertiser application workflows */}
            <AdvertiserPortal
              billboards={billboards}
              onBookBillboard={handleBookBillboard}
            />
          </div>
        )}

        {/* Billboard Host Portal View */}
        {activePortal === 'owner' && (
          <OwnerPortal
            billboards={billboards}
            onAddBillboard={handleAddBillboard}
          />
        )}

        {/* Administration Platform Control View */}
        {activePortal === 'admin' && isAdminUnlocked && (
          <AdminPortal
            billboards={billboards}
            bookings={bookings}
            onApproveBillboard={handleApproveBillboard}
            onRejectBillboard={handleRejectBillboard}
          />
        )}

      </main>

      {/* Admin security verification modal */}
      {showAdminAuth && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.4)',
          backdropFilter: 'blur(20px)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px'
        }}>
          <div className="glass-panel animate-fade-in" style={{
            width: '100%',
            maxWidth: '420px',
            padding: '36px',
            border: '1px solid rgba(124, 58, 237, 0.2)',
            background: 'rgba(255, 255, 255, 0.98)',
            boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.1), var(--shadow-neon-purple)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '24px'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(124, 58, 237, 0.08)',
              border: '1px solid rgba(124, 58, 237, 0.2)',
              color: 'var(--accent-purple)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(124, 58, 237, 0.1)'
            }}>
              <ShieldAlert style={{ width: '32px', height: '32px' }} />
            </div>

            <div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: '800', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>Security Authorization</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '6px' }}>
                Enter the administrative key code to unlock the core system ledger.
              </p>
            </div>

            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'left' }}>
              <span className="label-text">ADMIN PASSCODE</span>
              <input
                type="password"
                className="input-field"
                placeholder="••••••••"
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  setError('');
                }}
                style={{
                  textAlign: 'center',
                  fontSize: '1.2rem',
                  letterSpacing: '0.2em',
                  fontFamily: 'monospace'
                }}
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleAuthSubmit();
                }}
              />
              {error && (
                <p style={{ color: 'var(--accent-rose)', fontSize: '0.75rem', textAlign: 'center', marginTop: '4px', fontWeight: '600' }}>
                  {error}
                </p>
              )}
            </div>

            <div style={{ display: 'flex', gap: '12px', width: '100%', marginTop: '8px' }}>
              <button
                onClick={() => {
                  setShowAdminAuth(false);
                  setPasscode('');
                  setError('');
                }}
                className="btn-outline"
                style={{ flex: 1, justifyContent: 'center', padding: '10px' }}
              >
                Cancel
              </button>
              <button
                onClick={handleAuthSubmit}
                className="btn-neon-purple"
                style={{ flex: 1.5, justifyContent: 'center', padding: '10px' }}
              >
                Authorize
              </button>
            </div>
            
            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              Hint: use <strong style={{ color: 'var(--accent-purple)' }}>admin</strong> to authenticate
            </p>
          </div>
        </div>
      )}

      {/* Common beautiful footer */}
      <Footer />
    </div>
  );
}
