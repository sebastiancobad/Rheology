"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

const plateMaterial = { metalness: 0.7, roughness: 0.15, clearcoat: 0.4, clearcoatRoughness: 0.2 };
const shaftMaterial = { metalness: 0.8, roughness: 0.1, clearcoat: 0.5, clearcoatRoughness: 0.15 };

function ConePlate({ rpm }: { rpm: number }) {
  const coneRef = useRef<THREE.Group>(null);
  useFrame(() => { if (coneRef.current) coneRef.current.rotation.y += rpm * 0.008; });

  return (
    <group>
      {/* Base plate — polished steel */}
      <mesh position={[0, -0.06, 0]} receiveShadow>
        <cylinderGeometry args={[2.1, 2.1, 0.12, 128]} />
        <meshPhysicalMaterial color="#7a97b5" {...plateMaterial} />
      </mesh>
      {/* Plate edge ring */}
      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[2.1, 0.015, 16, 128]} />
        <meshPhysicalMaterial color="#5c7e9c" metalness={0.9} roughness={0.05} />
      </mesh>

      {/* Rotating assembly */}
      <group ref={coneRef}>
        {/* Cone */}
        <mesh position={[0, 0.12, 0]} rotation={[Math.PI, 0, 0]} castShadow>
          <coneGeometry args={[2, 0.14, 128]} />
          <meshPhysicalMaterial color="#134074" {...plateMaterial} transparent opacity={0.9} />
        </mesh>
        {/* Shaft */}
        <mesh position={[0, 0.85, 0]} castShadow>
          <cylinderGeometry args={[0.14, 0.14, 1.3, 48]} />
          <meshPhysicalMaterial color="#0B2545" {...shaftMaterial} />
        </mesh>
        {/* Shaft collar */}
        <mesh position={[0, 0.22, 0]}>
          <cylinderGeometry args={[0.22, 0.22, 0.06, 48]} />
          <meshPhysicalMaterial color="#13315C" {...shaftMaterial} />
        </mesh>
      </group>

      {/* Sample — amber translucent */}
      <mesh position={[0, 0.025, 0]}>
        <cylinderGeometry args={[1.9, 1.95, 0.03, 128]} />
        <meshPhysicalMaterial color="#d4a86a" transparent opacity={0.35} roughness={0.6} transmission={0.3} thickness={0.5} />
      </mesh>
    </group>
  );
}

function ParallelPlates({ rpm }: { rpm: number }) {
  const topRef = useRef<THREE.Group>(null);
  useFrame(() => { if (topRef.current) topRef.current.rotation.y += rpm * 0.008; });

  return (
    <group>
      {/* Bottom plate */}
      <mesh position={[0, -0.06, 0]} receiveShadow>
        <cylinderGeometry args={[2.1, 2.1, 0.12, 128]} />
        <meshPhysicalMaterial color="#7a97b5" {...plateMaterial} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[2.1, 0.015, 16, 128]} />
        <meshPhysicalMaterial color="#5c7e9c" metalness={0.9} roughness={0.05} />
      </mesh>

      {/* Top plate + shaft rotating */}
      <group ref={topRef}>
        <mesh position={[0, 0.56, 0]} castShadow>
          <cylinderGeometry args={[2.1, 2.1, 0.12, 128]} />
          <meshPhysicalMaterial color="#134074" {...plateMaterial} />
        </mesh>
        <mesh position={[0, 0.5, 0]}>
          <torusGeometry args={[2.1, 0.015, 16, 128]} />
          <meshPhysicalMaterial color="#0B2545" metalness={0.9} roughness={0.05} />
        </mesh>
        <mesh position={[0, 1.25, 0]} castShadow>
          <cylinderGeometry args={[0.14, 0.14, 1.3, 48]} />
          <meshPhysicalMaterial color="#0B2545" {...shaftMaterial} />
        </mesh>
        <mesh position={[0, 0.62, 0]}>
          <cylinderGeometry args={[0.22, 0.22, 0.06, 48]} />
          <meshPhysicalMaterial color="#13315C" {...shaftMaterial} />
        </mesh>
      </group>

      {/* Sample gap */}
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[1.95, 1.95, 0.38, 128]} />
        <meshPhysicalMaterial color="#d4a86a" transparent opacity={0.25} roughness={0.6} transmission={0.3} thickness={1} />
      </mesh>
    </group>
  );
}

