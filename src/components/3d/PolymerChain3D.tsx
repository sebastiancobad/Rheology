"use client";

import { useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, Html } from "@react-three/drei";
import * as THREE from "three";

/* ── Deterministic RNG ─────────────────────────────────────────────────── */
const rng = (s: number, seed: number) => {
  const v = Math.sin(s * 127.1 + seed) * 43758.5453;
  return v - Math.floor(v);
};

/* ── Worm-like chain generator ─────────────────────────────────────────── */
function generateChainPoints(
  numSegments: number,
  seed: number,
  bondLength: number = 0.28,
  persistenceRatio: number = 0.42,
): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  let x = 0, y = 0, z = 0;
  let dx = rng(seed * 1.1, seed) - 0.5;
  let dy = rng(seed * 2.3, seed) - 0.5;
  let dz = rng(seed * 3.7, seed) - 0.5;
  let len = Math.sqrt(dx * dx + dy * dy + dz * dz);
  dx /= len; dy /= len; dz /= len;
  points.push(new THREE.Vector3(x, y, z));

  for (let i = 0; i < numSegments; i++) {
    const rx = (rng(i * 3.1, seed) - 0.5) * 2;
    const ry = (rng(i * 7.3, seed) - 0.5) * 2;
    const rz = (rng(i * 11.7, seed) - 0.5) * 2;
    dx = persistenceRatio * dx + (1 - persistenceRatio) * rx;
    dy = persistenceRatio * dy + (1 - persistenceRatio) * ry;
    dz = persistenceRatio * dz + (1 - persistenceRatio) * rz;
    len = Math.sqrt(dx * dx + dy * dy + dz * dz);
    dx /= len; dy /= len; dz /= len;
    x += dx * bondLength; y += dy * bondLength; z += dz * bondLength;
    points.push(new THREE.Vector3(x, y, z));
  }

  const center = new THREE.Vector3();
  points.forEach(p => center.add(p));
  center.divideScalar(points.length);
  points.forEach(p => p.sub(center));
  return points;
}

/* ── Physics-based deformation ─────────────────────────────────────────── */
function computeDeformedPoints(
  basePoints: THREE.Vector3[],
  Wi: number,
): THREE.Vector3[] {
  if (Wi < 0.01) return basePoints.map(p => p.clone());

  const first = basePoints[0];
  const last = basePoints[basePoints.length - 1];
  const ete = new THREE.Vector3().subVectors(last, first);
  const eteDir = ete.length() > 0.001 ? ete.clone().normalize() : new THREE.Vector3(1, 0, 0);

  const flowDir = new THREE.Vector3(1, 0, 0);
  const orientFactor = 1 - Math.exp(-Wi * 0.5);
  const targetDir = new THREE.Vector3().lerpVectors(eteDir, flowDir, orientFactor).normalize();
  const maxStretch = 2.8;
  const stretchFactor = 1 + (maxStretch - 1) * (1 - Math.exp(-Wi * 0.3));
  const compressionFactor = 1 / Math.sqrt(stretchFactor);

  return basePoints.map(p => {
    const newP = p.clone();

    // Affine shear component
    const affine = Math.min(Wi * 0.15, 0.65);
    newP.x += newP.y * affine;

    // Orientation + stretch/compress
    const projEte = newP.dot(eteDir);
    const perp = newP.clone().sub(eteDir.clone().multiplyScalar(projEte));
    const oriented = new THREE.Vector3()
      .addVectors(
        targetDir.clone().multiplyScalar(projEte * orientFactor),
        eteDir.clone().multiplyScalar(projEte * (1 - orientFactor)),
      )
      .multiplyScalar(stretchFactor);
    const compressed = perp.multiplyScalar(compressionFactor);

    const blendFactor = 1 - Math.exp(-Wi * 0.4);
    return newP.clone().lerp(oriented.add(compressed), blendFactor);
  });
}

