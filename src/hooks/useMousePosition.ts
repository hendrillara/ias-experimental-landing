"use client";

import { useState, useEffect } from "react";

interface MousePosition {
  x: number; // -1 to 1 (normalized)
  y: number; // -1 to 1 (normalized)
  px: number; // pixel x
  py: number; // pixel y
}

export function useMousePosition(): MousePosition {
  const [pos, setPos] = useState<MousePosition>({ x: 0, y: 0, px: 0, py: 0 });

  useEffect(() => {
    let ticking = false;
    const onMove = (e: MouseEvent) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setPos({
            x: (e.clientX / window.innerWidth) * 2 - 1,
            y: -(e.clientY / window.innerHeight) * 2 + 1,
            px: e.clientX,
            py: e.clientY,
          });
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return pos;
}
