import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const MAX_DUST = 500;

// Red dust/mist — diffuse, soft-edged, NOT glowing like fire
const createDustTexture = () => {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  // Soft uniform hazy puff — flat saturated red, no bright "hot" core
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0.0,  'rgba(195, 45, 40, 0.55)');
  g.addColorStop(0.30, 'rgba(180, 38, 36, 0.45)');
  g.addColorStop(0.60, 'rgba(150, 28, 30, 0.25)');
  g.addColorStop(0.85, 'rgba(120, 18, 24, 0.08)');
  g.addColorStop(1.0,  'rgba(100, 12, 20, 0.00)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);

  return new THREE.CanvasTexture(canvas);
};

const ContactPageBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mountNode = mountRef.current;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#000000');
    scene.fog = new THREE.Fog('#000000', 25, 100);

    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0.2, 1.2, 1);

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
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
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.set(1024, 1024);
    dirLight.shadow.camera.left   = -6;
    dirLight.shadow.camera.right  =  6;
    dirLight.shadow.camera.top    =  6;
    dirLight.shadow.camera.bottom = -6;
    dirLight.shadow.camera.near   = 0.5;
    dirLight.shadow.camera.far    = 30;
    dirLight.shadow.bias          = -0.001;
    scene.add(dirLight);
    scene.add(dirLight.target);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
    fillLight.position.set(-30, 20, -40);
    scene.add(fillLight);

    // ── Ground ──
    const textureLoader = new THREE.TextureLoader();
    const loadGroundTexture = () => {
      textureLoader.load('/textures/moon_surface.webp', (tex) => {
        tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
        tex.repeat.set(50, 50);
        tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
        tex.minFilter = THREE.LinearMipMapLinearFilter;
        tex.magFilter = THREE.LinearFilter;

        const ground = new THREE.Mesh(
          new THREE.PlaneGeometry(1000, 1000),
          new THREE.MeshStandardMaterial({ map: tex, roughness: 1, metalness: 0 })
        );
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -1;
        ground.receiveShadow = true;
        scene.add(ground);
      });
    };

    if ('requestIdleCallback' in window) {
      requestIdleCallback(loadGroundTexture, { timeout: 1000 });
    } else {
      setTimeout(loadGroundTexture, 200);
    }

    // ── R2D2 model ──
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.4.3/');

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);
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
              child.frustumCulled = true;
              child.castShadow = true;
              child.receiveShadow = true;
              child.material.metalness = 0.6;
              child.material.roughness = 0.3;
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
      setTimeout(loadModel, 300);
    }

    // ── Dust particle system ──
    const dustTex = createDustTexture();
    const dustPool = [];

    for (let i = 0; i < MAX_DUST; i++) {
      const mat = new THREE.SpriteMaterial({
        map: dustTex,
        transparent: true,
        opacity: 0,
        depthWrite: false,
        // NormalBlending = opaque particulate mist, NOT a glowing light source
        blending: THREE.NormalBlending,
      });
      const sprite = new THREE.Sprite(mat);
      sprite.visible = false;
      sprite.userData = {
        alive: false,
        life: 0,
        maxLife: 1,
        vx: 0, vy: 0, vz: 0,
        targetSize: 1,
        rotation: 0,
        rotSpeed: 0,
      };
      scene.add(sprite);
      dustPool.push(sprite);
    }

    let poolCursor = 0;

    const spawnDust = (pos, heading, velDir) => {
      const burst = 6;
      for (let i = 0; i < burst; i++) {
        const sprite = dustPool[poolCursor % MAX_DUST];
        poolCursor++;

        const d = sprite.userData;

        const sinH = Math.sin(heading);
        const cosH = Math.cos(heading);

        // Low trail right behind R2D2 — tight footprint, hugs the ground
        const backDist      = 0.3 + Math.random() * 0.5;
        const lateralSpread = (Math.random() - 0.5) * 0.7;

        sprite.position.set(
          pos.x - sinH * backDist + cosH * lateralSpread,
          -1 + Math.random() * 0.05,   // stays at ground level
          pos.z - cosH * backDist - sinH * lateralSpread
        );

        // Lingers — mist drags rather than punching up and vanishing
        const maxLife = 1.4 + Math.random() * 1.0;
        d.alive     = true;
        d.life      = maxLife;
        d.maxLife   = maxLife;

        // Dragged ALONG behind the motion (trailing lag), barely any lift, low drift
        d.vx = -sinH * (0.01 + Math.random() * 0.02) * velDir + cosH * (Math.random() - 0.5) * 0.012;
        d.vy = 0.006 + Math.random() * 0.010;   // very slow ground-hugging rise
        d.vz = -cosH * (0.01 + Math.random() * 0.02) * velDir - sinH * (Math.random() - 0.5) * 0.012;

        // Soft mid-size puffs
        d.targetSize = 0.9 + Math.random() * 0.9;

        // Slow rotation for organic feel
        d.rotation = Math.random() * Math.PI * 2;
        d.rotSpeed = (Math.random() - 0.5) * 0.01;

        sprite.material.rotation = d.rotation;
        sprite.scale.setScalar(0.08);
        sprite.material.opacity = 0;
        sprite.visible = true;
      }
    };

    const updateDust = (dt) => {
      for (const sprite of dustPool) {
        const d = sprite.userData;
        if (!d.alive) continue;

        d.life -= dt;
        if (d.life <= 0) {
          sprite.visible = false;
          d.alive = false;
          continue;
        }

        const progress = 1 - d.life / d.maxLife; // 0→1 over lifetime

        // Grow slowly and steadily — mist spreading, not a sharp puff
        const scale = d.targetSize * (0.2 + progress * 0.9);
        sprite.scale.setScalar(scale);

        // Opacity: smooth fade in, hold, long smooth fade out — drifting haze, not a flash
        const fadeIn  = Math.min(progress / 0.12, 1.0);
        const fadeOut = progress < 0.35
          ? 1.0
          : Math.pow(1.0 - (progress - 0.35) / 0.65, 1.6);
        sprite.material.opacity = 0.5 * fadeIn * fadeOut;

        // Drift
        sprite.position.x += d.vx;
        sprite.position.y += d.vy;
        sprite.position.z += d.vz;

        // Heavy drag — mist loses momentum fast and just hangs/spreads in place, dragging behind
        d.vx *= 0.94;
        d.vy *= 0.97;
        d.vz *= 0.94;

        // Rotate slowly for organic look
        d.rotation += d.rotSpeed;
        sprite.material.rotation = d.rotation;
      }
    };

    // ── Input ──
    const keys = {};
    const onKeyDown = (e) => (keys[e.key.toLowerCase()] = true);
    const onKeyUp   = (e) => (keys[e.key.toLowerCase()] = false);
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup',   onKeyUp);

    const speed        = 0.1;
    const cameraOffset = new THREE.Vector3(0, 2.1, -3.8);
    const lightOffset  = new THREE.Vector3(8, 18, 12);

    let lastTime = performance.now();

    renderer.setAnimationLoop(() => {
      const now = performance.now();
      const dt  = Math.min((now - lastTime) / 1000, 0.05);
      lastTime  = now;

      if (r2d2) {
        const forward = keys['w'] || keys['arrowup'];
        const back    = keys['s'] || keys['arrowdown'];
        const left    = keys['a'] || keys['arrowleft'];
        const right   = keys['d'] || keys['arrowright'];

        let isMoving = false;
        if (left)  { r2d2.rotation.y += 0.05; isMoving = true; }
        if (right) { r2d2.rotation.y -= 0.05; isMoving = true; }

        const dir = new THREE.Vector3(Math.sin(r2d2.rotation.y), 0, Math.cos(r2d2.rotation.y));
        if (forward) { r2d2.position.add(dir.clone().multiplyScalar(speed));  isMoving = true; }
        if (back)    { r2d2.position.add(dir.clone().multiplyScalar(-speed)); isMoving = true; }

        dirLight.position.copy(r2d2.position).add(lightOffset);
        dirLight.target.position.copy(r2d2.position);
        dirLight.target.updateMatrixWorld();

        controls.target.copy(r2d2.position);

        if (isMoving) {
          const offset = cameraOffset.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), r2d2.rotation.y);
          camera.position.lerp(r2d2.position.clone().add(offset), 0.15);
          camera.lookAt(r2d2.position.clone().add(new THREE.Vector3(0, 1.2, 0)));

          if (forward || back) {
            const velDir = back ? -1 : 1;
            spawnDust(r2d2.position, r2d2.rotation.y, velDir);
          }
        }

        updateDust(dt);
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
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup',   onKeyUp);
      renderer.setAnimationLoop(null);
      if (mountNode.contains(renderer.domElement)) {
        mountNode.removeChild(renderer.domElement);
      }
      controls.dispose();
      dracoLoader.dispose();
      renderer.dispose();

      dustTex.dispose();
      for (const sprite of dustPool) {
        sprite.material.dispose();
      }

      if (r2d2) {
        r2d2.traverse((child) => {
          if (child.isMesh) {
            child.geometry?.dispose();
            child.material?.map?.dispose();
            child.material?.dispose();
          }
        });
      }
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100vw', height: '100vh', position: 'relative' }} />;
};

export default ContactPageBackground;