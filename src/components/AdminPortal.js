'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, XCircle, CheckCircle2, TrendingUp, DollarSign, Users, Activity, FileDown } from 'lucide-react';

export default function AdminPortal({ billboards, bookings, onApproveBillboard, onRejectBillboard }) {
  const [systemLogs, setSystemLogs] = useState([]);
  const [activeTab, setActiveTab] = useState('approvals'); // 'approvals', 'ledger', 'logs'

  // Filter listings awaiting approval
  const pendingApprovals = billboards.filter(b => b.availability === 'Pending Approval');
  
  // Calculate system-wide financials
  const platformVol = bookings.reduce((sum, b) => sum + b.totalPaid, 0);
  const platformComm = platformVol * 0.12;

  // Simulate rolling system logs to make dashboard feel alive
  useEffect(() => {
    const initialLogs = [
      { id: 1, type: 'INFO', msg: 'System check: Next.js edge API nodes online.', time: '09:00:15 AM' },
      { id: 2, type: 'USER', msg: 'Advertiser AS designed a Diwali Festive template.', time: '09:02:40 AM' },
      { id: 3, type: 'TRANS', msg: 'Razorpay webhook received: Order payload secure.', time: '09:04:12 AM' }
    ];
    setSystemLogs(initialLogs);

    const logTemplates = [
      { type: 'INFO', msg: 'Server node AP-SOUTH-1 latency verified at 18ms.' },
      { type: 'USER', msg: 'Guest searched listings in Ahmedabad (S.G. Highway).' },
      { type: 'USER', msg: 'New poster dimension projection request sent to WebGL engine.' },
      { type: 'TRANS', msg: 'Commission payout split calculated for Apex Media Corp.' },
      { type: 'USER', msg: '3D scene orbit controls interacted.' }
    ];

    const interval = setInterval(() => {
      const randomLog = logTemplates[Math.floor(Math.random() * logTemplates.length)];
      const now = new Date();
      const timeStr = now.toLocaleTimeString();
      setSystemLogs(prev => [
        { id: Date.now(), type: randomLog.type, msg: randomLog.msg, time: timeStr },
        ...prev.slice(0, 8)
      ]);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* 1. Global Platform Performance stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '20px'
      }}>
        {/* Stat 1 */}
        <div className="glass-panel" style={{ padding: '24px', border: '1px solid var(--border-glass)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>PLATFORM GROSS VOLUME (GMV)</p>
            <h3 style={{ fontSize: '1.8rem', fontWeight: '800', marginTop: '6px', color: 'var(--accent-cyan)' }}>
              ₹{platformVol.toLocaleString()}
            </h3>
            <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '4px' }}>Total volume booked via marketplace</p>
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
            <TrendingUp style={{ width: '24px', height: '24px' }} />
          </div>
        </div>

        {/* Stat 2 */}
        <div className="glass-panel" style={{ padding: '24px', border: '1px solid var(--border-glass)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>NET COMMISSIONS EARNED</p>
            <h3 style={{ fontSize: '1.8rem', fontWeight: '800', marginTop: '6px', color: 'var(--accent-emerald)' }}>
              ₹{platformComm.toLocaleString()}
            </h3>
            <p style={{ fontSize: '0.65rem', color: 'var(--accent-emerald)', marginTop: '4px' }}>AdVantage 12% revenue cut</p>
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

        {/* Stat 3 */}
        <div className="glass-panel" style={{ padding: '24px', border: '1px solid var(--border-glass)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>REGISTERED PLATFORM MEMBERS</p>
            <h3 style={{ fontSize: '1.8rem', fontWeight: '800', marginTop: '6px' }}>148 Members</h3>
            <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '4px' }}>42 Billboard Hosts | 106 Advertisers</p>
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
            <Users style={{ width: '24px', height: '24px', color: 'var(--text-secondary)' }} />
          </div>
        </div>

        {/* Stat 4 */}
        <div className="glass-panel" style={{ padding: '24px', border: '1px solid var(--border-glass)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>SYSTEM OPERATIONAL HEALTH</p>
            <h3 style={{ fontSize: '1.8rem', fontWeight: '800', marginTop: '6px', color: 'var(--accent-purple)' }}>99.98% Up</h3>
            <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '4px' }}>AWS Cloud Nodes: 24 active</p>
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
            <Activity style={{ width: '24px', height: '24px' }} />
          </div>
        </div>
      </div>

      {/* 2. Admin Workspace Tabs */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid var(--border-glass)',
        gap: '24px',
        paddingBottom: '2px'
      }}>
        <button
          onClick={() => setActiveTab('approvals')}
          style={{
            background: 'transparent',
            border: 'none',
            borderBottom: activeTab === 'approvals' ? '2px solid var(--accent-purple)' : '2px solid transparent',
            color: activeTab === 'approvals' ? 'var(--text-primary)' : 'var(--text-muted)',
            padding: '8px 12px 14px 12px',
            fontSize: '0.9rem',
            fontFamily: 'var(--font-mono)',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'var(--transition-smooth)'
          }}
        >
          Approvals Queue ({pendingApprovals.length})
        </button>

        <button
          onClick={() => setActiveTab('ledger')}
          style={{
            background: 'transparent',
            border: 'none',
            borderBottom: activeTab === 'ledger' ? '2px solid var(--accent-purple)' : '2px solid transparent',
            color: activeTab === 'ledger' ? 'var(--text-primary)' : 'var(--text-muted)',
            padding: '8px 12px 14px 12px',
            fontSize: '0.9rem',
            fontFamily: 'var(--font-mono)',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'var(--transition-smooth)'
          }}
        >
          Revenue Ledger Transactions
        </button>

        <button
          onClick={() => setActiveTab('logs')}
          style={{
            background: 'transparent',
            border: 'none',
            borderBottom: activeTab === 'logs' ? '2px solid var(--accent-purple)' : '2px solid transparent',
            color: activeTab === 'logs' ? 'var(--text-primary)' : 'var(--text-muted)',
            padding: '8px 12px 14px 12px',
            fontSize: '0.9rem',
            fontFamily: 'var(--font-mono)',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'var(--transition-smooth)'
          }}
        >
          Live System Activity Logs
        </button>
      </div>

      {/* Tab Panels */}
      <div className="glass-panel" style={{
        padding: '24px',
        border: '1px solid var(--border-glass)',
        minHeight: '250px'
      }}>
        
        {/* approvals Queue Panel */}
        {activeTab === 'approvals' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck style={{ color: 'var(--accent-purple)' }} /> Pending Billboard Approvals
              </h3>
              <span className="badge badge-purple" style={{ fontSize: '0.7rem' }}>Awaiting Validation</span>
            </div>

            {pendingApprovals.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '40px 24px',
                color: 'var(--text-secondary)',
                border: '1px dashed var(--border-glass)',
                borderRadius: '12px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px'
              }}>
                <CheckCircle2 style={{ width: '32px', height: '32px', color: 'var(--accent-emerald)' }} />
                <p style={{ fontWeight: '600', fontSize: '0.85rem' }}>All Caught Up!</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>No outdoor hoardings are currently waiting for admin validation.</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                {pendingApprovals.map(board => (
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
                    <div style={{ width: '100%', height: '110px', overflow: 'hidden', borderRadius: '8px' }}>
                      <img src={board.image} alt={board.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>

                    {/* Meta */}
                    <div>
                      <p style={{ fontSize: '0.7rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>📍 {board.city.toUpperCase()} • {board.areaType}</p>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginTop: '2px' }}>{board.title}</h4>
                      <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '2px' }}>{board.location}</p>
                      <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px' }}>Owner: {board.ownerName} ({board.ownerContact})</p>
                    </div>

                    {/* Stats Specs */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '8px',
                      fontSize: '0.75rem',
                      background: 'rgba(15, 23, 42, 0.01)',
                      padding: '8px',
                      borderRadius: '8px',
                      border: '1px solid rgba(15, 23, 42, 0.03)'
                    }}>
                      <div>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.65rem' }}>SIZE</span>
                        <p style={{ fontWeight: '600' }}>{board.size}</p>
                      </div>
                      <div>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.65rem' }}>MONTHLY RENT</span>
                        <p style={{ fontWeight: '700', color: 'var(--accent-emerald)' }}>₹{board.price.toLocaleString()}</p>
                      </div>
                    </div>

                    {/* Approvals Action Trigger */}
                    <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                      <button
                        onClick={() => onRejectBillboard(board.id)}
                        className="btn-outline"
                        style={{ flex: 1, padding: '8px', fontSize: '0.75rem', borderColor: 'rgba(244,63,94,0.3)', color: '#fb7185', justifyContent: 'center' }}
                      >
                        <XCircle style={{ width: '14px', height: '14px' }} /> Reject Site
                      </button>
                      <button
                        onClick={() => onApproveBillboard(board.id)}
                        className="btn-neon-purple"
                        style={{ flex: 1.5, padding: '8px', fontSize: '0.75rem', background: 'linear-gradient(135deg, var(--accent-emerald) 0%, #059669 100%)', boxShadow: 'none', justifyContent: 'center' }}
                      >
                        <CheckCircle2 style={{ width: '14px', height: '14px' }} /> Approve & Publish
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Revenue Ledger Panel */}
        {activeTab === 'ledger' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <h3 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                💼 Platform Transaction Ledger Logs
              </h3>
              
              <button
                onClick={() => alert('Exporting all transaction records to CSV sheet... Advantage_OOH_Ledger_2026.csv completed.')}
                className="btn-outline"
                style={{ padding: '6px 12px', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <FileDown style={{ width: '14px', height: '14px' }} /> Download Excel Sheet
              </button>
            </div>

            {bookings.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '40px 24px',
                color: 'var(--text-secondary)',
                border: '1px dashed var(--border-glass)',
                borderRadius: '12px'
              }}>
                <p style={{ fontWeight: '600', fontSize: '0.85rem' }}>No Ledger Bookings Found</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>No campaigns have been booked yet via the Advertiser Hub.</p>
              </div>
            ) : (
              /* Transaction Table */
              <div style={{ overflowX: 'auto' }}>
                <table style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontSize: '0.8rem',
                  textAlign: 'left'
                }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-glass)', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                      <th style={{ padding: '12px' }}>BOOKING ID</th>
                      <th style={{ padding: '12px' }}>SITE / SITE CITY</th>
                      <th style={{ padding: '12px' }}>GST COMPLIANCE</th>
                      <th style={{ padding: '12px' }}>TOTAL PAID</th>
                      <th style={{ padding: '12px' }}>PLATFORM COMMISSION</th>
                      <th style={{ padding: '12px' }}>GATEWAY STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking.id} style={{ borderBottom: '1px solid rgba(15,23,42,0.03)', transition: 'var(--transition-smooth)' }} className="table-row-hover">
                        <td style={{ padding: '12px', fontWeight: '700', color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>
                          {booking.id}
                        </td>
                        <td style={{ padding: '12px' }}>
                          <p style={{ fontWeight: '600' }}>{booking.boardTitle}</p>
                          <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>📍 {booking.city}</span>
                        </td>
                        <td style={{ padding: '12px' }}>
                          <span className="badge badge-purple" style={{ fontSize: '0.6rem' }}>18% GST Audited</span>
                        </td>
                        <td style={{ padding: '12px', fontWeight: '700' }}>
                          ₹{booking.totalPaid.toLocaleString()}
                        </td>
                        <td style={{ padding: '12px', color: 'var(--accent-emerald)', fontWeight: '700' }}>
                          ₹{(booking.totalPaid * 0.12).toLocaleString()}
                        </td>
                        <td style={{ padding: '12px' }}>
                          <span className="badge badge-emerald" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <CheckCircle2 style={{ width: '10px', height: '10px' }} /> SECURED
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Live system Activity Logs */}
        {activeTab === 'logs' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              📊 System Server Operation Feed
            </h3>

            {/* Terminal Layout */}
            <div style={{
              background: '#040307',
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: '12px',
              padding: '16px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              maxHeight: '300px',
              overflowY: 'auto',
              boxShadow: 'inset 0 0 20px rgba(0,0,0,0.8)'
            }}>
              {systemLogs.map(log => {
                const isInfo = log.type === 'INFO';
                const isUser = log.type === 'USER';
                const typeColor = isInfo ? 'var(--accent-cyan)' : isUser ? 'var(--accent-purple)' : 'var(--accent-emerald)';

                return (
                  <div key={log.id} style={{ display: 'flex', gap: '12px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '6px' }}>
                    <span style={{ color: 'rgba(255,255,255,0.4)' }}>[{log.time}]</span>
                    <span style={{ color: typeColor, fontWeight: '700' }}>[{log.type}]</span>
                    <span style={{ color: '#e2e8f0' }}>{log.msg}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