/* ── Animated Chain ────────────────────────────────────────────────────── */
function AnimatedChain({
  basePoints,
  color,
  shearRate,
  offset,
  seed,
}: {
  basePoints: THREE.Vector3[];
  color: string;
  shearRate: number;
  offset: [number, number, number];
  seed: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const tubeRef = useRef<THREE.Mesh>(null);
  const reeRef = useRef<THREE.Group>(null);
  // Store current animated positions
  const currentPoints = useRef<THREE.Vector3[]>(basePoints.map(p => p.clone()));
  const brownianOffsets = useRef<THREE.Vector3[]>(basePoints.map(() => new THREE.Vector3()));

  // Bead instanced mesh ref
  const beadRefs = useRef<THREE.Mesh[]>([]);

  const targetPoints = useMemo(
    () => computeDeformedPoints(basePoints, shearRate),
    [basePoints, shearRate],
  );

  // Smoothly animate toward target + add Brownian motion
  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const Wi = shearRate;

    // Brownian amplitude: strong at rest, suppressed under shear
    const brownianAmp = 0.035 * Math.exp(-Wi * 0.6);
    // Tumbling frequency: chains periodically flip at moderate shear
    const tumbleFreq = Wi > 0.5 && Wi < 3.5 ? 0.15 * Wi : 0;

    for (let i = 0; i < currentPoints.current.length; i++) {
      const target = targetPoints[i];
      const curr = currentPoints.current[i];

      // Lerp toward deformed target (smooth transition)
      const lerpSpeed = Math.min(delta * 3.5, 1);
      curr.lerp(target, lerpSpeed);

      // Brownian fluctuations: unique phase per bead
      const phase = seed * 100 + i * 1.37;
      brownianOffsets.current[i].set(
        Math.sin(t * 2.3 + phase) * Math.cos(t * 1.1 + phase * 0.7) * brownianAmp,
        Math.cos(t * 1.7 + phase * 1.3) * Math.sin(t * 2.9 + phase * 0.4) * brownianAmp,
        Math.sin(t * 1.9 + phase * 0.9) * Math.cos(t * 2.1 + phase * 1.1) * brownianAmp,
      );

      // Chain tumbling perturbation at moderate Wi
      if (tumbleFreq > 0) {
        const tumblePhase = seed * 50 + i * 0.08;
        const tumbleAmp = 0.02 * Math.sin(t * tumbleFreq + tumblePhase);
        brownianOffsets.current[i].y += tumbleAmp * Math.sin(t * tumbleFreq * 0.5 + tumblePhase);
      }
    }

    // Rebuild tube geometry
    if (tubeRef.current) {
      const animatedPts = currentPoints.current.map(
        (p, i) => p.clone().add(brownianOffsets.current[i]),
      );
      const curve = new THREE.CatmullRomCurve3(animatedPts, false, "catmullrom", 0.5);
      const newGeo = new THREE.TubeGeometry(curve, animatedPts.length * 3, 0.04, 8, false);
      tubeRef.current.geometry.dispose();
      tubeRef.current.geometry = newGeo;
    }

    // Update bead positions
    beadRefs.current.forEach((mesh, idx) => {
      if (!mesh) return;
      const bIdx = idx * 2; // every other point
      if (bIdx < currentPoints.current.length) {
        const p = currentPoints.current[bIdx].clone().add(brownianOffsets.current[bIdx]);
        mesh.position.set(p.x, p.y, p.z);
      }
    });

    // Update end-to-end vector
    if (reeRef.current && Wi > 0.4) {
      const first = currentPoints.current[0].clone().add(brownianOffsets.current[0]);
      const last = currentPoints.current[currentPoints.current.length - 1]
        .clone()
        .add(brownianOffsets.current[currentPoints.current.length - 1]);
      const mid = first.clone().lerp(last, 0.5);
      const dir = new THREE.Vector3().subVectors(last, first);
      const len = dir.length();
      reeRef.current.position.copy(mid);
      const q = new THREE.Quaternion();
      q.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
      reeRef.current.quaternion.copy(q);
      reeRef.current.scale.set(1, len, 1);
      reeRef.current.visible = true;
    } else if (reeRef.current) {
      reeRef.current.visible = false;
    }
  });

  const beadIndices = useMemo(
    () => basePoints.filter((_, i) => i % 2 === 0).map((_, i) => i),
    [basePoints],
  );

  // Dynamic color: lighten slightly under high deformation
  const matColor = useMemo(() => {
    const c = new THREE.Color(color);
    if (shearRate > 2) c.lerp(new THREE.Color("#ffffff"), 0.08);
    return c;
  }, [color, shearRate]);

  return (
    <group ref={groupRef} position={offset}>
      {/* Tube backbone */}
      <mesh ref={tubeRef}>
        <tubeGeometry args={[
          new THREE.CatmullRomCurve3(basePoints, false, "catmullrom", 0.5),
          basePoints.length * 3, 0.04, 8, false,
        ]} />
        <meshPhysicalMaterial
          color={matColor}
          roughness={0.22}
          metalness={0.05}
          clearcoat={0.4}
          clearcoatRoughness={0.35}
        />
      </mesh>

      {/* Monomer beads */}
      {beadIndices.map((_, i) => (
        <mesh
          key={i}
          ref={(el) => { if (el) beadRefs.current[i] = el; }}
          position={basePoints[i * 2] || [0, 0, 0]}
        >
          <sphereGeometry args={[0.065, 14, 14]} />
          <meshPhysicalMaterial
            color={matColor}
            roughness={0.18}
            metalness={0.08}
            clearcoat={0.6}
            clearcoatRoughness={0.25}
          />
        </mesh>
      ))}

      {/* End-to-end vector (R_ee) */}
      <group ref={reeRef} visible={false}>
        <mesh>
          <cylinderGeometry args={[0.012, 0.012, 1, 6]} />
          <meshBasicMaterial color={color} transparent opacity={0.45} />
        </mesh>
        <mesh position={[0, 0.5, 0]}>
          <coneGeometry args={[0.04, 0.12, 6]} />
          <meshBasicMaterial color={color} transparent opacity={0.45} />
        </mesh>
      </group>
    </group>
  );
}

