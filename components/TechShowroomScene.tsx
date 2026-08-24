'use client';

import { useEffect, useRef, useState } from 'react';

type NetworkInformation = {
  saveData?: boolean;
};

export default function TechShowroomScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [useFallback, setUseFallback] = useState(true);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
    const compactViewport = window.matchMedia('(max-width: 767px)').matches;

    if (reduceMotion || connection?.saveData || compactViewport) {
      setUseFallback(true);
      return;
    }

    let disposed = false;
    let animationFrame = 0;
    let isVisible = true;
    let cleanupScene = () => {};

    const boot = async () => {
      const THREE = await import('three');
      if (disposed || !canvasRef.current) return;

      const canvas = canvasRef.current;
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setClearColor(0x000000, 0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
      camera.position.set(0, 0, 7.5);

      const root = new THREE.Group();
      root.rotation.set(-0.1, -0.24, 0.08);
      scene.add(root);

      const cyan = new THREE.MeshPhysicalMaterial({
        color: 0x22c4cc,
        emissive: 0x063c46,
        emissiveIntensity: 1.4,
        metalness: 0.62,
        roughness: 0.18,
        clearcoat: 1,
        clearcoatRoughness: 0.12,
      });
      const red = new THREE.MeshPhysicalMaterial({
        color: 0xef4444,
        emissive: 0x501018,
        emissiveIntensity: 1.1,
        metalness: 0.66,
        roughness: 0.2,
        clearcoat: 1,
      });
      const glass = new THREE.MeshPhysicalMaterial({
        color: 0x7debf0,
        transparent: true,
        opacity: 0.22,
        transmission: 0.5,
        metalness: 0.08,
        roughness: 0.08,
        side: THREE.DoubleSide,
      });

      const outerRing = new THREE.Mesh(new THREE.TorusGeometry(1.62, 0.22, 28, 112), cyan);
      const orbit = new THREE.Mesh(new THREE.TorusGeometry(2.25, 0.035, 12, 128), glass);
      orbit.rotation.set(1.15, 0.25, 0.35);
      const innerDisc = new THREE.Mesh(new THREE.CylinderGeometry(1.14, 1.14, 0.18, 72), glass);
      innerDisc.rotation.x = Math.PI / 2;

      const keyStem = new THREE.Mesh(new THREE.CapsuleGeometry(0.24, 1.15, 12, 24), red);
      keyStem.position.y = -1.1;
      keyStem.rotation.z = Math.PI;
      const keyHead = new THREE.Mesh(new THREE.SphereGeometry(0.48, 36, 36), red);
      keyHead.scale.set(1, 1, 0.52);
      keyHead.position.y = 0.12;

      const satellite = new THREE.Mesh(new THREE.SphereGeometry(0.15, 24, 24), red);
      satellite.position.set(1.85, 1.7, 0.6);

      root.add(outerRing, orbit, innerDisc, keyStem, keyHead, satellite);

      const particleCount = 72;
      const particlePositions = new Float32Array(particleCount * 3);
      for (let index = 0; index < particleCount; index += 1) {
        const radius = 2.7 + Math.random() * 1.9;
        const angle = Math.random() * Math.PI * 2;
        particlePositions[index * 3] = Math.cos(angle) * radius;
        particlePositions[index * 3 + 1] = Math.sin(angle) * radius * 0.68;
        particlePositions[index * 3 + 2] = (Math.random() - 0.5) * 2.4;
      }
      const particleGeometry = new THREE.BufferGeometry();
      particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
      const particles = new THREE.Points(
        particleGeometry,
        new THREE.PointsMaterial({ color: 0x7debf0, size: 0.025, transparent: true, opacity: 0.55 }),
      );
      scene.add(particles);

      scene.add(new THREE.AmbientLight(0x7dd3fc, 1.25));
      const keyLight = new THREE.PointLight(0x22c4cc, 28, 14);
      keyLight.position.set(3.5, 3, 4);
      scene.add(keyLight);
      const rimLight = new THREE.PointLight(0xef4444, 22, 12);
      rimLight.position.set(-3.5, -2, 3);
      scene.add(rimLight);

      const pointer = { x: 0, y: 0 };
      const handlePointer = (event: PointerEvent) => {
        pointer.x = (event.clientX / window.innerWidth - 0.5) * 0.28;
        pointer.y = (event.clientY / window.innerHeight - 0.5) * 0.2;
      };

      const resize = () => {
        const parent = canvas.parentElement;
        if (!parent) return;
        const width = parent.clientWidth;
        const height = parent.clientHeight;
        renderer.setSize(width, height, false);
        camera.aspect = width / Math.max(height, 1);
        camera.updateProjectionMatrix();
      };

      const observer = new IntersectionObserver(([entry]) => {
        isVisible = entry.isIntersecting;
      }, { threshold: 0.02 });
      observer.observe(canvas);
      window.addEventListener('pointermove', handlePointer, { passive: true });
      window.addEventListener('resize', resize, { passive: true });
      resize();

      const startedAt = performance.now();
      const draw = () => {
        if (disposed) return;
        if (isVisible) {
          const elapsed = (performance.now() - startedAt) / 1000;
          root.rotation.y += (pointer.x + Math.sin(elapsed * 0.22) * 0.12 - root.rotation.y) * 0.025;
          root.rotation.x += (-pointer.y - 0.08 - root.rotation.x) * 0.025;
          orbit.rotation.z = elapsed * 0.08;
          satellite.position.x = Math.cos(elapsed * 0.35) * 2.25;
          satellite.position.y = Math.sin(elapsed * 0.35) * 1.65;
          particles.rotation.z = -elapsed * 0.012;
          particles.rotation.y = elapsed * 0.018;
          renderer.render(scene, camera);
        }
        animationFrame = window.requestAnimationFrame(draw);
      };

      setUseFallback(false);
      draw();

      cleanupScene = () => {
        observer.disconnect();
        window.removeEventListener('pointermove', handlePointer);
        window.removeEventListener('resize', resize);
        window.cancelAnimationFrame(animationFrame);
        particleGeometry.dispose();
        outerRing.geometry.dispose();
        orbit.geometry.dispose();
        innerDisc.geometry.dispose();
        keyStem.geometry.dispose();
        keyHead.geometry.dispose();
        satellite.geometry.dispose();
        cyan.dispose();
        red.dispose();
        glass.dispose();
        (particles.material as InstanceType<typeof THREE.PointsMaterial>).dispose();
        renderer.dispose();
      };
    };

    void boot();

    return () => {
      disposed = true;
      cleanupScene();
    };
  }, []);

  return (
    <div className="showroom-scene" aria-hidden="true">
      <div className={`showroom-static ${useFallback ? 'is-visible' : ''}`} />
      <canvas ref={canvasRef} className={`showroom-canvas ${useFallback ? '' : 'is-visible'}`} />
    </div>
  );
}
