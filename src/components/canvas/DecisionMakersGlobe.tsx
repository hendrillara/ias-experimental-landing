"use client";

import { useRef, useMemo, useState, useEffect, Component, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Desktop: 8×8×6 = 384 nodes  |  Mobile: 5×5×4 = 100 nodes
const DESKTOP = { cols: 8, rows: 8, layers: 6, segments: 12 };
const MOBILE = { cols: 5, rows: 5, layers: 4, segments: 8 };
const SPACING = 1.8;

class R3FErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

function OrgGrid({
  scrollProgress,
  mouseX,
  mouseY,
  gridCols,
  gridRows,
  gridLayers,
  segments,
}: {
  scrollProgress: number;
  mouseX: number;
  mouseY: number;
  gridCols: number;
  gridRows: number;
  gridLayers: number;
  segments: number;
}) {
  const numNodes = gridCols * gridRows * gridLayers;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const { gridPositions, randomPositions, velocities, dummy } = useMemo(() => {
    const gridPositions = new Float32Array(numNodes * 3);
    const randomPositions = new Float32Array(numNodes * 3);
    const velocities = new Float32Array(numNodes * 3);

    const perLayer = gridCols * gridRows;
    for (let i = 0; i < numNodes; i++) {
      const layer = Math.floor(i / perLayer);
      const idx = i % perLayer;
      const row = Math.floor(idx / gridCols);
      const col = idx % gridCols;

      gridPositions[i * 3] = (col - (gridCols - 1) / 2) * SPACING;
      gridPositions[i * 3 + 1] = (layer - (gridLayers - 1) / 2) * SPACING * 1.5;
      gridPositions[i * 3 + 2] = (row - (gridRows - 1) / 2) * SPACING * 1.0;

      randomPositions[i * 3] = (Math.random() - 0.5) * 24;
      randomPositions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      randomPositions[i * 3 + 2] = (Math.random() - 0.5) * 24;
      velocities[i * 3] = (Math.random() - 0.5) * 0.03;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.03;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.03;
    }

    return {
      gridPositions,
      randomPositions,
      velocities,
      dummy: new THREE.Object3D(),
    };
  }, [numNodes, gridCols, gridRows, gridLayers]);

  const currentPositions = useMemo(() => new Float32Array(numNodes * 3), [numNodes]);

  useFrame(() => {
    if (!meshRef.current || !linesRef.current) return;

    for (let i = 0; i < numNodes; i++) {
      for (let j = 0; j < 3; j++) {
        randomPositions[i * 3 + j] += velocities[i * 3 + j];
        if (Math.abs(randomPositions[i * 3 + j]) > 14) {
          velocities[i * 3 + j] *= -1;
        }
      }
    }

    let gridBlend = 0;
    let scatter = 0;
    let opacity = 1;

    if (scrollProgress < 0.15) {
      gridBlend = 0;
    } else if (scrollProgress < 0.42) {
      scatter = Math.min(1, (scrollProgress - 0.15) / 0.2);
    } else if (scrollProgress < 0.55) {
      gridBlend = (scrollProgress - 0.42) / 0.13;
      scatter = 1 - gridBlend;
    } else if (scrollProgress < 0.85) {
      gridBlend = 1;
    } else {
      gridBlend = 1;
      opacity = 1 - (scrollProgress - 0.85) / 0.15;
    }

    for (let i = 0; i < numNodes; i++) {
      const rx =
        randomPositions[i * 3] + scatter * (Math.random() - 0.5) * 1.5;
      const ry =
        randomPositions[i * 3 + 1] + scatter * (Math.random() - 0.5) * 1.5;
      const rz =
        randomPositions[i * 3 + 2] + scatter * (Math.random() - 0.5) * 1.5;

      currentPositions[i * 3] =
        rx + (gridPositions[i * 3] - rx) * gridBlend;
      currentPositions[i * 3 + 1] =
        ry + (gridPositions[i * 3 + 1] - ry) * gridBlend;
      currentPositions[i * 3 + 2] =
        rz + (gridPositions[i * 3 + 2] - rz) * gridBlend;

      const mouseDist = Math.sqrt(
        Math.pow(currentPositions[i * 3] - mouseX * 12, 2) +
          Math.pow(currentPositions[i * 3 + 1] - mouseY * 12, 2)
      );
      const mouseInfluence = Math.max(0, 1 - mouseDist / 6);

      dummy.position.set(
        currentPositions[i * 3],
        currentPositions[i * 3 + 1],
        currentPositions[i * 3 + 2]
      );
      const scale = 0.06 + mouseInfluence * 0.1;
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current!.instanceMatrix.needsUpdate = true;

    const linePositions: number[] = [];
    if (scatter < 0.8) {
      const perLayer = gridCols * gridRows;
      for (let i = 0; i < numNodes; i++) {
        const layer = Math.floor(i / perLayer);
        const idx = i % perLayer;
        const row = Math.floor(idx / gridCols);
        const col = idx % gridCols;

        if (col < gridCols - 1) {
          const j = i + 1;
          linePositions.push(
            currentPositions[i * 3], currentPositions[i * 3 + 1], currentPositions[i * 3 + 2],
            currentPositions[j * 3], currentPositions[j * 3 + 1], currentPositions[j * 3 + 2]
          );
        }
        if (row < gridRows - 1) {
          const j = i + gridCols;
          linePositions.push(
            currentPositions[i * 3], currentPositions[i * 3 + 1], currentPositions[i * 3 + 2],
            currentPositions[j * 3], currentPositions[j * 3 + 1], currentPositions[j * 3 + 2]
          );
        }
        if (layer < gridLayers - 1) {
          const j = i + perLayer;
          linePositions.push(
            currentPositions[i * 3], currentPositions[i * 3 + 1], currentPositions[i * 3 + 2],
            currentPositions[j * 3], currentPositions[j * 3 + 1], currentPositions[j * 3 + 2]
          );
        }
      }
    }
    const geo = linesRef.current!.geometry;
    geo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(linePositions, 3)
    );
    (linesRef.current!.material as THREE.LineBasicMaterial).opacity =
      0.08 * (1 - scatter) * opacity;
  });

  const isMobile = gridCols < DESKTOP.cols;

  return (
    <group>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 12, 8]} intensity={80} color="#22d3ee" />
      {!isMobile && (
        <pointLight position={[-8, -6, 10]} intensity={40} color="#0ea5e9" />
      )}
      <instancedMesh ref={meshRef} args={[undefined, undefined, numNodes]}>
        <sphereGeometry args={[1, segments, segments]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={0.15}
          roughness={0.3}
          metalness={0.6}
          transparent
          opacity={0.8}
        />
      </instancedMesh>
      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial color="#22d3ee" transparent opacity={0.08} />
      </lineSegments>
    </group>
  );
}

