import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// Create a high-res canvas texture for the luxury canister
function createCanisterTexture() {
  if (typeof window === 'undefined') return null;

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // 1. Deep Emerald Green Background
  ctx.fillStyle = '#06261c'; // Very dark, luxurious emerald
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 2. Mountain Silhouette at the bottom
  ctx.fillStyle = '#0a3d2e'; // Slightly lighter emerald for distant mountains
  ctx.beginPath();
  ctx.moveTo(0, canvas.height);
  ctx.lineTo(0, canvas.height - 100);
  ctx.lineTo(150, canvas.height - 160);
  ctx.lineTo(280, canvas.height - 80);
  ctx.lineTo(400, canvas.height - 180);
  ctx.lineTo(550, canvas.height - 120);
  ctx.lineTo(700, canvas.height - 200);
  ctx.lineTo(850, canvas.height - 100);
  ctx.lineTo(1024, canvas.height - 150);
  ctx.lineTo(1024, canvas.height);
  ctx.fill();

  ctx.fillStyle = '#11523f'; // Midground mountains
  ctx.beginPath();
  ctx.moveTo(0, canvas.height);
  ctx.lineTo(0, canvas.height - 60);
  ctx.lineTo(100, canvas.height - 100);
  ctx.lineTo(250, canvas.height - 50);
  ctx.lineTo(350, canvas.height - 120);
  ctx.lineTo(500, canvas.height - 60);
  ctx.lineTo(650, canvas.height - 150);
  ctx.lineTo(800, canvas.height - 70);
  ctx.lineTo(950, canvas.height - 110);
  ctx.lineTo(1024, canvas.height - 60);
  ctx.lineTo(1024, canvas.height);
  ctx.fill();

  // 3. Golden Mountain base/powder
  const goldGrad = ctx.createLinearGradient(0, canvas.height - 80, 0, canvas.height);
  goldGrad.addColorStop(0, '#BF930F'); // Gold
  goldGrad.addColorStop(1, '#8A6805'); // Dark Gold
  ctx.fillStyle = goldGrad;
  ctx.beginPath();
  ctx.moveTo(0, canvas.height);
  ctx.lineTo(0, canvas.height - 40);
  ctx.lineTo(150, canvas.height - 80);
  ctx.lineTo(300, canvas.height - 20);
  ctx.lineTo(450, canvas.height - 70);
  ctx.lineTo(600, canvas.height - 30);
  ctx.lineTo(750, canvas.height - 90);
  ctx.lineTo(900, canvas.height - 40);
  ctx.lineTo(1024, canvas.height - 80);
  ctx.lineTo(1024, canvas.height);
  ctx.fill();

  // 4. Typography
  ctx.textAlign = 'center';

  // Brand Name
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.font = 'normal 16px "Inter", sans-serif';
  ctx.letterSpacing = '6px';
  ctx.fillText('PARADISE ORGANICS', canvas.width / 2, 100);

  ctx.font = 'normal 12px "Inter", sans-serif';
  ctx.fillText('PRESENTS', canvas.width / 2, 130);

  // Main Title
  ctx.fillStyle = '#D4A822'; // Shiny gold
  ctx.font = 'normal 56px "Georgia", serif';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
  ctx.shadowBlur = 10;
  ctx.shadowOffsetY = 2;
  ctx.fillText('THE GOLDEN ROOT™', canvas.width / 2, 210);
  ctx.shadowBlur = 0; // reset shadow
  ctx.shadowOffsetY = 0;

  // Origin
  ctx.fillStyle = 'rgba(191, 147, 15, 0.8)';
  ctx.font = 'normal 20px "Georgia", serif';
  ctx.letterSpacing = '8px';
  ctx.fillText('MEGHALAYA HIGHLANDS', canvas.width / 2, 260);

  // Variety
  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.font = 'normal 14px "Inter", sans-serif';
  ctx.letterSpacing = '4px';
  ctx.fillText('LAKADONG VARIETY', canvas.width / 2, 310);
  ctx.fillText('SINGLE ORIGIN INDIA', canvas.width / 2, 335);

  // Side Panels (Spine & Back) - The front is in the center. We'll add text on the sides.
  // Left side (Spine area roughly)
  ctx.save();
  ctx.translate(100, canvas.height / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.fillStyle = 'rgba(191, 147, 15, 0.6)';
  ctx.font = 'normal 24px "Georgia", serif';
  ctx.letterSpacing = '6px';
  ctx.fillText('THE GOLDEN ROOT', 0, 0);
  ctx.restore();

  // Right side (Back area)
  ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
  ctx.font = 'normal 14px "Inter", sans-serif';
  ctx.letterSpacing = '2px';
  ctx.fillText('ANNUAL IMPACT', 850, 200);
  
  ctx.font = 'normal 12px "Inter", sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.fillText('45 Farmers Supported', 850, 230);
  ctx.fillText('100% Traceable', 850, 250);
  ctx.fillText('Premium Lakadong', 850, 270);
  
  // Barcode mock
  ctx.fillStyle = 'rgba(255,255,255,0.7)';
  ctx.fillRect(800, 320, 100, 50);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  return texture;
}


// Create soft particle dot texture for gathering particles
function createSparkTexture() {
  if (typeof window === 'undefined') return null;
  const canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext('2d');
  const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
  grad.addColorStop(0, 'rgba(191, 147, 15, 1.0)'); // central gold
  grad.addColorStop(0.25, 'rgba(191, 147, 15, 0.7)');
  grad.addColorStop(1, 'rgba(191, 147, 15, 0.0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 32, 32);
  return new THREE.CanvasTexture(canvas);
}

export default function ProductReveal({ state3D }) {
  const jarGroupRef = useRef();
  const labelRef = useRef();
  const canisterRef = useRef();
  const lidBaseRef = useRef();
  const lidTopRef = useRef();
  const gatheringParticlesRef = useRef();

  const [gltfModel, setGltfModel] = useState(null);

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load(
      '/assets/luxury_canister.glb',
      (gltf) => {
        gltf.scene.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        setGltfModel(gltf.scene);
      },
      undefined,
      (error) => {
        console.warn('Failed to load luxury_canister.glb, using high-fidelity glass procedural fallback:', error);
        setGltfModel(null);
      }
    );
  }, []);

  const generatedCanisterTexture = useMemo(() => createCanisterTexture(), []);
  
  const canisterMaterials = useMemo(() => {
    const goldCapColor = '#111111'; // Dark metal bottom

    return [
      new THREE.MeshStandardMaterial({ map: generatedCanisterTexture, roughness: 0.6, metalness: 0.1 }), // 0: Side label
      new THREE.MeshStandardMaterial({ color: goldCapColor, roughness: 0.5, metalness: 0.8 }),     // 1: Top
      new THREE.MeshStandardMaterial({ color: goldCapColor, roughness: 0.5, metalness: 0.8 })      // 2: Bottom
    ];
  }, [generatedCanisterTexture]);

  const sparkTexture = useMemo(() => createSparkTexture(), []);

  // 1. Swirling Gathering Powder Particles Data
  const particleCount = 500;
  const initialData = useMemo(() => {
    const data = [];
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 2.0 + Math.random() * 5.0;
      const y = -22.0 + Math.random() * 4.0;
      data.push({
        angle,
        radius,
        y,
        speed: 1.2 + Math.random() * 2.2
      });
    }
    return data;
  }, []);

  const particlePositions = useMemo(() => {
    const arr = new Float32Array(particleCount * 3);
    initialData.forEach((p, index) => {
      arr[index * 3] = Math.cos(p.angle) * p.radius;
      arr[index * 3 + 1] = p.y;
      arr[index * 3 + 2] = Math.sin(p.angle) * p.radius;
    });
    return arr;
  }, [initialData]);

  // Animation Loop
  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    const productOpacity = state3D.productOpacity;
    const powderSwirl = state3D.powderSwirl;

    // Handle Jar visibility, scale and rotation
    if (jarGroupRef.current) {
      jarGroupRef.current.visible = productOpacity > 0.001;

      const scale = 0.8 + productOpacity * 0.2;
      jarGroupRef.current.scale.set(scale, scale, scale);

      // Rotate based on ScrollTrigger value
      jarGroupRef.current.rotation.y = state3D.productRotation + Math.sin(elapsedTime * 0.15) * 0.04;

      if (gltfModel) {
        gltfModel.traverse((child) => {
          if (child.isMesh && child.material) {
            child.material.transparent = true;
            child.material.opacity = productOpacity;
          }
        });
      }

      // Update opacities for the canister materials (used in fallback)
      if (canisterRef.current) {
        if (Array.isArray(canisterRef.current.material)) {
          canisterRef.current.material.forEach((mat) => {
            mat.opacity = productOpacity;
            mat.transparent = true;
          });
        } else if (canisterRef.current.material) {
          canisterRef.current.material.opacity = productOpacity;
          canisterRef.current.material.transparent = true;
        }
      }
      
      if (labelRef.current && labelRef.current.material) {
        labelRef.current.material.opacity = productOpacity;
        labelRef.current.material.transparent = true;
      }
      
      if (lidBaseRef.current && lidBaseRef.current.material) {
        lidBaseRef.current.material.opacity = productOpacity;
        lidBaseRef.current.material.transparent = true;
      }
      if (lidTopRef.current && lidTopRef.current.material) {
        lidTopRef.current.material.opacity = productOpacity;
        lidTopRef.current.material.transparent = true;
      }
    }

    // Animate Gathering Particles (Powder forms the jar)
    if (gatheringParticlesRef.current && (productOpacity > 0.001 || powderSwirl > 0.01)) {
      const posAttr = gatheringParticlesRef.current.geometry.attributes.position;
      const convergence = productOpacity;

      initialData.forEach((p, i) => {
        const angle = p.angle + elapsedTime * p.speed;
        const radius = THREE.MathUtils.lerp(p.radius, 1.02 + Math.sin(elapsedTime * 2.0 + i) * 0.02, convergence);
        const y = THREE.MathUtils.lerp(p.y, -20.0 + (i / particleCount) * 1.8 - 0.9, convergence);

        posAttr.setXYZ(i, Math.cos(angle) * radius, y, Math.sin(angle) * radius);
      });

      posAttr.needsUpdate = true;

      const particlesOpacity = Math.max(0.0, (powderSwirl > 0.01 ? powderSwirl : productOpacity) * (1.0 - productOpacity * 0.95));
      gatheringParticlesRef.current.material.opacity = particlesOpacity;
      gatheringParticlesRef.current.visible = particlesOpacity > 0.001;
    }
  });

  return (
    <group position={[0, -20, 0]}>
      {/* 3D CYLINDRICAL LUXURY CANISTER */}
      <group ref={jarGroupRef}>
        {gltfModel ? (
          <primitive object={gltfModel} />
        ) : (
          <>
            {/* Outer Refractive Glass Shell */}
            <mesh ref={canisterRef} castShadow receiveShadow>
              <cylinderGeometry args={[0.61, 0.61, 2.42, 64, 1, true]} />
              <meshPhysicalMaterial
                transmission={1.0}
                thickness={0.06}
                roughness={0.05}
                clearcoat={1.0}
                clearcoatRoughness={0.05}
                ior={1.52}
                color="#e5f5f0"
                transparent
              />
            </mesh>

            {/* Inner Printed Label Core */}
            <mesh ref={labelRef} castShadow>
              <cylinderGeometry args={[0.58, 0.58, 2.38, 64]} />
              <meshStandardMaterial
                map={generatedCanisterTexture}
                roughness={0.4}
                metalness={0.1}
                transparent
              />
            </mesh>

            {/* Gold Metal Base Accent */}
            <mesh position={[0, -1.2, 0]} castShadow>
              <cylinderGeometry args={[0.61, 0.61, 0.05, 64]} />
              <meshPhysicalMaterial
                color="#BF930F"
                roughness={0.15}
                metalness={0.95}
                transparent
              />
            </mesh>
            
            {/* Premium Golden Lid */}
            <group position={[0, 1.25, 0]}>
              <mesh ref={lidBaseRef} castShadow>
                <cylinderGeometry args={[0.62, 0.62, 0.15, 64]} />
                <meshPhysicalMaterial
                  color="#BF930F"
                  roughness={0.15}
                  metalness={0.95}
                  transparent
                />
              </mesh>
              <mesh ref={lidTopRef} position={[0, 0.08, 0]}>
                <cylinderGeometry args={[0.59, 0.59, 0.05, 64]} />
                <meshPhysicalMaterial
                  color="#D4A822"
                  roughness={0.2}
                  metalness={0.95}
                  transparent
                />
              </mesh>
            </group>
          </>
        )}
      </group>

      {/* SWIRLING GATHERING PARTICLES */}
      <points ref={gatheringParticlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        {sparkTexture && (
          <pointsMaterial
            map={sparkTexture}
            color="#BF930F"
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
