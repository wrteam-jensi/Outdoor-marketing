'use client';

import React, { useState, useEffect, useRef } from 'react';
import { POSTER_TEMPLATES, AI_SLOGAN_SUGGESTIONS } from '@/utils/mockData';
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
  const [subtitleX, setSubtitleX] = useState(300);
  const [subtitleY, setSubtitleY] = useState(70);
  const [titleX, setTitleX] = useState(300);
  const [titleY, setTitleY] = useState(145);
  const [taglineX, setTaglineX] = useState(300);
  const [taglineY, setTaglineY] = useState(200);
  const [stickerX, setStickerX] = useState(300);
  const [stickerY, setStickerY] = useState(245);
  const [bgImageX, setBgImageX] = useState(0);
  const [bgImageY, setBgImageY] = useState(0);

  const [activeDragItem, setActiveDragItem] = useState(null); // 'subtitle', 'title', 'tagline', 'sticker', 'background'
  const [isOverItem, setIsOverItem] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedImageObj, setUploadedImageObj] = useState(null);
  const [useUpload, setUseUpload] = useState(false);
  const fileInputRef = useRef(null);

  // Background and overlay image upload states
  const [uploadedBgImage, setUploadedBgImage] = useState(null);
  const [uploadedBgImageObj, setUploadedBgImageObj] = useState(null);
  const [useBgImage, setUseBgImage] = useState(false);

  const [uploadedOverlayImage, setUploadedOverlayImage] = useState(null);
  const [uploadedOverlayImageObj, setUploadedOverlayImageObj] = useState(null);
  const [overlayImageX, setOverlayImageX] = useState(150);
  const [overlayImageY, setOverlayImageY] = useState(150);
  const [overlayImageSize, setOverlayImageSize] = useState(100);
  const [overlayImageHeightScale, setOverlayImageHeightScale] = useState(1.0);

  const bgImageInputRef = useRef(null);
  const overlayImageInputRef = useRef(null);

  const detectHoveredItem = (x, y) => {
    if (sticker) {
      const halfSize = stickerSize / 2;
      if (x >= stickerX - halfSize && x <= stickerX + halfSize && y >= stickerY - stickerSize && y <= stickerY + 10) {
        return 'sticker';
      }
    }
    if (uploadedOverlayImageObj) {
      const halfW = overlayImageSize / 2;
      const halfH = (overlayImageSize * overlayImageHeightScale) / 2;
      if (x >= overlayImageX - halfW && x <= overlayImageX + halfW && y >= overlayImageY - halfH && y <= overlayImageY + halfH) {
        return 'overlay';
      }
    }
    if (title && !useUpload) {
      const approxHalfWidth = (title.length * 24) / 2;
      if (x >= titleX - approxHalfWidth && x <= titleX + approxHalfWidth && y >= titleY - 48 && y <= titleY + 10) {
        return 'title';
      }
    }
    if (subtitle && !useUpload) {
      const approxHalfWidth = (subtitle.length * 9) / 2;
      if (x >= subtitleX - approxHalfWidth && x <= subtitleX + approxHalfWidth && y >= subtitleY - 18 && y <= subtitleY + 5) {
        return 'subtitle';
      }
    }
    if (tagline && !useUpload) {
      const approxHalfWidth = (tagline.length * 8) / 2;
      if (x >= taglineX - approxHalfWidth && x <= taglineX + approxHalfWidth && y >= taglineY - 16 && y <= taglineY + 5) {
        return 'tagline';
      }
    }
    if (useUpload && uploadedImageObj) {
      return 'background';
    }
    if (!useUpload && useBgImage && uploadedBgImageObj) {
      return 'background';
    }
    return null;
  };

  const getCanvasCoords = (e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const isTouch = e.touches && e.touches.length > 0;
    const clientX = isTouch ? e.touches[0].clientX : e.clientX;
    const clientY = isTouch ? e.touches[0].clientY : e.clientY;
    
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  };

  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const coords = getCanvasCoords(e, canvas);
    
    const item = detectHoveredItem(coords.x, coords.y);
    if (item) {
      setActiveDragItem(item);
      
      let itemX = 0;
      let itemY = 0;
      if (item === 'subtitle') { itemX = subtitleX; itemY = subtitleY; }
      else if (item === 'title') { itemX = titleX; itemY = titleY; }
      else if (item === 'tagline') { itemX = taglineX; itemY = taglineY; }
      else if (item === 'sticker') { itemX = stickerX; itemY = stickerY; }
      else if (item === 'overlay') { itemX = overlayImageX; itemY = overlayImageY; }
      else if (item === 'background') { itemX = bgImageX; itemY = bgImageY; }
      
      setDragOffset({
        x: coords.x - itemX,
        y: coords.y - itemY
      });
    }
  };

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const coords = getCanvasCoords(e, canvas);
    
    const hoverItem = detectHoveredItem(coords.x, coords.y);
    setIsOverItem(hoverItem);
    
    if (activeDragItem) {
      const deltaX = coords.x - dragOffset.x;
      const deltaY = coords.y - dragOffset.y;
      
      if (activeDragItem === 'subtitle') {
        setSubtitleX(Math.max(10, Math.min(canvas.width - 10, deltaX)));
        setSubtitleY(Math.max(15, Math.min(canvas.height - 5, deltaY)));
      } else if (activeDragItem === 'title') {
        setTitleX(Math.max(10, Math.min(canvas.width - 10, deltaX)));
        setTitleY(Math.max(40, Math.min(canvas.height - 10, deltaY)));
      } else if (activeDragItem === 'tagline') {
        setTaglineX(Math.max(10, Math.min(canvas.width - 10, deltaX)));
        setTaglineY(Math.max(15, Math.min(canvas.height - 5, deltaY)));
      } else if (activeDragItem === 'sticker') {
        setStickerX(Math.max(10, Math.min(canvas.width - 10, deltaX)));
        setStickerY(Math.max(20, Math.min(canvas.height - 5, deltaY)));
      } else if (activeDragItem === 'overlay') {
        setOverlayImageX(Math.max(10, Math.min(canvas.width - 10, deltaX)));
        setOverlayImageY(Math.max(10, Math.min(canvas.height - 10, deltaY)));
      } else if (activeDragItem === 'background') {
        setBgImageX(deltaX);
        setBgImageY(deltaY);
      }
    }
  };

  const handleMouseUp = () => {
    setActiveDragItem(null);
  };

  const handleTouchStart = (e) => {
    handleMouseDown(e);
  };

  const handleTouchMove = (e) => {
    if (activeDragItem) {
      e.preventDefault();
    }
    handleMouseMove(e);
  };

  const handleTouchEnd = () => {
    handleMouseUp();
  };

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
    setSubtitleX(300);
    setSubtitleY(70);
    setTitleX(300);
    setTitleY(145);
    setTaglineX(300);
    setTaglineY(200);
    setStickerX(300);
    setStickerY(245);
    setBgImageX(0);
    setBgImageY(0);
    
    setUploadedBgImage(null);
    setUploadedBgImageObj(null);
    setUseBgImage(false);
    setUploadedOverlayImage(null);
    setUploadedOverlayImageObj(null);
    setOverlayImageX(150);
    setOverlayImageY(150);
    setOverlayImageSize(100);
    
    setUseUpload(false);
  };

  // Auto AI slogan generation
  const applyAISlogan = (slogan) => {
    setTitle(slogan.headline);
    setSubtitle(slogan.sub);
    setTagline(slogan.tag);
  };

  const handleRandomAISlogan = () => {
    const randomIndex = Math.floor(Math.random() * AI_SLOGAN_SUGGESTIONS.length);
    applyAISlogan(AI_SLOGAN_SUGGESTIONS[randomIndex]);
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

  const handleBgImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setUploadedBgImage(event.target.result);
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        setUploadedBgImageObj(img);
        setUseBgImage(true);
      };
    };
    reader.readAsDataURL(file);
  };

  const handleOverlayImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setUploadedOverlayImage(event.target.result);
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        setUploadedOverlayImageObj(img);
        setOverlayImageHeightScale(img.height / img.width);
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
      // Draw uploaded custom flyer image at pan offsets bgImageX, bgImageY
      ctx.drawImage(uploadedImageObj, bgImageX, bgImageY, width, height);
      
      // Draw a subtle gloss/shimmer overlay to make it look professional
      const shimmer = ctx.createLinearGradient(0, 0, width, height);
      shimmer.addColorStop(0, 'rgba(255, 255, 255, 0.08)');
      shimmer.addColorStop(0.5, 'rgba(255, 255, 255, 0)');
      shimmer.addColorStop(1, 'rgba(0, 0, 0, 0.15)');
      ctx.fillStyle = shimmer;
      ctx.fillRect(0, 0, width, height);
    } else {
      if (useBgImage && uploadedBgImageObj) {
        // Draw custom background image at bgImageX, bgImageY
        ctx.drawImage(uploadedBgImageObj, bgImageX, bgImageY, width, height);
      } else {
        // Draw Gradient Background
        const grad = ctx.createLinearGradient(0, 0, width, height);
        grad.addColorStop(0, bgStart);
        grad.addColorStop(1, bgEnd);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      }

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
      ctx.fillText(subtitle.toUpperCase(), subtitleX, subtitleY);

      // Main Slogan (Title)
      ctx.font = '900 48px "Space Grotesk", sans-serif';
      ctx.fillStyle = textColor;
      ctx.textAlign = 'center';
      // Shadow glow effect
      ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
      ctx.shadowBlur = 6;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 3;
      ctx.fillText(title.toUpperCase(), titleX, titleY);
      
      // Reset Shadow for next items
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;

      // Tagline details
      ctx.font = 'italic 16px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.fillText(tagline, taglineX, taglineY);

      // Sticker drawing
      // Draw Uploaded Overlay Image/Logo if present
      if (uploadedOverlayImageObj) {
        const oWidth = overlayImageSize;
        const oHeight = overlayImageSize * overlayImageHeightScale;
        
        ctx.save();
        ctx.shadowColor = 'rgba(0,0,0,0.3)';
        ctx.shadowBlur = 8;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 4;
        
        ctx.drawImage(
          uploadedOverlayImageObj,
          overlayImageX - oWidth / 2,
          overlayImageY - oHeight / 2,
          oWidth,
          oHeight
        );
        ctx.restore();
      }

      // Sticker drawing
      if (sticker) {
        ctx.font = `${stickerSize}px Arial`;
        ctx.fillText(sticker, stickerX, stickerY);
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
    textColor, sticker, stickerSize,
    subtitleX, subtitleY, titleX, titleY, taglineX, taglineY, stickerX, stickerY, bgImageX, bgImageY,
    useBgImage, uploadedBgImageObj, uploadedOverlayImageObj, overlayImageX, overlayImageY, overlayImageSize, overlayImageHeightScale,
    useUpload, uploadedImageObj, canvasRef
  ]);

  return (
    <div className="glass-panel" style={{
      padding: '24px',
      border: '1px solid var(--border-glass)',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Palette style={{ color: 'var(--accent-purple)' }} /> Ad Poster Builder
          </h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Design a high-impact ad campaign or upload a flyer in seconds.
          </p>
        </div>

        {/* AI Suggestions Trigger */}
        {!useUpload && (
          <button
            onClick={handleRandomAISlogan}
            className="btn-outline"
            style={{
              padding: '6px 12px',
              fontSize: '0.75rem',
              borderColor: 'var(--accent-saffron)',
              color: 'var(--accent-saffron)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(249, 115, 22, 0.05)'
            }}
          >
            <Sparkles style={{ width: '12px', height: '12px' }} /> AI Slogan Magic
          </button>
        )}
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

      {/* Interactive Poster Canvas Viewport */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center', width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Type style={{ width: '12px', height: '12px', color: 'var(--accent-purple)' }} /> Interactive Canvas Preview
          </span>
          {sticker && <span style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>ℹ️ Drag & drop sticker to position</span>}
        </div>
        
        <canvas
          ref={canvasRef}
          width={600}
          height={300}
          style={{
            width: '100%',
            maxWidth: '600px',
            height: 'auto',
            aspectRatio: '2/1',
            border: activeDragItem ? '2px solid var(--accent-purple)' : '1px solid var(--border-glass)',
            borderRadius: '12px',
            background: 'var(--bg-primary)',
            cursor: activeDragItem ? 'grabbing' : (isOverItem ? 'grab' : 'default'),
            display: 'block',
            boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
            touchAction: 'none',
            transition: 'border-color 0.15s ease'
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        />
      </div>

      {/* Studio Options */}
      {!useUpload ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* AI Quick Slogan List */}
          <div>
            <span className="label-text" style={{ fontSize: '0.75rem', color: 'var(--accent-saffron)' }}>
              🪄 Localized Campaign Ideas (AI Suggested)
            </span>
            <div style={{
              display: 'flex',
              gap: '6px',
              overflowX: 'auto',
              paddingBottom: '6px',
              marginTop: '4px'
            }}>
              {AI_SLOGAN_SUGGESTIONS.map((sl, index) => (
                <button
                  key={index}
                  onClick={() => applyAISlogan(sl)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '8px',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid var(--border-glass)',
                    color: 'var(--text-secondary)',
                    fontSize: '0.7rem',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'var(--transition-smooth)'
                  }}
                  className="btn-outline-hover"
                >
                  ✨ {sl.category}
                </button>
              ))}
            </div>
          </div>

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
                    background: selectedTemplate.id === tpl.id ? 'rgba(99, 102, 241, 0.15)' : 'rgba(255,255,255,0.03)',
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
                maxLength={45}
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
                maxLength={65}
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
                    background: sticker === stk ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.03)',
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

          {/* Canvas Image Uploads (Background and Logo Overlay) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            borderTop: '1px solid var(--border-glass)',
            paddingTop: '20px'
          }}>
            {/* Background Image Upload */}
            <div>
              <span className="label-text" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-cyan)' }}>
                <Upload style={{ width: '12px', height: '12px' }} /> Upload Background Image
              </span>
              <p style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                Replaces gradient with custom image (pan by dragging).
              </p>
              
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <button
                  type="button"
                  onClick={() => bgImageInputRef.current?.click()}
                  className="btn-outline"
                  style={{ padding: '6px 12px', fontSize: '0.75rem', flex: 1 }}
                >
                  {uploadedBgImage ? 'Change Image' : 'Select Background'}
                </button>
                
                {uploadedBgImage && (
                  <button
                    type="button"
                    onClick={() => {
                      setUploadedBgImage(null);
                      setUploadedBgImageObj(null);
                      setUseBgImage(false);
                    }}
                    style={{
                      background: 'rgba(244, 63, 94, 0.1)',
                      border: '1px solid var(--accent-rose)',
                      borderRadius: '6px',
                      color: 'var(--accent-rose)',
                      padding: '6px 10px',
                      fontSize: '0.75rem',
                      cursor: 'pointer'
                    }}
                  >
                    Remove
                  </button>
                )}
              </div>
              
              <input
                type="file"
                ref={bgImageInputRef}
                onChange={handleBgImageUpload}
                accept="image/*"
                style={{ display: 'none' }}
              />

              {uploadedBgImage && (
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px', fontSize: '0.75rem', color: 'var(--text-primary)', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={useBgImage}
                    onChange={(e) => setUseBgImage(e.target.checked)}
                    style={{ accentColor: 'var(--accent-cyan)' }}
                  />
                  Use Custom Background
                </label>
              )}
            </div>

            {/* Overlay Image / Logo Upload */}
            <div>
              <span className="label-text" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-purple)' }}>
                <Upload style={{ width: '12px', height: '12px' }} /> Upload Logo / Overlay
              </span>
              <p style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                Adds a draggable overlay graphic or badge on top.
              </p>
              
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <button
                  type="button"
                  onClick={() => overlayImageInputRef.current?.click()}
                  className="btn-outline"
                  style={{ padding: '6px 12px', fontSize: '0.75rem', flex: 1 }}
                >
                  {uploadedOverlayImage ? 'Change Logo' : 'Select Logo/Image'}
                </button>
                
                {uploadedOverlayImage && (
                  <button
                    type="button"
                    onClick={() => {
                      setUploadedOverlayImage(null);
                      setUploadedOverlayImageObj(null);
                    }}
                    style={{
                      background: 'rgba(244, 63, 94, 0.1)',
                      border: '1px solid var(--accent-rose)',
                      borderRadius: '6px',
                      color: 'var(--accent-rose)',
                      padding: '6px 10px',
                      fontSize: '0.75rem',
                      cursor: 'pointer'
                    }}
                  >
                    Remove
                  </button>
                )}
              </div>
              
              <input
                type="file"
                ref={overlayImageInputRef}
                onChange={handleOverlayImageUpload}
                accept="image/*"
                style={{ display: 'none' }}
              />

              {uploadedOverlayImage && (
                <div style={{ marginTop: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                    <span>Overlay Size</span>
                    <span>{overlayImageSize}px</span>
                  </div>
                  <input
                    type="range"
                    min="40"
                    max="240"
                    value={overlayImageSize}
                    onChange={(e) => setOverlayImageSize(parseInt(e.target.value))}
                    style={{ width: '100%', marginTop: '4px', accentColor: 'var(--accent-purple)' }}
                  />
                </div>
              )}
            </div>
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
            background: 'rgba(99, 102, 241, 0.1)',
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
          Poster outputs synced automatically with our Three.js 3D screen.
        </span>
      </div>
    </div>
  );
}
