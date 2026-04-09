'use client';

import { useEffect, useRef, useState } from 'react';

export default function IceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isIdle, setIsIdle] = useState(true);

  interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
    life: number;
    maxLife: number;
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle system
    const createParticle = (x: number, y: number): Particle => ({
      x,
      y,
      vx: (Math.random() - 0.5) * 2,
      vy: Math.random() * 1 + 0.5,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.5 + 0.3,
      life: 0,
      maxLife: Math.random() * 3000 + 2000,
    });

    // Initialize particles
    for (let i = 0; i < 30; i++) {
      particlesRef.current.push(
        createParticle(
          Math.random() * canvas.width,
          Math.random() * canvas.height
        )
      );
    }

    // Track mouse for cursor trail effect
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      setIsIdle(false);

      // Create particles on cursor
      if (Math.random() > 0.7) {
        particlesRef.current.push(createParticle(e.clientX, e.clientY));
      }
    };

    let idleTimer: NodeJS.Timeout;
    const resetIdleTimer = () => {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => setIsIdle(true), 3000);
    };

    window.addEventListener('mousemove', (e) => {
      handleMouseMove(e);
      resetIdleTimer();
    });

    // Animation loop
    const animate = () => {
      // Clear canvas with semi-transparent overlay for trail effect
      ctx.fillStyle = 'rgba(20, 40, 80, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw gradient background (frozen cave)
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, 'rgba(15, 35, 70, 0.3)');
      gradient.addColorStop(0.5, 'rgba(10, 30, 60, 0.2)');
      gradient.addColorStop(1, 'rgba(5, 20, 50, 0.3)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw distant mountains/cave walls
      ctx.fillStyle = 'rgba(30, 60, 100, 0.1)';
      ctx.beginPath();
      ctx.moveTo(0, canvas.height * 0.6);
      for (let i = 0; i < canvas.width; i += 50) {
        const height = Math.sin(i * 0.005) * 100 + 50;
        ctx.lineTo(i, canvas.height * 0.6 + height);
      }
      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.fill();

      // Draw ice shards
      ctx.strokeStyle = 'rgba(100, 200, 255, 0.15)';
      ctx.lineWidth = 2;
      for (let i = 0; i < 5; i++) {
        const x = (Math.sin(Date.now() * 0.0001 + i) * 0.3 + 0.5) * canvas.width;
        const y = (i + 1) * (canvas.height / 6);
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + 50, y - 100);
        ctx.stroke();
      }

      // Update and draw particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];

        p.life += 16; // Assuming 60fps
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.1; // Gravity

        const lifePercent = p.life / p.maxLife;
        p.opacity = (1 - lifePercent) * (Math.random() * 0.5 + 0.3);

        // Draw particle as small crystalline shape
        ctx.fillStyle = `rgba(100, 200, 255, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Draw glow
        ctx.strokeStyle = `rgba(150, 220, 255, ${p.opacity * 0.5})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size + 2, 0, Math.PI * 2);
        ctx.stroke();

        // Remove dead particles
        if (p.life > p.maxLife) {
          particlesRef.current.splice(i, 1);
        }
      }

      // Cursor crystalline trail (when not idle)
      if (!isIdle) {
        const trailGradient = ctx.createRadialGradient(
          mouseRef.current.x,
          mouseRef.current.y,
          0,
          mouseRef.current.x,
          mouseRef.current.y,
          50
        );
        trailGradient.addColorStop(0, 'rgba(100, 200, 255, 0.3)');
        trailGradient.addColorStop(1, 'rgba(100, 200, 255, 0)');
        ctx.fillStyle = trailGradient;
        ctx.fillRect(
          mouseRef.current.x - 50,
          mouseRef.current.y - 50,
          100,
          100
        );
      }

      // Draw breath vapor (idle state)
      if (isIdle) {
        const time = Date.now() * 0.0005;
        ctx.fillStyle = `rgba(150, 200, 230, ${Math.sin(time) * 0.05 + 0.05})`;
        for (let i = 0; i < 3; i++) {
          const x = canvas.width / 2 + Math.sin(time + i) * 100;
          const y = canvas.height * 0.3 + Math.cos(time + i) * 50;
          ctx.beginPath();
          ctx.arc(x, y, 40 + Math.sin(time + i) * 20, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isIdle]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 opacity-100"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
