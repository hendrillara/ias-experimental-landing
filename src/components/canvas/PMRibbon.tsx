"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const COUNT = 2000;

function FlowingParticles({ scrollProgress, mouseX, mouseY }: {
  scrollProgress: number;
  mouseX: number;
  mouseY: number;
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < COUNT; i++) {
      temp.push({
        x: (Math.random() - 0.5) * 40,
        y: (Math.random() - 0.5) * 10,
        z: (Math.random() - 0.5) * 40,
        stream: Math.floor(Math.random() * 4),
        factor: Math.random() * 0.5 + 0.1,
        speed: Math.random() * 0.01 + 0.005,
        xOff: Math.random() * Math.PI * 2,
        yOff: Math.random() * Math.PI * 2,
        zOff: Math.random() * Math.PI * 2,
      });
    }
    return temp;
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();

    let scatter = 0;
    let fade = 1;

    if (scrollProgress < 0.15) {
      scatter = 0;
    } else if (scrollProgress < 0.35) {
      scatter = (scrollProgress - 0.15) / 0.2;
    } else if (scrollProgress < 0.45) {
      scatter = 1 - (scrollProgress - 0.35) / 0.1;
    } else if (scrollProgress < 0.8) {
      scatter = 0;
    } else {
      scatter = 0;
      fade = 1 - (scrollProgress - 0.8) / 0.2;
    }

    const streamOffsets = [
      { x: -12, z: -8 },
      { x: 12, z: -8 },
      { x: -12, z: 8 },
      { x: 12, z: 8 },
    ];

    particles.forEach((p, i) => {
      const streamOff = streamOffsets[p.stream];
      const sx = scatter * streamOff.x;
      const sz = scatter * streamOff.z;

      const x = p.x + sx + Math.sin(time * p.factor + p.xOff) * 0.1;
      const y = p.y + Math.cos(time * p.speed * 50 + p.yOff) * 2;
      const z = p.z + sz + Math.sin(time * p.speed * 50 + p.zOff) * 2;

      const mouseDx = x - mouseX * 20;
      const mouseDy = y - mouseY * 5;
      const mouseDist = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);
      const mouseRepel = Math.max(0, 1 - mouseDist / 8) * 0.5;

      dummy.position.set(
        x + (mouseDx / (mouseDist || 1)) * mouseRepel,
        y + (mouseDy / (mouseDist || 1)) * mouseRepel,
        z
      );

      const scale = (Math.sin(time * 2 + p.xOff) * 0.3 + 0.7) * fade;
      dummy.scale.setScalar(Math.max(0.01, scale));
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current!.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, COUNT]}>
      <sphereGeometry args={[0.05, 6, 6]} />
      <meshBasicMaterial color="#58a6ff" transparent opacity={0.5} />
    </instancedMesh>
  );
}

export default function PMRibbon({
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
      <Canvas camera={{ position: [0, 5, 20], fov: 45 }}>
        <fog attach="fog" args={["#0a0a0b", 10, 35]} />
        <FlowingParticles scrollProgress={scrollProgress} mouseX={mouseX} mouseY={mouseY} />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-transparent to-[#0a0a0b] pointer-events-none" />
    </div>
  );
}
