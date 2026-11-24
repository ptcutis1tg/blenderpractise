import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ViewportToolstrip, ShadingMode, CameraPreset } from './ViewportToolstrip';
import { MetricsHUD } from './MetricsHUD';

interface ModelInspector3DProps {
  challengeTitle?: string;
  expectedVertices?: number;
  expectedFaces?: number;
  modifiers?: string;
}

export const ModelInspector3D: React.FC<ModelInspector3DProps> = ({
  challengeTitle = 'Challenge 04: Low-Poly Stylized Chair',
  expectedVertices = 148,
  expectedFaces = 136,
  modifiers = 'Mirror, Bevel (0.02m)',
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [shadingMode, setShadingMode] = useState<ShadingMode>('wireframe');
  const [cameraPreset, setCameraPreset] = useState<CameraPreset>('perspective');
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const autoRotateRef = useRef<boolean>(true);
  const [cameraDistance, setCameraDistance] = useState<number>(4.5);

  // Keep autoRotateRef in sync without triggering full Three.js re-render
  useEffect(() => {
    autoRotateRef.current = autoRotate;
  }, [autoRotate]);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);

  // Mouse orbit state
  const isDraggingRef = useRef(false);
  const prevMousePos = useRef({ x: 0, y: 0 });
  const sphericalRef = useRef({ radius: 4.5, theta: Math.PI / 4, phi: Math.PI / 3 });

  // Camera preset animations
  const targetSphericalRef = useRef<{ radius: number; theta: number; phi: number } | null>(null);

  const updateCameraPos = () => {
    if (!cameraRef.current) return;
    const s = sphericalRef.current;
    cameraRef.current.position.x = s.radius * Math.sin(s.phi) * Math.sin(s.theta);
    cameraRef.current.position.y = s.radius * Math.cos(s.phi);
    cameraRef.current.position.z = s.radius * Math.sin(s.phi) * Math.cos(s.theta);
    cameraRef.current.lookAt(0, 0.45, 0);
  };

  const setViewPreset = (preset: CameraPreset) => {
    setCameraPreset(preset);
    setAutoRotate(false);
    switch (preset) {
      case 'front': // Numpad 1
        targetSphericalRef.current = { radius: 4.2, theta: 0, phi: Math.PI / 2 };
        break;
      case 'right': // Numpad 3
        targetSphericalRef.current = { radius: 4.2, theta: Math.PI / 2, phi: Math.PI / 2 };
        break;
      case 'top': // Numpad 7
        targetSphericalRef.current = { radius: 4.5, theta: 0, phi: 0.05 };
        break;
      case 'perspective': // Numpad 5
      default:
        targetSphericalRef.current = { radius: 4.5, theta: Math.PI / 4, phi: Math.PI / 3 };
        break;
    }
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0e17);
    sceneRef.current = scene;

    // 2. Camera setup
    const width = container.clientWidth;
    const height = container.clientHeight;
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    cameraRef.current = camera;
    updateCameraPos();

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.55);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffeedd, 1.8);
    keyLight.position.set(4, 6, 4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x88bbff, 0.8);
    fillLight.position.set(-4, 3, -3);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xf97316, 0.9);
    rimLight.position.set(0, 4, -5);
    scene.add(rimLight);

    // 5. Floor grid and shadow catcher
    const grid = new THREE.GridHelper(8, 16, 0x374151, 0x1f2937);
    grid.position.y = -0.01;
    scene.add(grid);

    const floorGeo = new THREE.PlaneGeometry(12, 12);
    const floorMat = new THREE.ShadowMaterial({ opacity: 0.35 });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    // 6. Low-Poly Stylized Chair Group
    const chairGroup = new THREE.Group();
    modelGroupRef.current = chairGroup;

    const woodMat = new THREE.MeshStandardMaterial({
      color: 0xc87d46,
      roughness: 0.35,
      metalness: 0.05,
    });

    const cushionMat = new THREE.MeshStandardMaterial({
      color: 0x4f46e5,
      roughness: 0.6,
      metalness: 0.1,
    });

    const edgeMat = new THREE.LineBasicMaterial({
      color: 0x4edea3,
      linewidth: 1.5,
    });

    const addMeshWithEdges = (geo: THREE.BufferGeometry, mat: THREE.Material, px = 0, py = 0, pz = 0, rx = 0, ry = 0, rz = 0) => {
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(px, py, pz);
      mesh.rotation.set(rx, ry, rz);
      mesh.castShadow = true;
      mesh.receiveShadow = true;

      const wireGeo = new THREE.EdgesGeometry(geo, 15);
      const wire = new THREE.LineSegments(wireGeo, edgeMat);
      mesh.add(wire);

      chairGroup.add(mesh);
      return mesh;
    };

    // Chair Seat Base
    addMeshWithEdges(new THREE.BoxGeometry(1.2, 0.12, 1.2), woodMat, 0, 0.85, 0);
    // Soft Cushion
    addMeshWithEdges(new THREE.BoxGeometry(1.08, 0.08, 1.08), cushionMat, 0, 0.94, 0);

    // 4 Chair Legs (slight splay angle)
    const legGeo = new THREE.BoxGeometry(0.09, 0.85, 0.09);
    const legOffsetX = 0.48;
    const legOffsetZ = 0.48;
    addMeshWithEdges(legGeo, woodMat, -legOffsetX, 0.425, -legOffsetZ, -0.04, 0, 0.04);
    addMeshWithEdges(legGeo, woodMat, legOffsetX, 0.425, -legOffsetZ, -0.04, 0, -0.04);
    addMeshWithEdges(legGeo, woodMat, -legOffsetX, 0.425, legOffsetZ, 0.04, 0, 0.04);
    addMeshWithEdges(legGeo, woodMat, legOffsetX, 0.425, legOffsetZ, 0.04, 0, -0.04);

    // Crossbars
    addMeshWithEdges(new THREE.BoxGeometry(0.05, 0.05, 0.96), woodMat, -legOffsetX + 0.03, 0.35, 0);
    addMeshWithEdges(new THREE.BoxGeometry(0.05, 0.05, 0.96), woodMat, legOffsetX - 0.03, 0.35, 0);
    addMeshWithEdges(new THREE.BoxGeometry(0.96, 0.05, 0.05), woodMat, 0, 0.38, -legOffsetZ + 0.03);

    // Backrest Posts
    addMeshWithEdges(new THREE.BoxGeometry(0.08, 1.1, 0.08), woodMat, -legOffsetX + 0.05, 1.45, -legOffsetZ + 0.05, 0.05, 0, 0);
    addMeshWithEdges(new THREE.BoxGeometry(0.08, 1.1, 0.08), woodMat, legOffsetX - 0.05, 1.45, -legOffsetZ + 0.05, 0.05, 0, 0);

    // Backrest Horizontal Slats
    addMeshWithEdges(new THREE.BoxGeometry(0.98, 0.18, 0.06), woodMat, 0, 1.9, -legOffsetZ + 0.08, 0.05, 0, 0);
    addMeshWithEdges(new THREE.BoxGeometry(0.92, 0.1, 0.04), woodMat, 0, 1.62, -legOffsetZ + 0.07, 0.05, 0, 0);
    addMeshWithEdges(new THREE.BoxGeometry(0.92, 0.1, 0.04), woodMat, 0, 1.38, -legOffsetZ + 0.06, 0.05, 0, 0);

    scene.add(chairGroup);

    // 7. Mouse Orbit Handlers
    const onMouseDown = (e: MouseEvent) => {
      if (e.button === 0 || e.button === 2) {
        isDraggingRef.current = true;
        prevMousePos.current = { x: e.clientX, y: e.clientY };
        targetSphericalRef.current = null; // cancel active preset lerp
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const dx = e.clientX - prevMousePos.current.x;
      const dy = e.clientY - prevMousePos.current.y;
      prevMousePos.current = { x: e.clientX, y: e.clientY };

      const s = sphericalRef.current;
      s.theta -= dx * 0.008;
      s.phi = Math.max(0.05, Math.min(Math.PI / 2 - 0.02, s.phi - dy * 0.008));
      updateCameraPos();
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const s = sphericalRef.current;
      s.radius = Math.max(2.0, Math.min(9.0, s.radius + e.deltaY * 0.005));
      setCameraDistance(Math.round(s.radius * 10) / 10);
      updateCameraPos();
    };

    // Mobile Touch Gestures (Single-finger orbit, Two-finger pinch zoom)
    let initialPinchDistance = 0;
    let initialRadius = 4.5;

    const onTouchStart = (e: TouchEvent) => {
      targetSphericalRef.current = null;
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        prevMousePos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      } else if (e.touches.length === 2) {
        isDraggingRef.current = false;
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        initialPinchDistance = Math.hypot(dx, dy);
        initialRadius = sphericalRef.current.radius;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.cancelable) e.preventDefault();

      if (e.touches.length === 1 && isDraggingRef.current) {
        const dx = e.touches[0].clientX - prevMousePos.current.x;
        const dy = e.touches[0].clientY - prevMousePos.current.y;
        prevMousePos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };

        const s = sphericalRef.current;
        s.theta -= dx * 0.009;
        s.phi = Math.max(0.05, Math.min(Math.PI / 2 - 0.02, s.phi - dy * 0.009));
        updateCameraPos();
      } else if (e.touches.length === 2 && initialPinchDistance > 0) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const currentDistance = Math.hypot(dx, dy);
        if (currentDistance > 10) {
          const scale = initialPinchDistance / currentDistance;
          const s = sphericalRef.current;
          s.radius = Math.max(2.0, Math.min(9.0, initialRadius * scale));
          setCameraDistance(Math.round(s.radius * 10) / 10);
          updateCameraPos();
        }
      }
    };

    const onTouchEnd = () => {
      isDraggingRef.current = false;
      initialPinchDistance = 0;
    };

    const onResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    dom.addEventListener('wheel', onWheel, { passive: false });
    dom.addEventListener('touchstart', onTouchStart, { passive: false });
    dom.addEventListener('touchmove', onTouchMove, { passive: false });
    dom.addEventListener('touchend', onTouchEnd);
    window.addEventListener('resize', onResize);

    // Watch for split pane ratio changes (50:50, 65:35, 35:65)
    const resizeObserver = new ResizeObserver(() => {
      onResize();
    });
    resizeObserver.observe(container);

    // 8. Animation & Smooth Interpolation Loop
    let reqId: number;
    const animate = () => {
      reqId = requestAnimationFrame(animate);

      // Smooth camera interpolation towards target preset
      if (targetSphericalRef.current) {
        const target = targetSphericalRef.current;
        const current = sphericalRef.current;
        const lerpFactor = 0.12;

        current.radius += (target.radius - current.radius) * lerpFactor;
        current.theta += (target.theta - current.theta) * lerpFactor;
        current.phi += (target.phi - current.phi) * lerpFactor;

        updateCameraPos();

        if (
          Math.abs(target.radius - current.radius) < 0.01 &&
          Math.abs(target.theta - current.theta) < 0.01 &&
          Math.abs(target.phi - current.phi) < 0.01
        ) {
          targetSphericalRef.current = null;
        }
      } else if (autoRotateRef.current && !isDraggingRef.current) {
        sphericalRef.current.theta += 0.005;
        updateCameraPos();
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(reqId);
      resizeObserver.disconnect();
      dom.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      dom.removeEventListener('wheel', onWheel);
      dom.removeEventListener('touchstart', onTouchStart);
      dom.removeEventListener('touchmove', onTouchMove);
      dom.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (container.contains(dom)) {
        container.removeChild(dom);
      }
    };
  }, []);

  // Update Shading Visuals (Solid, Wireframe, X-Ray)
  useEffect(() => {
    if (!modelGroupRef.current) return;

    modelGroupRef.current.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const mat = child.material as THREE.MeshStandardMaterial;
        if (shadingMode === 'solid') {
          mat.transparent = false;
          mat.opacity = 1.0;
          mat.wireframe = false;
          child.children.forEach((c) => {
            if (c instanceof THREE.LineSegments) c.visible = false;
          });
        } else if (shadingMode === 'wireframe') {
          mat.transparent = false;
          mat.opacity = 1.0;
          mat.wireframe = false;
          child.children.forEach((c) => {
            if (c instanceof THREE.LineSegments) {
              c.visible = true;
              (c.material as THREE.LineBasicMaterial).color.setHex(0x4edea3);
            }
          });
        } else if (shadingMode === 'xray') {
          mat.transparent = true;
          mat.opacity = 0.35;
          mat.wireframe = false;
          child.children.forEach((c) => {
            if (c instanceof THREE.LineSegments) {
              c.visible = true;
              (c.material as THREE.LineBasicMaterial).color.setHex(0x38bdf8);
            }
          });
        }
      }
    });
  }, [shadingMode]);

  return (
    <div className="relative w-full h-full flex flex-col bg-[#0A0E17] select-none overflow-hidden">
      {/* 3D WebGL Canvas */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing touch-none select-none" />

      {/* Top Controls: ViewportToolstrip */}
      <div className="absolute top-3 right-3 pointer-events-auto z-20">
        <ViewportToolstrip
          shadingMode={shadingMode}
          onSelectShading={setShadingMode}
          activeCameraPreset={cameraPreset}
          onSelectCameraPreset={setViewPreset}
          autoRotate={autoRotate}
          onToggleAutoRotate={() => setAutoRotate(!autoRotate)}
          onResetCamera={() => setViewPreset('perspective')}
        />
      </div>

      {/* Floating HUD Badges & Topology Spec Sheet */}
      <MetricsHUD
        challengeTitle={challengeTitle}
        expectedVertices={expectedVertices}
        expectedFaces={expectedFaces}
        modifiers={modifiers}
        cameraDistance={cameraDistance}
      />
    </div>
  );
};
