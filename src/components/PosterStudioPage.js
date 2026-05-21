'use client';

import React, { useState, useRef, useEffect } from 'react';
import PosterDesigner from './PosterDesigner';
import Billboard3DPreview from './Billboard3DPreview';
import { Download, Sparkles, ArrowRight, BookOpen, Layers, CheckCircle2 } from 'lucide-react';

export default function PosterStudioPage({ theme, currentUser, onShowAuth, onDeployPoster }) {
  const canvasRef = useRef(null);
  const [posterDataUrl, setPosterDataUrl] = useState('');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `AdNazar_Campaign_${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (e) {
      console.error("Failed to download canvas image", e);
    }
  };

  const handleDeploy = () => {
    if (!currentUser) {
      // User not logged in, prompt sign up/login first
      onShowAuth('advertiser');
    } else {
      // Deploy with this poster
      onDeployPoster(posterDataUrl);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Studio Header */}
      <div className="glass-panel" style={{
        padding: '24px 28px',
        border: '1px solid var(--border-glass)',
        background: 'var(--bg-glass)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span className="badge badge-saffron" style={{ display: 'inline-flex', gap: '4px', alignItems: 'center' }}>
              <Sparkles style={{ width: '11px', height: '11px' }} /> Creative Studio
            </span>
            <span className="badge badge-purple">PRO Canvas v2.5</span>
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: '900', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
            AI Slogan & <span className="text-gradient">Poster Studio</span>
          </h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
            Design your graphic campaign using our live 2D canvas, preview it instantly on a 3D highway billboard, and deploy it.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={handleDownload}
            className="btn-outline"
            style={{ padding: '10px 18px', fontSize: '0.85rem', gap: '8px' }}
          >
            <Download style={{ width: '15px', height: '15px' }} /> Download High-Res PNG
          </button>
          <button
            onClick={handleDeploy}
            className="btn-neon-purple"
            style={{ padding: '10px 20px', fontSize: '0.85rem', gap: '8px' }}
          >
            <Layers style={{ width: '15px', height: '15px' }} />
            {currentUser ? 'Deploy to Real Billboard' : 'Sign In to Deploy'}
            <ArrowRight style={{ width: '14px', height: '14px' }} />
          </button>
        </div>
      </div>

      {downloadSuccess && (
        <div style={{
          background: 'rgba(16,185,129,0.08)',
          border: '1px solid rgba(16,185,129,0.25)',
          borderRadius: '8px',
          padding: '12px 16px',
          color: 'var(--accent-emerald)',
          fontSize: '0.85rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }} className="animate-fade-in">
          <CheckCircle2 style={{ width: '16px', height: '16px' }} />
          Your high-res flyer image has been successfully generated and downloaded!
        </div>
      )}

      {/* Editor + 3D View Grid */}
      <div className="design-studio-grid">
        {/* Left Side: 2D Interactive Canvas Editor */}
        <PosterDesigner
          canvasRef={canvasRef}
          onPosterChange={(dataUrl) => setPosterDataUrl(dataUrl)}
        />

        {/* Right Side: Live 3D Simulation engine */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="glass-panel" style={{
            padding: '24px',
            border: '1px solid var(--border-glass)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <h3 style={{ fontSize: '1rem', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <BookOpen style={{ color: 'var(--accent-cyan)', width: '16px', height: '16px' }} /> Interactive 3D Mockup
            </h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              See how your ad looks in real lighting conditions on a virtual national highway. Rotate, zoom, and test readability.
            </p>
          </div>

          <Billboard3DPreview
            posterDataUrl={posterDataUrl}
            theme={theme}
          />
        </div>
      </div>
    </div>
  );
}
