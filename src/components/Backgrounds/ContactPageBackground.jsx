import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';

const ContactPageBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mountNode = mountRef.current;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#000000');
    scene.fog = new THREE.Fog('#000000', 25, 100);

    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0.2, 1.2, 1);

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
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
    dirLight.shadow.mapSize.set(1024, 1024);
    scene.add(dirLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
    fillLight.position.set(-30, 20, -40);
    scene.add(fillLight);

    // Lazy-load ground texture
    const textureLoader = new THREE.TextureLoader();
    requestIdleCallback(() => {
      textureLoader.load('/textures/moon_surface.jpg', (tex) => {
        tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
        tex.repeat.set(50, 50);
        tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
        tex.minFilter = THREE.LinearMipMapLinearFilter;
        tex.magFilter = THREE.LinearFilter;

        const ground = new THREE.Mesh(
          new THREE.PlaneGeometry(1000, 1000),
          new THREE.MeshStandardMaterial({
            map: tex,
            roughness: 1,
            metalness: 0,
          })
        );
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -1;
        ground.receiveShadow = true;
        scene.add(ground);
      });
    });

    // Loaders
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.4.3/');

    const ktx2Loader = new KTX2Loader()
      .setTranscoderPath('https://unpkg.com/three@0.160.1/examples/jsm/libs/basis/')
      .detectSupport(renderer);

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);
    loader.setKTX2Loader(ktx2Loader);
    loader.setMeshoptDecoder(MeshoptDecoder);

    let r2d2 = null;

    const loadModel = () => {
      loader.load(
        '/models/r2_d2_optimized.glb',
        (gltf) => {
          r2d2 = gltf.scene;
          r2d2.scale.set(2, 2, 2);
          r2d2.position.set(0, -1, 0);

          r2d2.traverse((child) => {
            if (child.isMesh) {
              child.frustumCulled = false;
              child.castShadow = true;
              child.receiveShadow = true;
              child.material.metalness = 0.6;
              child.material.roughness = 0.3;
              child.material.anisotropy = renderer.capabilities.getMaxAnisotropy();
            }
          });

          scene.add(r2d2);
        },
        undefined,
        (err) => console.error('Model failed to load', err)
      );
    };

    if ('requestIdleCallback' in window) {
      requestIdleCallback(loadModel, { timeout: 2000 });
    } else {
      setTimeout(loadModel, 200);
    }

    const keys = {};
    window.addEventListener('keydown', (e) => (keys[e.key.toLowerCase()] = true));
    window.addEventListener('keyup', (e) => (keys[e.key.toLowerCase()] = false));

    const speed = 0.1;
    const cameraOffset = new THREE.Vector3(0, 2.1, -3.8);

    renderer.setAnimationLoop(() => {
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
    });

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', () => {});
      window.removeEventListener('keyup', () => {});
      renderer.setAnimationLoop(null);
      mountNode.removeChild(renderer.domElement);
      controls.dispose();
      dracoLoader.dispose();
      ktx2Loader.dispose();

      if (r2d2) {
        r2d2.traverse((child) => {
          if (child.isMesh) {
            child.geometry?.dispose();
            if (child.material?.map) child.material.map.dispose();
            child.material?.dispose();
          }
        });
      }
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100vw', height: '100vh', position: 'relative' }} />;
};

export default ContactPageBackground;
