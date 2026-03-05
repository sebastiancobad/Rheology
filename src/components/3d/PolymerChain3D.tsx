"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, Html } from "@react-three/drei";
import * as THREE from "three";

/* -------------------------------------------------------------------------- */
/*  Freely-jointed chain with persistence length                              */
/*  Generates a random walk biased by bond angle correlation (worm-like chain)*/
/* -------------------------------------------------------------------------- */
function generateChainPoints(numSegments: number, seed: number, bondLength: number = 0.3, persistenceRatio: number = 0.4): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  const rng = (s: number) => {
    s = Math.sin(s * 127.1 + seed) * 43758.5453;
    return s - Math.floor(s);
  };

  // Start at origin with random initial direction
  let x = 0, y = 0, z = 0;
  let dirX = rng(seed * 1.1) - 0.5;
  let dirY = rng(seed * 2.3) - 0.5;
  let dirZ = rng(seed * 3.7) - 0.5;
  const len0 = Math.sqrt(dirX * dirX + dirY * dirY + dirZ * dirZ);
  dirX /= len0; dirY /= len0; dirZ /= len0;

  points.push(new THREE.Vector3(x, y, z));

  for (let i = 0; i < numSegments; i++) {
    // Random deviation
    const randX = (rng(i * 3.1 + seed) - 0.5) * 2;
    const randY = (rng(i * 7.3 + seed) - 0.5) * 2;
    const randZ = (rng(i * 11.7 + seed) - 0.5) * 2;

    // Blend previous direction with random (persistence length effect)
    dirX = persistenceRatio * dirX + (1 - persistenceRatio) * randX;
    dirY = persistenceRatio * dirY + (1 - persistenceRatio) * randY;
    dirZ = persistenceRatio * dirZ + (1 - persistenceRatio) * randZ;
    const len = Math.sqrt(dirX * dirX + dirY * dirY + dirZ * dirZ);
    dirX /= len; dirY /= len; dirZ /= len;

    x += dirX * bondLength;
    y += dirY * bondLength;
    z += dirZ * bondLength;
    points.push(new THREE.Vector3(x, y, z));
  }

  // Center
  const center = new THREE.Vector3();
  points.forEach(p => center.add(p));
  center.divideScalar(points.length);
  points.forEach(p => p.sub(center));

  return points;
}

/* -------------------------------------------------------------------------- */
/*  Physics-based deformation under shear                                     */
/*  Models: (1) affine shear, (2) chain orientation toward flow direction,    */
/*  (3) chain stretching along end-to-end vector, (4) contraction in gradient */
/*  direction, (5) reduced coil diameter (disentanglement) at high Wi         */
/* -------------------------------------------------------------------------- */
function deformChain(basePoints: THREE.Vector3[], shearRate: number): THREE.Vector3[] {
  if (shearRate < 0.01) return basePoints.map(p => p.clone());

  const Wi = shearRate; // Weissenberg number analog

  // Compute end-to-end vector of the coil
  const first = basePoints[0];
  const last = basePoints[basePoints.length - 1];
  const ete = new THREE.Vector3().subVectors(last, first);
  const eteLen = ete.length() || 1;
  const eteDir = ete.clone().normalize();

  // Flow direction (x-axis) and gradient direction (y-axis)
  const flowDir = new THREE.Vector3(1, 0, 0);
  const gradDir = new THREE.Vector3(0, 1, 0);

  // Orientation: rotate end-to-end vector toward flow direction
  // At Wi→∞ the chain aligns fully with flow
  const orientFactor = 1 - Math.exp(-Wi * 0.5);
  const targetDir = flowDir.clone().lerp(eteDir, 1 - orientFactor).normalize();

  // Stretch factor: chain extends in flow direction at high Wi
  // R_ee ~ R_ee0 * (1 + Wi^0.5) for moderate Wi, capped by contour length
  const maxStretch = 2.5;
  const stretchFactor = 1 + (maxStretch - 1) * (1 - Math.exp(-Wi * 0.3));

  // Compression in gradient direction
  const compressionFactor = 1 / Math.sqrt(stretchFactor);

  // Build transformation for each point
  return basePoints.map(p => {
    const newP = p.clone();

    // Step 1: Affine shear deformation (velocity gradient tensor)
    // v_x = γ̇ * y, so displacement in x proportional to y-coordinate
    const affineStrength = Math.min(Wi * 0.15, 0.6);
    newP.x += newP.y * affineStrength;

    // Step 2: Orientation — project onto end-to-end axis, rotate toward flow
    const projEte = newP.dot(eteDir);
    const projPerp = newP.clone().sub(eteDir.clone().multiplyScalar(projEte));

    // Rotate the along-ete component toward targetDir
    const oriented = targetDir.clone().multiplyScalar(projEte * orientFactor)
      .add(eteDir.clone().multiplyScalar(projEte * (1 - orientFactor)));

    // Step 3: Stretch along oriented direction, compress perpendicular
    const stretched = oriented.multiplyScalar(stretchFactor);
    const compressed = projPerp.multiplyScalar(compressionFactor);

    // Blend between original and deformed based on Wi
    const blendFactor = 1 - Math.exp(-Wi * 0.4);
    const result = newP.clone().lerp(
      stretched.add(compressed),
      blendFactor
    );

    return result;
  });
}

