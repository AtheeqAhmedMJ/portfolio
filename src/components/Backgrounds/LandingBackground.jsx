import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, useGLTF } from '@react-three/drei';
import { Suspense, useRef, useMemo, useEffect, useState } from 'react';
import { EffectComposer, Bloom, Noise, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';

export default function LandingPageBackground() {
  return (
    <Canvas 
      camera={{ position: [0, 170, 30], fov: 45 }}
      dpr={[1, 2]}
      performance={{ min: 0.5 }}
      gl={{
        antialias: false,
        powerPreference: "high-performance",
        alpha: false
      }}
    >
      <color attach="background" args={['#0a0009']} />
      <fog attach="fog" args={['#0d001a', 50, 250]} />

      <ambientLight intensity={0.10} />
      <directionalLight position={[20, 20, 15]} intensity={2.5} castShadow={false} />
      <directionalLight
        position={[-80, -80, -15]}
        intensity={0.2}
        castShadow={true}
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
      />

      <Stars radius={100} depth={50} count={5000} factor={5} fade speed={2} />
      <Stars radius={100} depth={50} count={2000} factor={10} fade speed={2} />
      <Stars radius={100} depth={50} count={15} factor={50} fade speed={2} />

      <Suspense fallback={null}>
        <DeathStar />
      </Suspense>

      <ShootingStars />

      <OrbitControls
        enableZoom={false}
        target={[0, 0, 0]}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
        enableDamping={true}
        dampingFactor={0.05}
        makeDefault
      />

      <OptimizedEffects />
    </Canvas>
  );
}

function DeathStar() {
  const ref = useRef();
  const { scene } = useGLTF('/models/death_star.glb', true);
  const [opacity, setOpacity] = useState(0);

  const clonedScene = useMemo(() => scene.clone(), [scene]);

useEffect(() => {
  const fadeSpeed = 0.0333; // ≈ 1 / 30 frames = ~500ms at 60fps

  let fadeIn = requestAnimationFrame(function fade() {
    setOpacity((prev) => {
      const next = Math.min(prev + fadeSpeed, 1);
      if (next < 1) requestAnimationFrame(fade);
      return next;
    });
  });

  return () => cancelAnimationFrame(fadeIn);
}, []);


  useEffect(() => {
    if (clonedScene) {
      clonedScene.traverse((child) => {
        if (child.isMesh && child.material) {
          child.material.transparent = true;
          child.material.opacity = opacity;
          child.material.envMapIntensity = 0.5;
          child.material.needsUpdate = true;
        }
      });
    }
  }, [clonedScene, opacity]);

  useEffect(() => {
    if (ref.current) {
      ref.current.rotation.z = 0.1; 
    }
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += 0.04 * delta;
    }
  });

  return clonedScene ? (
    <primitive 
      ref={ref} 
      object={clonedScene} 
      scale={1} 
      position={[0, 0, 0]} 
    />
  ) : null;
}

const sharedGeometry = new THREE.SphereGeometry(0.1, 6, 6);
const sharedMaterial = new THREE.MeshBasicMaterial({
  color: 'white',
  transparent: true,
  opacity: 0.8
});

function ShootingStars() {
  const { viewport } = useThree();
  const count = 3;

  const stars = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      speed: 0.3 + Math.random() * 0.4,
      yOffset: (Math.random() - 0.5) * 20,
      zOffset: (Math.random() - 0.5) * 15,
      resetPosition: -viewport.width * 0.7,
      maxPosition: viewport.width * 0.7
    }));
  }, [viewport.width]);

  return (
    <>
      {stars.map((star) => (
        <ShootingStar key={star.id} config={star} />
      ))}
    </>
  );
}

function ShootingStar({ config }) {
  const ref = useRef();
  const { resetPosition, maxPosition, speed, yOffset, zOffset } = config;

  useEffect(() => {
    if (ref.current) {
      ref.current.position.set(
        resetPosition + Math.random() * (maxPosition - resetPosition),
        yOffset,
        zOffset
      );
    }
  }, [resetPosition, maxPosition, yOffset, zOffset]);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.position.x += speed * delta;
      if (ref.current.position.x > maxPosition) {
        ref.current.position.x = resetPosition;
        ref.current.position.y = (Math.random() - 0.5) * 20;
        ref.current.position.z = (Math.random() - 0.5) * 15;
      }
    }
  });

  return (
    <mesh ref={ref} geometry={sharedGeometry} material={sharedMaterial} />
  );
}

function OptimizedEffects() {
  const { size } = useThree();

  const effectsScale = useMemo(() => {
    return size.width < 768 ? 0.5 : 1;
  }, [size.width]);

  return (
    <EffectComposer multisampling={0} resolutionScale={effectsScale}>
      <Bloom
        luminanceThreshold={0.3}
        luminanceSmoothing={0.6}
        intensity={1.2}
        radius={0.8}
      />
      <Noise opacity={0.04} premultiply={false} />
      <ChromaticAberration
        blendFunction={BlendFunction.COLOR_DODGE}
        offset={[0.001, 0.001]}
      />
    </EffectComposer>
  );
}

useGLTF.preload('/models/death_star.glb');
