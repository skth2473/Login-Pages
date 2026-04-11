'use client'

export default function HorrorOverlay() {
  return (
    <>
      {/* Screen flicker effect */}
      <div className="fixed inset-0 pointer-events-none z-30 animate-violent-flicker bg-black/5" />
      
      {/* Scan lines */}
      <div className="fixed inset-0 pointer-events-none z-30">
        <div className="absolute inset-0 bg-repeat opacity-10" style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(255, 0, 0, 0.3) 2px,
            rgba(255, 0, 0, 0.3) 4px
          )`
        }} />
      </div>

      {/* Distortion effect container */}
      <div className="fixed inset-0 pointer-events-none z-25">
        {/* RGB split effect */}
        <div className="absolute inset-0 animate-rgb-shift opacity-20" />
      </div>

      {/* Glitch text blocks */}
      <div className="fixed top-1/4 left-1/2 transform -translate-x-1/2 z-40 pointer-events-none">
        <div className="text-red-600 text-2xl font-black animate-glitch-text opacity-40">
          ERROR: ACCESS DENIED
        </div>
        <div className="text-cyan-500 text-2xl font-black animate-glitch-text opacity-30" style={{ animationDelay: '0.1s' }}>
          ERROR: ACCESS DENIED
        </div>
      </div>

      {/* Breathing effect sound indicator */}
      <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-40 pointer-events-none">
        <div className="w-12 h-12 border-2 border-red-500 rounded-full animate-breathing opacity-30" />
        <div className="absolute inset-0 w-12 h-12 border-2 border-red-500 rounded-full animate-breathing opacity-20" style={{ animationDelay: '0.3s' }} />
      </div>

      {/* Vignette effect */}
      <div className="fixed inset-0 pointer-events-none z-20" style={{
        background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.4) 100%)'
      }} />

      <style jsx>{`
        @keyframes violent-flicker {
          0%, 100% { opacity: 0.05; }
          5% { opacity: 0.15; }
          10% { opacity: 0.05; }
          15% { opacity: 0.1; }
          20% { opacity: 0; }
          25% { opacity: 0.2; }
          30% { opacity: 0.02; }
          35% { opacity: 0.12; }
          40% { opacity: 0; }
          45% { opacity: 0.1; }
          50% { opacity: 0.05; }
          100% { opacity: 0.05; }
        }

        @keyframes rgb-shift {
          0%, 100% { 
            filter: drop-shadow(2px 0 0 rgba(255, 0, 0, 0.3)) drop-shadow(-2px 0 0 rgba(0, 255, 255, 0.3));
          }
          50% { 
            filter: drop-shadow(3px 0 0 rgba(255, 0, 0, 0.2)) drop-shadow(-3px 0 0 rgba(0, 255, 255, 0.2));
          }
        }

        @keyframes glitch-text {
          0%, 100% { 
            clip-path: polygon(0% 0%, 100% 0%, 100% 45%, 0% 45%);
            transform: translate(0);
          }
          25% { 
            clip-path: polygon(0% 55%, 100% 55%, 100% 100%, 0% 100%);
            transform: translate(-2px, 2px);
          }
          50% { 
            clip-path: polygon(0% 0%, 100% 0%, 100% 45%, 0% 45%);
            transform: translate(2px, -2px);
          }
          75% { 
            clip-path: polygon(0% 55%, 100% 55%, 100% 100%, 0% 100%);
            transform: translate(-1px, -1px);
          }
        }

        @keyframes breathing {
          0%, 100% { 
            transform: scale(1);
            opacity: 0.3;
          }
          50% { 
            transform: scale(1.3);
            opacity: 0.1;
          }
        }

        .animate-violent-flicker {
          animation: violent-flicker 1.5s ease-in-out infinite;
        }

        .animate-rgb-shift {
          animation: rgb-shift 0.3s ease-in-out infinite;
        }

        .animate-glitch-text {
          animation: glitch-text 0.5s ease-in-out infinite;
        }

        .animate-breathing {
          animation: breathing 2s ease-in-out infinite;
        }
      `}</style>
    </>
  )
}
