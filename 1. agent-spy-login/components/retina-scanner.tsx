'use client';

interface RetinaScannerProps {
  isActive: boolean;
}

export default function RetinaScanner({ isActive }: RetinaScannerProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-40 h-40">
        <svg
          width="160"
          height="160"
          viewBox="0 0 160 160"
          className="absolute inset-0"
        >
          <ellipse cx="80" cy="80" rx="45" ry="55" fill="#1a1f3a" opacity="0.3" />

          <circle cx="80" cy="80" r="20" fill="#ff0000" opacity="0.2" />

          {isActive && (
            <>
              <circle
                cx="80"
                cy="80"
                r="35"
                fill="none"
                stroke="#00d4ff"
                strokeWidth="1"
                opacity="0.6"
              />
              <circle
                cx="80"
                cy="80"
                r="45"
                fill="none"
                stroke="#00d4ff"
                strokeWidth="0.5"
                opacity="0.4"
              />
            </>
          )}
        </svg>

        {isActive && (
          <>
            <svg
              width="160"
              height="160"
              viewBox="0 0 160 160"
              className="absolute inset-0"
            >
              <circle
                cx="80"
                cy="80"
                r="40"
                fill="none"
                stroke="#00d4ff"
                strokeWidth="2"
                className="animate-retina-ring"
                opacity="0.8"
              />
            </svg>

            <svg
              width="160"
              height="160"
              viewBox="0 0 160 160"
              className="absolute inset-0"
              style={{ animationDelay: '0.4s' }}
            >
              <circle
                cx="80"
                cy="80"
                r="40"
                fill="none"
                stroke="#00d4ff"
                strokeWidth="2"
                className="animate-retina-ring"
                opacity="0.6"
              />
            </svg>

            <svg
              width="160"
              height="160"
              viewBox="0 0 160 160"
              className="absolute inset-0"
              style={{ animationDelay: '0.8s' }}
            >
              <circle
                cx="80"
                cy="80"
                r="40"
                fill="none"
                stroke="#00d4ff"
                strokeWidth="2"
                className="animate-retina-ring"
                opacity="0.4"
              />
            </svg>
          </>
        )}

        <svg width="160" height="160" viewBox="0 0 160 160" className="absolute inset-0">
          <line x1="80" y1="20" x2="80" y2="140" stroke="#00d4ff" strokeWidth="1" opacity="0.3" />
          <line x1="20" y1="80" x2="140" y2="80" stroke="#00d4ff" strokeWidth="1" opacity="0.3" />
          <line x1="30" y1="30" x2="50" y2="30" stroke="#00d4ff" strokeWidth="1.5" opacity="0.5" />
          <line x1="30" y1="30" x2="30" y2="50" stroke="#00d4ff" strokeWidth="1.5" opacity="0.5" />
          <line x1="130" y1="30" x2="110" y2="30" stroke="#00d4ff" strokeWidth="1.5" opacity="0.5" />
          <line x1="130" y1="30" x2="130" y2="50" stroke="#00d4ff" strokeWidth="1.5" opacity="0.5" />
          <line x1="30" y1="130" x2="50" y2="130" stroke="#00d4ff" strokeWidth="1.5" opacity="0.5" />
          <line x1="30" y1="130" x2="30" y2="110" stroke="#00d4ff" strokeWidth="1.5" opacity="0.5" />
          <line x1="130" y1="130" x2="110" y2="130" stroke="#00d4ff" strokeWidth="1.5" opacity="0.5" />
          <line x1="130" y1="130" x2="130" y2="110" stroke="#00d4ff" strokeWidth="1.5" opacity="0.5" />
        </svg>
      </div>

      <div className="text-center font-mono text-xs">
        <p className="text-[#00d4ff] uppercase tracking-widest">
          {isActive ? 'RETINA SCAN' : 'Scanner Ready'}
        </p>
        <p className="text-[#64748b] text-xs mt-1">
          {isActive ? 'Scanning... 3D mapping' : 'Awaiting activation'}
        </p>
      </div>
    </div>
  );
}
