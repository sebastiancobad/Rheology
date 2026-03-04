"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function generateChainPoints(numPoints: number, seed: number): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  let x = 0, y = 0, z = 0;
  const rng = (s: number) => {
    s = Math.sin(s * 127.1 + seed) * 43758.5453;
    return s - Math.floor(s);
  };
  for (let i = 0; i < numPoints; i++) {
    const theta = rng(i * 3.1) * Math.PI * 2;
    const phi = rng(i * 7.3) * Math.PI;
    const step = 0.4;
    x += Math.sin(phi) * Math.cos(theta) * step;
    y += Math.sin(phi) * Math.sin(theta) * step;
    z += Math.cos(phi) * step;
    points.push(new THREE.Vector3(x, y, z));
  }
  // Center the chain
  const center = new THREE.Vector3();
  points.forEach(p => center.add(p));
  center.divideScalar(points.length);
  points.forEach(p => p.sub(center));
  return points;
}

function PolymerBond({ start, end, color }: { start: THREE.Vector3; end: THREE.Vector3; color: string }) {
  const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
  const dir = new THREE.Vector3().subVectors(end, start);
  const len = dir.length();
  const orientation = new THREE.Quaternion();
  orientation.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());

  return (
    <mesh position={mid} quaternion={orientation}>
      <cylinderGeometry args={[0.04, 0.04, len, 8]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

function Chain({ points, color, shearRate }: { points: THREE.Vector3[]; color: string; shearRate: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    // Apply shear deformation
    const shearMatrix = new THREE.Matrix4();
    shearMatrix.set(
      1, shearRate * 0.3, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    );
    groupRef.current.matrix.identity();
    groupRef.current.applyMatrix4(shearMatrix);
  });

  return (
    <group ref={groupRef}>
      {points.map((p, i) => (
        <mesh key={`node-${i}`} position={p}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color={color} roughness={0.3} metalness={0.1} />
        </mesh>
      ))}
      {points.slice(1).map((p, i) => (
        <PolymerBond key={`bond-${i}`} start={points[i]} end={p} color={color} />
      ))}
    </group>
  );
}

function Scene({ shearRate }: { shearRate: number }) {
  const chain1 = useMemo(() => generateChainPoints(40, 1), []);
  const chain2 = useMemo(() => generateChainPoints(30, 42), []);
  const chain3 = useMemo(() => generateChainPoints(35, 99), []);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <directionalLight position={[-3, -3, 2]} intensity={0.3} />
      <Chain points={chain1} color="#134074" shearRate={shearRate} />
      <Chain points={chain2} color="#8DA9C4" shearRate={shearRate} />
      <Chain points={chain3} color="#13315C" shearRate={shearRate} />
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
    </>
  );
}

export default function PolymerChain3D({ shearRate = 0 }: { shearRate?: number }) {
  return (
    <div className="w-full h-[400px] rounded-2xl overflow-hidden border border-[#c9d9e8] bg-[#EEF4ED]">
      <Canvas camera={{ position: [4, 3, 4], fov: 50 }}>
        <Scene shearRate={shearRate} />
      </Canvas>
    </div>
  );
}
