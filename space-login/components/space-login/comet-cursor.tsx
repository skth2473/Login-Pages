'use client';

import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
}

export function CometCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const nextIdRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Handle mouse move
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      // Create particles
      for (let i = 0; i < 3; i++) {
        const particle: Particle = {
          id: nextIdRef.current++,
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4 - 2,
          life: 1,
          size: Math.random() * 3 + 1,
        };
        particlesRef.current.push(particle);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    let animationId: number;

    const animate = () => {
      // Clear canvas with fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter((particle) => {
        particle.life -= 0.02;
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += 0.1; // Gravity

        if (particle.life > 0) {
          const hue = (particle.life * 200 + 200) % 360;
          ctx.fillStyle = `hsla(${hue}, 100%, 60%, ${particle.life * 0.6})`;
          ctx.shadowColor = `hsla(${hue}, 100%, 60%, ${particle.life})`;
          ctx.shadowBlur = 15;

          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();

          return true;
        }
        return false;
      });

      // Draw comet trail (connected line)
      if (particlesRef.current.length > 1) {
        const recentParticles = particlesRef.current.slice(-10);
        if (recentParticles.length > 1) {
          ctx.strokeStyle = 'rgba(59, 130, 246, 0.4)';
          ctx.lineWidth = 2;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';

          ctx.beginPath();
          ctx.moveTo(recentParticles[0].x, recentParticles[0].y);
          for (let i = 1; i < recentParticles.length; i++) {
            ctx.lineTo(recentParticles[i].x, recentParticles[i].y);
          }
          ctx.stroke();
        }
      }

      // Draw cursor glow (comet head)
      ctx.fillStyle = 'rgba(59, 130, 246, 0.8)';
      ctx.shadowColor = 'rgba(59, 130, 246, 1)';
      ctx.shadowBlur = 20;
      ctx.beginPath();
      ctx.arc(mousePos.x, mousePos.y, 6, 0, Math.PI * 2);
      ctx.fill();

      // Outer glow
      ctx.fillStyle = 'rgba(34, 211, 238, 0.3)';
      ctx.shadowBlur = 30;
      ctx.beginPath();
      ctx.arc(mousePos.x, mousePos.y, 12, 0, Math.PI * 2);
      ctx.fill();

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [mousePos.x, mousePos.y]);

  return (
    <>
      <style>{`
        * {
          cursor: none;
        }
      `}</style>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-50"
      />
    </>
  );
}
