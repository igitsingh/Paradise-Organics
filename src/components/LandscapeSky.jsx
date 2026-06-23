import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTexture, Clouds, Cloud } from '@react-three/drei';

// Create a soft glowing dot texture for atmospheric gold spores
function createDotTexture() {
  if (typeof window === 'undefined') return null;
  const canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext('2d');
  const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
  grad.addColorStop(0, 'rgba(255, 215, 0, 1.0)');
  grad.addColorStop(0.3, 'rgba(179, 138, 61, 0.8)');
  grad.addColorStop(1, 'rgba(179, 138, 61, 0.0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 32, 32);
  return new THREE.CanvasTexture(canvas);
}

export default function LandscapeSky({ state3D }) {
  const terrainRef = useRef();
  const bgTerrainRef = useRef();
  const highlightRef = useRef();
  const sporesRef = useRef();
  const cloudsGroupRef = useRef();

  const dotTexture = useMemo(() => createDotTexture(), []);
  
  // Load the photorealistic terrain map
  const terrainMap = useTexture('/images/terrain-map.png');
  terrainMap.wrapS = THREE.RepeatWrapping;
  terrainMap.wrapT = THREE.RepeatWrapping;
  // Repeat the texture across the geometry
  terrainMap.repeat.set(1.5, 1.5);
  terrainMap.colorSpace = THREE.SRGBColorSpace;

  // 1. Detailed Foreground Mountain Terrain (Displaced 3D mesh mapped with realistic texture)
  const terrainGeometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(300, 300, 200, 200);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      
      let z = Math.sin(x * 0.02) * Math.cos(y * 0.02) * 14;
      z += Math.sin(x * 0.05 + 1.5) * Math.sin(y * 0.04 - 0.7) * 4;
      z += Math.cos(x * 0.12) * Math.sin(y * 0.10) * 1.5;
      z += Math.sin(x * 0.25) * Math.cos(y * 0.22) * 0.5;

      // Flatten field center
      const dist = Math.sqrt(x * x + y * y);
      if (dist < 25) {
        const factor = dist / 25;
        z = THREE.MathUtils.lerp(1.2, z, Math.pow(factor, 3));
      }
      pos.setZ(i, z);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  // 2. Distant Background Mountain Range
  const bgTerrainGeometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(600, 600, 60, 60);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      
      let z = Math.sin(x * 0.01) * Math.cos(y * 0.01) * 35;
      z += Math.cos(x * 0.03 + 2.0) * Math.sin(y * 0.03) * 12;
      pos.setZ(i, z);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  // 3. Gold spores floating above the field (magical atmospheric particles)
  const [sporePositions, sporeSpeeds] = useMemo(() => {
    const count = 150;
    const positions = new Float32Array(count * 3);
    const speeds = [];

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 1] = 2 + Math.random() * 15;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 60;

      speeds.push({
        x: (Math.random() - 0.5) * 0.02,
        y: 0.01 + Math.random() * 0.02,
        z: (Math.random() - 0.5) * 0.02
      });
    }
    return [positions, speeds];
  }, []);

  // Animation Frame updates
  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    const opacity = state3D.terrainOpacity;

    // 1. Fade foreground terrain
    if (terrainRef.current) {
      terrainRef.current.material.opacity = opacity;
      terrainRef.current.material.transparent = opacity < 1.0;
      terrainRef.current.visible = opacity > 0.001;
    }

    // 2. Fade background terrain
    if (bgTerrainRef.current) {
      bgTerrainRef.current.material.opacity = opacity * 0.6; // keep distant horizon misty
      bgTerrainRef.current.material.transparent = true;
      bgTerrainRef.current.visible = opacity > 0.001;
    }

    // 2b. Fade clouds
    if (cloudsGroupRef.current) {
      cloudsGroupRef.current.traverse((child) => {
        if (child.isMesh && child.material) {
          child.material.transparent = true;
          child.material.opacity = opacity * 0.8;
        }
      });
      cloudsGroupRef.current.visible = opacity > 0.001;
    }

    // 3. Animate highlighted field glow circle
    if (highlightRef.current && opacity > 0.001) {
      const pulse = 1.0 + Math.sin(elapsedTime * 2.5) * 0.08;
      highlightRef.current.scale.set(pulse, pulse, pulse);
      highlightRef.current.material.emissiveIntensity = state3D.terrainGlow * 3.5;
      highlightRef.current.material.opacity = opacity * state3D.terrainGlow;
      highlightRef.current.visible = opacity > 0.001;
    }

    // 4. Animate gold spores drift
    if (sporesRef.current && opacity > 0.001) {
      const posAttr = sporesRef.current.geometry.attributes.position;
      const count = posAttr.count;

      for (let i = 0; i < count; i++) {
        let x = posAttr.getX(i);
        let y = posAttr.getY(i);
        let z = posAttr.getZ(i);

        const speed = sporeSpeeds[i];
        y += speed.y * 0.2;
        x += Math.sin(elapsedTime + i) * 0.008;
        z += Math.cos(elapsedTime + i) * 0.008;

        if (y > 20) y = 2; // reset height

        posAttr.setXYZ(i, x, y, z);
      }
      posAttr.needsUpdate = true;
      sporesRef.current.material.opacity = opacity * 0.8;
      sporesRef.current.visible = opacity > 0.001;
    }
  });

  return (
    <group>
      {/* 1. FOREGROUND DETAILED MOUNTAIN TERRAIN */}
      <mesh
        ref={terrainRef}
        geometry={terrainGeometry}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        receiveShadow
        castShadow
      >
        <meshStandardMaterial
          map={terrainMap}
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>

      {/* 2. BACKGROUND HORIZON MOUNTAIN RANGE */}
      <mesh
        ref={bgTerrainRef}
        geometry={bgTerrainGeometry}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -8, -150]}
        receiveShadow
      >
        <meshStandardMaterial
          map={terrainMap}
          roughness={1.0}
          metalness={0.0}
        />
      </mesh>

      {/* 3. HIGHLIGHTED GLOWING FIELD RING */}
      <mesh
        ref={highlightRef}
        position={[0, 1.45, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <ringGeometry args={[0, 4.0, 64]} />
        <meshStandardMaterial
          color="#ffd700"
          emissive="#ff8c00"
          emissiveIntensity={0}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* 4. ATMOSPHERIC GOLD SPORES */}
      <points ref={sporesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[sporePositions, 3]}
          />
        </bufferGeometry>
        {dotTexture && (
          <pointsMaterial
            map={dotTexture}
            size={0.15}
            sizeAttenuation={true}
            transparent
            opacity={0}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        )}
      </points>

      {/* 5. VOLUMETRIC REAL CLOUDS (High Altitude Atmosphere) */}
      <group ref={cloudsGroupRef} position={[0, 180, 150]}>
        <Clouds material={THREE.MeshBasicMaterial}>
          {/* Dense core layer covering the initial camera view */}
          <Cloud seed={1} segments={80} bounds={[200, 30, 150]} volume={120} color="#ffffff" speed={0.1} position={[0, 0, 0]} />
          <Cloud seed={2} segments={60} bounds={[150, 40, 100]} volume={100} color="#f4f6f0" speed={0.15} position={[50, -10, 20]} />
          <Cloud seed={3} segments={60} bounds={[150, 30, 100]} volume={100} color="#f4f6f0" speed={0.15} position={[-50, 10, 10]} />
          {/* Lower atmospheric clouds closer to the terrain */}
          <Cloud seed={4} segments={50} bounds={[120, 20, 120]} volume={80} color="#ffffff" speed={0.05} position={[0, -40, -40]} />
        </Clouds>
      </group>
    </group>
  );
}
