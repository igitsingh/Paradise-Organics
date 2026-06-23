import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Create a high-res canvas texture for the soil walls
function createSoilTexture() {
  if (typeof window === 'undefined') return null;

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // 1. Layered Geological Gradient
  const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  grad.addColorStop(0.0, '#140c06'); // Topsoil (very dark charcoal brown)
  grad.addColorStop(0.15, '#1d1007');
  grad.addColorStop(0.35, '#2e190e'); // Rich organic subsoil (dark reddish brown)
  grad.addColorStop(0.65, '#23130a');
  grad.addColorStop(0.85, '#0f0804'); // Dense subsoil
  grad.addColorStop(1.0, '#020d09');  // Emerald dark bedrock layer

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 2. Add fine dirt particles and grit (Light/dark speckling)
  for (let i = 0; i < 6000; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const size = 1 + Math.random() * 3;
    ctx.fillStyle = Math.random() > 0.5 ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.05)';
    ctx.fillRect(x, y, size, size);
  }

  // 3. Add textured horizontal sedimentary layers (wavy lines)
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.15)';
  ctx.lineWidth = 8;
  for (let i = 0; i < 15; i++) {
    const yPos = Math.random() * canvas.height;
    ctx.beginPath();
    ctx.moveTo(0, yPos);
    for (let x = 0; x < canvas.width; x += 50) {
      ctx.lineTo(x, yPos + Math.sin(x * 0.02) * 15);
    }
    ctx.stroke();
  }

  // 4. Gold Curcumin veins (emissive highlights mapping to turmeric traces in Meghalaya)
  ctx.strokeStyle = '#ffd700';
  ctx.shadowColor = '#ff8c00';
  ctx.lineWidth = 3;
  ctx.globalAlpha = 0.5;
  for (let v = 0; v < 12; v++) {
    ctx.beginPath();
    let cx = Math.random() * canvas.width;
    let cy = 100 + Math.random() * 800;
    ctx.moveTo(cx, cy);
    for (let step = 0; step < 12; step++) {
      cx += (Math.random() - 0.5) * 80;
      cy += 20 + Math.random() * 50;
      ctx.lineTo(cx, cy);
    }
    ctx.stroke();
  }
  ctx.globalAlpha = 1.0;

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

// Generate soft gold glowing light point texture
function createParticleTexture() {
  if (typeof window === 'undefined') return null;
  const canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext('2d');
  const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
  grad.addColorStop(0, 'rgba(255, 223, 77, 1.0)');
  grad.addColorStop(0.3, 'rgba(179, 138, 61, 0.6)');
  grad.addColorStop(1, 'rgba(179, 138, 61, 0.0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 32, 32);
  return new THREE.CanvasTexture(canvas);
}

// Helper to generate a wavy root spline
function createRootPath(startX, startY, startZ, length = 7) {
  const points = [];
  let current = new THREE.Vector3(startX, startY, startZ);
  points.push(current.clone());

  for (let i = 0; i < 6; i++) {
    current.y -= length / 5;
    current.x += (Math.random() - 0.5) * 0.7;
    current.z += (Math.random() - 0.5) * 0.7;
    points.push(current.clone());
  }
  return new THREE.CatmullRomCurve3(points);
}

export default function EarthTransition({ state3D }) {
  const groupRef = useRef();
  const dustRef = useRef();

  const soilTexture = useMemo(() => createSoilTexture(), []);
  const particleTexture = useMemo(() => createParticleTexture(), []);

  // 1. Generate organic root paths
  const rootGeometries = useMemo(() => {
    const paths = [
      createRootPath(-1.8, 0, -0.5, 9),
      createRootPath(1.5, 0, -1.2, 8),
      createRootPath(0.2, 0, 1.0, 10),
      createRootPath(-0.8, 0, -1.8, 7),
    ];
    return paths.map(path => new THREE.TubeGeometry(path, 25, 0.06, 8, false));
  }, []);

  // 2. Generate subterranean dust positions
  const [particlePositions, particleSpeeds] = useMemo(() => {
    const count = 180;
    const positions = new Float32Array(count * 3);
    const speeds = [];

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = -16 + Math.random() * 14;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;

      speeds.push({
        y: 0.01 + Math.random() * 0.02,
        x: (Math.random() - 0.5) * 0.01,
        z: (Math.random() - 0.5) * 0.01,
      });
    }
    return [positions, speeds];
  }, []);

  // Animation frame loop
  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    const soilOpacity = state3D.soilOpacity;

    if (groupRef.current) {
      groupRef.current.visible = soilOpacity > 0.001;
      
      // Update opacities across standard materials
      groupRef.current.traverse((child) => {
        if (child.isMesh && child.material) {
          child.material.opacity = soilOpacity * (child.userData.baseOpacity || 1.0);
          child.material.transparent = true;
        }
      });
    }

    // Floating gold particle dust motion
    if (dustRef.current && soilOpacity > 0.001) {
      const posAttr = dustRef.current.geometry.attributes.position;
      const count = posAttr.count;

      for (let i = 0; i < count; i++) {
        let x = posAttr.getX(i);
        let y = posAttr.getY(i);
        let z = posAttr.getZ(i);

        const speed = particleSpeeds[i];
        y += speed.y * 0.15;
        x += Math.sin(elapsedTime + i) * 0.004;
        z += Math.cos(elapsedTime + i) * 0.004;

        if (y > -2) y = -16; // loop particle height

        posAttr.setXYZ(i, x, y, z);
      }
      posAttr.needsUpdate = true;
      dustRef.current.material.opacity = soilOpacity * 0.8;
      dustRef.current.visible = soilOpacity > 0.001;
    }
  });

  return (
    <group ref={groupRef}>
      
      {/* 1. DIRT TRENCH WALLS (three-sided box enclosing the camera descent) */}
      <group>
        {/* Back Wall */}
        <mesh position={[0, -8, -3.5]} receiveShadow userData={{ baseOpacity: 1.0 }}>
          <planeGeometry args={[14, 18]} />
          <meshStandardMaterial
            map={soilTexture}
            roughness={0.9}
            metalness={0.0}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Left Wall */}
        <mesh position={[-3.5, -8, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow userData={{ baseOpacity: 1.0 }}>
          <planeGeometry args={[10, 18]} />
          <meshStandardMaterial
            map={soilTexture}
            roughness={0.9}
            metalness={0.0}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Right Wall */}
        <mesh position={[3.5, -8, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow userData={{ baseOpacity: 1.0 }}>
          <planeGeometry args={[10, 18]} />
          <meshStandardMaterial
            map={soilTexture}
            roughness={0.9}
            metalness={0.0}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* 2. HANGING ORGANIC ROOT FIBERS */}
      <group position={[0, 0, 0]}>
        {rootGeometries.map((geometry, idx) => (
          <mesh key={idx} geometry={geometry} castShadow userData={{ baseOpacity: 0.9 }}>
            <meshStandardMaterial
              color="#3e291e" // root brown
              roughness={0.85}
              metalness={0.05}
            />
          </mesh>
        ))}
      </group>

      {/* 3. VOLUMETRIC GOLD LIGHT CONES */}
      <group userData={{ baseOpacity: 0.2 }}>
        <mesh position={[0, -5, 0]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.3, 4.0, 14, 32, 1, true]} />
          <meshBasicMaterial
            color="#B38A3D"
            transparent
            opacity={0.2}
            side={THREE.DoubleSide}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>

      {/* 4. GLOWING GOLD DUST MOTE PARTICLES */}
      <points ref={dustRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        {particleTexture && (
          <pointsMaterial
            map={particleTexture}
            color="#ffd700"
            size={0.18}
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
