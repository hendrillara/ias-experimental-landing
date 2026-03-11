"use client";

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function FlowingParticles() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = 2000;

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 40;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 40;
      temp.push({
        position: new THREE.Vector3(x, y, z),
        factor: Math.random() * 0.5 + 0.1,
        speed: Math.random() * 0.01 + 0.005,
        xOffset: Math.random() * Math.PI * 2,
        yOffset: Math.random() * Math.PI * 2,
        zOffset: Math.random() * Math.PI * 2,
      });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();

    particles.forEach((p, i) => {
      // Create a flowing wave effect
      const x = p.position.x + Math.sin(time * p.factor + p.xOffset) * 0.1;
      const y = p.position.y + Math.cos(time * p.speed + p.yOffset) * 2;
      const z = p.position.z + Math.sin(time * p.speed + p.zOffset) * 2;

      dummy.position.set(x, y, z);
      
      // Scale based on sine wave for visual pulsing
      const scale = Math.sin(time * 2 + p.xOffset) * 0.5 + 0.5;
      dummy.scale.set(scale, scale, scale);
      
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshBasicMaterial color="#22d3ee" transparent opacity={0.5} />
    </instancedMesh>
  );
}

export default function PMRibbon() {
  return (
    <div className="absolute inset-0 z-0 bg-[#0a0a0b]">
      <Canvas camera={{ position: [0, 5, 20], fov: 45 }}>
        <fog attach="fog" args={['#0a0a0b', 10, 35]} />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        <FlowingParticles />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-transparent to-[#0a0a0b] pointer-events-none" />
    </div>
  );
}
