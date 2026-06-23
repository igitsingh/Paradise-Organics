import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Create procedural texture for the root skin/bark
function createRootSkinTexture() {
  if (typeof window === 'undefined') return null;

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Base earthy brown-orange color
  ctx.fillStyle = '#4c2b17';
  ctx.fillRect(0, 0, 512, 512);

  // Organic rings/bands (darker horizontal segments)
  ctx.fillStyle = '#2c160a';
  for (let i = 0; i < 18; i++) {
    const y = Math.random() * 512;
    const h = 4 + Math.random() * 12;
    ctx.fillRect(0, y, 512, h);
  }

  // Grainy speckles / dirt nodules
  for (let i = 0; i < 150; i++) {
    ctx.fillStyle = Math.random() > 0.5 ? '#1a0d05' : '#8a5937';
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const r = 1 + Math.random() * 3;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Horizontal fibrous lines
  ctx.strokeStyle = '#5a3721';
  ctx.lineWidth = 1;
  for (let i = 0; i < 40; i++) {
    const y = Math.random() * 512;
    ctx.beginPath();
    ctx.moveTo(0, y);
    for (let x = 0; x < 512; x += 15) {
      ctx.lineTo(x, y + (Math.random() - 0.5) * 8);
    }
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

// Create procedural texture for the sliced glowing core
function createRootCutTexture() {
  if (typeof window === 'undefined') return null;

  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  // Deep orange base (high-curcumin content indicator)
  ctx.fillStyle = '#d65200';
  ctx.fillRect(0, 0, 256, 256);

  // Concentric cellular layers
  for (let r = 15; r < 120; r += 12) {
    ctx.strokeStyle = Math.random() > 0.5 ? '#ff9900' : '#802f00';
    ctx.lineWidth = 2 + Math.random() * 3;
    ctx.beginPath();
    ctx.arc(128, 128, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Extremely vibrant glowing center core
  const grad = ctx.createRadialGradient(128, 128, 0, 128, 128, 45);
  grad.addColorStop(0, '#fff4cc'); // Golden white hot center
  grad.addColorStop(0.3, '#ffcc00'); // Intense yellow
  grad.addColorStop(0.7, '#ff6a00'); // Rich turmeric orange
  grad.addColorStop(1.0, '#a33b00');
  
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(128, 128, 45, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

// Create soft particle dot texture for powder particles
function createSparkTexture() {
  if (typeof window === 'undefined') return null;
  const canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext('2d');
  const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
  grad.addColorStop(0, 'rgba(255, 215, 0, 1.0)'); // central gold
  grad.addColorStop(0.25, 'rgba(179, 138, 61, 0.7)');
  grad.addColorStop(1, 'rgba(179, 138, 61, 0.0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 32, 32);
  return new THREE.CanvasTexture(canvas);
}

export default function GoldenRoot({ state3D }) {
  const rootGroupRef = useRef();
  const rootMeshRef = useRef();
  const cutFaceRef = useRef();
  const powderParticlesRef = useRef();

  const skinTexture = useMemo(() => createRootSkinTexture(), []);
  const cutTexture = useMemo(() => createRootCutTexture(), []);
  const sparkTexture = useMemo(() => createSparkTexture(), []);

  // 1. Procedural Turmeric Root geometry (Wrinkly cylinder)
  const rootGeometry = useMemo(() => {
    const geo = new THREE.CylinderGeometry(0.7, 0.5, 3.2, 32, 32, true);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);
      
      const angle = Math.atan2(z, x);
      
      let bump = Math.sin(y * 4.5) * Math.cos(angle * 3.0) * 0.14;
      bump += Math.sin(angle * 5.0) * 0.08;
      bump += Math.sin(y * 14.0) * 0.035; // circular ring grooves
      
      const newRadius = 0.6 + bump;
      pos.setX(i, Math.cos(angle) * newRadius);
      pos.setZ(i, Math.sin(angle) * newRadius);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  // 2. Dissolution particle settings
  const particleCount = 2800;
  const initialParticleData = useMemo(() => {
    const data = [];
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 0.1 + Math.random() * 0.55;
      const y = -11.5 + Math.random() * 3.0;
      data.push({
        angle,
        radius,
        y,
        speed: 0.8 + Math.random() * 1.6,
        noiseOffset: Math.random() * 100
      });
    }
    return data;
  }, []);

  const particlePositions = useMemo(() => {
    const arr = new Float32Array(particleCount * 3);
    initialParticleData.forEach((p, index) => {
      arr[index * 3] = Math.cos(p.angle) * p.radius;
      arr[index * 3 + 1] = p.y;
      arr[index * 3 + 2] = Math.sin(p.angle) * p.radius;
    });
    return arr;
  }, [initialParticleData]);

  // Frame animation loop
  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    const dissolve = state3D.rootDissolve;
    const opacity = state3D.rootOpacity;

    // Solid root animations
    if (rootGroupRef.current) {
      rootGroupRef.current.visible = opacity > 0.001;
      const scale = 1.0 - dissolve * 0.95;
      rootGroupRef.current.scale.set(scale, scale, scale);
      
      // Slow showcase rotation
      rootGroupRef.current.rotation.y = elapsedTime * 0.3;

      if (rootMeshRef.current && rootMeshRef.current.material) {
        rootMeshRef.current.material.opacity = opacity * (1.0 - dissolve);
        rootMeshRef.current.material.transparent = true;
      }
      if (cutFaceRef.current && cutFaceRef.current.material) {
        cutFaceRef.current.material.opacity = opacity * (1.0 - dissolve);
        cutFaceRef.current.material.transparent = true;
        // Pulse the emissive brightness of the golden core
        cutFaceRef.current.material.emissiveIntensity = 2.0 + Math.sin(elapsedTime * 3.5) * 0.6;
      }
    }

    // Dissolution swirl animations
    if (powderParticlesRef.current && opacity > 0.001) {
      const posAttr = powderParticlesRef.current.geometry.attributes.position;
      
      initialParticleData.forEach((p, i) => {
        let radius = p.radius;
        let angle = p.angle;
        let y = p.y;

        if (dissolve > 0.01) {
          const angleSpeed = p.speed * 4.5;
          angle = p.angle + dissolve * angleSpeed + elapsedTime * 0.3;
          
          // Volumetric expansion swirl
          const widthOsc = 1.0 + Math.sin(elapsedTime * 2.0 + p.noiseOffset) * 0.4;
          radius = THREE.MathUtils.lerp(p.radius, 1.0 + dissolve * 4.0 * widthOsc, dissolve);
          
          // Sink down towards the jar (y = -20)
          y = THREE.MathUtils.lerp(p.y, -20.0 + Math.sin(angle * 1.5) * 1.5, dissolve);
        }

        posAttr.setXYZ(i, Math.cos(angle) * radius, y, Math.sin(angle) * radius);
      });

      posAttr.needsUpdate = true;

      const particleOpacity = opacity * (dissolve > 0.01 ? Math.min(1.0, dissolve * 2.0) : 0.0) * (1.0 - state3D.productOpacity);
      powderParticlesRef.current.material.opacity = particleOpacity;
      powderParticlesRef.current.visible = particleOpacity > 0.001;
    }
  });

  return (
    <group position={[0, -10, 0]}>
      
      {/* 3D ORGANIC TURMERIC ROOT */}
      <group ref={rootGroupRef}>
        
        {/* Wrinkled skin/bark */}
        <mesh ref={rootMeshRef} geometry={rootGeometry} castShadow receiveShadow>
          <meshStandardMaterial
            map={skinTexture}
            roughness={0.95}
            metalness={0.0}
            bumpScale={0.12}
          />
        </mesh>

        {/* Sliced glowing curcumin core */}
        <mesh
          ref={cutFaceRef}
          position={[0, 1.6, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          receiveShadow
        >
          <circleGeometry args={[0.7, 32]} />
          <meshStandardMaterial
            map={cutTexture}
            color="#ffffff"
            emissive="#e65c00"
            emissiveIntensity={2.0}
            roughness={0.2}
            metalness={0.6}
          />
        </mesh>

        {/* Closed bottom cap */}
        <mesh
          position={[0, -1.6, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          receiveShadow
        >
          <circleGeometry args={[0.5, 32]} />
          <meshStandardMaterial
            map={skinTexture}
            roughness={0.95}
            metalness={0.0}
          />
        </mesh>
      </group>

      {/* SWIRLING GOLD SPARKS DUST */}
      <points ref={powderParticlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        {sparkTexture && (
          <pointsMaterial
            map={sparkTexture}
            color="#ffd700"
            size={0.12}
            sizeAttenuation={true}
            transparent
            opacity={0}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        )}
      </points>

    </group>
  );
}
