'use client';

import React, { useState, useEffect } from 'react';
import { Map, Navigation, Eye, TrendingUp, Filter, Heart, ChevronRight, Layers } from 'lucide-react';

export default function MapView({ billboards, activeBillboard, setActiveBillboard, onSelectCity }) {
  const [selectedCity, setSelectedCity] = useState('All');
  const [showTrafficLayer, setShowTrafficLayer] = useState(true);
  const [showVisibilityLayer, setShowVisibilityLayer] = useState(true);
  const [radarAngle, setRadarAngle] = useState(0);

  // Filtered billboards based on selected city
  const filteredBillboards = selectedCity === 'All' 
    ? billboards 
    : billboards.filter(b => b.city.toLowerCase() === selectedCity.toLowerCase());

  // Simulating a sonar/radar sweeper animation
  useEffect(() => {
    const interval = setInterval(() => {
      setRadarAngle(prev => (prev + 1.5) % 360);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const cities = ['All', 'Ahmedabad', 'Mumbai', 'Delhi-NCR', 'Bangalore', 'Pune', 'Hyderabad'];

  return (
    <div className="glass-panel" style={{
      padding: '24px',
      border: '1px solid var(--border-glass)',
      display: 'grid',
      gridTemplateColumns: '1fr',
      lg: '1.4fr 1fr',
      gap: '24px',
      position: 'relative'
    }}>
      {/* Grid Map Dashboard */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Header and filters */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Map style={{ color: 'var(--accent-cyan)' }} /> GPS Hoarding Search
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Interactive satellite vector grid charting traffic nodes and visibility scores.
            </p>
          </div>
          
          {/* Layer toggles */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setShowTrafficLayer(prev => !prev)}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                background: showTrafficLayer ? 'rgba(6, 182, 212, 0.15)' : 'rgba(255,255,255,0.03)',
                border: showTrafficLayer ? '1px solid var(--accent-cyan)' : '1px solid var(--border-glass)',
                color: showTrafficLayer ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                fontSize: '0.7rem',
                fontFamily: 'var(--font-mono)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'var(--transition-smooth)'
              }}
            >
              <TrendingUp style={{ width: '12px', height: '12px' }} /> Traffic Flow
            </button>
            <button
              onClick={() => setShowVisibilityLayer(prev => !prev)}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                background: showVisibilityLayer ? 'rgba(124, 58, 237, 0.15)' : 'rgba(255,255,255,0.03)',
                border: showVisibilityLayer ? '1px solid var(--accent-purple)' : '1px solid var(--border-glass)',
                color: showVisibilityLayer ? 'var(--accent-purple)' : 'var(--text-secondary)',
                fontSize: '0.7rem',
                fontFamily: 'var(--font-mono)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'var(--transition-smooth)'
              }}
            >
              <Eye style={{ width: '12px', height: '12px' }} /> Visibility Glow
            </button>
          </div>
        </div>

        {/* City Filter pills */}
        <div style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '8px',
          borderBottom: '1px solid var(--border-glass)'
        }}>
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => {
                setSelectedCity(city);
                if (onSelectCity) onSelectCity(city);
              }}
              style={{
                padding: '6px 14px',
                borderRadius: '9999px',
                background: selectedCity === city ? 'linear-gradient(135deg, var(--accent-purple) 0%, var(--accent-cyan) 100%)' : 'rgba(15,23,42,0.05)',
                border: 'none',
                color: selectedCity === city ? '#fff' : 'var(--text-secondary)',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: '600',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'var(--transition-smooth)'
              }}
            >
              {city}
            </button>
          ))}
        </div>

        {/* Visual Map Canvas Grid */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: '420px',
          background: 'radial-gradient(circle, #f8fafc 0%, #cbd5e1 100%)',
          border: '1px solid rgba(15, 23, 42, 0.08)',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: 'inset 0 0 40px rgba(15, 23, 42, 0.06)'
        }}>
          {/* Neon Grid Lines overlay */}
          <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundImage: 'linear-gradient(rgba(15, 23, 42, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(15, 23, 42, 0.04) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
            pointerEvents: 'none'
          }} />

          {/* Latitude Longitude coordinate stamps */}
          <div style={{
            position: 'absolute',
            top: '10px',
            left: '12px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            color: 'rgba(15, 23, 42, 0.4)',
            pointerEvents: 'none'
          }}>
            SYS.GRID: IN-WEST_ZONE // LAT 20.5937° N, LNG 78.9629° E
          </div>

          {/* Radar sonar sweeping visualizer */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '80%',
            height: '80%',
            transform: `translate(-50%, -50%) rotate(${radarAngle}deg)`,
            transformOrigin: 'center center',
            background: 'linear-gradient(45deg, rgba(6, 182, 212, 0.08) 0%, transparent 60%)',
            borderRadius: '50%',
            pointerEvents: 'none'
          }} />

          {/* Simulated concentric circle guidelines */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '300px',
            height: '300px',
            border: '1px dashed rgba(6, 182, 212, 0.15)',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none'
          }} />
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '150px',
            height: '150px',
            border: '1px dashed rgba(6, 182, 212, 0.1)',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none'
          }} />

          {/* Simulated highway path drawn with SVG */}
          {showTrafficLayer && (
            <svg style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              zIndex: 1
            }}>
              {/* Highway 1 */}
              <path
                d="M -50 120 C 150 120, 200 300, 650 300"
                fill="none"
                stroke="rgba(6, 182, 212, 0.25)"
                strokeWidth="8"
                strokeLinecap="round"
              />
              <path
                d="M -50 120 C 150 120, 200 300, 650 300"
                fill="none"
                stroke="var(--accent-cyan)"
                strokeWidth="2"
                strokeDasharray="6, 12"
                strokeLinecap="round"
                style={{ animation: 'dash 15s linear infinite' }}
              />

              {/* Highway 2 */}
              <path
                d="M 120 -50 C 120 200, 380 180, 380 470"
                fill="none"
                stroke="rgba(244, 63, 94, 0.2)"
                strokeWidth="6"
                strokeLinecap="round"
              />
              <path
                d="M 120 -50 C 120 200, 380 180, 380 470"
                fill="none"
                stroke="var(--accent-rose)"
                strokeWidth="1.5"
                strokeDasharray="4, 8"
                strokeLinecap="round"
                style={{ animation: 'dash-reverse 20s linear infinite' }}
              />
            </svg>
          )}

          {/* Render billboard interactive location points */}
          {filteredBillboards.map((board, idx) => {
            // Generating simulated coordinates on canvas based on ID/index for beautiful display spacing
            // Using seed values so positions are deterministic
            const seedsX = [0.15, 0.35, 0.55, 0.72, 0.28, 0.82, 0.48, 0.65];
            const seedsY = [0.25, 0.68, 0.35, 0.78, 0.42, 0.52, 0.85, 0.15];
            
            const leftPercent = `${seedsX[idx % seedsX.length] * 100}%`;
            const topPercent = `${seedsY[idx % seedsY.length] * 100}%`;

            const isActive = activeBillboard?.id === board.id;
            const isAvailable = board.availability === 'Available';

            return (
              <div
                key={board.id}
                onClick={() => setActiveBillboard(board)}
                style={{
                  position: 'absolute',
                  left: leftPercent,
                  top: topPercent,
                  transform: 'translate(-50%, -50%)',
                  cursor: 'pointer',
                  zIndex: isActive ? 10 : 5,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                {/* Visibility Range Glow Zone */}
                {showVisibilityLayer && (
                  <div style={{
                    position: 'absolute',
                    width: `${board.visibilityScore * 0.55}px`,
                    height: `${board.visibilityScore * 0.55}px`,
                    borderRadius: '50%',
                    background: isAvailable ? 'rgba(16, 185, 129, 0.06)' : 'rgba(244, 63, 94, 0.04)',
                    border: isAvailable ? '1px solid rgba(16, 185, 129, 0.12)' : '1px solid rgba(244, 63, 94, 0.08)',
                    pointerEvents: 'none',
                    transform: 'scale(1)',
                    animation: isActive ? 'ping 2s infinite' : 'none'
                  }} />
                )}

                {/* Pulse Beacon */}
                <div style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  backgroundColor: isAvailable ? 'var(--accent-emerald)' : 'rgba(244, 63, 94, 0.7)',
                  border: '3px solid #ffffff',
                  boxShadow: isActive 
                    ? `0 0 15px ${isAvailable ? 'var(--accent-emerald)' : 'var(--accent-rose)'}` 
                    : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'var(--transition-smooth)'
                }}>
                  {isActive && (
                    <div style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: '#ffffff'
                    }} />
                  )}
                </div>

                {/* Floating Micro Name tag */}
                <div className="glass-panel" style={{
                  padding: '3px 8px',
                  borderRadius: '6px',
                  fontSize: '0.65rem',
                  color: isActive ? 'var(--accent-cyan)' : 'var(--text-primary)',
                  border: isActive ? '1px solid var(--accent-cyan)' : '1px solid var(--border-glass)',
                  background: isActive ? 'rgba(6, 182, 212, 0.2)' : 'rgba(255, 255, 255, 0.9)',
                  marginTop: '4px',
                  whiteSpace: 'nowrap',
                  fontFamily: 'var(--font-mono)',
                  boxShadow: '0 4px 10px rgba(15,23,42,0.06)',
                  transition: 'var(--transition-smooth)'
                }}>
                  {board.city} - {board.price >= 100000 ? `₹${(board.price / 100000).toFixed(1)}L` : `₹${board.price / 1000}K`}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Side Billboard Spotlight Details */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{
          padding: '16px 20px',
          background: 'rgba(255,255,255,0.02)',
          borderRadius: '12px',
          border: '1px solid var(--border-glass)'
        }}>
          <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Layers style={{ width: '16px', height: '16px', color: 'var(--accent-purple)' }} /> Selected Spot Details
          </h4>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
            Click spots on the grid map to select different hoardings.
          </p>
        </div>

        {activeBillboard ? (
          <div className="glass-panel" style={{
            padding: '20px',
            border: '1px solid rgba(15,23,42,0.08)',
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            background: 'rgba(255, 255, 255, 0.65)',
            height: '100%'
          }}>
            {/* Visual Thumbnail */}
            <div style={{
              width: '100%',
              height: '130px',
              borderRadius: '8px',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <img
                src={activeBillboard.image}
                alt={activeBillboard.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              
              <div style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                zIndex: 2
              }}>
                <span className={`badge ${activeBillboard.availability === 'Available' ? 'badge-emerald' : 'badge-rose'}`}>
                  {activeBillboard.availability}
                </span>
              </div>
            </div>

            {/* Typography */}
            <div>
              <p style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', fontWeight: '600' }}>
                📍 {activeBillboard.city.toUpperCase()} • {activeBillboard.areaType}
              </p>
              <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginTop: '2px' }}>{activeBillboard.title}</h4>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                {activeBillboard.location}
              </p>
            </div>

            {/* Scorecard Parameters */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
              background: 'rgba(255,255,255,0.01)',
              padding: '12px',
              borderRadius: '10px',
              border: '1px solid var(--border-glass)',
              fontSize: '0.8rem'
            }}>
              <div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.7rem', fontFamily: 'var(--font-mono)' }}>DAILY VEHICLE COUNT</p>
                <p style={{ fontSize: '0.95rem', fontWeight: '800', color: 'var(--accent-cyan)' }}>
                  {activeBillboard.dailyTraffic.toLocaleString()}
                </p>
              </div>
              <div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.7rem', fontFamily: 'var(--font-mono)' }}>VISIBILITY SCORE</p>
                <p style={{ fontSize: '0.95rem', fontWeight: '800', color: '#fbbf24' }}>
                  ⭐ {activeBillboard.visibilityScore}%
                </p>
              </div>
              <div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.7rem', fontFamily: 'var(--font-mono)' }}>DIMENSIONS</p>
                <p style={{ fontSize: '0.85rem', fontWeight: '600' }}>
                  {activeBillboard.size}
                </p>
              </div>
              <div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.7rem', fontFamily: 'var(--font-mono)' }}>AUDIENCE DEMOGRAPHIC</p>
                <p style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                  {activeBillboard.audienceType}
                </p>
              </div>
            </div>

            {/* Action booking info */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 'auto',
              paddingTop: '12px',
              borderTop: '1px solid var(--border-glass)'
            }}>
              <div>
                <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>MONTHLY RENTAL RATE</p>
                <p style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                  ₹{activeBillboard.price.toLocaleString()}
                </p>
              </div>
              
              <button
                onClick={() => {
                  // Instant load or select trigger
                  setActiveBillboard(activeBillboard);
                }}
                className="btn-neon-cyan"
                style={{
                  padding: '8px 16px',
                  fontSize: '0.75rem'
                }}
              >
                Select Spot <ChevronRight style={{ width: '12px', height: '12px' }} />
              </button>
            </div>
          </div>
        ) : (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '250px',
            border: '1px dashed var(--border-glass)',
            borderRadius: '12px',
            color: 'var(--text-secondary)',
            textAlign: 'center',
            padding: '24px'
          }}>
            <Navigation style={{ width: '32px', height: '32px', color: 'var(--accent-purple)', animation: 'bounce 2s infinite' }} />
            <p style={{ marginTop: '12px', fontWeight: '600', fontSize: '0.85rem' }}>No Active Spot Selected</p>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Click any of the pulsing coordinate icons on the tactical grid map.
            </p>
          </div>
        )}
      </div>

      {/* Embedded keyframe animation styles inside component */}
      <style jsx global>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -1000;
          }
        }
        @keyframes dash-reverse {
          to {
            stroke-dashoffset: 1000;
          }
        }
        @keyframes ping {
          0% {
            transform: scale(0.6);
            opacity: 1;
          }
          100% {
            transform: scale(2.2);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
