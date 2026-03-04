"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function ConePlate({ rpm }: { rpm: number }) {
  const coneRef = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (coneRef.current) {
      coneRef.current.rotation.y += rpm * 0.01;
    }
  });

  return (
    <group>
      {/* Bottom plate (fixed) */}
      <mesh position={[0, -0.05, 0]}>
        <cylinderGeometry args={[2, 2, 0.1, 64]} />
        <meshStandardMaterial color="#8DA9C4" metalness={0.6} roughness={0.2} />
      </mesh>
      {/* Cone (rotating) */}
      <mesh ref={coneRef} position={[0, 0.15, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[2, 0.15, 64]} />
        <meshStandardMaterial color="#134074" metalness={0.6} roughness={0.2} transparent opacity={0.85} />
      </mesh>
      {/* Sample (thin layer) */}
      <mesh position={[0, 0.03, 0]}>
        <cylinderGeometry args={[1.95, 1.95, 0.04, 64]} />
        <meshStandardMaterial color="#EEF4ED" transparent opacity={0.6} />
      </mesh>
      {/* Shaft */}
      <mesh position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 1.2, 32]} />
        <meshStandardMaterial color="#13315C" metalness={0.7} roughness={0.15} />
      </mesh>
    </group>
  );
}

function ParallelPlates({ rpm }: { rpm: number }) {
  const topRef = useRef<THREE.Group>(null);
  useFrame(() => {
    if (topRef.current) {
      topRef.current.rotation.y += rpm * 0.01;
    }
  });

  return (
    <group>
      {/* Bottom plate (fixed) */}
      <mesh position={[0, -0.05, 0]}>
        <cylinderGeometry args={[2, 2, 0.1, 64]} />
        <meshStandardMaterial color="#8DA9C4" metalness={0.6} roughness={0.2} />
      </mesh>
      {/* Top plate (rotating) */}
      <group ref={topRef}>
        <mesh position={[0, 0.55, 0]}>
          <cylinderGeometry args={[2, 2, 0.1, 64]} />
          <meshStandardMaterial color="#134074" metalness={0.6} roughness={0.2} />
        </mesh>
        {/* Shaft */}
        <mesh position={[0, 1.2, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 1.2, 32]} />
          <meshStandardMaterial color="#13315C" metalness={0.7} roughness={0.15} />
        </mesh>
      </group>
      {/* Sample (gap) */}
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[1.9, 1.9, 0.4, 64]} />
        <meshStandardMaterial color="#EEF4ED" transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

function Couette({ rpm }: { rpm: number }) {
  const innerRef = useRef<THREE.Group>(null);
  useFrame(() => {
    if (innerRef.current) {
      innerRef.current.rotation.y += rpm * 0.01;
    }
  });

  return (
    <group>
      {/* Outer cup */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[2, 2, 2, 64, 1, true]} />
        <meshStandardMaterial color="#8DA9C4" metalness={0.5} roughness={0.2} side={THREE.DoubleSide} transparent opacity={0.5} />
      </mesh>
      {/* Inner bob (rotating) */}
      <group ref={innerRef}>
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[1.3, 1.3, 1.8, 64]} />
          <meshStandardMaterial color="#134074" metalness={0.6} roughness={0.2} />
        </mesh>
        <mesh position={[0, 2, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 1.5, 32]} />
          <meshStandardMaterial color="#13315C" metalness={0.7} roughness={0.15} />
        </mesh>
      </group>
      {/* Bottom */}
      <mesh position={[0, -0.55, 0]}>
        <cylinderGeometry args={[2, 2, 0.1, 64]} />
        <meshStandardMaterial color="#8DA9C4" metalness={0.6} roughness={0.2} />
      </mesh>
    </group>
  );
}

export default function RheometerGeometry3D({ geometry = "cone-plate", rpm = 1 }: { geometry?: string; rpm?: number }) {
  return (
    <div className="w-full h-[350px] rounded-2xl overflow-hidden border border-[#c9d9e8] bg-gradient-to-b from-white to-[#EEF4ED]">
      <Canvas camera={{ position: [3.5, 3, 3.5], fov: 45 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 8, 5]} intensity={0.8} />
        <directionalLight position={[-3, -2, 4]} intensity={0.3} />
        {geometry === "cone-plate" && <ConePlate rpm={rpm} />}
        {geometry === "parallel-plate" && <ParallelPlates rpm={rpm} />}
        {geometry === "couette" && <Couette rpm={rpm} />}
        <OrbitControls enableZoom={false} minPolarAngle={0.3} maxPolarAngle={Math.PI / 2} />
      </Canvas>
    </div>
  );
}
