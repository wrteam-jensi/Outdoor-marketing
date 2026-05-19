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
      <Navbar activePortal={activePortal} setActivePortal={setActivePortal} />

      {/* Main Container */}
      <main style={{ flex: 1, padding: '0 24px', maxWidth: '1440px', margin: '0 auto', width: '100%' }}>
        
        {/* Advertiser Portal View */}
        {activePortal === 'advertiser' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            
            {/* Startup Banner Hero Section */}
            <div className="glass-panel" style={{
              padding: '48px 32px',
              border: '1px solid rgba(255,255,255,0.06)',
              background: 'radial-gradient(circle at 80% 20%, rgba(6,182,212,0.15) 0%, transparent 60%), radial-gradient(circle at 10% 80%, rgba(124,58,237,0.15) 0%, transparent 60%), rgba(15, 14, 23, 0.7)',
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
        {activePortal === 'admin' && (
          <AdminPortal
            billboards={billboards}
            bookings={bookings}
            onApproveBillboard={handleApproveBillboard}
            onRejectBillboard={handleRejectBillboard}
          />
        )}

      </main>

      {/* Common beautiful footer footer */}
      <Footer />
    </div>
  );
}
