'use client';

import React, { useState, useEffect } from 'react';

interface FrostedPanelProps {
  children: React.ReactNode;
  loginState: 'idle' | 'error' | 'success';
}

export default function FrostedPanel({
  children,
  loginState,
}: FrostedPanelProps) {
  const [cracks, setCracks] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const crackIdRef = React.useRef(0);

  // Generate cracks on error state
  useEffect(() => {
    if (loginState === 'error') {
      const newCracks = [];
      for (let i = 0; i < 5; i++) {
        newCracks.push({
          id: crackIdRef.current++,
          x: Math.random() * 100,
          y: Math.random() * 100,
        });
      }
      setCracks(newCracks);

      // Clear cracks after animation
      const timer = setTimeout(() => {
        setCracks([]);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [loginState]);

  return (
    <div className="relative w-full max-w-md">
      {/* Frost Edge Glow */}
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-b from-accent/20 via-transparent to-transparent blur-2xl opacity-40" />

      {/* Main Panel */}
      <div
        className={`relative rounded-2xl border border-border/40 bg-gradient-to-br from-card/60 via-card/40 to-card/20 p-8 backdrop-blur-xl transition-all duration-300 ${
          loginState === 'error' ? 'animate-pulse' : ''
        } ${loginState === 'success' ? 'border-accent/50 shadow-lg shadow-accent/20' : ''}`}
        style={{
          boxShadow:
            loginState === 'success'
              ? '0 0 40px rgba(100, 200, 255, 0.4), inset 0 0 60px rgba(150, 220, 255, 0.2)'
              : '0 0 30px rgba(100, 200, 255, 0.15), inset 0 0 40px rgba(150, 220, 255, 0.05)',
        }}
      >
        {/* Frost Lines */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl">
          {/* Top frost line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
          {/* Side frost crystals */}
          <div className="absolute top-1/4 left-0 h-24 w-px bg-gradient-to-b from-accent/20 to-transparent" />
          <div className="absolute top-1/3 right-0 h-32 w-px bg-gradient-to-b from-transparent via-accent/10 to-transparent" />
        </div>

        {/* Error State Cracks */}
        {loginState === 'error' && (
          <svg
            className="absolute inset-0 h-full w-full rounded-2xl"
            style={{ pointerEvents: 'none' }}
          >
            {cracks.map(crack => (
              <g key={crack.id}>
                {/* Main crack line */}
                <path
                  d={`M${crack.x}% ${crack.y}% Q${crack.x + 20}% ${crack.y + 15}%, ${crack.x + 40}% ${crack.y + 30}%`}
                  stroke="rgba(100, 200, 255, 0.6)"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="1000"
                  style={{
                    animation: `crackPropagation 0.6s ease-out forwards`,
                  }}
                />
                {/* Secondary branches */}
                <path
                  d={`M${crack.x + 15}% ${crack.y + 10}% L${crack.x + 25}% ${crack.y + 20}%`}
                  stroke="rgba(100, 200, 255, 0.4)"
                  strokeWidth="1"
                  fill="none"
                  strokeDasharray="500"
                  style={{
                    animation: `crackPropagation 0.6s ease-out 0.1s forwards`,
                  }}
                />
              </g>
            ))}
          </svg>
        )}

        {/* Ice Particles on Error */}
        {loginState === 'error' && (
          <div className="absolute inset-0 overflow-hidden rounded-2xl">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="absolute h-2 w-2 rounded-full bg-accent/80"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `iceParticles 0.8s ease-out forwards`,
                  animationDelay: `${i * 0.1}s`,
                  '--tx': `${(Math.random() - 0.5) * 100}px`,
                } as React.CSSProperties}
              />
            ))}
          </div>
        )}

        {/* Success Glow Burst */}
        {loginState === 'success' && (
          <div className="absolute inset-0 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 animate-pulse bg-gradient-to-b from-accent/20 to-transparent" />
          </div>
        )}

        {/* Content */}
        <div className="relative z-10">{children}</div>
      </div>

      {/* Bottom Reflection */}
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-accent/10 to-transparent blur-sm rounded-full" />
    </div>
  );
}
