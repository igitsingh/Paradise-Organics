import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';

import LandscapeSky from './LandscapeSky';
import EarthTransition from './EarthTransition';
import GoldenRoot from './GoldenRoot';
import ProductReveal from './ProductReveal';

// Smooth camera motion controller
function CameraRig({ state3D }) {
  const currentTarget = useRef(new THREE.Vector3(0, 0, 0));
  const currentPos = useRef(new THREE.Vector3(0, 80, 100));

  useFrame(({ camera }) => {
    // Smoothly interpolate camera position
    const tPos = state3D.cameraPos;
    currentPos.current.x = THREE.MathUtils.lerp(currentPos.current.x, tPos.x, 0.05);
    currentPos.current.y = THREE.MathUtils.lerp(currentPos.current.y, tPos.y, 0.05);
    currentPos.current.z = THREE.MathUtils.lerp(currentPos.current.z, tPos.z, 0.05);
    camera.position.copy(currentPos.current);

    // Smoothly interpolate lookAt target
    const tTarget = state3D.cameraTarget;
    currentTarget.current.x = THREE.MathUtils.lerp(currentTarget.current.x, tTarget.x, 0.05);
    currentTarget.current.y = THREE.MathUtils.lerp(currentTarget.current.y, tTarget.y, 0.05);
    currentTarget.current.z = THREE.MathUtils.lerp(currentTarget.current.z, tTarget.z, 0.05);
    camera.lookAt(currentTarget.current);
  });

  return null;
}

// Controller to dynamically update Scene level variables (like Fog)
function SceneEffectsController({ state3D }) {
  useFrame(({ scene }) => {
    if (scene.fog) {
      scene.fog.density = THREE.MathUtils.lerp(scene.fog.density, state3D.fogDensity, 0.05);
    }
  });
  return null;
}

export default function SceneContainer({ state3D }) {
  return (
    <div className="webgl-container">
      <Canvas
        shadows
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        camera={{ position: [0, 80, 100], fov: 45, near: 0.1, far: 1000 }}
      >
        {/* Background color of WebGL scene */}
        <color attach="background" args={['#0E3B2E']} />
        
        {/* Fog for atmospheric depth */}
        <fogExp2 attach="fog" color="#0E3B2E" density={0.003} />

        {/* Ambient lighting */}
        <ambientLight intensity={0.4} color="#F5F1E8" />

        {/* Cinematic Directional Light (Sun/Moonlight for mountain/sky scenes) */}
        <directionalLight
          position={[50, 80, 50]}
          intensity={1.2}
          color="#F5F1E8"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={300}
          shadow-camera-left={-60}
          shadow-camera-right={60}
          shadow-camera-top={60}
          shadow-camera-bottom={-60}
        />

        {/* Spot Light targeting the Turmeric Root & Product Reveal area */}
        <spotLight
          position={[0, -5, 10]}
          angle={0.6}
          penumbra={1}
          intensity={3}
          color="#C68A2D"
          castShadow
        />

        {/* Golden glow light source beneath the soil (Lakadong root discovery glow) */}
        <pointLight
          position={[0, -10, 0]}
          intensity={state3D.rootOpacity * 5 * (1 - state3D.rootDissolve)}
          color="#C68A2D"
          distance={12}
        />

        {/* R3F components for each step of the journey */}
        <Suspense fallback={null}>
          <LandscapeSky state3D={state3D} />
          
          <EarthTransition state3D={state3D} />
          
          <GoldenRoot state3D={state3D} />
          
          <ProductReveal state3D={state3D} />
        </Suspense>

        {/* Camera and environment effect controllers */}
        <CameraRig state3D={state3D} />
        <SceneEffectsController state3D={state3D} />

        {/* Cinematic Post-Processing Effects */}
        <EffectComposer>
          {/* Bloom adds the premium, volumetric glow to lights, roots, and particles */}
          <Bloom 
            intensity={1.2} 
            luminanceThreshold={0.2} 
            luminanceSmoothing={0.9} 
            mipmapBlur 
          />
          {/* Vignette darkens the screen borders for a premium, cinematic camera frame */}
          <Vignette eskil={false} offset={0.3} darkness={0.65} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
