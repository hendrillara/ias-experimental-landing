"use client";

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

function PrecisionGlobe() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[3, 128, 128]} scale={1}>
        <MeshDistortMaterial
          color="#0c0c0e"
          roughness={0.1}
          metalness={1}
          distort={0.2}
          speed={1.5}
          clearcoat={1}
          clearcoatRoughness={0.1}
          envMapIntensity={2}
        />
      </Sphere>
    </Float>
  );
}

export default function DecisionMakersGlobe() {
  return (
    <div className="absolute inset-0 z-0 bg-[#0a0a0b]">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <fog attach="fog" args={['#0a0a0b', 5, 20]} />
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#22d3ee" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#ffffff" />
        <Environment preset="city" />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        <PrecisionGlobe />
      </Canvas>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.05)_0%,transparent_70%)] pointer-events-none" />
    </div>
  );
}
