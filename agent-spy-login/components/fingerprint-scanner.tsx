'use client';

interface FingerprintScannerProps {
  isActive: boolean;
}

export default function FingerprintScanner({ isActive }: FingerprintScannerProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-40 h-56">
        {/* Scanner frame */}
        <div className="absolute inset-0 border-2 border-[#00d4ff]/40 rounded-lg bg-[#1a1f3a]/40 backdrop-blur-md"></div>

        {/* Fingerprint visualization */}
        <svg
          width="160"
          height="224"
          viewBox="0 0 160 224"
          className={`absolute inset-0 ${isActive ? 'animate-fingerprint-scan' : ''}`}
        >
          {/* Ridge patterns */}
          {[0, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96, 104, 112, 120, 128, 136, 144, 152].map((offset) => (
            <path
              key={offset}
              d={`M ${offset} 0 Q ${offset + 8} 20, ${offset} 40 T ${offset} 80 T ${offset} 120 T ${offset} 160 T ${offset} 200 L ${offset} 224`}
              stroke="#00d4ff"
              strokeWidth="0.5"
              fill="none"
              opacity={isActive ? '0.8' : '0.3'}
            />
          ))}

          {/* Core pattern - center swirl */}
          <circle cx="80" cy="112" r="20" fill="none" stroke="#00d4ff" strokeWidth="1" opacity={isActive ? '0.6' : '0.2'} />
          <circle cx="80" cy="112" r="15" fill="none" stroke="#00d4ff" strokeWidth="0.5" opacity={isActive ? '0.4' : '0.1'} />
          <circle cx="80" cy="112" r="10" fill="none" stroke="#00d4ff" strokeWidth="0.5" opacity={isActive ? '0.6' : '0.2'} />

          {/* Scanning line */}
          {isActive && (
            <line
              x1="0"
              y1="0"
              x2="160"
              y2="0"
              stroke="#ff0000"
              strokeWidth="2"
              className="animate-laser-scan"
            />
          )}
        </svg>

        {/* Glow effect when scanning */}
        {isActive && (
          <div className="absolute inset-2 rounded-md bg-gradient-to-b from-[#00d4ff]/20 to-transparent pointer-events-none animate-pulse"></div>
        )}
      </div>

      {/* Status text */}
      <div className="text-center font-mono text-xs">
        <p className="text-[#00d4ff] uppercase tracking-widest">
          {isActive ? 'FINGERPRINT SCAN' : 'Ready for Input'}
        </p>
        <p className="text-[#64748b] text-xs mt-1">
          {isActive ? 'Analyzing print patterns' : 'Waiting for input'}
        </p>
      </div>
    </div>
  );
}