/* -------------------------------------------------------------------------- */
/*  Rendering components                                                       */
/* -------------------------------------------------------------------------- */
function ChainTube({ points, color, radius = 0.04 }: { points: THREE.Vector3[]; color: string; radius?: number }) {
  const curve = useMemo(() => new THREE.CatmullRomCurve3(points, false, "catmullrom", 0.5), [points]);
  const tubeGeo = useMemo(() => new THREE.TubeGeometry(curve, points.length * 4, radius, 10, false), [curve, points.length, radius]);

  return (
    <mesh geometry={tubeGeo}>
      <meshPhysicalMaterial color={color} roughness={0.25} metalness={0.05} clearcoat={0.3} clearcoatRoughness={0.4} />
    </mesh>
  );
}

function MonomerBeads({ points, color, shearRate }: { points: THREE.Vector3[]; color: string; shearRate: number }) {
  // At high shear, show fewer beads (disentangled, stretched segments)
  const skipFactor = shearRate > 3 ? 4 : shearRate > 1.5 ? 3 : 2;
  const beadSize = 0.07 + (shearRate > 2 ? 0.01 : 0);

  return (
    <group>
      {points.filter((_, i) => i % skipFactor === 0).map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[beadSize, 16, 16]} />
          <meshPhysicalMaterial color={color} roughness={0.2} metalness={0.1} clearcoat={0.5} clearcoatRoughness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

/* Entanglement points — shown as small translucent spheres where chains come close */
function EntanglementPoints({ chains, shearRate }: { chains: THREE.Vector3[][]; shearRate: number }) {
  const entanglements = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const threshold = 0.5 + shearRate * 0.15; // entanglements separate at high shear
    for (let c1 = 0; c1 < chains.length; c1++) {
      for (let c2 = c1 + 1; c2 < chains.length; c2++) {
        for (let i = 0; i < chains[c1].length; i += 4) {
          for (let j = 0; j < chains[c2].length; j += 4) {
            const d = chains[c1][i].distanceTo(chains[c2][j]);
            if (d < threshold && d > 0.05) {
              pts.push(chains[c1][i].clone().lerp(chains[c2][j], 0.5));
            }
          }
        }
      }
    }
    return pts;
  }, [chains, shearRate]);

  // Fade out entanglements at high shear (disentanglement)
  const opacity = Math.max(0.05, 0.5 - shearRate * 0.08);

  if (entanglements.length === 0) return null;

  return (
    <group>
      {entanglements.slice(0, 15).map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshPhysicalMaterial color="#E8927C" transparent opacity={opacity} roughness={0.6} />
        </mesh>
      ))}
    </group>
  );
}

