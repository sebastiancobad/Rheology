"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
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
    const step = 0.35;
    x += Math.sin(phi) * Math.cos(theta) * step;
    y += Math.sin(phi) * Math.sin(theta) * step;
    z += Math.cos(phi) * step;
    points.push(new THREE.Vector3(x, y, z));
  }
  const center = new THREE.Vector3();
  points.forEach(p => center.add(p));
  center.divideScalar(points.length);
  points.forEach(p => p.sub(center));
  return points;
}

function ChainTube({ points, color, radius = 0.045 }: { points: THREE.Vector3[]; color: string; radius?: number }) {
  const curve = useMemo(() => new THREE.CatmullRomCurve3(points, false, "catmullrom", 0.5), [points]);
  const tubeGeo = useMemo(() => new THREE.TubeGeometry(curve, points.length * 4, radius, 12, false), [curve, points.length, radius]);

  return (
    <mesh geometry={tubeGeo}>
      <meshPhysicalMaterial color={color} roughness={0.25} metalness={0.05} clearcoat={0.3} clearcoatRoughness={0.4} />
    </mesh>
  );
}

function ChainSpheres({ points, color }: { points: THREE.Vector3[]; color: string }) {
  return (
    <group>
      {points.filter((_, i) => i % 2 === 0).map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.09, 24, 24]} />
          <meshPhysicalMaterial color={color} roughness={0.2} metalness={0.1} clearcoat={0.5} clearcoatRoughness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

function Chain({ points, color, shearRate, offset }: { points: THREE.Vector3[]; color: string; shearRate: number; offset: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const basePoints = useMemo(() => points.map(p => p.clone()), [points]);

  const deformedPoints = useMemo(() => {
    return basePoints.map(p => {
      const newP = p.clone();
      newP.x += newP.y * shearRate * 0.25;
      return newP;
    });
  }, [basePoints, shearRate]);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.12 + offset;
  });

  return (
    <group ref={groupRef}>
      <ChainTube points={deformedPoints} color={color} />
      <ChainSpheres points={deformedPoints} color={color} />
    </group>
  );
}

function Scene({ shearRate }: { shearRate: number }) {
  const chain1 = useMemo(() => generateChainPoints(45, 1), []);
  const chain2 = useMemo(() => generateChainPoints(35, 42), []);
  const chain3 = useMemo(() => generateChainPoints(38, 99), []);

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[8, 10, 5]} intensity={1} castShadow shadow-mapSize={1024} />
      <directionalLight position={[-5, 3, -5]} intensity={0.3} color="#8DA9C4" />
      <pointLight position={[0, 5, 0]} intensity={0.4} color="#EEF4ED" />
      <Chain points={chain1} color="#134074" shearRate={shearRate} offset={0} />
      <Chain points={chain2} color="#8DA9C4" shearRate={shearRate} offset={2.1} />
      <Chain points={chain3} color="#13315C" shearRate={shearRate} offset={4.2} />
      <ContactShadows position={[0, -2.5, 0]} opacity={0.25} scale={12} blur={2.5} far={4} />
      <Environment preset="studio" />
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.4} maxPolarAngle={Math.PI / 1.8} minPolarAngle={0.4} />
    </>
  );
}

export default function PolymerChain3D({ shearRate = 0 }: { shearRate?: number }) {
  return (
    <div className="w-full h-[420px] rounded-2xl overflow-hidden border border-[#d0dde8] bg-gradient-to-b from-[#f8faf8] to-[#EEF4ED] shadow-sm">
      <Canvas camera={{ position: [5, 3.5, 5], fov: 42 }} shadows>
        <Scene shearRate={shearRate} />
      </Canvas>
    </div>
  );
}
