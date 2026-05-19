'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, Eye, Maximize2, Zap, RotateCcw } from 'lucide-react';

export default function Billboard3DPreview({ canvasRef, posterDataUrl, activeBillboard }) {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const textureRef = useRef(null);
  const billboardScreenRef = useRef(null);
  const requestRef = useRef(null);
  const [isRotating, setIsRotating] = useState(true);
  const [dayNightMode, setDayNightMode] = useState('day'); // 'night' or 'day'

  // Standard placeholder if no custom poster
  const fallbackUrl = activeBillboard?.image || 'https://images.unsplash.com/photo-1541535650810-10d26f5c2ab3?auto=format&fit=crop&w=800&q=80';

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth || 500;
    const height = 400;

    // 1. Scene setup with futuristic sky color
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(dayNightMode === 'night' ? 0x050409 : 0xbae6fd);
    scene.fog = new THREE.FogExp2(dayNightMode === 'night' ? 0x050409 : 0xbae6fd, 0.015);
    sceneRef.current = scene;

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    // Position camera looking slightly up at the billboard from the road
    camera.position.set(0, 5, 25);
    camera.lookAt(0, 8, 0);

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    // Clear previous canvas
    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(
      dayNightMode === 'night' ? 0x221144 : 0xffffff,
      dayNightMode === 'night' ? 0.6 : 1.2
    );
    scene.add(ambientLight);

    // Spotlight facing the billboard screen
    const spotLight = new THREE.SpotLight(0xffffff, dayNightMode === 'night' ? 8 : 2);
    spotLight.position.set(0, 18, 12);
    spotLight.angle = Math.PI / 4;
    spotLight.penumbra = 0.5;
    spotLight.castShadow = true;
    scene.add(spotLight);

    // Extra ground glow lights at night
    if (dayNightMode === 'night') {
      const roadLight1 = new THREE.PointLight(0x06b6d4, 2, 20);
      roadLight1.position.set(-15, 0.5, 5);
      scene.add(roadLight1);

      const roadLight2 = new THREE.PointLight(0x7c3aed, 2, 20);
      roadLight2.position.set(15, 0.5, 5);
      scene.add(roadLight2);
    }

    // 5. Creating Environment
    // Ground / Road Plane
    const groundGeo = new THREE.PlaneGeometry(100, 100);
    const groundMat = new THREE.MeshStandardMaterial({
      color: dayNightMode === 'night' ? 0x0c0b13 : 0x475569,
      roughness: 0.8,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Road Markings (White dashes on highway)
    const roadMarkingsGeo = new THREE.PlaneGeometry(1, 100);
    const roadMarkingsMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      opacity: dayNightMode === 'night' ? 0.3 : 0.8,
      transparent: true,
    });
    const roadMarkings = new THREE.Mesh(roadMarkingsGeo, roadMarkingsMat);
    roadMarkings.rotation.x = -Math.PI / 2;
    roadMarkings.position.set(0, 0.02, 0);
    scene.add(roadMarkings);

    // Highway side guard rails
    const railGeo = new THREE.BoxGeometry(0.2, 0.5, 100);
    const railMat = new THREE.MeshStandardMaterial({ color: 0x334155 });
    const railLeft = new THREE.Mesh(railGeo, railMat);
    railLeft.position.set(-10, 0.25, 0);
    const railRight = railLeft.clone();
    railRight.position.x = 10;
    scene.add(railLeft);
    scene.add(railRight);

    // 6. Billboard Structure
    // Main Unipole Steel Column
    const poleGeo = new THREE.CylinderGeometry(0.5, 0.6, 12, 16);
    const poleMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.8,
      roughness: 0.2
    });
    const pole = new THREE.Mesh(poleGeo, poleMat);
    pole.position.set(0, 6, 0);
    pole.castShadow = true;
    scene.add(pole);

    // Horizontal Support Frame
    const supportGeo = new THREE.BoxGeometry(10, 0.8, 1);
    const support = new THREE.Mesh(supportGeo, poleMat);
    support.position.set(0, 11.5, 0);
    support.castShadow = true;
    scene.add(support);

    // Back Panel
    const backGeo = new THREE.BoxGeometry(16, 8, 0.6);
    const backMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.5 });
    const backPanel = new THREE.Mesh(backGeo, backMat);
    backPanel.position.set(0, 12, 0);
    backPanel.castShadow = true;
    scene.add(backPanel);

    // Screen frame
    const frameGeo = new THREE.BoxGeometry(16.4, 8.4, 0.2);
    const frameMat = new THREE.MeshStandardMaterial({ color: 0x020617, metalness: 0.9, roughness: 0.1 });
    const frame = new THREE.Mesh(frameGeo, frameMat);
    frame.position.set(0, 12, 0.1);
    scene.add(frame);

    // 7. Billboard Screen (The actual advertisement texture)
    const screenGeo = new THREE.PlaneGeometry(15.6, 7.6);
    let screenMat;

    // Load initial texture
    const textureLoader = new THREE.TextureLoader();
    
    // We create a function to apply texture
    const updateBillboardTexture = () => {
      // If we have an active Canva canvas reference, create dynamic texture
      if (canvasRef && canvasRef.current) {
        try {
          const texture = new THREE.CanvasTexture(canvasRef.current);
          texture.colorSpace = THREE.SRGBColorSpace;
          textureRef.current = texture;
          
          if (billboardScreenRef.current) {
            billboardScreenRef.current.material.map = texture;
            billboardScreenRef.current.material.needsUpdate = true;
          }
        } catch (err) {
          console.warn("Failed canvas texture", err);
        }
      } else if (posterDataUrl) {
        textureLoader.load(posterDataUrl, (tex) => {
          tex.colorSpace = THREE.SRGBColorSpace;
          textureRef.current = tex;
          if (billboardScreenRef.current) {
            billboardScreenRef.current.material.map = tex;
            billboardScreenRef.current.material.needsUpdate = true;
          }
        });
      } else {
        textureLoader.load(fallbackUrl, (tex) => {
          tex.colorSpace = THREE.SRGBColorSpace;
          textureRef.current = tex;
          if (billboardScreenRef.current) {
            billboardScreenRef.current.material.map = tex;
            billboardScreenRef.current.material.needsUpdate = true;
          }
        });
      }
    };

    // Standard screen material
    screenMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.1,
      metalness: 0.1,
      emissive: new THREE.Color(0xffffff),
      emissiveIntensity: dayNightMode === 'night' ? 0.35 : 0.05, // glow at night
    });

    const billboardScreen = new THREE.Mesh(screenGeo, screenMat);
    billboardScreen.position.set(0, 12, 0.22);
    scene.add(billboardScreen);
    billboardScreenRef.current = billboardScreen;

    updateBillboardTexture();

    // 8. Simulated moving traffic: Small glowing neon boxes
    const cars = [];
    const carColors = [0xef4444, 0x06b6d4, 0x10b981, 0xfacc15];
    
    const createCar = (isIncoming) => {
      const color = carColors[Math.floor(Math.random() * carColors.length)];
      const carGeo = new THREE.BoxGeometry(0.6, 0.4, 1.2);
      const carMat = new THREE.MeshStandardMaterial({
        color: color,
        emissive: new THREE.Color(color),
        emissiveIntensity: dayNightMode === 'night' ? 1.5 : 0.2
      });
      const carMesh = new THREE.Mesh(carGeo, carMat);
      
      // Position
      const x = isIncoming ? -3.5 : 3.5;
      const z = isIncoming ? 50 : -50;
      carMesh.position.set(x, 0.25, z);
      scene.add(carMesh);
      
      // Add small glowing headlight meshes
      const lightGeo = new THREE.SphereGeometry(0.1, 8, 8);
      const lightMat = new THREE.MeshBasicMaterial({ color: isIncoming ? 0xffffff : 0xff3333 });
      
      const light1 = new THREE.Mesh(lightGeo, lightMat);
      light1.position.set(-0.2, 0, isIncoming ? -0.6 : 0.6);
      carMesh.add(light1);

      const light2 = light1.clone();
      light2.position.x = 0.2;
      carMesh.add(light2);

      return {
        mesh: carMesh,
        speed: (Math.random() * 0.4 + 0.3) * (isIncoming ? -1 : 1),
        isIncoming
      };
    };

    // Spawn initial cars
    for (let i = 0; i < 8; i++) {
      const isIncoming = Math.random() > 0.5;
      const car = createCar(isIncoming);
      car.mesh.position.z = Math.random() * 100 - 50;
      cars.push(car);
    }

    // 9. Animation loop
    let angle = 0;
    const animate = () => {
      requestRef.current = requestAnimationFrame(animate);

      // Slow camera panning around the billboard
      if (isRotating) {
        angle += 0.003;
        camera.position.x = Math.sin(angle) * 22;
        camera.position.z = Math.cos(angle) * 16 + 10;
        camera.position.y = 5 + Math.sin(angle * 2) * 1.5;
        camera.lookAt(0, 10, 0);
      }

      // Animate cars on the highway
      cars.forEach((car, index) => {
        car.mesh.position.z += car.speed;
        
        // Reset cars that go out of bounds
        if (car.isIncoming && car.mesh.position.z < -50) {
          car.mesh.position.z = 50;
        } else if (!car.isIncoming && car.mesh.position.z > 50) {
          car.mesh.position.z = -50;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    // 10. Resize handler
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current) return;
      const w = containerRef.current.clientWidth;
      camera.aspect = w / height;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(w, height);
    };

    window.addEventListener('resize', handleResize);

    // Watch for texture updates on interval in case canvas drawing is busy
    const interval = setInterval(() => {
      if (canvasRef && canvasRef.current && textureRef.current) {
        textureRef.current.needsUpdate = true;
        if (billboardScreenRef.current) {
          billboardScreenRef.current.material.emissiveIntensity = dayNightMode === 'night' ? 0.35 : 0.05;
        }
      }
    }, 400);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(interval);
      cancelAnimationFrame(requestRef.current);
      if (rendererRef.current && rendererRef.current.domElement) {
        rendererRef.current.dispose();
      }
      groundGeo.dispose();
      groundMat.dispose();
      poleGeo.dispose();
      poleMat.dispose();
      supportGeo.dispose();
      backGeo.dispose();
      backMat.dispose();
      frameGeo.dispose();
      frameMat.dispose();
      screenGeo.dispose();
      screenMat.dispose();
      if (textureRef.current) textureRef.current.dispose();
      cars.forEach(car => {
        scene.remove(car.mesh);
        car.mesh.geometry.dispose();
        car.mesh.material.dispose();
      });
    };
  }, [posterDataUrl, activeBillboard, canvasRef, isRotating, dayNightMode]);

  return (
    <div className="glass-panel" style={{
      padding: '20px',
      border: '1px solid var(--border-glass)',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Glow highlight */}
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '120px',
        height: '120px',
        background: 'radial-gradient(circle, var(--accent-cyan-glow) 0%, transparent 70%)',
        zIndex: 0,
        pointerEvents: 'none'
      }} />

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Eye style={{ color: 'var(--accent-cyan)', width: '20px', height: '20px' }} />
          <h3 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-mono)' }}>Live OOH 3D View</h3>
          <span className="badge badge-cyan" style={{ fontSize: '0.65rem' }}>Three.js Engine</span>
        </div>
        
        {/* Day / Night toggle */}
        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            onClick={() => setDayNightMode(prev => prev === 'night' ? 'day' : 'night')}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid var(--border-glass)',
              color: 'var(--text-primary)',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'var(--transition-smooth)'
            }}
            className="btn-outline-hover"
          >
            <Zap style={{ width: '12px', height: '12px', color: '#fbbf24' }} />
            {dayNightMode === 'night' ? '🌙 Night Glow' : '☀️ Day Lighting'}
          </button>

          <button
            onClick={() => setIsRotating(prev => !prev)}
            style={{
              padding: '6px 10px',
              borderRadius: '8px',
              background: isRotating ? 'rgba(6, 182, 212, 0.15)' : 'rgba(255,255,255,0.05)',
              border: isRotating ? '1px solid var(--accent-cyan)' : '1px solid var(--border-glass)',
              color: isRotating ? 'var(--accent-cyan)' : 'var(--text-primary)',
              fontSize: '0.75rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            title="Toggle Camera Orbit"
          >
            <RotateCcw style={{ width: '14px', height: '14px', transform: isRotating ? 'none' : 'rotate(180deg)', transition: 'var(--transition-smooth)' }} />
          </button>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div
        ref={containerRef}
        style={{
          width: '100%',
          height: '400px',
          borderRadius: '12px',
          background: '#040307',
          border: '1px solid rgba(255,255,255,0.05)',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: 'inset 0 0 40px rgba(0,0,0,0.8)',
          cursor: 'grab'
        }}
      />

      {/* Info details */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'rgba(0,0,0,0.3)',
        padding: '12px 16px',
        borderRadius: '10px',
        border: '1px solid rgba(255,255,255,0.03)',
        fontSize: '0.8rem',
        color: 'var(--text-secondary)'
      }}>
        <div>
          <p style={{ fontWeight: '600', color: 'var(--text-primary)' }}>
            {activeBillboard?.title || 'Cyber Hub Highway Board'}
          </p>
          <p style={{ fontSize: '0.75rem' }}>
            📍 {activeBillboard?.location || 'Gurugram Expressway'} | Size: {activeBillboard?.size || '40x20 ft'}
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span className="badge badge-purple" style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
            <Sparkles style={{ width: '10px', height: '10px' }} /> Realtime Sync
          </span>
          <p style={{ fontSize: '0.7rem', marginTop: '4px' }}>WebGl 60 FPS</p>
        </div>
      </div>
    </div>
  );
}
