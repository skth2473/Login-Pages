'use client'

import { useState } from 'react'
import Mascot from './Mascot'

interface LoginFormProps {
  mode: 'cute' | 'horror'
  onWrongPassword: () => void
  onCorrectPassword: () => void
}

const CORRECT_PASSWORD = 'correct'

export default function LoginForm({ mode, onWrongPassword, onCorrectPassword }: LoginFormProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isShaking, setIsShaking] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password === CORRECT_PASSWORD) {
      onCorrectPassword()
    } else {
      setIsShaking(true)
      onWrongPassword()
      setTimeout(() => setIsShaking(false), 600)
    }
  }

  const cardBgClass = mode === 'cute' 
    ? 'bg-white/90 shadow-lg shadow-pink-200/50' 
    : 'bg-slate-800/90 shadow-lg shadow-red-600/30'

  const textColorClass = mode === 'cute' ? 'text-gray-800' : 'text-red-200'
  const labelColorClass = mode === 'cute' ? 'text-gray-700' : 'text-slate-300'
  const inputBgClass = mode === 'cute' 
    ? 'bg-pink-50 border-pink-200 text-gray-800 placeholder-gray-400' 
    : 'bg-slate-900 border-red-600 text-red-100 placeholder-red-800'
  const buttonBgClass = mode === 'cute'
    ? 'bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white shadow-lg shadow-pink-300/50'
    : 'bg-gradient-to-r from-red-700 to-red-900 hover:from-red-800 hover:to-black text-red-100 shadow-lg shadow-red-900/50'

  return (
    <div className={`relative z-20 w-full max-w-md ${isShaking ? 'animate-shake' : ''}`}>
      {/* Mascot */}
      <div className="flex justify-center mb-8">
        <Mascot mode={mode} />
      </div>

      {/* Login Card */}
      <div className={`rounded-3xl p-8 backdrop-blur-sm transition-all duration-500 ${cardBgClass} ${
        mode === 'horror' ? 'border-2 border-red-600' : 'border-2 border-pink-200'
      }`}>
        <h1 className={`text-3xl font-bold text-center mb-2 transition-colors duration-500 ${textColorClass}`}>
          {mode === 'cute' ? '✨ Welcome ✨' : '⚠ ACCESS DENIED ⚠'}
        </h1>
        
        <p className={`text-center text-sm mb-8 transition-colors duration-500 ${labelColorClass}`}>
          {mode === 'cute' ? 'Enter your secret code' : 'WHO ARE YOU?'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username Field */}
          <div>
            <label className={`block text-sm font-semibold mb-2 transition-colors duration-500 ${labelColorClass}`}>
              Your Name 💖
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your name"
              className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-500 focus:outline-none focus:ring-2 ${inputBgClass} ${
                mode === 'cute' ? 'focus:ring-pink-300' : 'focus:ring-red-600'
              }`}
            />
          </div>

          {/* Password Field */}
          <div>
            <label className={`block text-sm font-semibold mb-2 transition-colors duration-500 ${labelColorClass}`}>
              Secret Code ✨
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter the secret code"
              className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-500 focus:outline-none focus:ring-2 ${inputBgClass} ${
                mode === 'cute' ? 'focus:ring-pink-300' : 'focus:ring-red-600'
              }`}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-3 rounded-xl font-bold text-lg transition-all duration-500 transform hover:scale-105 active:scale-95 ${buttonBgClass} ${
              mode === 'horror' ? 'animate-pulse-slow' : ''
            }`}
          >
            {mode === 'cute' ? '💖 Enter' : '⚡ SUBMIT'}
          </button>

          {mode === 'horror' && (
            <p className="text-center text-red-400 text-xs animate-flicker mt-4">
              YOU SHOULDN&apos;T BE HERE
            </p>
          )}
        </form>
      </div>

      {/* Hint text */}
      {mode === 'cute' && (
        <p className="text-center mt-6 text-white text-sm opacity-70">
          Hint: Try entering &quot;correct&quot;
        </p>
      )}

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }

        @keyframes flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        .animate-shake {
          animation: shake 0.6s ease-in-out;
        }

        .animate-flicker {
          animation: flicker 0.3s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
