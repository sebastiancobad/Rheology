"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, Text, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

function Arrow({ from, to, color, thickness = 0.025 }: { from: [number, number, number]; to: [number, number, number]; color: string; thickness?: number }) {
  const dir = new THREE.Vector3(...to).sub(new THREE.Vector3(...from));
  const len = dir.length();
  const mid = new THREE.Vector3(...from).add(dir.clone().multiplyScalar(0.45));
  const tipPos = new THREE.Vector3(...to);
  const orientation = new THREE.Quaternion();
  orientation.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());

  return (
    <group>
      <mesh position={mid} quaternion={orientation}>
        <cylinderGeometry args={[thickness, thickness, len * 0.78, 16]} />
        <meshPhysicalMaterial color={color} roughness={0.3} metalness={0.15} />
      </mesh>
      <mesh position={tipPos} quaternion={orientation}>
        <coneGeometry args={[thickness * 2.8, 0.12, 16]} />
        <meshPhysicalMaterial color={color} roughness={0.3} metalness={0.15} />
      </mesh>
    </group>
  );
}

function StressArrowPair({ axis, color, label }: {
  axis: [number, number, number];
  color: string;
  label: string;
}) {
  const neg: [number, number, number] = [-axis[0], -axis[1], -axis[2]];
  const outerPos: [number, number, number] = [axis[0] * 1.5, axis[1] * 1.5, axis[2] * 1.5];
  const outerNeg: [number, number, number] = [neg[0] * 1.5, neg[1] * 1.5, neg[2] * 1.5];
  const labelPos: [number, number, number] = [axis[0] * 1.75, axis[1] * 1.75, axis[2] * 1.75];

  return (
    <group>
      <Arrow from={[axis[0] * 0.65, axis[1] * 0.65, axis[2] * 0.65]} to={outerPos} color={color} />
      <Arrow from={[neg[0] * 0.65, neg[1] * 0.65, neg[2] * 0.65]} to={outerNeg} color={color} />
      <Text position={labelPos} fontSize={0.16} color={color} anchorX="center" anchorY="middle" font="/fonts/inter.woff">{label}</Text>
    </group>
  );
}

function Cube() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.25) * 0.15 + state.clock.elapsedTime * 0.05;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.18) * 0.08;
    }
  });

  const edgesGeo = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(1.3, 1.3, 1.3)), []);

  return (
    <group ref={groupRef}>
      {/* Translucent cube faces */}
      <RoundedBox args={[1.3, 1.3, 1.3]} radius={0.02} smoothness={4}>
        <meshPhysicalMaterial color="#EEF4ED" transparent opacity={0.08} roughness={0.1} metalness={0} side={THREE.DoubleSide} />
      </RoundedBox>
      {/* Crisp wireframe edges */}
      <lineSegments geometry={edgesGeo}>
        <lineBasicMaterial color="#8DA9C4" transparent opacity={0.6} />
      </lineSegments>

      {/* Face highlight panels */}
      {[
        { pos: [0, 0, 0.651] as [number, number, number], rot: [0, 0, 0] as [number, number, number] },
        { pos: [0.651, 0, 0] as [number, number, number], rot: [0, Math.PI / 2, 0] as [number, number, number] },
        { pos: [0, 0.651, 0] as [number, number, number], rot: [Math.PI / 2, 0, 0] as [number, number, number] },
      ].map((face, i) => (
        <mesh key={i} position={face.pos} rotation={face.rot}>
          <planeGeometry args={[1.28, 1.28]} />
          <meshPhysicalMaterial color="#134074" transparent opacity={0.04} side={THREE.DoubleSide} />
        </mesh>
      ))}

      {/* Normal stresses σ₁₁, σ₂₂, σ₃₃ */}
      <StressArrowPair axis={[1, 0, 0]} color="#134074" label="σ₁₁" />
      <StressArrowPair axis={[0, 1, 0]} color="#134074" label="σ₂₂" />
      <StressArrowPair axis={[0, 0, 1]} color="#134074" label="σ₃₃" />

      {/* Shear stresses τ₁₂ on +y face */}
      <Arrow from={[0.3, 0.65, 0]} to={[1.15, 0.65, 0]} color="#0B2545" thickness={0.02} />
      <Arrow from={[-0.3, 0.65, 0]} to={[-1.15, 0.65, 0]} color="#0B2545" thickness={0.02} />
      <Text position={[1.35, 0.72, 0]} fontSize={0.12} color="#0B2545" anchorX="center">τ₁₂</Text>

      {/* Shear stresses τ₂₁ on +x face */}
      <Arrow from={[0.65, 0.3, 0]} to={[0.65, 1.15, 0]} color="#13315C" thickness={0.02} />
      <Arrow from={[0.65, -0.3, 0]} to={[0.65, -1.15, 0]} color="#13315C" thickness={0.02} />
      <Text position={[0.72, 1.35, 0]} fontSize={0.12} color="#13315C" anchorX="center">τ₂₁</Text>
    </group>
  );
}

export default function StressTensor3D() {
  return (
    <div className="w-full h-[380px] rounded-2xl overflow-hidden border border-[#d0dde8] bg-gradient-to-b from-[#f8faf8] to-[#EEF4ED] shadow-sm">
      <Canvas camera={{ position: [3.2, 2.5, 3.2], fov: 40 }} shadows>
        <ambientLight intensity={0.35} />
        <directionalLight position={[6, 8, 5]} intensity={0.9} castShadow />
        <directionalLight position={[-4, 2, -3]} intensity={0.2} color="#8DA9C4" />
        <Cube />
        <ContactShadows position={[0, -1.8, 0]} opacity={0.2} scale={8} blur={2} far={3} />
        <Environment preset="studio" />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.2} maxPolarAngle={Math.PI / 1.7} minPolarAngle={0.5} />
      </Canvas>
    </div>
  );
}
