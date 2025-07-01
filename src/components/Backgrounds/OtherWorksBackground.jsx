import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, useGLTF, Stars } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';
import VideoEditingSection from '/src/components/OtherWorksComponents/VideoEditingSection/VideoEditingSection'; 
import GraphicDesignSection from '/src/components/OtherWorksComponents/GraphicDesignSection/GraphicDesignSection';
import DocumentationSection from '/src/components/OtherWorksComponents/DocumentationSection/DocumentationSection';
import CreditsSection from '/src/components/OtherWorksComponents/CreditsSection/CreditsSection'; 

const Ship = () => {
  const gltf = useGLTF('/models/Imperial_Ship_optimized.glb');
  const clonedScene = useMemo(() => gltf.scene.clone(), [gltf.scene]);

  useEffect(() => {
    clonedScene.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material.transparent = true;
        child.material.opacity = 1.0;
        child.material.envMapIntensity = 0.5;
        child.material.needsUpdate = true;

        if (child.material.map) {
          child.material.map.anisotropy = 8;
          child.material.map.generateMipmaps = true;
          child.material.map.minFilter = THREE.LinearMipMapLinearFilter;
          child.material.map.magFilter = THREE.LinearFilter;
        }
      }
    });
  }, [clonedScene]);

  return <primitive object={clonedScene} scale={0.01} />;
};

const CameraController = ({ targetPosition }) => {
  const cameraRef = useRef();
  useFrame(() => {
    if (cameraRef.current) {
      cameraRef.current.position.lerp(targetPosition, 0.05);
    }
  });
  return <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 3, 22]} />;
};

const OptimizedEffects = () => (
  <EffectComposer resolutionScale={1} multisampling={0}>
    <Bloom luminanceThreshold={0.4} luminanceSmoothing={0.6} intensity={0.8} radius={0.8} />
    <Noise opacity={0.01} premultiply={false} />
    <ChromaticAberration blendFunction={BlendFunction.COLOR_DODGE} offset={[0.001, 0.001]} />
  </EffectComposer>
);

const OtherWorksPageBackground = () => {
  const [targetPosition, setTargetPosition] = useState(new THREE.Vector3(0, 3, 22));
  const [activeSection, setActiveSection] = useState('OTHER WORKS');
  const [hovered, setHovered] = useState(null);

  const cameraViews = useMemo(() => ({
    'OTHER WORKS': new THREE.Vector3(0, 3, 22),
    'VIDEO EDITING': new THREE.Vector3(2, 3.8, 6),
    'GRAPHIC DESIGN': new THREE.Vector3(14, 8, 14),
    'DOCUMENTATION': new THREE.Vector3(-8, 1.5, 16),
    'CREDITS': new THREE.Vector3(0, 4.3, -17.5),
  }), []);

  return (
    <>
      <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
        <Canvas
          dpr={[1, 2]}
          camera={{ position: [0, 3, 22], fov: 45 }}
          gl={{ antialias: true, powerPreference: 'high-performance', alpha: false }}
        >
          <color attach="background" args={['#090B0D']} />
          <Stars radius={100} depth={50} count={5000} factor={5} fade speed={2} />
          <Stars radius={100} depth={50} count={2000} factor={10} fade speed={2} />
          <ambientLight intensity={0.25} />
          <directionalLight position={[20, 20, 15]} intensity={3} />
          <directionalLight position={[-80, -80, -15]} intensity={0.3} />
          <CameraController targetPosition={targetPosition} />
          <Ship />
          <OrbitControls enableZoom={false} enablePan={false} />
          <OptimizedEffects />
        </Canvas>
      </div>
      <div style={{
        position: 'fixed',
        top: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '30px',
        padding: '10px',
        background: 'rgba(255, 255, 255, 0.063)',
        border: '1px solid rgba(0, 0, 0, 0.08)',
        borderRadius: '12px',
        zIndex: 100,
        opacity: 0.6,
        height: '71px',
      }}>
        {Object.entries(cameraViews).map(([label, position]) => (
          <div
            key={label}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              userSelect: 'none',
              padding: '10px 10px',
            }}
            onMouseEnter={() => setHovered(label)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => {
              setTargetPosition(position);
              setActiveSection(label);
            }}
          >
            <div
              style={{
                fontFamily: 'Geo-Regular, sans-serif',
                fontSize: '20px',
                textShadow: '7px 4px 4px rgba(0, 0, 0, 0.25)',
                transition: 'color 0.3s ease',
                color: hovered === label ? 'rgba(255, 222, 147, 0.91)' : '#fa0000',
              }}
            >
              {label}
            </div>
            <div
              style={{
                marginTop: '6px',
                height: '2px',
                backgroundColor: 'rgba(255, 222, 147, 0.91)',
                transition: 'width 0.4s ease',
                width: hovered === label ? '80%' : '0%',
              }}
            />
          </div>
        ))}
      </div>

      {activeSection !== 'OTHER WORKS' && (
        <div style={{
          position: 'absolute',
          top: '14%',
          right: '5vw',
          width: '40vw',
          height: '70vh',
          background: 'rgba(0, 0, 0, 0.07)',
          borderRadius: '20px',
          backdropFilter: 'blur(1px)',
          WebkitBackdropFilter: 'blur(1px)',
          boxShadow: '0 0 15px rgba(0, 0, 0, 0.2)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          zIndex: 10,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'slideInRight 0.4s ease',
        }}>
          {activeSection === 'VIDEO EDITING' && <VideoEditingSection />}
          {activeSection === 'GRAPHIC DESIGN' && <GraphicDesignSection />}
          {activeSection === 'DOCUMENTATION' && <DocumentationSection />}
          {activeSection === 'CREDITS' && <CreditsSection />}
        </div>
      )}

      <style>
        {`
          @keyframes slideInRight {
            from {
              opacity: 0;
              transform: translateX(100px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}
      </style>
    </>
  );
};

export default OtherWorksPageBackground;
