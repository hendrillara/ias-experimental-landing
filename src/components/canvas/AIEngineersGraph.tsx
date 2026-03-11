"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const NUM_NODES = 200;
const BOUNDS = 20;
const CONNECTION_DISTANCE = 4.5;

function generateDAGPositions(): Float32Array {
  const positions = new Float32Array(NUM_NODES * 3);
  const layers = 5;
  const perLayer = Math.ceil(NUM_NODES / layers);
  for (let i = 0; i < NUM_NODES; i++) {
    const layer = Math.floor(i / perLayer);
    const indexInLayer = i % perLayer;
    const rows = Math.ceil(Math.sqrt(perLayer));
    const row = Math.floor(indexInLayer / rows);
    const col = indexInLayer % rows;
    positions[i * 3] = (col - rows / 2) * 1.5;
    positions[i * 3 + 1] = (layer - layers / 2) * 3;
    positions[i * 3 + 2] = (row - rows / 2) * 1.5;
  }
  return positions;
}

function GraphSystem({ scrollProgress, mouseX, mouseY }: {
  scrollProgress: number;
  mouseX: number;
  mouseY: number;
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const { randomPositions, velocities, dagPositions } = useMemo(() => {
    const randomPositions = new Float32Array(NUM_NODES * 3);
    const velocities = new Float32Array(NUM_NODES * 3);
    for (let i = 0; i < NUM_NODES; i++) {
      randomPositions[i * 3] = (Math.random() - 0.5) * BOUNDS;
      randomPositions[i * 3 + 1] = (Math.random() - 0.5) * BOUNDS;
      randomPositions[i * 3 + 2] = (Math.random() - 0.5) * BOUNDS;
      velocities[i * 3] = (Math.random() - 0.5) * 0.04;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.04;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.04;
    }
    return { randomPositions, velocities, dagPositions: generateDAGPositions() };
  }, []);

  const currentPositions = useMemo(() => new Float32Array(NUM_NODES * 3), []);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(() => {
    if (!meshRef.current || !linesRef.current) return;

    for (let i = 0; i < NUM_NODES; i++) {
      for (let j = 0; j < 3; j++) {
        randomPositions[i * 3 + j] += velocities[i * 3 + j];
        if (randomPositions[i * 3 + j] > BOUNDS / 2 || randomPositions[i * 3 + j] < -BOUNDS / 2) {
          velocities[i * 3 + j] *= -1;
        }
      }
    }

    let dagBlend = 0;
    let opacity = 1;
    let scatter = 0;

    if (scrollProgress < 0.2) {
      dagBlend = 0;
    } else if (scrollProgress < 0.35) {
      scatter = (scrollProgress - 0.2) / 0.15;
    } else if (scrollProgress < 0.5) {
      dagBlend = (scrollProgress - 0.35) / 0.15;
      scatter = 1 - dagBlend;
    } else if (scrollProgress < 0.8) {
      dagBlend = 1;
    } else {
      dagBlend = 1;
      opacity = 1 - (scrollProgress - 0.8) / 0.2;
    }

    for (let i = 0; i < NUM_NODES; i++) {
      const rx = randomPositions[i * 3] + (scatter * (Math.random() - 0.5) * 2);
      const ry = randomPositions[i * 3 + 1] + (scatter * (Math.random() - 0.5) * 2);
      const rz = randomPositions[i * 3 + 2] + (scatter * (Math.random() - 0.5) * 2);

      currentPositions[i * 3] = rx + (dagPositions[i * 3] - rx) * dagBlend;
      currentPositions[i * 3 + 1] = ry + (dagPositions[i * 3 + 1] - ry) * dagBlend;
      currentPositions[i * 3 + 2] = rz + (dagPositions[i * 3 + 2] - rz) * dagBlend;

      const mouseDist = Math.sqrt(
        Math.pow(currentPositions[i * 3] - mouseX * 10, 2) +
        Math.pow(currentPositions[i * 3 + 1] - mouseY * 10, 2)
      );
      const mouseInfluence = Math.max(0, 1 - mouseDist / 5);

      dummy.position.set(currentPositions[i * 3], currentPositions[i * 3 + 1], currentPositions[i * 3 + 2]);
      const scale = 0.08 + mouseInfluence * 0.12;
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current!.instanceMatrix.needsUpdate = true;

    const linePositions: number[] = [];
    if (scatter < 0.8) {
      const maxDist = CONNECTION_DISTANCE * (1 + scatter * 2);
      for (let i = 0; i < NUM_NODES; i++) {
        for (let j = i + 1; j < NUM_NODES; j++) {
          const dx = currentPositions[i * 3] - currentPositions[j * 3];
          const dy = currentPositions[i * 3 + 1] - currentPositions[j * 3 + 1];
          const dz = currentPositions[i * 3 + 2] - currentPositions[j * 3 + 2];
          if (dx * dx + dy * dy + dz * dz < maxDist * maxDist) {
            linePositions.push(
              currentPositions[i * 3], currentPositions[i * 3 + 1], currentPositions[i * 3 + 2],
              currentPositions[j * 3], currentPositions[j * 3 + 1], currentPositions[j * 3 + 2]
            );
          }
        }
      }
    }
    const geo = linesRef.current!.geometry;
    geo.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));
    (linesRef.current!.material as THREE.LineBasicMaterial).opacity = 0.12 * (1 - scatter) * opacity;
  });

  return (
    <group>
      <instancedMesh ref={meshRef} args={[undefined, undefined, NUM_NODES]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.9} />
      </instancedMesh>
      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial color="#22d3ee" transparent opacity={0.12} />
      </lineSegments>
    </group>
  );
}

export default function AIEngineersGraph({
  scrollProgress = 0,
  mouseX = 0,
  mouseY = 0,
}: {
  scrollProgress?: number;
  mouseX?: number;
  mouseY?: number;
}) {
  return (
    <div className="fixed inset-0 z-0 bg-[#0a0a0b]">
      <Canvas camera={{ position: [0, 0, 18], fov: 60 }}>
        <fog attach="fog" args={["#0a0a0b", 10, 30]} />
        <GraphSystem scrollProgress={scrollProgress} mouseX={mouseX} mouseY={mouseY} />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0b] pointer-events-none" />
    </div>
  );
}
