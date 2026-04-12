'use client';

import { useState, useEffect } from 'react';

interface ConfettiEffectProps {
  trigger: boolean;
}

const colors = ['#ff1744', '#ffd700', '#00d4ff', '#7c3aed', '#ff6b9d'];

export default function ConfettiEffect({ trigger }: ConfettiEffectProps) {
  const [confetti, setConfetti] = useState<
    Array<{ id: number; color: string; left: number; delay: number }>
  >([]);

  useEffect(() => {
    if (trigger) {
      const newConfetti = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        color: colors[Math.floor(Math.random() * colors.length)],
        left: Math.random() * 100,
        delay: Math.random() * 0.3,
      }));
      setConfetti(newConfetti);

      const timer = setTimeout(() => {
        setConfetti([]);
      }, 2300);

      return () => clearTimeout(timer);
    }
  }, [trigger]);

  return (
    <>
      {confetti.map((conf) => (
        <div
          key={conf.id}
          className="pointer-events-none fixed h-2 w-2 animate-confetti-fall"
          style={{
            left: `${conf.left}%`,
            top: '0px',
            backgroundColor: conf.color,
            animationDelay: `${conf.delay}s`,
            borderRadius: '50%',
            boxShadow: `0 0 10px ${conf.color}`,
          }}
        ></div>
      ))}
    </>
  );
}
