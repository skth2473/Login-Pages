'use client'

import { useEffect, useState } from 'react'

interface SuccessStateProps {
  onReset: () => void
}

export default function SuccessState({ onReset }: SuccessStateProps) {
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number }>>([])

  useEffect(() => {
    // Generate sparkles on mount
    const newSparkles = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }))
    setSparkles(newSparkles)
  }, [])

  return (
    <div className="relative w-full max-w-md animate-fade-in">
      {/* Falling sparkles */}
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="fixed w-2 h-2 bg-yellow-300 rounded-full animate-sparkle-fall pointer-events-none"
          style={{
            left: `${sparkle.x}%`,
            top: `-10px`,
            animationDelay: `${sparkle.id * 0.1}s`,
          }}
        />
      ))}

      {/* Success card */}
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-12 shadow-2xl shadow-pink-300/50 border-2 border-pink-200 relative z-20">
        {/* Cute glow background */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-pink-100 via-transparent to-purple-100 opacity-50 pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 text-center">
          {/* Emoji celebration */}
          <div className="text-6xl mb-6 animate-bounce-celebration">
            💖✨
          </div>

          {/* Welcome text */}
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-4 animate-glow-text">
            WELCOME BACK! 💕
          </h1>

          <p className="text-gray-700 text-lg mb-2 font-semibold">
            You&apos;ve successfully entered
          </p>

          <p className="text-2xl font-bold text-purple-600 mb-8">
            The Cute Zone ✨
          </p>

          {/* Description */}
          <p className="text-gray-600 mb-8 text-sm leading-relaxed">
            The theme has returned to its peaceful, adorable state. The horror has been vanquished! 🎉
          </p>

          {/* Warm glow effect text */}
          <div className="mb-8 space-y-2">
            <p className="text-sm text-pink-500 animate-pulse">
              ♡ Soft particle sparkle animation ♡
            </p>
            <p className="text-sm text-purple-500 animate-pulse" style={{ animationDelay: '0.2s' }}>
              ♡ Warm glow spreads ♡
            </p>
          </div>

          {/* Action button */}
          <button
            onClick={onReset}
            className="bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-pink-300/50 transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            Try Again 🔄
          </button>
        </div>
      </div>

      {/* Floating hearts background */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={`heart-${i}`}
          className="fixed text-2xl opacity-30 pointer-events-none animate-float-heart"
          style={{
            left: `${10 + i * 12}%`,
            bottom: `-20px`,
            animationDelay: `${i * 0.3}s`,
          }}
        >
          💖
        </div>
      ))}

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }

        @keyframes bounce-celebration {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.1); }
        }

        @keyframes glow-text {
          0%, 100% { filter: drop-shadow(0 0 8px rgba(236, 72, 153, 0.4)); }
          50% { filter: drop-shadow(0 0 16px rgba(236, 72, 153, 0.7)); }
        }

        @keyframes sparkle-fall {
          0% {
            opacity: 1;
            transform: translateY(0) rotate(0deg) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(100vh) rotate(360deg) scale(0);
          }
        }

        @keyframes float-heart {
          0% {
            opacity: 0;
            transform: translateY(0) translateX(0);
          }
          10% {
            opacity: 0.5;
          }
          50% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.3;
          }
          100% {
            opacity: 0;
            transform: translateY(-100vh) translateX(50px);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-bounce-celebration {
          animation: bounce-celebration 1s ease-in-out infinite;
        }

        .animate-glow-text {
          animation: glow-text 2s ease-in-out infinite;
        }

        .animate-sparkle-fall {
          animation: sparkle-fall 3s ease-in infinite;
        }

        .animate-float-heart {
          animation: float-heart 4s ease-in infinite;
        }
      `}</style>
    </div>
  )
}
