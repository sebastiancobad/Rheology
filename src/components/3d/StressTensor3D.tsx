"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import * as THREE from "three";

function Arrow({ from, to, color }: { from: [number, number, number]; to: [number, number, number]; color: string }) {
  const dir = new THREE.Vector3(...to).sub(new THREE.Vector3(...from));
  const len = dir.length();
  const mid = new THREE.Vector3(...from).add(dir.clone().multiplyScalar(0.5));
  const orientation = new THREE.Quaternion();
  orientation.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());

  return (
    <group>
      <mesh position={mid} quaternion={orientation}>
        <cylinderGeometry args={[0.03, 0.03, len * 0.85, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={new THREE.Vector3(...to)} quaternion={orientation}>
        <coneGeometry args={[0.07, 0.15, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
}

function Cube() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Cube element */}
      <mesh>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshStandardMaterial color="#EEF4ED" transparent opacity={0.15} />
      </mesh>
      <mesh>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshStandardMaterial color="#8DA9C4" wireframe />
      </mesh>

      {/* Normal stresses - σ11, σ22, σ33 */}
      <Arrow from={[0.75, 0, 0]} to={[1.6, 0, 0]} color="#134074" />
      <Arrow from={[-0.75, 0, 0]} to={[-1.6, 0, 0]} color="#134074" />
      <Arrow from={[0, 0.75, 0]} to={[0, 1.6, 0]} color="#134074" />
      <Arrow from={[0, -0.75, 0]} to={[0, -1.6, 0]} color="#134074" />
      <Arrow from={[0, 0, 0.75]} to={[0, 0, 1.6]} color="#134074" />
      <Arrow from={[0, 0, -0.75]} to={[0, 0, -1.6]} color="#134074" />

      {/* Shear stresses */}
      <Arrow from={[0.75, 0.75, 0]} to={[1.4, 0.75, 0]} color="#0B2545" />
      <Arrow from={[-0.75, -0.75, 0]} to={[-1.4, -0.75, 0]} color="#0B2545" />
      <Arrow from={[0.75, 0.75, 0]} to={[0.75, 1.4, 0]} color="#13315C" />
      <Arrow from={[-0.75, -0.75, 0]} to={[-0.75, -1.4, 0]} color="#13315C" />

      {/* Labels */}
      <Text position={[1.9, 0, 0]} fontSize={0.2} color="#134074">σ₁₁</Text>
      <Text position={[0, 1.9, 0]} fontSize={0.2} color="#134074">σ₂₂</Text>
      <Text position={[0, 0, 1.9]} fontSize={0.2} color="#134074">σ₃₃</Text>
      <Text position={[1.6, 0.9, 0]} fontSize={0.15} color="#0B2545">τ₁₂</Text>
    </group>
  );
}

export default function StressTensor3D() {
  return (
    <div className="w-full h-[350px] rounded-2xl overflow-hidden border border-[#c9d9e8] bg-gradient-to-b from-white to-[#EEF4ED]">
      <Canvas camera={{ position: [3, 2.5, 3], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={0.7} />
        <Cube />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.3} />
      </Canvas>
    </div>
  );
}
