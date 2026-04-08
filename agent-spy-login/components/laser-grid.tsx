'use client';

interface LaserGridProps {
  mousePos: { x: number; y: number };
}

export default function LaserGrid({ mousePos }: LaserGridProps) {
  const gridSize = 40;
  const rows = Math.ceil(window.innerHeight / gridSize) + 2;
  const cols = Math.ceil(window.innerWidth / gridSize) + 2;

  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        width="100%"
        height="100%"
        className="w-full h-full"
        viewBox={`0 0 ${window.innerWidth} ${window.innerHeight}`}
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

        {/* Horizontal laser lines */}
        {Array.from({ length: Math.ceil(window.innerHeight / gridSize) }).map((_, i) => (
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
            {/* Animated scanning beam */}
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

        {/* Vertical laser lines */}
        {Array.from({ length: Math.ceil(window.innerWidth / gridSize) }).map((_, i) => (
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
            {/* Animated vertical beams */}
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

        {/* Mouse-tracking laser beam */}
        {mousePos.x > 0 && mousePos.y > 0 && (
          <>
            {/* Horizontal beam */}
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
            {/* Vertical beam */}
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
            {/* Crosshair intersection */}
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