function Couette({ rpm }: { rpm: number }) {
  const innerRef = useRef<THREE.Group>(null);
  useFrame(() => { if (innerRef.current) innerRef.current.rotation.y += rpm * 0.008; });

  return (
    <group>
      {/* Outer cup — transparent */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[2.1, 2.1, 2.2, 128, 1, true]} />
        <meshPhysicalMaterial color="#7a97b5" {...plateMaterial} side={THREE.DoubleSide} transparent opacity={0.35} />
      </mesh>
      {/* Cup lip */}
      <mesh position={[0, 1.6, 0]}>
        <torusGeometry args={[2.1, 0.03, 16, 128]} />
        <meshPhysicalMaterial color="#5c7e9c" metalness={0.9} roughness={0.05} />
      </mesh>
      {/* Bottom */}
      <mesh position={[0, -0.6, 0]} receiveShadow>
        <cylinderGeometry args={[2.1, 2.1, 0.1, 128]} />
        <meshPhysicalMaterial color="#7a97b5" {...plateMaterial} />
      </mesh>

      {/* Inner bob + shaft rotating */}
      <group ref={innerRef}>
        <mesh position={[0, 0.5, 0]} castShadow>
          <cylinderGeometry args={[1.35, 1.35, 1.9, 128]} />
          <meshPhysicalMaterial color="#134074" {...plateMaterial} />
        </mesh>
        <mesh position={[0, 1.45, 0]}>
          <torusGeometry args={[1.35, 0.015, 16, 128]} />
          <meshPhysicalMaterial color="#0B2545" metalness={0.9} roughness={0.05} />
        </mesh>
        <mesh position={[0, 2.2, 0]} castShadow>
          <cylinderGeometry args={[0.14, 0.14, 1.5, 48]} />
          <meshPhysicalMaterial color="#0B2545" {...shaftMaterial} />
        </mesh>
      </group>

      {/* Sample in annular gap */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[2.05, 2.05, 1.9, 128, 1, true]} />
        <meshPhysicalMaterial color="#d4a86a" transparent opacity={0.15} roughness={0.6} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}

export default function RheometerGeometry3D({ geometry = "cone-plate", rpm = 1 }: { geometry?: string; rpm?: number }) {
  return (
    <div className="w-full h-[380px] rounded-2xl overflow-hidden border border-[#d0dde8] bg-gradient-to-b from-[#f8faf8] to-[#EEF4ED] shadow-sm">
      <Canvas camera={{ position: [4, 3.5, 4], fov: 40 }} shadows>
        <ambientLight intensity={0.3} />
        <directionalLight position={[6, 10, 5]} intensity={1} castShadow shadow-mapSize={1024} />
        <directionalLight position={[-4, 2, -6]} intensity={0.25} color="#8DA9C4" />
        <pointLight position={[0, 6, 0]} intensity={0.3} />
        {geometry === "cone-plate" && <ConePlate rpm={rpm} />}
        {geometry === "parallel-plate" && <ParallelPlates rpm={rpm} />}
        {geometry === "couette" && <Couette rpm={rpm} />}
        <ContactShadows position={[0, -1.2, 0]} opacity={0.3} scale={12} blur={2} far={4} />
        <Environment preset="studio" />
        <OrbitControls enableZoom={false} minPolarAngle={0.3} maxPolarAngle={Math.PI / 2.1} />
      </Canvas>
    </div>
  );
}
