'use client';

import React, { useState, useEffect, useRef } from 'react';
import { POSTER_TEMPLATES } from '@/utils/mockData';
import { Type, Image as ImageIcon, Sparkles, Sliders, Layout, Upload, Palette } from 'lucide-react';

export default function PosterDesigner({ canvasRef, onPosterChange }) {
  const [selectedTemplate, setSelectedTemplate] = useState(POSTER_TEMPLATES[0]);
  const [title, setTitle] = useState(POSTER_TEMPLATES[0].titleText);
  const [subtitle, setSubtitle] = useState(POSTER_TEMPLATES[0].subtitleText);
  const [tagline, setTagline] = useState(POSTER_TEMPLATES[0].tagline);
  
  const [bgStart, setBgStart] = useState(POSTER_TEMPLATES[0].bgStart);
  const [bgEnd, setBgEnd] = useState(POSTER_TEMPLATES[0].bgEnd);
  const [accentColor, setAccentColor] = useState(POSTER_TEMPLATES[0].accentColor);
  const [textColor, setTextColor] = useState(POSTER_TEMPLATES[0].textColor);
  const [sticker, setSticker] = useState(POSTER_TEMPLATES[0].sticker);
  const [stickerSize, setStickerSize] = useState(80);
  
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedImageObj, setUploadedImageObj] = useState(null);
  const [useUpload, setUseUpload] = useState(false);
  const fileInputRef = useRef(null);

  // Load a template
  const applyTemplate = (tpl) => {
    setSelectedTemplate(tpl);
    setTitle(tpl.titleText);
    setSubtitle(tpl.subtitleText);
    setTagline(tpl.tagline);
    setBgStart(tpl.bgStart);
    setBgEnd(tpl.bgEnd);
    setAccentColor(tpl.accentColor);
    setTextColor(tpl.textColor);
    setSticker(tpl.sticker);
    setUseUpload(false);
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setUploadedImage(event.target.result);
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        setUploadedImageObj(img);
        setUseUpload(true);
      };
    };
    reader.readAsDataURL(file);
  };

  // Drawing onto the canvas whenever variables change
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear Canvas
    ctx.clearRect(0, 0, width, height);

    if (useUpload && uploadedImageObj) {
      // Draw uploaded custom flyer image resized to fit canvas
      ctx.drawImage(uploadedImageObj, 0, 0, width, height);
      
      // Draw a subtle gloss/shimmer overlay to make it look professional
      const shimmer = ctx.createLinearGradient(0, 0, width, height);
      shimmer.addColorStop(0, 'rgba(255, 255, 255, 0.08)');
      shimmer.addColorStop(0.5, 'rgba(255, 255, 255, 0)');
      shimmer.addColorStop(1, 'rgba(0, 0, 0, 0.15)');
      ctx.fillStyle = shimmer;
      ctx.fillRect(0, 0, width, height);
    } else {
      // Draw Gradient Background
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, bgStart);
      grad.addColorStop(1, bgEnd);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Draw subtle graphic design accents (cyber grid/lines)
      ctx.strokeStyle = 'rgba(255,255,255,0.05)';
      ctx.lineWidth = 1;
      for (let i = 0; i < width; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, height);
        ctx.stroke();
      }
      for (let j = 0; j < height; j += 40) {
        ctx.beginPath();
        ctx.moveTo(0, j);
        ctx.lineTo(width, j);
        ctx.stroke();
      }

      // Draw standard borders
      ctx.strokeStyle = accentColor;
      ctx.lineWidth = 12;
      ctx.strokeRect(12, 12, width - 24, height - 24);

      // Draw premium design corner borders
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 4;
      // top-left corner
      ctx.beginPath(); ctx.moveTo(6, 40); ctx.lineTo(6, 6); ctx.lineTo(40, 6); ctx.stroke();
      // top-right corner
      ctx.beginPath(); ctx.moveTo(width - 6, 40); ctx.lineTo(width - 6, 6); ctx.lineTo(width - 40, 6); ctx.stroke();
      // bottom-left corner
      ctx.beginPath(); ctx.moveTo(6, height - 40); ctx.lineTo(6, height - 6); ctx.lineTo(40, height - 6); ctx.stroke();
      // bottom-right corner
      ctx.beginPath(); ctx.moveTo(width - 6, height - 40); ctx.lineTo(width - 6, height - 6); ctx.lineTo(width - 40, height - 6); ctx.stroke();

      // Write Text
      // Subtitle (Pre-header)
      ctx.font = 'bold 18px "Space Grotesk", sans-serif';
      ctx.fillStyle = accentColor;
      ctx.textAlign = 'center';
      ctx.letterSpacing = '2px';
      ctx.fillText(subtitle.toUpperCase(), width / 2, 70);

      // Main Slogan (Title)
      ctx.font = '900 52px "Space Grotesk", sans-serif';
      ctx.fillStyle = textColor;
      ctx.textAlign = 'center';
      // Shadow glow effect
      ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
      ctx.shadowBlur = 6;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 3;
      ctx.fillText(title.toUpperCase(), width / 2 + 10, height / 2 - 5);
      
      // Reset Shadow for next items
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;

      // Tagline details
      ctx.font = 'italic 18px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.fillText(tagline, width / 2, height / 2 + 50);

      // Sticker drawing
      if (sticker) {
        ctx.font = `${stickerSize}px Arial`;
        ctx.fillText(sticker, width / 2, height - 55);
      }
    }

    // Callback to let the parent know the poster updated
    try {
      const dataUrl = canvas.toDataURL();
      if (onPosterChange) {
        onPosterChange(dataUrl);
      }
    } catch (err) {
      console.warn("Canvas toDataURL failed", err);
    }
  }, [
    title, subtitle, tagline, bgStart, bgEnd, accentColor,
    textColor, sticker, stickerSize, useUpload, uploadedImageObj, canvasRef
  ]);

  return (
    <div className="glass-panel" style={{
      padding: '24px',
      border: '1px solid var(--border-glass)',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px'
    }}>
      <div>
        <h2 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Palette style={{ color: 'var(--accent-purple)' }} /> Ad Poster Builder
        </h2>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          Design a dynamic, high-impact Canva-style ad campaign or upload a flyer in seconds.
        </p>
      </div>

      {/* Mode Switches */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        background: 'rgba(0,0,0,0.3)',
        padding: '4px',
        borderRadius: '10px',
        border: '1px solid var(--border-glass)'
      }}>
        <button
          onClick={() => setUseUpload(false)}
          style={{
            padding: '8px',
            border: 'none',
            borderRadius: '8px',
            background: !useUpload ? 'var(--accent-purple)' : 'transparent',
            color: '#fff',
            cursor: 'pointer',
            fontSize: '0.8rem',
            fontFamily: 'var(--font-mono)',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            transition: 'var(--transition-smooth)'
          }}
        >
          <Sliders style={{ width: '14px', height: '14px' }} /> Design Studio
        </button>
        <button
          onClick={() => {
            setUseUpload(true);
            if (!uploadedImage) {
              fileInputRef.current?.click();
            }
          }}
          style={{
            padding: '8px',
            border: 'none',
            borderRadius: '8px',
            background: useUpload ? 'var(--accent-purple)' : 'transparent',
            color: '#fff',
            cursor: 'pointer',
            fontSize: '0.8rem',
            fontFamily: 'var(--font-mono)',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            transition: 'var(--transition-smooth)'
          }}
        >
          <Upload style={{ width: '14px', height: '14px' }} /> Upload Flyer
        </button>
      </div>

      {/* hidden canvas rendering in a 2:1 billboard aspect ratio */}
      <canvas
        ref={canvasRef}
        width={600}
        height={300}
        style={{ display: 'none' }}
      />

      {/* Studio Options */}
      {!useUpload ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Template Selector */}
          <div>
            <span className="label-text" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Layout style={{ width: '12px', height: '12px' }} /> Pre-designed Templates
            </span>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
              gap: '8px',
              marginTop: '6px'
            }}>
              {POSTER_TEMPLATES.map((tpl) => (
                <button
                  key={tpl.id}
                  onClick={() => applyTemplate(tpl)}
                  style={{
                    padding: '8px 10px',
                    borderRadius: '8px',
                    background: selectedTemplate.id === tpl.id ? 'rgba(124, 58, 237, 0.2)' : 'rgba(255,255,255,0.03)',
                    border: selectedTemplate.id === tpl.id ? '1px solid var(--accent-purple)' : '1px solid var(--border-glass)',
                    color: selectedTemplate.id === tpl.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'var(--transition-smooth)'
                  }}
                >
                  <p style={{ fontWeight: '700' }}>{tpl.name}</p>
                  <span style={{ fontSize: '0.65rem', opacity: 0.7 }} className="badge badge-purple">{tpl.category}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Slogans Editor */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <span className="label-text">Subtitle / Campaign Goal</span>
              <input
                type="text"
                className="input-field"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                maxLength={40}
              />
            </div>
            <div>
              <span className="label-text">Main Headline / Slogan</span>
              <input
                type="text"
                className="input-field"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={25}
              />
            </div>
            <div>
              <span className="label-text">Tagline / Call to Action</span>
              <input
                type="text"
                className="input-field"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                maxLength={60}
              />
            </div>
          </div>

          {/* Style Modifiers */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '12px'
          }}>
            <div>
              <span className="label-text">Gradient Start</span>
              <div style={{ display: 'flex', gap: '6px' }}>
                <input
                  type="color"
                  value={bgStart}
                  onChange={(e) => setBgStart(e.target.value)}
                  style={{ width: '40px', height: '40px', border: 'none', borderRadius: '6px', background: 'transparent', cursor: 'pointer' }}
                />
                <input
                  type="text"
                  className="input-field"
                  value={bgStart}
                  onChange={(e) => setBgStart(e.target.value)}
                  style={{ fontSize: '0.75rem', padding: '4px 8px' }}
                />
              </div>
            </div>
            <div>
              <span className="label-text">Gradient End</span>
              <div style={{ display: 'flex', gap: '6px' }}>
                <input
                  type="color"
                  value={bgEnd}
                  onChange={(e) => setBgEnd(e.target.value)}
                  style={{ width: '40px', height: '40px', border: 'none', borderRadius: '6px', background: 'transparent', cursor: 'pointer' }}
                />
                <input
                  type="text"
                  className="input-field"
                  value={bgEnd}
                  onChange={(e) => setBgEnd(e.target.value)}
                  style={{ fontSize: '0.75rem', padding: '4px 8px' }}
                />
              </div>
            </div>
            <div>
              <span className="label-text">Border Accent</span>
              <div style={{ display: 'flex', gap: '6px' }}>
                <input
                  type="color"
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  style={{ width: '40px', height: '40px', border: 'none', borderRadius: '6px', background: 'transparent', cursor: 'pointer' }}
                />
                <input
                  type="text"
                  className="input-field"
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  style={{ fontSize: '0.75rem', padding: '4px 8px' }}
                />
              </div>
            </div>
            <div>
              <span className="label-text">Slogan Text</span>
              <div style={{ display: 'flex', gap: '6px' }}>
                <input
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  style={{ width: '40px', height: '40px', border: 'none', borderRadius: '6px', background: 'transparent', cursor: 'pointer' }}
                />
                <input
                  type="text"
                  className="input-field"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  style={{ fontSize: '0.75rem', padding: '4px 8px' }}
                />
              </div>
            </div>
          </div>

          {/* Stickers */}
          <div>
            <span className="label-text">Add Stickers / Badges</span>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '6px' }}>
              {['🪔', '🛍️', '🔥', '✨', '🇮🇳', '🍕', '🏢', '🏷️', '📢', ''].map((stk) => (
                <button
                  key={stk || 'none'}
                  onClick={() => setSticker(stk)}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    background: sticker === stk ? 'rgba(124,58,237,0.2)' : 'rgba(255,255,255,0.03)',
                    border: sticker === stk ? '1px solid var(--accent-purple)' : '1px solid var(--border-glass)',
                    fontSize: '1.2rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'var(--transition-smooth)'
                  }}
                >
                  {stk || '🚫'}
                </button>
              ))}
            </div>
            
            {sticker && (
              <div style={{ marginTop: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  <span>Sticker Size</span>
                  <span>{stickerSize}px</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="140"
                  value={stickerSize}
                  onChange={(e) => setStickerSize(parseInt(e.target.value))}
                  style={{ width: '100%', marginTop: '4px', accentColor: 'var(--accent-purple)' }}
                />
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Image Uploader Panel */
        <div style={{
          padding: '30px 20px',
          border: '2px dashed var(--border-glass)',
          borderRadius: '12px',
          textAlign: 'center',
          background: 'rgba(255, 255, 255, 0.01)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px'
        }}>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            style={{ display: 'none' }}
          />
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'rgba(124, 58, 237, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-purple)'
          }}>
            <ImageIcon style={{ width: '30px', height: '30px' }} />
          </div>

          <div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="btn-neon-purple"
              style={{ padding: '8px 18px', fontSize: '0.8rem' }}
            >
              Select Image File
            </button>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '8px' }}>
              PNG, JPG, or WEBP up to 5MB (Recommends 2:1 ratio, e.g. 1200x600 px)
            </p>
          </div>

          {uploadedImage && (
            <div style={{
              width: '100%',
              padding: '12px',
              background: 'rgba(0,0,0,0.3)',
              borderRadius: '8px',
              border: '1px solid var(--border-glass)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', textAlign: 'left' }}>
                <img
                  src={uploadedImage}
                  alt="Thumbnail"
                  style={{ width: '60px', height: '30px', objectFit: 'cover', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.2)' }}
                />
                <div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-primary)', fontWeight: '600' }}>Custom_Campaign.png</p>
                  <p style={{ fontSize: '0.65rem', color: 'var(--accent-emerald)' }}>Successfully loaded</p>
                </div>
              </div>
              
              <button
                onClick={() => {
                  setUploadedImage(null);
                  setUploadedImageObj(null);
                  setUseUpload(false);
                }}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--accent-rose)',
                  fontSize: '0.7rem',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                Clear
              </button>
            </div>
          )}
        </div>
      )}

      {/* Export / Template status */}
      <div style={{
        padding: '12px 16px',
        background: 'rgba(16, 185, 129, 0.05)',
        border: '1px solid rgba(16, 185, 129, 0.2)',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        <div style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: 'var(--accent-emerald)',
          boxShadow: '0 0 8px var(--accent-emerald)'
        }} />
        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
          Poster outputs synced automatically with our 3D canvas render.
        </span>
      </div>
    </div>
  );
}
