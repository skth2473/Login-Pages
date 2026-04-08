'use client'

interface MascotProps {
  mode: 'cute' | 'horror'
}

export default function Mascot({ mode }: MascotProps) {
  if (mode === 'horror') {
    return (
      <div className="relative w-24 h-24 animate-distort-horror">
        {/* Distorted creepy face */}
        <div className="relative w-full h-full">
          {/* Head */}
          <div className="absolute inset-0 bg-gray-600 rounded-full opacity-70 blur-sm" />
          
          {/* Left eye - twisted */}
          <div className="absolute top-6 left-4 w-5 h-6 bg-red-600 rounded-full animate-bulge-eye" />
          
          {/* Right eye - distorted */}
          <div className="absolute top-8 right-3 w-4 h-7 bg-red-700 rounded-full animate-shrink-eye" />
          
          {/* Distorted mouth - creepy grin */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-3 bg-red-900 rounded-full animate-twisted-mouth" />
          
          {/* Cracks */}
          <div className="absolute top-1/2 left-1/3 w-8 h-0.5 bg-red-400 opacity-60 transform -rotate-45 animate-crack" />
          <div className="absolute bottom-1/3 right-1/4 w-6 h-0.5 bg-red-500 opacity-50 transform rotate-12 animate-crack" style={{ animationDelay: '0.2s' }} />
        </div>

        <style jsx>{`
          @keyframes bulge-eye {
            0%, 100% { transform: scaleY(1); }
            50% { transform: scaleY(1.3); }
          }

          @keyframes shrink-eye {
            0%, 100% { transform: scaleY(1); }
            50% { transform: scaleY(0.7); }
          }

          @keyframes twisted-mouth {
            0%, 100% { transform: translateX(-50%) rotate(0deg) scaleX(1); }
            50% { transform: translateX(-50%) rotate(-5deg) scaleX(0.95); }
          }

          @keyframes crack {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.8; }
          }

          @keyframes distort-horror {
            0%, 100% { transform: scale(1) skewY(0deg); filter: drop-shadow(0 0 10px rgba(239, 68, 68, 0.5)); }
            25% { transform: scale(0.95) skewY(2deg); }
            50% { transform: scale(1.05) skewY(-2deg); }
            75% { transform: scale(0.98) skewY(1deg); }
          }

          .animate-bulge-eye {
            animation: bulge-eye 0.5s ease-in-out infinite;
          }

          .animate-shrink-eye {
            animation: shrink-eye 0.6s ease-in-out infinite;
          }

          .animate-twisted-mouth {
            animation: twisted-mouth 0.7s ease-in-out infinite;
          }

          .animate-crack {
            animation: crack 1s ease-in-out infinite;
          }

          .animate-distort-horror {
            animation: distort-horror 0.8s ease-in-out infinite;
          }
        `}</style>
      </div>
    )
  }

  // Cute mode
  return (
    <div className="relative w-24 h-24 animate-bounce-gentle">
      {/* Head */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-300 to-amber-200 rounded-full shadow-lg shadow-amber-200/50" />
      
      {/* Eyes - cute and happy */}
      <div className="absolute top-6 left-5 w-4 h-4 bg-gray-800 rounded-full animate-blink" />
      <div className="absolute top-6 right-5 w-4 h-4 bg-gray-800 rounded-full animate-blink" style={{ animationDelay: '0.1s' }} />
      
      {/* Shine in eyes */}
      <div className="absolute top-6 left-6 w-1.5 h-1.5 bg-white rounded-full" />
      <div className="absolute top-6 right-6 w-1.5 h-1.5 bg-white rounded-full" />
      
      {/* Rosy cheeks */}
      <div className="absolute top-10 left-1 w-3 h-3 bg-pink-300 rounded-full opacity-70 blur-sm" />
      <div className="absolute top-10 right-1 w-3 h-3 bg-pink-300 rounded-full opacity-70 blur-sm" />
      
      {/* Cute smile */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 w-8 h-3 border-b-2 border-gray-800 rounded-full" />
      
      {/* Smile shine */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-white opacity-40 rounded-full blur-sm" />

      <style jsx>{`
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }

        @keyframes blink {
          0%, 90%, 100% { transform: scaleY(1); }
          95% { transform: scaleY(0.1); }
        }

        .animate-bounce-gentle {
          animation: bounce-gentle 2s ease-in-out infinite;
        }

        .animate-blink {
          animation: blink 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
