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

  /* Cone-plate geometry: truncated cone with small angle (~2-4°).
     The cone's apex is truncated and nearly touches the stationary bottom plate.
     Real gap at center ≈ 50 µm. Here we use a visible gap for clarity. */
  const coneAngle = 0.07; // radians (~4°), controls the height difference across the radius
  const plateRadius = 2.1;
  const coneTopRadius = plateRadius; // wide end at the top
  const coneBottomRadius = 0.15; // truncated apex (not a sharp point)
  const coneHeight = (plateRadius - coneBottomRadius) * Math.tan(coneAngle) + 0.06; // geometric height + truncation thickness

  return (
    <group>
      {/* Stationary base plate — polished steel */}
      <mesh position={[0, -0.06, 0]} receiveShadow>
        <cylinderGeometry args={[plateRadius, plateRadius, 0.12, 128]} />
        <meshPhysicalMaterial color="#7a97b5" {...plateMaterial} />
      </mesh>
      {/* Plate edge ring */}
      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[plateRadius, 0.015, 16, 128]} />
        <meshPhysicalMaterial color="#5c7e9c" metalness={0.9} roughness={0.05} />
      </mesh>

      {/* Rotating cone assembly */}
      <group ref={coneRef}>
        {/* Truncated cone — wide at top, narrow (truncated) at bottom near plate */}
        <mesh position={[0, coneHeight / 2 + 0.02, 0]} castShadow>
          <cylinderGeometry args={[coneTopRadius, coneBottomRadius, coneHeight, 128]} />
          <meshPhysicalMaterial color="#134074" {...plateMaterial} transparent opacity={0.9} />
        </mesh>
        {/* Edge ring on cone */}
        <mesh position={[0, coneHeight + 0.02, 0]}>
          <torusGeometry args={[coneTopRadius, 0.012, 16, 128]} />
          <meshPhysicalMaterial color="#0B2545" metalness={0.9} roughness={0.05} />
        </mesh>
        {/* Shaft */}
        <mesh position={[0, coneHeight + 0.7, 0]} castShadow>
          <cylinderGeometry args={[0.14, 0.14, 1.3, 48]} />
          <meshPhysicalMaterial color="#0B2545" {...shaftMaterial} />
        </mesh>
        {/* Shaft collar */}
        <mesh position={[0, coneHeight + 0.06, 0]}>
          <cylinderGeometry args={[0.22, 0.22, 0.06, 48]} />
          <meshPhysicalMaterial color="#13315C" {...shaftMaterial} />
        </mesh>
      </group>

      {/* Sample — fills the wedge-shaped gap between cone and plate */}
      <mesh position={[0, 0.01, 0]}>
        <cylinderGeometry args={[plateRadius - 0.05, plateRadius - 0.1, 0.02, 128]} />
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

function AnnularGap({ innerR, outerR, height, y }: { innerR: number; outerR: number; height: number; y: number }) {
  /* Creates the sample fluid filling the annular gap using a TubeGeometry-based ring
     approximation: outer cylinder (BackSide) + inner cylinder (FrontSide) + top/bottom caps */
  const sampleMat = { color: "#d4a86a", transparent: true, opacity: 0.25, roughness: 0.6, transmission: 0.25, thickness: 1 } as const;
  const midR = (innerR + outerR) / 2;
  const thickness = outerR - innerR;
  return (
    <group position={[0, y, 0]}>
      {/* Outer wall of sample */}
      <mesh>
        <cylinderGeometry args={[outerR - 0.01, outerR - 0.01, height, 128, 1, true]} />
        <meshPhysicalMaterial {...sampleMat} side={THREE.BackSide} />
      </mesh>
      {/* Inner wall of sample */}
      <mesh>
        <cylinderGeometry args={[innerR + 0.01, innerR + 0.01, height, 128, 1, true]} />
        <meshPhysicalMaterial {...sampleMat} side={THREE.FrontSide} />
      </mesh>
      {/* Top cap — annular ring */}
      <mesh position={[0, height / 2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[innerR + 0.01, outerR - 0.01, 128]} />
        <meshPhysicalMaterial {...sampleMat} side={THREE.DoubleSide} />
      </mesh>
      {/* Bottom cap — annular ring */}
      <mesh position={[0, -height / 2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[innerR + 0.01, outerR - 0.01, 128]} />
        <meshPhysicalMaterial {...sampleMat} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function Couette({ rpm }: { rpm: number }) {
  const innerRef = useRef<THREE.Group>(null);
  useFrame(() => { if (innerRef.current) innerRef.current.rotation.y += rpm * 0.008; });

  const outerR = 2.1;
  const innerR = 1.5; // bob radius — gap ratio ≈ 0.71 (typical Couette)
  const cupHeight = 2.4;
  const bobHeight = 1.9;
  const wallThickness = 0.08;

  return (
    <group>
      {/* Outer cup — transparent glass-like cylinder with wall thickness */}
      <mesh position={[0, cupHeight / 2 - 0.6, 0]}>
        <cylinderGeometry args={[outerR + wallThickness, outerR + wallThickness, cupHeight, 128, 1, true]} />
        <meshPhysicalMaterial color="#7a97b5" {...plateMaterial} side={THREE.DoubleSide} transparent opacity={0.3} />
      </mesh>
      <mesh position={[0, cupHeight / 2 - 0.6, 0]}>
        <cylinderGeometry args={[outerR, outerR, cupHeight, 128, 1, true]} />
        <meshPhysicalMaterial color="#7a97b5" {...plateMaterial} side={THREE.DoubleSide} transparent opacity={0.15} />
      </mesh>
      {/* Cup lip ring */}
      <mesh position={[0, cupHeight - 0.6, 0]}>
        <torusGeometry args={[outerR + wallThickness / 2, wallThickness / 2, 16, 128]} />
        <meshPhysicalMaterial color="#5c7e9c" metalness={0.9} roughness={0.05} />
      </mesh>
      {/* Cup bottom */}
      <mesh position={[0, -0.65, 0]} receiveShadow>
        <cylinderGeometry args={[outerR + wallThickness, outerR + wallThickness, 0.1, 128]} />
        <meshPhysicalMaterial color="#7a97b5" {...plateMaterial} />
      </mesh>

      {/* Rotating inner bob + shaft */}
      <group ref={innerRef}>
        {/* Bob — solid cylinder */}
        <mesh position={[0, bobHeight / 2 - 0.55, 0]} castShadow>
          <cylinderGeometry args={[innerR, innerR, bobHeight, 128]} />
          <meshPhysicalMaterial color="#134074" {...plateMaterial} />
        </mesh>
        {/* Bob top ring */}
        <mesh position={[0, bobHeight - 0.55, 0]}>
          <torusGeometry args={[innerR, 0.015, 16, 128]} />
          <meshPhysicalMaterial color="#0B2545" metalness={0.9} roughness={0.05} />
        </mesh>
        {/* Bob bottom — hemispherical end (typical DIN geometry) */}
        <mesh position={[0, -0.55, 0]}>
          <sphereGeometry args={[innerR * 0.3, 64, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshPhysicalMaterial color="#134074" {...plateMaterial} />
        </mesh>
        {/* Shaft */}
        <mesh position={[0, bobHeight + 0.3, 0]} castShadow>
          <cylinderGeometry args={[0.14, 0.14, 1.5, 48]} />
          <meshPhysicalMaterial color="#0B2545" {...shaftMaterial} />
        </mesh>
      </group>

      {/* Sample filling the annular gap */}
      <AnnularGap innerR={innerR} outerR={outerR} height={bobHeight} y={bobHeight / 2 - 0.55} />
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
