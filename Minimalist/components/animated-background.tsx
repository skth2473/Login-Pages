"use client";

import { useEffect, useRef } from "react";

export function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let mouseX = 0.5;
    let mouseY = 0.5;
    let targetX = 0.5;
    let targetY = 0.5;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX / window.innerWidth;
      mouseY = e.clientY / window.innerHeight;
    };

    const animate = () => {
      // Smooth interpolation
      targetX += (mouseX - targetX) * 0.02;
      targetY += (mouseY - targetY) * 0.02;

      // Apply subtle parallax to the gradient orbs
      const orb1 = container.querySelector(".orb-1") as HTMLElement;
      const orb2 = container.querySelector(".orb-2") as HTMLElement;
      const orb3 = container.querySelector(".orb-3") as HTMLElement;

      if (orb1) {
        orb1.style.transform = `translate(${(targetX - 0.5) * 30}px, ${(targetY - 0.5) * 30}px)`;
      }
      if (orb2) {
        orb2.style.transform = `translate(${(targetX - 0.5) * -20}px, ${(targetY - 0.5) * -20}px)`;
      }
      if (orb3) {
        orb3.style.transform = `translate(${(targetX - 0.5) * 15}px, ${(targetY - 0.5) * 15}px)`;
      }

      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    const animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f5f5f7] via-white to-[#f5f5f7]" />

      {/* Subtle gradient orbs with parallax */}
      <div
        className="orb-1 absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full transition-transform duration-[2000ms] ease-out"
        style={{
          background:
            "radial-gradient(circle, rgba(0,122,255,0.03) 0%, transparent 70%)",
        }}
      />
      <div
        className="orb-2 absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] rounded-full transition-transform duration-[2000ms] ease-out"
        style={{
          background:
            "radial-gradient(circle, rgba(0,122,255,0.02) 0%, transparent 70%)",
        }}
      />
      <div
        className="orb-3 absolute top-[30%] right-[20%] w-[30%] h-[30%] rounded-full transition-transform duration-[2000ms] ease-out"
        style={{
          background:
            "radial-gradient(circle, rgba(245,245,247,0.8) 0%, transparent 70%)",
        }}
      />

      {/* Subtle noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Vignette effect */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, rgba(245,245,247,0.4) 100%)",
        }}
      />
    </div>
  );
}