/* ── Animated Entanglement Points ──────────────────────────────────────── */
function AnimatedEntanglements({
  chains,
  shearRate,
}: {
  chains: { basePoints: THREE.Vector3[]; offset: [number, number, number] }[];
  shearRate: number;
}) {
  const meshRefs = useRef<THREE.Mesh[]>([]);
  const Wi = shearRate;

  // Find close-approach points between chain pairs
  const staticEntanglements = useMemo(() => {
    const pts: { pos: THREE.Vector3; pairIdx: number }[] = [];
    const allPts = chains.map(c =>
      computeDeformedPoints(c.basePoints, shearRate).map(
        p => p.clone().add(new THREE.Vector3(...c.offset)),
      ),
    );
    const threshold = 0.45 + Wi * 0.12;
    for (let a = 0; a < allPts.length; a++) {
      for (let b = a + 1; b < allPts.length; b++) {
        for (let i = 0; i < allPts[a].length; i += 5) {
          for (let j = 0; j < allPts[b].length; j += 5) {
            const d = allPts[a][i].distanceTo(allPts[b][j]);
            if (d < threshold && d > 0.05) {
              pts.push({ pos: allPts[a][i].clone().lerp(allPts[b][j], 0.5), pairIdx: a * 10 + b });
            }
          }
        }
      }
    }
    return pts.slice(0, 18);
  }, [chains, shearRate, Wi]);

  // Animate: pulse, fade at high shear
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const baseOpacity = Math.max(0.03, 0.55 - Wi * 0.1);
    const baseScale = Math.max(0.3, 1 - Wi * 0.12);

    meshRefs.current.forEach((mesh, i) => {
      if (!mesh || i >= staticEntanglements.length) {
        if (mesh) mesh.visible = false;
        return;
      }
      mesh.visible = true;
      const pulse = 1 + 0.15 * Math.sin(t * 2.5 + i * 1.7);
      const s = 0.055 * baseScale * pulse;
      mesh.scale.set(s, s, s);
      const mat = mesh.material as THREE.MeshPhysicalMaterial;
      if (mat) {
        mat.opacity = baseOpacity * (0.8 + 0.2 * Math.sin(t * 1.8 + i * 2.3));
      }
    });
  });

  return (
    <group>
      {staticEntanglements.map((e, i) => (
        <mesh
          key={i}
          ref={(el) => { if (el) meshRefs.current[i] = el; }}
          position={e.pos}
        >
          <sphereGeometry args={[1, 10, 10]} />
          <meshPhysicalMaterial
            color="#E8927C"
            transparent
            opacity={0.5}
            roughness={0.5}
            emissive="#E8927C"
            emissiveIntensity={0.15}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ── Flow Field Particles ──────────────────────────────────────────────── */
function FlowFieldParticles({ shearRate }: { shearRate: number }) {
  const count = 80;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Initial positions
  const particles = useMemo(() => {
    const arr: { x: number; y: number; z: number }[] = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        x: (rng(i * 1.1, 999) - 0.5) * 8,
        y: (rng(i * 2.2, 999) - 0.5) * 5,
        z: (rng(i * 3.3, 999) - 0.5) * 6,
      });
    }
    return arr;
  }, []);

  const positionsRef = useRef(particles.map(p => ({ ...p })));

  useFrame((_, delta) => {
    if (!meshRef.current || shearRate < 0.2) {
      if (meshRef.current) meshRef.current.visible = false;
      return;
    }
    meshRef.current.visible = true;

    for (let i = 0; i < count; i++) {
      const p = positionsRef.current[i];
      // Velocity field: v_x = γ̇ * y (simple shear)
      p.x += p.y * shearRate * 0.15 * delta;

      // Wrap around
      if (p.x > 4) p.x = -4;
      if (p.x < -4) p.x = 4;

      dummy.position.set(p.x, p.y, p.z);
      const s = 0.015 + shearRate * 0.003;
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} visible={false}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color="#8DA9C4" transparent opacity={0.25} />
    </instancedMesh>
  );
}

/* ── Tube Constraint Visualization ─────────────────────────────────────── */
function TubeConstraint({
  basePoints,
  shearRate,
  offset,
}: {
  basePoints: THREE.Vector3[];
  shearRate: number;
  offset: [number, number, number];
}) {
  const Wi = shearRate;
  // Show tube only at moderate shear — it represents the reptation tube
  if (Wi < 0.2 || Wi > 4) return null;

  const deformed = useMemo(() => computeDeformedPoints(basePoints, Wi), [basePoints, Wi]);
  const curve = useMemo(() => new THREE.CatmullRomCurve3(deformed, false, "catmullrom", 0.5), [deformed]);
  const tubeRadius = 0.18 - Wi * 0.02;
  const tubeGeo = useMemo(
    () => new THREE.TubeGeometry(curve, deformed.length * 2, Math.max(tubeRadius, 0.08), 8, false),
    [curve, deformed.length, tubeRadius],
  );

  const opacity = Math.min(0.12, 0.05 + (Wi - 0.2) * 0.03);

  return (
    <mesh geometry={tubeGeo} position={offset}>
      <meshPhysicalMaterial
        color="#134074"
        transparent
        opacity={opacity}
        roughness={0.8}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

/* ── Flow Direction Arrows ─────────────────────────────────────────────── */
function FlowArrows({ shearRate }: { shearRate: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    // Gentle bobbing
    groupRef.current.position.y = 2.3 + Math.sin(state.clock.elapsedTime * 0.8) * 0.05;
  });

  if (shearRate < 0.25) return null;
  const opacity = Math.min(0.55, shearRate * 0.11);

  return (
    <group ref={groupRef}>
      {[-1.2, 0, 1.2].map((z, i) => (
        <group key={i} position={[0, 0, z]} rotation={[0, 0, -Math.PI / 2]}>
          <mesh>
            <cylinderGeometry args={[0.012, 0.012, 2.8, 6]} />
            <meshBasicMaterial color="#134074" transparent opacity={opacity} />
          </mesh>
          <mesh position={[0, 1.4, 0]}>
            <coneGeometry args={[0.045, 0.14, 6]} />
            <meshBasicMaterial color="#134074" transparent opacity={opacity} />
          </mesh>
        </group>
      ))}
      <Html position={[2.6, 0, 0]} center>
        <div className="text-[10px] text-[#134074] font-bold whitespace-nowrap" style={{ opacity: opacity + 0.15 }}>
          Flow →
        </div>
      </Html>
      {/* Gradient direction label */}
      <Html position={[-2.4, 0.8, 0]} center>
        <div className="text-[10px] text-[#8DA9C4] font-semibold whitespace-nowrap" style={{ opacity: opacity }}>
          ↑ ∇v
        </div>
      </Html>
    </group>
  );
}

/* ── Shear Planes Visualization ────────────────────────────────────────── */
function ShearPlanes({ shearRate }: { shearRate: number }) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current || shearRate < 0.3) {
      if (ref.current) ref.current.visible = false;
      return;
    }
    ref.current.visible = true;
    // Slide top plane in flow direction
    const topChild = ref.current.children[1];
    if (topChild) {
      topChild.position.x = Math.sin(state.clock.elapsedTime * shearRate * 0.3) * 0.5 * shearRate;
    }
  });

  return (
    <group ref={ref} visible={false}>
      {/* Bottom plane (fixed) */}
      <mesh position={[0, -2.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[6, 4]} />
        <meshBasicMaterial color="#0B2545" transparent opacity={0.04} side={THREE.DoubleSide} />
      </mesh>
      {/* Top plane (moves in flow direction) */}
      <mesh position={[0, 2.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[6, 4]} />
        <meshBasicMaterial color="#134074" transparent opacity={0.04} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

/* ── Main Scene ────────────────────────────────────────────────────────── */
function Scene({ shearRate }: { shearRate: number }) {
  const chainConfigs = useMemo(
    () => [
      { pts: generateChainPoints(50, 1, 0.27, 0.45), color: "#134074", offset: [0, 0, 0] as [number, number, number], seed: 1 },
      { pts: generateChainPoints(42, 42, 0.29, 0.38), color: "#8DA9C4", offset: [-0.3, 0.4, 0.3] as [number, number, number], seed: 42 },
      { pts: generateChainPoints(46, 99, 0.25, 0.42), color: "#13315C", offset: [0.2, -0.3, -0.2] as [number, number, number], seed: 99 },
      { pts: generateChainPoints(38, 177, 0.31, 0.36), color: "#0B2545", offset: [-0.1, 0.2, -0.4] as [number, number, number], seed: 177 },
      { pts: generateChainPoints(44, 255, 0.26, 0.40), color: "#6B8CAE", offset: [0.3, -0.15, 0.25] as [number, number, number], seed: 255 },
    ],
    [],
  );

  const entanglementData = useMemo(
    () => chainConfigs.map(c => ({ basePoints: c.pts, offset: c.offset })),
    [chainConfigs],
  );

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[8, 10, 5]} intensity={1.0} castShadow shadow-mapSize={1024} />
      <directionalLight position={[-5, 3, -5]} intensity={0.25} color="#8DA9C4" />
      <pointLight position={[0, 6, 0]} intensity={0.25} color="#EEF4ED" />

      {chainConfigs.map((c, i) => (
        <AnimatedChain
          key={i}
          basePoints={c.pts}
          color={c.color}
          shearRate={shearRate}
          offset={c.offset}
          seed={c.seed}
        />
      ))}

      {/* Reptation tube (visible at moderate Wi) */}
      {chainConfigs.slice(0, 2).map((c, i) => (
        <TubeConstraint key={i} basePoints={c.pts} shearRate={shearRate} offset={c.offset} />
      ))}

      <AnimatedEntanglements chains={entanglementData} shearRate={shearRate} />
      <FlowFieldParticles shearRate={shearRate} />
      <FlowArrows shearRate={shearRate} />
      <ShearPlanes shearRate={shearRate} />

      <ContactShadows position={[0, -2.8, 0]} opacity={0.15} scale={14} blur={2.5} far={4} />
      <Environment preset="studio" />
      <OrbitControls
        enableZoom={false}
        autoRotate={shearRate < 0.2}
        autoRotateSpeed={0.25}
        maxPolarAngle={Math.PI / 1.7}
        minPolarAngle={0.3}
      />
    </>
  );
}

/* ── Export ─────────────────────────────────────────────────────────────── */
export default function PolymerChain3D({ shearRate = 0 }: { shearRate?: number }) {
  // Descriptive state label
  const stateLabel = useCallback((sr: number) => {
    if (sr < 0.3) return { label: "Equilibrium — Random coils, Brownian motion", color: "#8DA9C4" };
    if (sr < 1.0) return { label: "Low Wi — Slight orientation, entanglements intact", color: "#8DA9C4" };
    if (sr < 2.5) return { label: "Moderate Wi — Chain alignment, tube visible, onset of disentanglement", color: "#134074" };
    if (sr < 4.0) return { label: "High Wi — Strong alignment, disentanglement, shear thinning", color: "#13315C" };
    return { label: "Very high Wi — Fully oriented, few entanglements, power-law regime", color: "#0B2545" };
  }, []);

  const { label, color } = stateLabel(shearRate);

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-[#d0dde8] bg-gradient-to-b from-[#f8faf8] to-[#EEF4ED] shadow-sm relative">
      <div className="h-[480px]">
        <Canvas camera={{ position: [5.5, 3, 5], fov: 40 }} shadows>
          <Scene shearRate={shearRate} />
        </Canvas>
      </div>

      {/* State description overlay */}
      <div
        className="absolute top-3 left-3 right-3 bg-white/85 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-[#d0dde8]/50 text-[11px] font-medium transition-colors duration-500"
        style={{ color }}
      >
        {label}
      </div>

      {/* Legend overlay */}
      <div className="absolute bottom-3 left-3 bg-white/85 backdrop-blur-sm rounded-lg px-3 py-2 border border-[#d0dde8]/50 text-[10px] text-[#2c4a6e] space-y-1">
        <div className="text-[9px] font-bold text-[#0B2545] uppercase tracking-wide mb-0.5">Visual Elements</div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#E8927C] opacity-60" />
          <span>Entanglement points (pulsing = active)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-4 h-0.5 bg-[#134074] opacity-50 inline-block" />
          <span>End-to-end vector R<sub>ee</sub></span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-2 rounded-sm bg-[#134074] opacity-10 inline-block border border-[#134074]/20" />
          <span>Reptation tube (moderate Wi)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#8DA9C4] opacity-40" />
          <span>Flow field tracers (v<sub>x</sub> = γ̇·y)</span>
        </div>
      </div>

      {/* Wi indicator */}
      <div className="absolute bottom-3 right-3 bg-white/85 backdrop-blur-sm rounded-lg px-3 py-2 border border-[#d0dde8]/50 text-center">
        <div className="text-[9px] font-bold text-[#8DA9C4] uppercase tracking-wide">Weissenberg</div>
        <div className="text-lg font-bold text-[#0B2545]">Wi = {shearRate.toFixed(1)}</div>
      </div>
    </div>
  );
}
