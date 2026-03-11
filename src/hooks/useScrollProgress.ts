"use client";

import { useState, useEffect, useCallback } from "react";

interface SectionRange {
  id: string;
  start: number; // 0-1
  end: number;   // 0-1
}

interface ScrollState {
  progress: number; // 0-1 overall
  sections: Record<string, number>; // per-section 0-1
}

export function useScrollProgress(sections: SectionRange[]): ScrollState {
  const [state, setState] = useState<ScrollState>({
    progress: 0,
    sections: {},
  });

  const handleScroll = useCallback(() => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;

    const sectionProgress: Record<string, number> = {};
    for (const s of sections) {
      const range = s.end - s.start;
      if (range <= 0) {
        sectionProgress[s.id] = 0;
      } else if (progress <= s.start) {
        sectionProgress[s.id] = 0;
      } else if (progress >= s.end) {
        sectionProgress[s.id] = 1;
      } else {
        sectionProgress[s.id] = (progress - s.start) / range;
      }
    }

    setState({ progress, sections: sectionProgress });
  }, [sections]);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [handleScroll]);

  return state;
}
