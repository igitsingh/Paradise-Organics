import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function AtmosphereParticles({ count = 200, color = "#F5F1E8", size = 0.1, speed = 0.2, spread = 30, opacity = 0.5 }) {
  const mesh = useRef();

  // Create an array of particles with random positions, velocities, and scales
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * spread;
      const y = (Math.random() - 0.5) * spread;
      const z = (Math.random() - 0.5) * spread;
      
      const vx = (Math.random() - 0.5) * speed;
      const vy = (Math.random() - 0.5) * speed;
      const vz = (Math.random() - 0.5) * speed;

      const scale = Math.random() * 0.5 + 0.5;

      temp.push({ x, y, z, vx, vy, vz, scale });
    }
    return temp;
  }, [count, spread, speed]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    particles.forEach((particle, i) => {
      // Move particles slowly
      particle.x += particle.vx * 0.05;
      particle.y += particle.vy * 0.05 + Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.01;
      particle.z += particle.vz * 0.05;

      // Wrap around if they go out of bounds
      const halfSpread = spread / 2;
      if (particle.x > halfSpread) particle.x = -halfSpread;
      if (particle.x < -halfSpread) particle.x = halfSpread;
      if (particle.y > halfSpread) particle.y = -halfSpread;
      if (particle.y < -halfSpread) particle.y = halfSpread;
      if (particle.z > halfSpread) particle.z = -halfSpread;
      if (particle.z < -halfSpread) particle.z = halfSpread;

      dummy.position.set(particle.x, particle.y, particle.z);
      dummy.scale.set(particle.scale, particle.scale, particle.scale);
      dummy.updateMatrix();
      
      if (mesh.current) {
        mesh.current.setMatrixAt(i, dummy.matrix);
      }
    });

    if (mesh.current) {
      mesh.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <sphereGeometry args={[size, 8, 8]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} depthWrite={false} blending={THREE.AdditiveBlending} />
    </instancedMesh>
  );
}
