import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Create a high-res canvas texture for the jar label
function createLabelTexture() {
  if (typeof window === 'undefined') return null;

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Background color (warm premium ivory paper texture)
  ctx.fillStyle = '#faf8f2';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Border lines (luxury gold double frame)
  ctx.strokeStyle = '#b8860b';
  ctx.lineWidth = 6;
  ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);
  ctx.lineWidth = 2;
  ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);

  // Layout Text
  ctx.fillStyle = '#011c12'; // Deep luxury dark green text
  ctx.textAlign = 'center';

  // Brand Header
  ctx.font = 'normal 38px Georgia, serif';
  ctx.fillText('P A R A D I S E   O R G A N I C S', canvas.width / 2, 120);

  // Monogram Logo (Circular gold border with PO monogram)
  ctx.strokeStyle = '#b8860b';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(canvas.width / 2, 205, 38, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = '#b8860b';
  ctx.font = 'normal 24px Georgia, serif';
  ctx.fillText('P O', canvas.width / 2, 212);

  // Product Name
  ctx.fillStyle = '#011c12';
  ctx.font = 'italic 34px Georgia, serif';
  ctx.fillText('The Golden Root™', canvas.width / 2, 295);

  // Subtitle / Variety
  ctx.font = 'normal 18px "Courier New", monospace';
  ctx.fillStyle = '#444444';
  ctx.fillText('PREMIUM LAKADONG VARIETY', canvas.width / 2, 350);

  // Properties / Origin info
  ctx.font = 'bold 15px Arial, sans-serif';
  ctx.fillStyle = '#b8860b';
  ctx.fillText('SINGLE ORIGIN  •  MEGHALAYA HIGHLANDS  •  CURCUMIN VERIFIED', canvas.width / 2, 400);

  // Footer / Weight
  ctx.font = 'italic 15px Georgia, serif';
  ctx.fillStyle = '#777777';
  ctx.fillText('Batch Allocation No: PO-LKD-026  •  Net Wt. 100g', canvas.width / 2, 450);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.repeat.x = -1; // Flip mapping direction so it wraps clockwise
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
  grad.addColorStop(0, 'rgba(255, 215, 0, 1.0)'); // central gold
  grad.addColorStop(0.25, 'rgba(179, 138, 61, 0.7)');
  grad.addColorStop(1, 'rgba(179, 138, 61, 0.0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 32, 32);
  return new THREE.CanvasTexture(canvas);
}

export default function ProductReveal({ state3D }) {
  const jarGroupRef = useRef();
  const labelRef = useRef();
  const glassRef = useRef();
  const powderRef = useRef();
  const capBaseRef = useRef();
  const capTopRef = useRef();
  const gatheringParticlesRef = useRef();

  const labelTexture = useMemo(() => createLabelTexture(), []);
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

      // Update opacities for standard/physical materials
      if (glassRef.current && glassRef.current.material) {
        glassRef.current.material.opacity = productOpacity * 0.85;
        glassRef.current.material.transparent = true;
      }
      if (powderRef.current && powderRef.current.material) {
        powderRef.current.material.opacity = productOpacity;
        powderRef.current.material.transparent = true;
      }
      if (labelRef.current && labelRef.current.material) {
        labelRef.current.material.opacity = productOpacity;
        labelRef.current.material.transparent = true;
      }
      if (capBaseRef.current && capBaseRef.current.material) {
        capBaseRef.current.material.opacity = productOpacity;
        capBaseRef.current.material.transparent = true;
      }
      if (capTopRef.current && capTopRef.current.material) {
        capTopRef.current.material.opacity = productOpacity;
        capTopRef.current.material.transparent = true;
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
      {/* 3D APOTHECARY JAR GROUP */}
      <group ref={jarGroupRef}>
        
        {/* Transparent emerald glass container (High reflective finish) */}
        <mesh ref={glassRef} castShadow receiveShadow>
          <cylinderGeometry args={[1.0, 1.0, 2.2, 32, 1, false]} />
          <meshPhysicalMaterial
            color="#012417" // deep luxury emerald glass
            roughness={0.02} // highly glossy
            metalness={0.1}
            transmission={0.92} // translucent refraction
            thickness={1.2}     // heavy glass base simulation
            ior={1.52}          // index of refraction for thick glass
            clearcoat={1.0}     // high specular reflection coat
            clearcoatRoughness={0.01}
          />
        </mesh>

        {/* Golden Turmeric Powder inside the jar */}
        <mesh ref={powderRef} position={[0, -0.15, 0]}>
          <cylinderGeometry args={[0.94, 0.94, 1.7, 32]} />
          <meshStandardMaterial
            color="#df8b10" // vibrant curcumin gold/orange powder
            roughness={0.95}
            metalness={0.0}
          />
        </mesh>

        {/* Textured Luxury Paper Label */}
        {labelTexture && (
          <mesh ref={labelRef} position={[0, -0.1, 0]}>
            <cylinderGeometry args={[1.02, 1.02, 1.3, 32, 1, true]} />
            <meshStandardMaterial
              map={labelTexture}
              roughness={0.9}
              metalness={0.0}
              side={THREE.DoubleSide}
            />
          </mesh>
        )}

        {/* Custom Milled Gold Lid (Layered cylinders) */}
        <group>
          {/* Cap Base */}
          <mesh ref={capBaseRef} position={[0, 1.2, 0]} castShadow>
            <cylinderGeometry args={[1.03, 1.03, 0.2, 32]} />
            <meshStandardMaterial
              color="#B38A3D"
              roughness={0.15}
              metalness={0.95}
            />
          </mesh>
          {/* Cap Top */}
          <mesh ref={capTopRef} position={[0, 1.32, 0]}>
            <cylinderGeometry args={[0.98, 0.98, 0.08, 32]} />
            <meshStandardMaterial
              color="#d4af37"
              roughness={0.18}
              metalness={0.95}
            />
          </mesh>
        </group>
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
