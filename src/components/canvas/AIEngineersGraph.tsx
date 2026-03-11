"use client";

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const NUM_NODES = 150;
const BOUNDS = 20;
const CONNECTION_DISTANCE = 4.5;

function GraphSystem() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const { nodes, velocities } = useMemo(() => {
    const nodes = new Float32Array(NUM_NODES * 3);
    const velocities = new Float32Array(NUM_NODES * 3);
    for (let i = 0; i < NUM_NODES; i++) {
      nodes[i * 3] = (Math.random() - 0.5) * BOUNDS;
      nodes[i * 3 + 1] = (Math.random() - 0.5) * BOUNDS;
      nodes[i * 3 + 2] = (Math.random() - 0.5) * BOUNDS;

      velocities[i * 3] = (Math.random() - 0.5) * 0.05;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.05;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.05;
    }
    return { nodes, velocities };
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(() => {
    if (!meshRef.current || !linesRef.current) return;

    // Update nodes
    for (let i = 0; i < NUM_NODES; i++) {
      nodes[i * 3] += velocities[i * 3];
      nodes[i * 3 + 1] += velocities[i * 3 + 1];
      nodes[i * 3 + 2] += velocities[i * 3 + 2];

      // Bounce
      for (let j = 0; j < 3; j++) {
        if (nodes[i * 3 + j] > BOUNDS / 2 || nodes[i * 3 + j] < -BOUNDS / 2) {
          velocities[i * 3 + j] *= -1;
        }
      }

      dummy.position.set(nodes[i * 3], nodes[i * 3 + 1], nodes[i * 3 + 2]);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;

    // Update lines
    const linePositions = [];
    for (let i = 0; i < NUM_NODES; i++) {
      for (let j = i + 1; j < NUM_NODES; j++) {
        const dx = nodes[i * 3] - nodes[j * 3];
        const dy = nodes[i * 3 + 1] - nodes[j * 3 + 1];
        const dz = nodes[i * 3 + 2] - nodes[j * 3 + 2];
        const distSq = dx * dx + dy * dy + dz * dz;

        if (distSq < CONNECTION_DISTANCE * CONNECTION_DISTANCE) {
          linePositions.push(
            nodes[i * 3], nodes[i * 3 + 1], nodes[i * 3 + 2],
            nodes[j * 3], nodes[j * 3 + 1], nodes[j * 3 + 2]
          );
        }
      }
    }
    
    linesRef.current.geometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
  });

  return (
    <group>
      <instancedMesh ref={meshRef} args={[undefined, undefined, NUM_NODES]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshBasicMaterial color="#22d3ee" />
      </instancedMesh>
      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial color="#22d3ee" transparent opacity={0.15} />
      </lineSegments>
    </group>
  );
}

export default function AIEngineersGraph() {
  return (
    <div className="absolute inset-0 z-0 bg-[#0a0a0b]">
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
        <fog attach="fog" args={['#0a0a0b', 10, 25]} />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1.0} />
        <GraphSystem />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0b] pointer-events-none" />
    </div>
  );
}
