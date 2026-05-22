'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LandingPage from '@/components/LandingPage';
import AuthModal from '@/components/AuthModal';
import AdvertiserPortal from '@/components/AdvertiserPortal';
import OwnerPortal from '@/components/OwnerPortal';
import PosterStudioPage from '@/components/PosterStudioPage';
import { INITIAL_BILLBOARDS } from '@/utils/mockData';

export default function Home() {
  // ── View orchestration ──
  const [view, setView] = useState('landing'); // 'landing' | 'studio' | 'app'
  const [currentUser, setCurrentUser] = useState(null); // { name, email, phone, role }
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authDefaultRole, setAuthDefaultRole] = useState('advertiser');

  // ── Portal state ──
  const [activePortal, setActivePortal] = useState('advertiser');
  const [billboards, setBillboards] = useState(INITIAL_BILLBOARDS);

  // ── Become-a-Host upgrade flow ──
  const [hostUpgradeStatus, setHostUpgradeStatus] = useState(null); // null | 'pending' | 'approved'

  const handleRequestHostUpgrade = () => {
    setHostUpgradeStatus('pending');
    setTimeout(() => setHostUpgradeStatus('approved'), 4000);
  };

  const handleUpgradeToHost = () => {
    setCurrentUser(prev => ({ ...prev, role: 'host' }));
    setActivePortal('owner');
    setHostUpgradeStatus(null);
  };

  // ── Pre-loaded design state from standalone studio ──
  const [preLoadedPoster, setPreLoadedPoster] = useState('');

  // ── Theme ──
  const [theme, setTheme] = useState('light');
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme]);
  const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));

  // ── Auth handlers ──
  const handleShowAuth = (role = 'advertiser') => {
    setAuthDefaultRole(role);
    setShowAuthModal(true);
  };

  const handleLogin = (user) => {
    setCurrentUser(user);
    setShowAuthModal(false);
    
    // If user designed a poster and logs in, deploy it directly to Advertiser Hub
    if (user.role === 'advertiser' && preLoadedPoster) {
      setView('app');
      setActivePortal('advertiser');
    } else {
      setView('app');
      setActivePortal(user.role === 'host' ? 'owner' : 'advertiser');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setPreLoadedPoster('');
    setView('landing');
    setActivePortal('advertiser');
    setHostUpgradeStatus(null);
  };

  const handleGoHome = () => {
    if (currentUser) {
      setView('app');
      setActivePortal(currentUser.role === 'host' ? 'owner' : 'advertiser');
    } else {
      setView('landing');
    }
  };

  const handleNavigate = (targetView, portalKey = null) => {
    setView(targetView);
    if (portalKey) {
      setActivePortal(portalKey);
    }
  };

  const handleDeployPoster = (posterUrl) => {
    setPreLoadedPoster(posterUrl);
    setView('app');
    setActivePortal('advertiser');
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
      setBookings(prev => [{
        id: generatedBookingId,
        boardTitle: bookedBoard.title,
        city: bookedBoard.city,
        totalPaid: Math.floor(totalPaid),
        status: 'Secured'
      }, ...prev]);
    }
  };

  const handleAddBillboard = (newBoard) => setBillboards(prev => [...prev, newBoard]);

  // Compute active key for navbar highlight
  const navbarActiveKey = view === 'studio' ? 'studio' : (view === 'app' ? activePortal : 'landing');

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      <Navbar
        navbarActiveKey={navbarActiveKey}
        onNavigate={handleNavigate}
        theme={theme}
        onThemeToggle={toggleTheme}
        currentUser={currentUser}
        onLogout={handleLogout}
        onShowAuth={handleShowAuth}
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

      {/* ── LANDING VIEW ── */}
      {view === 'landing' && (
        <main className="animate-fade-in" style={{ flex: 1 }}>
          <LandingPage onShowAuth={handleShowAuth} />
        </main>
      )}

      {/* ── STANDALONE CREATIVE STUDIO VIEW ── */}
      {view === 'studio' && (
        <main className="animate-fade-in main-content" style={{ flex: 1 }}>
          <PosterStudioPage
            theme={theme}
            currentUser={currentUser}
            onShowAuth={handleShowAuth}
            onDeployPoster={handleDeployPoster}
          />
        </main>
      )}

      {/* ── APP DASHBOARD VIEW ── */}
      {view === 'app' && (
        <main className="animate-fade-in main-content" style={{ flex: 1 }}>

          {/* Advertiser Portal */}
          {activePortal === 'advertiser' && (
            <AdvertiserPortal
              billboards={billboards}
              bookings={bookings}
              onBookBillboard={handleBookBillboard}
              theme={theme}
              currentUser={currentUser}
              preLoadedPoster={preLoadedPoster}
              clearPreLoadedPoster={() => setPreLoadedPoster('')}
              hostUpgradeStatus={hostUpgradeStatus}
              onRequestHostUpgrade={handleRequestHostUpgrade}
              onUpgradeToHost={handleUpgradeToHost}
            />
          )}

          {/* Host Portal */}
          {activePortal === 'owner' && (
            <OwnerPortal
              billboards={billboards}
              onAddBillboard={handleAddBillboard}
            />
          )}

        </main>
      )}

      <Footer />
    </div>
  );
}