/* End-to-end vector visualization — shows chain orientation */
function EndToEndVector({ points, color }: { points: THREE.Vector3[]; color: string }) {
  const first = points[0];
  const last = points[points.length - 1];
  const mid = first.clone().lerp(last, 0.5);
  const dir = new THREE.Vector3().subVectors(last, first);
  const len = dir.length();

  const quat = useMemo(() => {
    const q = new THREE.Quaternion();
    q.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());
    return q;
  }, [dir]);

  return (
    <group position={mid} quaternion={quat}>
      <mesh>
        <cylinderGeometry args={[0.012, 0.012, len, 6]} />
        <meshBasicMaterial color={color} transparent opacity={0.5} />
      </mesh>
      <mesh position={[0, len / 2, 0]}>
        <coneGeometry args={[0.035, 0.1, 6]} />
        <meshBasicMaterial color={color} transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

/* Flow direction arrows along x-axis */
function FlowArrows({ shearRate }: { shearRate: number }) {
  if (shearRate < 0.3) return null;
  const opacity = Math.min(0.6, shearRate * 0.12);

  return (
    <group>
      {[-1.5, 0, 1.5].map((z, i) => (
        <group key={i} position={[0, 2.2, z]} rotation={[0, 0, -Math.PI / 2]}>
          <mesh>
            <cylinderGeometry args={[0.015, 0.015, 3, 6]} />
            <meshBasicMaterial color="#134074" transparent opacity={opacity} />
          </mesh>
          <mesh position={[0, 1.5, 0]}>
            <coneGeometry args={[0.05, 0.15, 6]} />
            <meshBasicMaterial color="#134074" transparent opacity={opacity} />
          </mesh>
        </group>
      ))}
      <Html position={[2.8, 2.2, 0]} center>
        <div className="text-[10px] text-[#134074] font-semibold whitespace-nowrap opacity-70">
          Flow (x)
        </div>
      </Html>
      <Html position={[0, 3.0, 0]} center>
        <div className="text-[10px] text-[#8DA9C4] font-semibold whitespace-nowrap opacity-60">
          ∇v (y)
        </div>
      </Html>
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/*  Individual chain with physically-based deformation                         */
/* -------------------------------------------------------------------------- */
function Chain({
  points, color, shearRate, position
}: {
  points: THREE.Vector3[]; color: string; shearRate: number; position: [number, number, number];
}) {
  const basePoints = useMemo(() => points.map(p => p.clone()), [points]);
  const deformedPoints = useMemo(() => deformChain(basePoints, shearRate), [basePoints, shearRate]);

  return (
    <group position={position}>
      <ChainTube points={deformedPoints} color={color} />
      <MonomerBeads points={deformedPoints} color={color} shearRate={shearRate} />
      {shearRate > 0.5 && <EndToEndVector points={deformedPoints} color={color} />}
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/*  Scene                                                                      */
/* -------------------------------------------------------------------------- */
function Scene({ shearRate }: { shearRate: number }) {
  // Generate chains with different lengths (polydispersity) and persistence
  const chain1 = useMemo(() => generateChainPoints(50, 1, 0.28, 0.45), []);
  const chain2 = useMemo(() => generateChainPoints(40, 42, 0.3, 0.35), []);
  const chain3 = useMemo(() => generateChainPoints(45, 99, 0.26, 0.40), []);
  const chain4 = useMemo(() => generateChainPoints(35, 177, 0.32, 0.38), []);
  const chain5 = useMemo(() => generateChainPoints(42, 255, 0.27, 0.42), []);

  // Compute deformed points for entanglement detection
  const deformed1 = useMemo(() => deformChain(chain1, shearRate), [chain1, shearRate]);
  const deformed2 = useMemo(() => deformChain(chain2, shearRate), [chain2, shearRate]);
  const deformed3 = useMemo(() => deformChain(chain3, shearRate), [chain3, shearRate]);
  const deformed4 = useMemo(() => deformChain(chain4, shearRate), [chain4, shearRate]);
  const deformed5 = useMemo(() => deformChain(chain5, shearRate), [chain5, shearRate]);

  // Offset positions so chains overlap (entangled melt)
  const positions: [number, number, number][] = [
    [0, 0, 0], [-0.3, 0.4, 0.3], [0.2, -0.3, -0.2], [-0.1, 0.2, -0.4], [0.3, -0.1, 0.2]
  ];

  const allDeformed = useMemo(() => {
    return [deformed1, deformed2, deformed3, deformed4, deformed5].map(
      (pts, i) => pts.map(p => p.clone().add(new THREE.Vector3(...positions[i])))
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deformed1, deformed2, deformed3, deformed4, deformed5]);

  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[8, 10, 5]} intensity={1} castShadow shadow-mapSize={1024} />
      <directionalLight position={[-5, 3, -5]} intensity={0.3} color="#8DA9C4" />
      <pointLight position={[0, 5, 0]} intensity={0.3} color="#EEF4ED" />

      <Chain points={chain1} color="#134074" shearRate={shearRate} position={positions[0]} />
      <Chain points={chain2} color="#8DA9C4" shearRate={shearRate} position={positions[1]} />
      <Chain points={chain3} color="#13315C" shearRate={shearRate} position={positions[2]} />
      <Chain points={chain4} color="#0B2545" shearRate={shearRate} position={positions[3]} />
      <Chain points={chain5} color="#6B8CAE" shearRate={shearRate} position={positions[4]} />

      <EntanglementPoints chains={allDeformed} shearRate={shearRate} />
      <FlowArrows shearRate={shearRate} />

      <ContactShadows position={[0, -2.8, 0]} opacity={0.2} scale={14} blur={2.5} far={4} />
      <Environment preset="studio" />
      <OrbitControls
        enableZoom={false}
        autoRotate={shearRate < 0.3}
        autoRotateSpeed={0.3}
        maxPolarAngle={Math.PI / 1.7}
        minPolarAngle={0.3}
      />
    </>
  );
}

export default function PolymerChain3D({ shearRate = 0 }: { shearRate?: number }) {
  return (
    <div className="w-full h-[420px] rounded-2xl overflow-hidden border border-[#d0dde8] bg-gradient-to-b from-[#f8faf8] to-[#EEF4ED] shadow-sm relative">
      <Canvas camera={{ position: [5, 3.5, 5], fov: 42 }} shadows>
        <Scene shearRate={shearRate} />
      </Canvas>
      {/* Legend overlay */}
      <div className="absolute bottom-3 left-3 bg-white/80 backdrop-blur-sm rounded-lg px-3 py-2 border border-[#d0dde8]/50 text-[10px] text-[#2c4a6e] space-y-0.5">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#E8927C] opacity-60" />
          <span>Entanglement points</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-4 h-0.5 bg-[#134074] opacity-50 inline-block" />
          <span>End-to-end vector (R<sub>ee</sub>)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-4 h-0.5 bg-[#134074] opacity-30 inline-block" />
          <span>Flow direction arrows</span>
        </div>
      </div>
    </div>
  );
}
