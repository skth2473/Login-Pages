'use client';

import { useState, useEffect } from 'react';

interface LaserGridProps {
  mousePos: { x: number; y: number };
}

export default function LaserGrid({ mousePos }: LaserGridProps) {
  const gridSize = 40;
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () => setDimensions({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        width="100%"
        height="100%"
        className="w-full h-full"
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="laser-red" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff0000" stopOpacity="0" />
            <stop offset="50%" stopColor="#ff0000" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#ff0000" stopOpacity="0" />
          </linearGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {Array.from({ length: Math.ceil(dimensions.height / gridSize) }).map((_, i) => (
          <g key={`h-${i}`}>
            <line
              x1="0"
              y1={i * gridSize}
              x2="100%"
              y2={i * gridSize}
              stroke="#ff0000"
              strokeWidth="1"
              opacity="0.15"
              vectorEffect="non-scaling-stroke"
            />
            {i % 3 === 0 && (
              <line
                x1="0"
                y1={i * gridSize}
                x2="100%"
                y2={i * gridSize}
                stroke="url(#laser-red)"
                strokeWidth="2"
                filter="url(#glow)"
                className="animate-laser-scan"
                style={{
                  animationDelay: `${(i * 0.2) % 2}s`,
                  animationDuration: '3s',
                }}
                vectorEffect="non-scaling-stroke"
              />
            )}
          </g>
        ))}

        {Array.from({ length: Math.ceil(dimensions.width / gridSize) }).map((_, i) => (
          <g key={`v-${i}`}>
            <line
              x1={i * gridSize}
              y1="0"
              x2={i * gridSize}
              y2="100%"
              stroke="#ff0000"
              strokeWidth="1"
              opacity="0.15"
              vectorEffect="non-scaling-stroke"
            />
            {i % 4 === 0 && (
              <line
                x1={i * gridSize}
                y1="0"
                x2={i * gridSize}
                y2="100%"
                stroke="#ff0000"
                strokeWidth="1.5"
                opacity="0.3"
                className="animate-laser-intensify"
                style={{
                  animationDelay: `${(i * 0.15) % 1.5}s`,
                }}
                vectorEffect="non-scaling-stroke"
              />
            )}
          </g>
        ))}

        {mousePos.x > 0 && mousePos.y > 0 && (
          <>
            <line
              x1="0"
              y1={mousePos.y}
              x2="100%"
              y2={mousePos.y}
              stroke="url(#laser-red)"
              strokeWidth="2"
              opacity="0.4"
              filter="url(#glow)"
              vectorEffect="non-scaling-stroke"
            />
            <line
              x1={mousePos.x}
              y1="0"
              x2={mousePos.x}
              y2="100%"
              stroke="url(#laser-red)"
              strokeWidth="2"
              opacity="0.4"
              filter="url(#glow)"
              vectorEffect="non-scaling-stroke"
            />
            <circle
              cx={mousePos.x}
              cy={mousePos.y}
              r="8"
              fill="none"
              stroke="#ff0000"
              strokeWidth="1.5"
              opacity="0.6"
              className="animate-glow-pulse"
            />
          </>
        )}
      </svg>
    </div>
  );
}
