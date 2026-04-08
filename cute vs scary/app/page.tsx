'use client'

import { useState, useEffect, useRef } from 'react'
import LoginForm from '@/components/LoginForm'
import HorrorOverlay from '@/components/HorrorOverlay'
import SuccessState from '@/components/SuccessState'

export default function LoginPage() {
  const [mode, setMode] = useState<'cute' | 'horror' | 'success'>('cute')
  const [isTransitioning, setIsTransitioning] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const handleWrongPassword = () => {
    setIsTransitioning(true)
    setMode('horror')
    
    // Play horror transition sound
    if (audioRef.current) {
      audioRef.current.src = 'data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA=='
      audioRef.current.play().catch(() => {})
    }
    
    setTimeout(() => setIsTransitioning(false), 600)
  }

  const handleCorrectPassword = () => {
    setMode('success')
  }

  const handleReset = () => {
    setMode('cute')
  }

  return (
    <main className={`min-h-screen w-full overflow-hidden transition-all duration-700 ${
      mode === 'cute' 
        ? 'bg-gradient-to-br from-pink-200 via-purple-100 to-blue-200' 
        : 'bg-gradient-to-br from-slate-900 via-red-900 to-black'
    }`}>
      <audio ref={audioRef} />
      
      {/* Floating clouds for cute mode */}
      {mode === 'cute' && (
        <>
          <div className="absolute top-10 left-10 w-20 h-10 bg-white rounded-full opacity-70 animate-float" />
          <div className="absolute top-32 right-20 w-24 h-12 bg-white rounded-full opacity-60 animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-40 left-1/4 w-28 h-14 bg-white rounded-full opacity-50 animate-float" style={{ animationDelay: '4s' }} />
        </>
      )}

      {/* Main content */}
      <div className="relative min-h-screen flex items-center justify-center p-4 z-10">
        {mode === 'success' ? (
          <SuccessState onReset={handleReset} />
        ) : (
          <>
            <LoginForm 
              mode={mode} 
              onWrongPassword={handleWrongPassword}
              onCorrectPassword={handleCorrectPassword}
            />
            {mode === 'horror' && <HorrorOverlay />}
          </>
        )}
      </div>

      {/* Sparkles for cute mode */}
      {mode === 'cute' && (
        <>
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-yellow-300 rounded-full animate-sparkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </>
      )}

      {/* Glitch effect for horror mode */}
      {mode === 'horror' && isTransitioning && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="absolute inset-0 bg-red-600 opacity-20 animate-glitch-red" />
          <div className="absolute inset-0 bg-cyan-600 opacity-10 animate-glitch-cyan" style={{ animationDelay: '0.1s' }} />
        </div>
      )}

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }

        @keyframes glitch-red {
          0%, 100% { clip-path: inset(0); }
          20% { clip-path: inset(0 0 95% 0); }
          40% { clip-path: inset(70% 0 0 0); }
          60% { clip-path: inset(45% 0 40% 0); }
          80% { clip-path: inset(10% 0 85% 0); }
        }

        @keyframes glitch-cyan {
          0%, 100% { clip-path: inset(0); }
          20% { clip-path: inset(80% 0 0 0); }
          40% { clip-path: inset(0 0 75% 0); }
          60% { clip-path: inset(60% 0 30% 0); }
          80% { clip-path: inset(15% 0 80% 0); }
        }

        @keyframes distort {
          0% { filter: skew(0deg) scaleY(1); }
          50% { filter: skew(2deg) scaleY(1.02); }
          100% { filter: skew(0deg) scaleY(1); }
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        .animate-sparkle {
          animation: sparkle 2s ease-in-out infinite;
        }

        .animate-glitch-red {
          animation: glitch-red 0.4s ease-in-out;
        }

        .animate-glitch-cyan {
          animation: glitch-cyan 0.4s ease-in-out;
        }

        .animate-distort {
          animation: distort 0.3s ease-in-out;
        }
      `}</style>
    </main>
  )
}
