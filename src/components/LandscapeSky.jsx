import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTexture, Clouds, Cloud } from '@react-three/drei';

// ─── Texture Generators ───────────────────────────────────────────────────────

function createDotTexture() {
  if (typeof window === 'undefined') return null;
  const canvas = document.createElement('canvas');
  canvas.width = 32; canvas.height = 32;
  const ctx = canvas.getContext('2d');
  const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
  grad.addColorStop(0, 'rgba(191, 147, 15, 1.0)'); // #BF930F
  grad.addColorStop(0.3, 'rgba(191, 147, 15, 0.8)');
  grad.addColorStop(1, 'rgba(191, 147, 15, 0.0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 32, 32);
  return new THREE.CanvasTexture(canvas);
}

// Generates a broad, tropical turmeric leaf texture on a canvas
function createTurmericLeafTexture() {
  if (typeof window === 'undefined') return null;
  const canvas = document.createElement('canvas');
  canvas.width = 128; canvas.height = 256;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 128, 256);

  // Broad leaf shape
  ctx.beginPath();
  ctx.moveTo(64, 250);
  ctx.bezierCurveTo(20, 180, 10, 80, 64, 10);
  ctx.bezierCurveTo(118, 80, 108, 180, 64, 250);
  ctx.closePath();

  const grad = ctx.createLinearGradient(64, 250, 64, 10);
  grad.addColorStop(0, '#2d4a14');
  grad.addColorStop(0.4, '#5c8a22');
  grad.addColorStop(1, '#96c93d');
  ctx.fillStyle = grad;
  ctx.fill();

  // Center vein
  ctx.beginPath();
  ctx.moveTo(64, 250);
  ctx.quadraticCurveTo(68, 130, 64, 15);
  ctx.strokeStyle = '#c5de6a';
  ctx.lineWidth = 4;
  ctx.stroke();

  // Side veins
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = 'rgba(197, 222, 106, 0.4)';
  for (let y = 220; y > 60; y -= 28) {
    ctx.beginPath(); ctx.moveTo(64, y);
    ctx.quadraticCurveTo(36, y - 30, 18, y - 45);
    ctx.stroke();
    ctx.beginPath(); ctx.moveTo(64, y);
    ctx.quadraticCurveTo(92, y - 30, 110, y - 45);
    ctx.stroke();
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// ─── Turmeric Field ───────────────────────────────────────────────────────────
// Uses large number of tiny crops with glowing circles under them

function TurmericField({ getElevation, state3D }) {
  const plantsRef = useRef();
  const circlesRef = useRef();
  
  // Dense grid across a huge area: -500 to 2100 (2600 units) x -200 to 1000 (1200 units)
  // 130 columns x 60 rows = ~7800 plants. 
  // With cross planes, 15,600 instances.
  const COLUMNS = 130;
  const ROWS = 60;
  const TOTAL_PLANTS = COLUMNS * ROWS;
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const dummyCircle = useMemo(() => new THREE.Object3D(), []);
  const color = new THREE.Color();
  const leafTex = useMemo(() => createTurmericLeafTexture(), []);

  // Small plants (e.g. 6x12)
  const planeGeo = useMemo(() => {
    const geo = new THREE.PlaneGeometry(6, 12, 1, 3);
    geo.translate(0, 6, 0); // pivot at bottom
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const yFrac = pos.getY(i) / 12;
      pos.setZ(i, pos.getZ(i) - Math.sin(yFrac * Math.PI) * 1.5);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  // Tiny circle under each plant
  const circleGeo = useMemo(() => {
    return new THREE.CircleGeometry(2.5, 16);
  }, []);

  React.useEffect(() => {
    if (!plantsRef.current || !circlesRef.current) return;
    let pCount = 0;
    let cCount = 0;

    const startX = -500;
    const startZ = -200;
    const stepX = 20; // 2600 / 130
    const stepZ = 20; // 1200 / 60

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLUMNS; c++) {
        // Skip the very center where the main huge glowing circle will be
        const x = startX + c * stepX + (Math.random() - 0.5) * 6;
        const z = startZ + r * stepZ + (Math.random() - 0.5) * 6;
        
        // Skip an area around [800, 400] for the main dive
        const distToCenter = Math.hypot(x - 800, z - 400);
        if (distToCenter < 15) continue;

        const elev = getElevation(x, z);
        const worldY = elev - 20;

        // 1. Setup the Tiny Glowing Circle
        dummyCircle.position.set(x, worldY + 0.1, z);
        dummyCircle.rotation.set(-Math.PI / 2, 0, 0);
        dummyCircle.scale.set(1, 1, 1);
        dummyCircle.updateMatrix();
        circlesRef.current.setMatrixAt(cCount++, dummyCircle.matrix);

        // 2. Setup the Plant (Crossed planes)
        const s = 0.6 + Math.random() * 0.5;
        const baseRotY = Math.random() * Math.PI;

        const v = Math.random();
        if (v < 0.3) color.set('#3a6016');
        else if (v < 0.7) color.set('#5c9e22');
        else color.set('#88c43a');

        // Plane 1
        dummy.position.set(x, worldY, z);
        dummy.rotation.set(0, baseRotY, 0);
        dummy.scale.set(s, s, s);
        dummy.updateMatrix();
        plantsRef.current.setMatrixAt(pCount, dummy.matrix);
        plantsRef.current.setColorAt(pCount, color);
        pCount++;

        // Plane 2
        dummy.rotation.set(0, baseRotY + Math.PI / 2, 0);
        dummy.updateMatrix();
        plantsRef.current.setMatrixAt(pCount, dummy.matrix);
        plantsRef.current.setColorAt(pCount, color);
        pCount++;
      }
    }

    plantsRef.current.count = pCount;
    plantsRef.current.instanceMatrix.needsUpdate = true;
    if (plantsRef.current.instanceColor) plantsRef.current.instanceColor.needsUpdate = true;

    circlesRef.current.count = cCount;
    circlesRef.current.instanceMatrix.needsUpdate = true;
  }, [getElevation]);

  useFrame(() => {
    const op = state3D.terrainOpacity;
    if (plantsRef.current) {
      plantsRef.current.material.opacity = op;
      plantsRef.current.visible = op > 0.001;
    }
    if (circlesRef.current) {
      // Glow comes alive based on terrainGlow
      circlesRef.current.material.opacity = op * state3D.terrainGlow * 0.8;
      circlesRef.current.visible = op > 0.001 && state3D.terrainGlow > 0.01;
    }
  });

  return (
    <group>
      {/* The Plants */}
      <instancedMesh ref={plantsRef} args={[planeGeo, null, TOTAL_PLANTS * 2]}>
        <meshStandardMaterial
          map={leafTex}
          alphaTest={0.3}
          transparent
          side={THREE.DoubleSide}
          roughness={0.8}
          metalness={0.0}
        />
      </instancedMesh>
      
      {/* The Tiny Glowing Circles under each plant */}
      <instancedMesh ref={circlesRef} args={[circleGeo, null, TOTAL_PLANTS]}>
        <meshStandardMaterial
          color="#BF930F"
          emissive="#BF930F"
          emissiveIntensity={1.5}
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </instancedMesh>
    </group>
  );
}

// ─── Rain ─────────────────────────────────────────────────────────────────────

function RainParticles({ state3D }) {
  const rainRef = useRef();
  const [positions, speeds] = useMemo(() => {
    const count = 3000;
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = 800 + (Math.random() - 0.5) * 2000;
      pos[i * 3 + 1] = Math.random() * 2200;
      pos[i * 3 + 2] = 400 + (Math.random() - 0.5) * 2000;
      spd[i] = 25 + Math.random() * 20;
    }
    return [pos, spd];
  }, []);

  useFrame(() => {
    if (!rainRef.current) return;
    const opacity = state3D.rainIntensity * state3D.terrainOpacity;
    rainRef.current.material.opacity = opacity;
    rainRef.current.visible = opacity > 0.001;
    if (opacity > 0.001) {
      const posAttr = rainRef.current.geometry.attributes.position;
      for (let i = 0; i < 3000; i++) {
        let y = posAttr.getY(i) - speeds[i];
        if (y < -20) y = 2200;
        posAttr.setY(i, y);
      }
      posAttr.needsUpdate = true;
    }
  });

  return (
    <points ref={rainRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={3000} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#aad4f5" size={4.0} transparent opacity={0} depthWrite={false} />
    </points>
  );
}

// ─── Main Landscape ───────────────────────────────────────────────────────────

export default function LandscapeSky({ state3D }) {
  const terrainRef = useRef();
  const highlightRef = useRef();
  const sporesRef = useRef();
  const cloudsGroupRef = useRef();

  const dotTexture = useMemo(() => createDotTexture(), []);

  const terrainMap = useTexture('/images/terrain-map.png');
  terrainMap.wrapS = THREE.RepeatWrapping;
  terrainMap.wrapT = THREE.RepeatWrapping;
  // Reduce repeat to stretch the texture wider across the world, making hills look larger
  terrainMap.repeat.set(2, 2);
  terrainMap.colorSpace = THREE.SRGBColorSpace;

  // ── Shared elevation function ──
  // Returns world-space Y height for any (x, z) coordinate on the terrain.
  const getElevation = useMemo(() => {
    return (x, z) => {
      // Cinematic mountains at edges
      const dx = Math.abs(x - 800);
      const dz = Math.abs(z - 400);
      
      // We want a flat field area up to dx=1400, dz=1000
      // Outside that, we blend smoothly into majestic mountains.
      let h = 0;
      let edgeX = Math.max(0, dx - 1400) / 1000; // 0 to 1 over 1000 units
      let edgeZ = Math.max(0, dz - 1000) / 1000;
      let blend = Math.min(1, Math.sqrt(edgeX*edgeX + edgeZ*edgeZ));
      
      if (blend > 0) {
        // Smoothstep the blend for natural curving
        const b = blend * blend * (3 - 2 * blend);
        
        let noise = (Math.sin(x * 0.0015) + Math.sin(z * 0.0015)) * 400;
        noise += (Math.sin(x * 0.004 + 1) + Math.cos(z * 0.004 + 1)) * 150;
        // Make noise strictly non-negative mountains
        noise = Math.max(0, noise + 300);
        
        h = b * noise;
      }
      
      // Add extremely subtle bumps to the flat field
      h += Math.sin(x * 0.001) * Math.cos(z * 0.001) * 30;
      
      return h;
    };
  }, []);

  // ── Build Terrain Geometry ──
  const terrainGeometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(12000, 12000, 200, 200);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      // PlaneGeometry has X right, Y up in its local space. 
      // When rotated -Math.PI/2 on X, local Y becomes world -Z.
      const worldX = pos.getX(i);
      const worldZ = -pos.getY(i);
      pos.setZ(i, getElevation(worldX, worldZ));
    }
    geo.computeVertexNormals();
    return geo;
  }, [getElevation]);

  const circleY = useMemo(() => getElevation(800, 400), [getElevation]);

  // ── Gold spores above the main center root ──
  const [sporePositions, sporeSpeeds] = useMemo(() => {
    const count = 200;
    const positions = new Float32Array(count * 3);
    const speeds = [];
    for (let i = 0; i < count; i++) {
      positions[i * 3]     = 800 + (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = circleY - 20 + Math.random() * 60;
      positions[i * 3 + 2] = 400 + (Math.random() - 0.5) * 50;
      speeds.push({ x: (Math.random() - 0.5) * 0.05, y: 0.03 + Math.random() * 0.05, z: (Math.random() - 0.5) * 0.05 });
    }
    return [positions, speeds];
  }, [circleY]);

  // ── Animation ──
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const op = state3D.terrainOpacity;

    if (terrainRef.current) {
      terrainRef.current.material.opacity = op;
      terrainRef.current.material.transparent = op < 1.0;
      terrainRef.current.visible = op > 0.001;
    }

    if (cloudsGroupRef.current) {
      const c = state3D.cloudColor;
      const tColor = new THREE.Color(c, c, c);
      cloudsGroupRef.current.traverse(child => {
        if (child.isMesh && child.material) {
          child.material.transparent = true;
          child.material.opacity = 0.9;
          if (child.material.color) child.material.color.lerp(tColor, 0.05);
        }
      });
    }

    if (highlightRef.current) {
      const pulse = 1.0 + Math.sin(t * 3.0) * 0.1;
      highlightRef.current.scale.set(pulse, pulse, pulse);
      highlightRef.current.material.emissiveIntensity = state3D.terrainGlow * 3.0;
      highlightRef.current.material.opacity = op * state3D.terrainGlow * 0.9;
      highlightRef.current.visible = op > 0.001 && state3D.terrainGlow > 0.01;
    }

    if (sporesRef.current && op > 0.001) {
      const posAttr = sporesRef.current.geometry.attributes.position;
      for (let i = 0; i < 200; i++) {
        let x = posAttr.getX(i) + Math.sin(t + i) * 0.02;
        let y = posAttr.getY(i) + sporeSpeeds[i].y * 0.2;
        let z = posAttr.getZ(i) + Math.cos(t + i) * 0.02;
        if (y > circleY - 20 + 80) y = circleY - 20;
        posAttr.setXYZ(i, x, y, z);
      }
      posAttr.needsUpdate = true;
      sporesRef.current.material.opacity = op * 0.85 * state3D.terrainGlow;
      sporesRef.current.visible = op > 0.001 && state3D.terrainGlow > 0.01;
    }
  });

  return (
    <group>
      <RainParticles state3D={state3D} />

      {/* Main terrain mesh */}
      <mesh
        ref={terrainRef}
        geometry={terrainGeometry}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -20, 0]}
        receiveShadow
      >
        <meshStandardMaterial
          map={terrainMap}
          roughness={1.0}
          metalness={0.0}
          flatShading={false}
        />
      </mesh>

      <TurmericField getElevation={getElevation} state3D={state3D} />

      {/* The ONE large Glowing Circle that we zoom into */}
      <mesh
        ref={highlightRef}
        position={[800, circleY - 20 + 0.2, 400]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <circleGeometry args={[18, 64]} />
        <meshStandardMaterial
          color="#BF930F"
          emissive="#BF930F"
          emissiveIntensity={0}
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Atmospheric gold spores above the main root */}
      <points ref={sporesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[sporePositions, 3]} />
        </bufferGeometry>
        {dotTexture && (
          <pointsMaterial
            map={dotTexture}
            size={2.5}
            sizeAttenuation
            transparent
            opacity={0}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        )}
      </points>

      {/* Clouds — high altitude, massive */}
      <group ref={cloudsGroupRef} position={[800, 2000, 400]}>
        <Clouds material={THREE.MeshBasicMaterial}>
          <Cloud seed={1} segments={80} bounds={[2000, 200, 2000]} volume={600} color="#ffffff" speed={0.08} position={[0, 0, 0]} />
          <Cloud seed={2} segments={60} bounds={[1500, 150, 1500]} volume={400} color="#e8ede6" speed={0.12} position={[200, -80, 200]} />
          <Cloud seed={3} segments={60} bounds={[1500, 150, 1500]} volume={400} color="#e8ede6" speed={0.12} position={[-200, 60, -200]} />
        </Clouds>
      </group>
    </group>
  );
}
