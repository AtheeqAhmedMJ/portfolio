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
      gl={{
        antialias: false,
        powerPreference: 'high-performance',
        alpha: false,
      }}
    >
      <color attach="background" args={['#0a0009']} />
      <fog attach="fog" args={['#0d001a', 50, 250]} />

      <BatchLights />

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
        enableDamping
        dampingFactor={0.05}
        makeDefault
      />

      <OptimizedEffects />
    </Canvas>
  );
}

function BatchLights() {
  return useMemo(() => (
    <>
      <ambientLight intensity={0.1} />
      <directionalLight position={[20, 20, 15]} intensity={2.5} castShadow={false} />
      <directionalLight
        position={[-80, -80, -15]}
        intensity={0.2}
        castShadow
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
      />
    </>
  ), []);
}

function DeathStar() {
  const ref = useRef();
  const gltf = useGLTF('/models/Death_star_final.glb', true);
  const [opacity, setOpacity] = useState(0);
  const scene = useMemo(() => gltf.scene.clone(true), [gltf.scene]);

  // Fade-in animation
  useEffect(() => {
    const fadeSpeed = 0.0333;
    let frame = requestAnimationFrame(function fade() {
      setOpacity((prev) => {
        const next = Math.min(prev + fadeSpeed, 1);
        if (next < 1) requestAnimationFrame(fade);
        return next;
      });
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  // Material optimizations
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        const mat = child.material;
        if (mat) {
          mat.transparent = true;
          mat.opacity = opacity;
          mat.envMapIntensity = 0.5;
          mat.needsUpdate = true;

          if (mat.map) {
            mat.map.anisotropy = 8;
            mat.map.generateMipmaps = true;
            mat.map.minFilter = THREE.LinearMipMapLinearFilter;
            mat.map.magFilter = THREE.LinearFilter;
          }
        }
      }
    });
  }, [scene, opacity]);

  // Initial slight tilt
  useEffect(() => {
    if (ref.current) {
      ref.current.rotation.z = 0.1;
    }
  }, []);

  // Continuous spin
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += 0.04 * delta;
  });

  return (
    <primitive 
      ref={ref} 
      object={scene} 
      scale={1} 
      position={[0, 0, 0]} 
      frustumCulled={false} 
    />
  );
}

const sharedGeometry = new THREE.SphereGeometry(0.1, 6, 6);
const sharedMaterial = new THREE.MeshBasicMaterial({ color: 'white', transparent: true, opacity: 0.8 });

function ShootingStars() {
  const { viewport } = useThree();
  const count = 3;

  const configs = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      speed: 0.3 + Math.random() * 0.4,
      yOffset: (Math.random() - 0.5) * 20,
      zOffset: (Math.random() - 0.5) * 15,
      resetPosition: -viewport.width * 0.7,
      maxPosition: viewport.width * 0.7,
    }));
  }, [viewport.width]);

  return configs.map((cfg) => <ShootingStar key={cfg.id} config={cfg} />);
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

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.position.x += speed * delta;
      if (ref.current.position.x > maxPosition) {
        ref.current.position.x = resetPosition;
        ref.current.position.y = (Math.random() - 0.5) * 20;
        ref.current.position.z = (Math.random() - 0.5) * 15;
      }
    }
  });

  return <mesh ref={ref} geometry={sharedGeometry} material={sharedMaterial} />;
}

function OptimizedEffects() {
  const { size } = useThree();

  const scale = useMemo(() => (size.width < 768 ? 0.5 : 1), [size.width]);

  return (
    <EffectComposer multisampling={0} resolutionScale={scale}>
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

useGLTF.preload('/models/Death_star_final.glb');
