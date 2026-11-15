"use client";

import { useCallback, useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  sway: number;
  swaySpeed: number;
};

export default function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const count = window.innerWidth < 768 ? 40 : 70;
    const width = canvas.width;
    const height = canvas.height;

    const reset = (p: Particle, w: number, h: number) => {
      p.x = Math.random() * w;
      p.y = Math.random() * h;
      p.vx = (Math.random() - 0.5) * 0.4;
      p.vy = reduceMotion ? 0 : 0.15 + Math.random() * 0.35;
      p.radius = 0.8 + Math.random() * 2.2;
      p.alpha = 0.1 + Math.random() * 0.35;
      p.sway = Math.random() * Math.PI * 2;
      p.swaySpeed = 0.0015 + Math.random() * 0.003;
    };

    particlesRef.current = Array.from({ length: count }, () => {
      const p: Particle = { x: 0, y: 0, vx: 0, vy: 0, radius: 0, alpha: 0, sway: 0, swaySpeed: 0 };
      reset(p, width, height);
      return p;
    });

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (const p of particlesRef.current) {
        p.x += p.vx + Math.sin(p.sway) * 0.25;
        p.y += p.vy;
        p.sway += p.swaySpeed;

        if (p.y > height + p.radius) {
          p.y = -p.radius;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        const brandAlpha = p.alpha * 0.55;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(14, 165, 233, ${brandAlpha})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x + p.radius * 1.4, p.y + p.radius * 0.6, p.radius * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 211, 238, ${brandAlpha * 0.6})`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    resize();
    draw();

    const ro = new ResizeObserver(() => {
      resize();
      const w = canvas.width;
      const h = canvas.height;
      for (const p of particlesRef.current) {
        if (p.x > w || p.y > h) reset(p, w, h);
      }
    });
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [resize]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-0"
      aria-hidden="true"
    />
  );
}
