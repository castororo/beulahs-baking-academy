import { useState, useEffect, useCallback } from "react";

export interface Clone {
  id: string;
  img: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Particle {
  id: string;
  x: number;
  y: number;
  color?: string;
}

let idCounter = 0;
const uniqueId = (prefix = "id") => `${prefix}_${Date.now()}_${idCounter++}`;

export const useAnimationEffects = () => {
  const [clones, setClones] = useState<Clone[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);

  const spawnClone = useCallback((imgSrc: string, rect: DOMRect) => {
    const id = uniqueId("clone");
    setClones((s) => [
      ...s,
      {
        id,
        img: imgSrc,
        x: rect.left + window.scrollX,
        y: rect.top + window.scrollY,
        w: rect.width,
        h: rect.height,
      },
    ]);
    setTimeout(() => setClones((s) => s.filter((c) => c.id !== id)), 1000);
  }, []);

  const spawnParticles = useCallback((pageX: number, pageY: number) => {
    const colors = ["#f6d3c6", "#d6b89a", "#f0e1d8", "#c9987d"];
    const burstId = uniqueId("burst");
    const newParticles = Array.from({ length: 8 }).map((_, i) => ({
      id: `${burstId}_${i}`,
      x: pageX,
      y: pageY,
      color: colors[i % colors.length],
    }));
    setParticles((s) => [...s, ...newParticles]);
    setTimeout(
      () => setParticles((s) => s.filter((p) => !newParticles.find((n) => n.id === p.id))),
      900
    );
  }, []);

  const playClickSound = useCallback(() => {
    try {
      const AudioContext = (window as any).AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContext();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "triangle";
      o.frequency.value = 660;
      g.gain.value = 0.0001;
      o.connect(g);
      g.connect(ctx.destination);
      const now = ctx.currentTime;
      g.gain.setValueAtTime(0.0001, now);
      g.gain.exponentialRampToValueAtTime(0.02, now + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
      o.start();
      o.stop(now + 0.14);
      setTimeout(() => ctx.close().catch(() => {}), 220);
    } catch {
      // Silently fail if audio context is not available
    }
  }, []);

  const handleUndo = useCallback(() => {
    setClones((s) => {
      if (!s.length) return s;
      const next = s.slice(0, s.length - 1);
      setParticles((p) => p.slice(0, Math.max(0, p.length - 8)));
      return next;
    });
  }, []);

  const clearEffects = useCallback(() => {
    setClones([]);
    setParticles([]);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearEffects();
    };
  }, []);

  return {
    clones,
    particles,
    spawnClone,
    spawnParticles,
    playClickSound,
    handleUndo,
    clearEffects,
  };
};

