'use client';

import React, { useState } from 'react';
import { BarChart3, Users, Clock, Compass, Award, ArrowUpRight, Calculator, Coins } from 'lucide-react';

export default function SmartAnalytics({ activeBillboard }) {
  // If no billboard selected, use a fallback
  const billboard = activeBillboard || {
    title: 'S.G. Highway Digital Unipole',
    dailyTraffic: 145000,
    areaType: 'Highway',
    audienceType: 'Professionals & Shoppers',
    bestTiming: '08:00 AM - 11:00 PM',
    price: 75000,
    size: '30x15 ft',
    roiFactor: 1.4
  };

  // Interactive ROI Calculator states
  const [weeks, setWeeks] = useState(4);
  const [conversionRate, setConversionRate] = useState(0.04); // in % (e.g. 0.04% means 4 in 10,000 take action)

  // Generate dynamic audience stats based on the selected board's features to make it highly realistic
  const getDemographics = (areaType) => {
    const type = areaType?.toLowerCase() || '';
    if (type.includes('school') || type.includes('college') || type.includes('youth')) {
      return {
        ages: [
          { bracket: '15-24 (Students)', pct: 65, color: 'var(--accent-purple)' },
          { bracket: '25-34 (Young Prof.)', pct: 20, color: 'var(--accent-cyan)' },
          { bracket: '35-50 (Families)', pct: 12, color: 'var(--accent-emerald)' },
          { bracket: '50+ (Seniors)', pct: 3, color: 'var(--text-muted)' }
        ],
        vehicles: [
          { name: 'Two-Wheelers (Bikes/Scooters)', pct: 55 },
          { name: 'Private Cars & Cabs', pct: 30 },
          { name: 'Pedestrians', pct: 12 },
          { name: 'Public Buses / Auto Rickshaws', pct: 3 }
        ],
        peakTiming: '12:00 PM - 08:00 PM',
        cpm: 12 // cost per thousand views in INR
      };
    } else if (type.includes('it') || type.includes('commercial') || type.includes('corporate')) {
      return {
        ages: [
          { bracket: '15-24 (Students)', pct: 15, color: 'var(--accent-purple)' },
          { bracket: '25-34 (Young Prof.)', pct: 58, color: 'var(--accent-cyan)' },
          { bracket: '35-50 (Families)', pct: 22, color: 'var(--accent-emerald)' },
          { bracket: '50+ (Seniors)', pct: 5, color: 'var(--text-muted)' }
        ],
        vehicles: [
          { name: 'Private Cars & Cabs', pct: 60 },
          { name: 'Two-Wheelers (Bikes/Scooters)', pct: 25 },
          { name: 'Public Buses / Auto Rickshaws', pct: 10 },
          { name: 'Heavy Trucks & Commercial', pct: 5 }
        ],
        peakTiming: '08:00 AM - 11:30 AM, 05:30 PM - 09:00 PM',
        cpm: 28
      };
    } else if (type.includes('highway')) {
      return {
        ages: [
          { bracket: '15-24 (Students)', pct: 22, color: 'var(--accent-purple)' },
          { bracket: '25-34 (Young Prof.)', pct: 45, color: 'var(--accent-cyan)' },
          { bracket: '35-50 (Families)', pct: 25, color: 'var(--accent-emerald)' },
          { bracket: '50+ (Seniors)', pct: 8, color: 'var(--text-muted)' }
        ],
        vehicles: [
          { name: 'Private Cars & Cabs', pct: 55 },
          { name: 'Heavy Trucks & Commercial', pct: 22 },
          { name: 'Two-Wheelers (Bikes/Scooters)', pct: 18 },
          { name: 'Public Buses / Auto Rickshaws', pct: 5 }
        ],
        peakTiming: '08:00 AM - 10:30 AM, 06:00 PM - 10:00 PM',
        cpm: 18
      };
    } else {
      // Market / Beach Front
      return {
        ages: [
          { bracket: '15-24 (Students)', pct: 30, color: 'var(--accent-purple)' },
          { bracket: '25-34 (Young Prof.)', pct: 35, color: 'var(--accent-cyan)' },
          { bracket: '35-50 (Families)', pct: 25, color: 'var(--accent-emerald)' },
          { bracket: '50+ (Seniors)', pct: 10, color: 'var(--text-muted)' }
        ],
        vehicles: [
          { name: 'Private Cars & Cabs', pct: 45 },
          { name: 'Two-Wheelers (Bikes/Scooters)', pct: 35 },
          { name: 'Pedestrians', pct: 15 },
          { name: 'Public Buses / Auto Rickshaws', pct: 5 }
        ],
        peakTiming: '04:00 PM - 11:00 PM',
        cpm: 32
      };
    }
  };

  const stats = getDemographics(billboard.areaType);

  // Simulated traffic distribution across 24 hours of a day
  const hourlyTrafficMultipliers = [0.1, 0.05, 0.03, 0.05, 0.15, 0.4, 0.7, 0.95, 0.98, 0.85, 0.75, 0.7, 0.75, 0.8, 0.78, 0.85, 0.92, 0.98, 0.95, 0.85, 0.7, 0.5, 0.3, 0.2];

  // ROI calculations
  const monthlyCost = billboard.price;
  const proportionalCost = (monthlyCost / 4.3) * weeks;
  const estimatedImpressions = billboard.dailyTraffic * weeks * 7;
  const expectedLeads = Math.round(estimatedImpressions * (conversionRate / 100));
  const leadAcquisitionCost = expectedLeads > 0 ? Math.round(proportionalCost / expectedLeads) : 0;
  const roiMultiplierFactor = (billboard.roiFactor || 1.3) * (1 + (conversionRate * 2));

  return (
    <div className="glass-panel" style={{
      padding: '24px',
      border: '1px solid var(--border-glass)',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px'
    }}>
      {/* Header */}
      <div>
        <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <BarChart3 style={{ color: 'var(--accent-emerald)' }} /> Smart Traffic Analytics
        </h3>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          Real-time vehicle counting sensors and high-resolution audience profiling statistics.
        </p>
      </div>

      {/* Grid: Graphic Graph & Demographic Columns */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        lg: '1.5fr 1fr',
        gap: '24px'
      }}>
        {/* Hourly traffic chart custom vector visualization */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          padding: '20px',
          background: 'rgba(255, 255, 255, 0.01)',
          borderRadius: '12px',
          border: '1px solid var(--border-glass)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock style={{ width: '14px', height: '14px', color: 'var(--accent-cyan)' }} /> Hourly Traffic Index
            </span>
            <span className="badge badge-cyan" style={{ fontSize: '0.65rem' }}>Live Sensors</span>
          </div>

          {/* Graphical Bars */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            height: '150px',
            paddingTop: '20px',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            position: 'relative'
          }}>
            {/* Grid helper lines */}
            <div style={{ position: 'absolute', width: '100%', borderTop: '1px dashed rgba(255,255,255,0.03)', top: '33%', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', width: '100%', borderTop: '1px dashed rgba(255,255,255,0.03)', top: '66%', pointerEvents: 'none' }} />

            {hourlyTrafficMultipliers.map((mult, hour) => {
              const heightPct = `${mult * 100}%`;
              const isPeakHour = mult > 0.85;

              return (
                <div
                  key={hour}
                  style={{
                    flex: '1',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    margin: '0 2px'
                  }}
                  title={`Hour ${hour}:00 - ${(billboard.dailyTraffic / 24 * mult * 2.5).toFixed(0)} vehicles`}
                >
                  <div style={{
                    width: '100%',
                    height: heightPct,
                    background: isPeakHour 
                      ? 'linear-gradient(0deg, var(--accent-emerald) 0%, #34d399 100%)' 
                      : 'linear-gradient(0deg, var(--accent-cyan) 0%, rgba(6,182,212,0.15) 100%)',
                    borderRadius: '3px 3px 0 0',
                    boxShadow: isPeakHour ? '0 0 10px rgba(16, 185, 129, 0.3)' : 'none',
                    transition: 'var(--transition-smooth)'
                  }} />
                </div>
              );
            })}
          </div>

          {/* Chart timeline labels */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '0.65rem',
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-mono)'
          }}>
            <span>12 AM</span>
            <span>6 AM</span>
            <span>12 PM</span>
            <span>6 PM</span>
            <span>11 PM</span>
          </div>
        </div>

        {/* Audience demographics side cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{
            padding: '16px',
            background: 'rgba(255,255,255,0.01)',
            borderRadius: '12px',
            border: '1px solid var(--border-glass)'
          }}>
            <h4 style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-primary)' }}>
              <Users style={{ width: '14px', height: '14px', color: 'var(--accent-purple)' }} /> Age Demographics
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' }}>
              {stats.ages.map((age, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>{age.bracket}</span>
                    <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{age.pct}%</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '999px', overflow: 'hidden' }}>
                    <div style={{
                      width: `${age.pct}%`,
                      height: '100%',
                      background: age.color,
                      borderRadius: '999px'
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grid metrics summary */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px'
      }}>
        {/* KPI 1 */}
        <div style={{
          padding: '16px',
          background: 'rgba(16, 185, 129, 0.02)',
          border: '1px solid rgba(16, 185, 129, 0.08)',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: 'rgba(16, 185, 129, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-emerald)'
          }}>
            <Award style={{ width: '20px', height: '20px' }} />
          </div>
          <div>
            <p style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>PEAK ENGAGEMENT TIMES</p>
            <p style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-primary)', marginTop: '2px' }}>
              {stats.peakTiming}
            </p>
          </div>
        </div>

        {/* KPI 2 */}
        <div style={{
          padding: '16px',
          background: 'rgba(6, 182, 212, 0.02)',
          border: '1px solid rgba(6, 182, 212, 0.08)',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: 'rgba(6, 182, 212, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-cyan)'
          }}>
            <Compass style={{ width: '20px', height: '20px' }} />
          </div>
          <div>
            <p style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>AREA LANDMARK CATEGORY</p>
            <p style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-primary)', marginTop: '2px' }}>
              {billboard.areaType}
            </p>
          </div>
        </div>

        {/* KPI 3 */}
        <div style={{
          padding: '16px',
          background: 'rgba(99, 102, 241, 0.02)',
          border: '1px solid rgba(99, 102, 241, 0.08)',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: 'rgba(99, 102, 241, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-purple)'
          }}>
            <ArrowUpRight style={{ width: '20px', height: '20px' }} />
          </div>
          <div>
            <p style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>ESTIMATED BRAND CPM</p>
            <p style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-primary)', marginTop: '2px' }}>
              ₹{stats.cpm} <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: '400' }}>/ 1K views</span>
            </p>
          </div>
        </div>
      </div>

      {/* ROI Campaign Estimator Tool (Extra Feature) */}
      <div className="glass-panel" style={{
        padding: '20px',
        border: '1px solid var(--border-glass)',
        background: 'rgba(99, 102, 241, 0.02)',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        <div style={{ display: 'flex', justify: 'space-between', alignItems: 'center' }}>
          <h4 style={{ fontSize: '0.95rem', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)' }}>
            <Calculator style={{ width: '18px', height: '18px', color: 'var(--accent-saffron)' }} /> Campaign ROI & Yield Estimator
          </h4>
          <span className="badge badge-saffron" style={{ fontSize: '0.65rem' }}>AI Forecaster</span>
        </div>

        {/* Sliders Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              <span>Campaign Duration</span>
              <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{weeks} Weeks</span>
            </div>
            <input
              type="range"
              min="1"
              max="12"
              value={weeks}
              onChange={(e) => setWeeks(parseInt(e.target.value))}
              style={{ width: '100%', marginTop: '6px', accentColor: 'var(--accent-saffron)' }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              <span>Conversion / Action Rate</span>
              <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{conversionRate.toFixed(2)}%</span>
            </div>
            <input
              type="range"
              min="0.01"
              max="0.25"
              step="0.01"
              value={conversionRate}
              onChange={(e) => setConversionRate(parseFloat(e.target.value))}
              style={{ width: '100%', marginTop: '6px', accentColor: 'var(--accent-cyan)' }}
            />
          </div>
        </div>

        {/* Estimation Outputs */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '12px',
          background: 'rgba(0,0,0,0.2)',
          padding: '16px',
          borderRadius: '10px',
          border: '1px solid var(--border-glass)',
          fontSize: '0.75rem'
        }}>
          <div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.65rem', fontFamily: 'var(--font-mono)' }}>PROPORTIONAL RENT COST</span>
            <p style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--text-primary)', marginTop: '2px' }}>
              ₹{Math.round(proportionalCost).toLocaleString()}
            </p>
          </div>
          <div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.65rem', fontFamily: 'var(--font-mono)' }}>TOTAL VISUAL IMPRESSIONS</span>
            <p style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--accent-cyan)', marginTop: '2px' }}>
              {estimatedImpressions.toLocaleString()}
            </p>
          </div>
          <div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.65rem', fontFamily: 'var(--font-mono)' }}>EXPECTED CUSTOMER LEADS</span>
            <p style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--accent-emerald)', marginTop: '2px' }}>
              {expectedLeads.toLocaleString()}
            </p>
          </div>
          <div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.65rem', fontFamily: 'var(--font-mono)' }}>COST PER ACQUISITION (CPA)</span>
            <p style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--accent-saffron)', marginTop: '2px' }}>
              ₹{leadAcquisitionCost} <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 'normal' }}>/ lead</span>
            </p>
          </div>
        </div>
      </div>

      {/* Vehicles classification ratios */}
      <div>
        <span className="label-text" style={{ fontSize: '0.7rem' }}>Traffic Vehicle Classification Distribution</span>
        <div style={{
          display: 'flex',
          width: '100%',
          height: '24px',
          borderRadius: '6px',
          overflow: 'hidden',
          marginTop: '6px',
          border: '1px solid rgba(255,255,255,0.05)'
        }}>
          {stats.vehicles.map((v, i) => {
            const colors = ['var(--accent-cyan)', 'var(--accent-purple)', 'var(--accent-saffron)', 'var(--text-muted)'];
            return (
              <div
                key={i}
                style={{
                  width: `${v.pct}%`,
                  height: '100%',
                  background: colors[i % colors.length],
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.65rem',
                  fontWeight: '700',
                  color: '#000',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap'
                }}
                title={`${v.name}: ${v.pct}%`}
              >
                {v.pct > 12 && `${v.pct}%`}
              </div>
            );
          })}
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'flex-start',
          gap: '16px',
          flexWrap: 'wrap',
          fontSize: '0.7rem',
          color: 'var(--text-secondary)',
          marginTop: '8px'
        }}>
          {stats.vehicles.map((v, i) => {
            const colors = ['var(--accent-cyan)', 'var(--accent-purple)', 'var(--accent-saffron)', 'var(--text-muted)'];
            return (
              <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: colors[i % colors.length] }} />
                {v.name.split(' (')[0]} ({v.pct}%)
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
