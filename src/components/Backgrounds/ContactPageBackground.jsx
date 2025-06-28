import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const ContactPageBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mountNode = mountRef.current;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#000000');
    scene.fog = new THREE.Fog('#000000', 25, 100);

    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0.2, 1.2, 1);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mountNode.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.minDistance = 3;
    controls.maxDistance = 20;
    controls.maxPolarAngle = Math.PI / 2;

    scene.add(new THREE.AmbientLight(0xffffff, 0.3));

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight.position.set(40, 80, 60);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
    fillLight.position.set(-30, 20, -40);
    scene.add(fillLight);

    const textureLoader = new THREE.TextureLoader();
    const moonTexture = textureLoader.load('/textures/moon_surface.jpg');
    moonTexture.wrapS = moonTexture.wrapT = THREE.RepeatWrapping;
    moonTexture.repeat.set(50, 50);

    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(1000, 1000),
      new THREE.MeshStandardMaterial({ map: moonTexture, roughness: 1, metalness: 0 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1;
    ground.receiveShadow = true;
    scene.add(ground);

    // DRACO SUPPORT
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.4.3/');

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    let r2d2 = null;

    loader.load('/models/r2_d2.glb', (gltf) => {
      r2d2 = gltf.scene;
      r2d2.scale.set(2, 2, 2);
      r2d2.position.set(0, -1, 0);
      r2d2.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          child.material.metalness = 0.6;
          child.material.roughness = 0.3;
        }
      });
      scene.add(r2d2);
    });

    const keys = {};
    window.addEventListener('keydown', (e) => (keys[e.key.toLowerCase()] = true));
    window.addEventListener('keyup', (e) => (keys[e.key.toLowerCase()] = false));

    const speed = 0.1;
    const cameraOffset = new THREE.Vector3(0, 2.1, -3.8); // closer and higher

    const animate = () => {
      requestAnimationFrame(animate);

      if (r2d2) {
        const forward = keys['w'] || keys['arrowup'];
        const back = keys['s'] || keys['arrowdown'];
        const left = keys['a'] || keys['arrowleft'];
        const right = keys['d'] || keys['arrowright'];

        let isMoving = false;
        if (left) {
          r2d2.rotation.y += 0.05;
          isMoving = true;
        }
        if (right) {
          r2d2.rotation.y -= 0.05;
          isMoving = true;
        }

        const dir = new THREE.Vector3(Math.sin(r2d2.rotation.y), 0, Math.cos(r2d2.rotation.y));
        if (forward) {
          r2d2.position.add(dir.clone().multiplyScalar(speed));
          isMoving = true;
        }
        if (back) {
          r2d2.position.add(dir.clone().multiplyScalar(-speed));
          isMoving = true;
        }

        controls.target.copy(r2d2.position);

        if (isMoving) {
          const offset = cameraOffset.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), r2d2.rotation.y);
          const followPos = r2d2.position.clone().add(offset);
          camera.position.lerp(followPos, 0.15);
          camera.lookAt(r2d2.position.clone().add(new THREE.Vector3(0, 1.2, 0)));
        }
      }

      controls.update();
      if (camera.position.y < 1) camera.position.y = 1;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      mountNode.removeChild(renderer.domElement);
      controls.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100vw', height: '100vh', position: 'relative' }} />;
};

export default ContactPageBackground;
