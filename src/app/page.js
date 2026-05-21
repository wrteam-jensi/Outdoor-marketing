'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LandingPage from '@/components/LandingPage';
import AuthModal from '@/components/AuthModal';
import AdvertiserPortal from '@/components/AdvertiserPortal';
import OwnerPortal from '@/components/OwnerPortal';
import AdminPortal from '@/components/AdminPortal';
import { INITIAL_BILLBOARDS } from '@/utils/mockData';
import { ShieldAlert } from 'lucide-react';

export default function Home() {
  // ── View orchestration ──
  const [view, setView] = useState('landing'); // 'landing' | 'app'
  const [currentUser, setCurrentUser] = useState(null); // { name, email, phone, role }
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authDefaultRole, setAuthDefaultRole] = useState('advertiser');

  // ── Portal state (only relevant when view === 'app') ──
  const [activePortal, setActivePortal] = useState('advertiser');
  const [billboards, setBillboards] = useState(INITIAL_BILLBOARDS);

  // ── Theme ──
  const [theme, setTheme] = useState('dark');
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme]);
  const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));

  // ── Admin auth ──
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);
  const [showAdminAuth, setShowAdminAuth] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [adminError, setAdminError] = useState('');

  const handleLockToggle = () => {
    if (isAdminUnlocked) {
      setIsAdminUnlocked(false);
      if (activePortal === 'admin') setActivePortal(currentUser?.role === 'host' ? 'owner' : 'advertiser');
    } else {
      setShowAdminAuth(true);
    }
  };

  const handleAdminAuthSubmit = () => {
    if (passcode.toLowerCase() === 'admin' || passcode === 'admin123') {
      setIsAdminUnlocked(true);
      setShowAdminAuth(false);
      setActivePortal('admin');
      setPasscode('');
      setAdminError('');
    } else {
      setAdminError('ACCESS DENIED: Invalid passcode key.');
    }
  };

  // ── Auth handlers ──
  const handleShowAuth = (role = 'advertiser') => {
    setAuthDefaultRole(role);
    setShowAuthModal(true);
  };

  const handleLogin = (user) => {
    setCurrentUser(user);
    setShowAuthModal(false);
    setView('app');
    setActivePortal(user.role === 'host' ? 'owner' : 'advertiser');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAdminUnlocked(false);
    setView('landing');
    setActivePortal('advertiser');
  };

  const handleGoHome = () => {
    if (currentUser) {
      // Logged in — go to their dashboard
      setView('app');
    } else {
      setView('landing');
    }
  };

  // ── Bookings state ──
  const [bookings, setBookings] = useState([
    { id: 'ADN-592031', boardTitle: 'Cyber Hub Entrance Mega Board', city: 'Delhi-NCR', totalPaid: 213388, status: 'Secured' },
    { id: 'ADN-402915', boardTitle: 'Koramangala 80ft Road Junction', city: 'Bangalore', totalPaid: 112088, status: 'Secured' }
  ]);

  // ── Billboard hooks ──
  const handleBookBillboard = (boardId, generatedBookingId) => {
    setBillboards(prev => prev.map(b => b.id === boardId ? { ...b, availability: 'Booked' } : b));
    const bookedBoard = billboards.find(b => b.id === boardId);
    if (bookedBoard) {
      const subtotal = bookedBoard.price + 4000;
      const totalPaid = subtotal + subtotal * 0.18;
      setBookings(prev => [{ id: generatedBookingId, boardTitle: bookedBoard.title, city: bookedBoard.city, totalPaid: Math.floor(totalPaid), status: 'Secured' }, ...prev]);
    }
  };

  const handleAddBillboard = (newBoard) => setBillboards(prev => [...prev, newBoard]);
  const handleApproveBillboard = (boardId) => setBillboards(prev => prev.map(b => b.id === boardId ? { ...b, availability: 'Available' } : b));
  const handleRejectBillboard = (boardId) => setBillboards(prev => prev.filter(b => b.id !== boardId));

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>

      {/* Navbar — always visible */}
      <Navbar
        activePortal={activePortal}
        setActivePortal={setActivePortal}
        isAdminUnlocked={isAdminUnlocked}
        onLockToggle={handleLockToggle}
        theme={theme}
        onThemeToggle={toggleTheme}
        currentUser={currentUser}
        onLogout={handleLogout}
        onShowAuth={handleShowAuth}
        view={view}
        onGoHome={handleGoHome}
      />

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          onLogin={handleLogin}
          defaultRole={authDefaultRole}
        />
      )}

      {/* Admin Security Auth Modal */}
      {showAdminAuth && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(7,6,15,0.85)', backdropFilter: 'blur(20px)',
          zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px'
        }}>
          <div className="glass-panel" style={{
            width: '100%', maxWidth: '420px', padding: '36px',
            border: '1px solid var(--border-glass)', background: 'var(--bg-secondary)',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '24px'
          }}>
            <div style={{
              width: '64px', height: '64px', borderRadius: '50%',
              background: 'rgba(99,102,241,0.1)', border: '1px solid var(--border-glass)',
              color: 'var(--accent-purple)', display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <ShieldAlert style={{ width: '32px', height: '32px' }} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: '800', letterSpacing: '-0.02em' }}>Security Authorization</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '6px' }}>Enter the administrative key code to unlock the core system ledger.</p>
            </div>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'left' }}>
              <span className="label-text">ADMIN PASSCODE</span>
              <input
                type="password"
                className="input-field"
                placeholder="••••••••"
                value={passcode}
                onChange={e => { setPasscode(e.target.value); setAdminError(''); }}
                style={{ textAlign: 'center', fontSize: '1.2rem', letterSpacing: '0.2em', fontFamily: 'monospace' }}
                autoFocus
                onKeyDown={e => { if (e.key === 'Enter') handleAdminAuthSubmit(); }}
              />
              {adminError && <p style={{ color: 'var(--accent-rose)', fontSize: '0.75rem', textAlign: 'center', fontWeight: '600' }}>{adminError}</p>}
            </div>
            <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
              <button onClick={() => { setShowAdminAuth(false); setPasscode(''); setAdminError(''); }} className="btn-outline" style={{ flex: 1, justifyContent: 'center', padding: '10px' }}>Cancel</button>
              <button onClick={handleAdminAuthSubmit} className="btn-neon-purple" style={{ flex: 1.5, justifyContent: 'center', padding: '10px' }}>Authorize</button>
            </div>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              Hint: use <strong style={{ color: 'var(--accent-purple)' }}>admin</strong> to authenticate
            </p>
          </div>
        </div>
      )}

      {/* ── LANDING VIEW ── */}
      {view === 'landing' && (
        <main className="animate-fade-in" style={{ flex: 1 }}>
          <LandingPage onShowAuth={handleShowAuth} />
        </main>
      )}

      {/* ── APP (DASHBOARD) VIEW ── */}
      {view === 'app' && (
        <main className="animate-fade-in" style={{ flex: 1, padding: '24px', maxWidth: '1440px', margin: '0 auto', width: '100%' }}>

          {/* Advertiser Portal */}
          {activePortal === 'advertiser' && (
            <AdvertiserPortal
              billboards={billboards}
              bookings={bookings}
              onBookBillboard={handleBookBillboard}
              theme={theme}
              currentUser={currentUser}
            />
          )}

          {/* Host Portal */}
          {activePortal === 'owner' && (
            <OwnerPortal
              billboards={billboards}
              onAddBillboard={handleAddBillboard}
            />
          )}

          {/* Admin Portal */}
          {activePortal === 'admin' && isAdminUnlocked && (
            <AdminPortal
              billboards={billboards}
              bookings={bookings}
              onApproveBillboard={handleApproveBillboard}
              onRejectBillboard={handleRejectBillboard}
            />
          )}
        </main>
      )}

      <Footer />
    </div>
  );
}