function CanvasInner({
  scrollProgress,
  mouseX,
  mouseY,
}: {
  scrollProgress: number;
  mouseX: number;
  mouseY: number;
}) {
  const [webglSupported, setWebglSupported] = useState(true);
  const [config, setConfig] = useState(DESKTOP);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl2") || canvas.getContext("webgl");
      if (!gl) setWebglSupported(false);
    } catch {
      setWebglSupported(false);
    }
    if (window.innerWidth < 768) {
      setConfig(MOBILE);
    }
  }, []);

  if (!webglSupported) return null;

  return (
    <Canvas camera={{ position: [0, 0, 22], fov: 50 }} dpr={config === MOBILE ? 1 : undefined}>
      <fog attach="fog" args={["#0a0a0b", 12, 35]} />
      <OrgGrid
        scrollProgress={scrollProgress}
        mouseX={mouseX}
        mouseY={mouseY}
        gridCols={config.cols}
        gridRows={config.rows}
        gridLayers={config.layers}
        segments={config.segments}
      />
    </Canvas>
  );
}

const Fallback = <div className="fixed inset-0 z-0 bg-[#0a0a0b]" />;

export default function DecisionMakersCanvas({
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
      <R3FErrorBoundary fallback={Fallback}>
        <CanvasInner
          scrollProgress={scrollProgress}
          mouseX={mouseX}
          mouseY={mouseY}
        />
      </R3FErrorBoundary>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0b] pointer-events-none" />
    </div>
  );
}
