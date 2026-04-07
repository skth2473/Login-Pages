'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { playHoverSound, playWarpSound } from '@/lib/audioUtils'

export function LoginCard() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate authentication
    setTimeout(() => {
      // Trigger error on specific password or randomly
      if (password === 'wrong' || Math.random() > 0.6) {
        setIsError(true)
        setErrorMessage('Wrong password, astronaut 🚀')
        setIsLoading(false)
        playHoverSound()
      } else {
        // Trigger warp effect
        playWarpSound()
        window.dispatchEvent(new Event('startWarp'))

        setTimeout(() => {
          setIsLoading(false)
          // Could navigate here or show success
        }, 800)
      }
    }, 600)
  }

  const errorVariants = {
    shake: {
      x: [-10, 10, -10, 10, 0],
      transition: { duration: 0.4 },
    },
  }

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative z-10 w-full max-w-md p-10 backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl shadow-[0_0_40px_rgba(176,38,255,0.15)]"
    >
      {/* Glow effect on error */}
      {isError && (
        <div className="absolute inset-0 rounded-3xl bg-red-500/10 border-red-500/30 animate-pulse pointer-events-none border" />
      )}

      <motion.div animate={isError ? 'shake' : 'normal'} variants={errorVariants}>
        {/* Title */}
        <h1 className="text-4xl font-bold text-center mb-8 text-[#F8FAFC] tracking-tighter">
          Welcome Back, Explorer
        </h1>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-mono text-[#94A3B8] mb-2">Email</label>
            <motion.input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onMouseEnter={() => playHoverSound()}
              placeholder="explorer@cosmos.dev"
              className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white font-mono focus:outline-none focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF]/50 transition-all placeholder-[#94A3B8]/50"
              whileFocus={{ scale: 1.02 }}
              disabled={isLoading}
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-mono text-[#94A3B8] mb-2">Password</label>
            <motion.input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onMouseEnter={() => playHoverSound()}
              placeholder="••••••••"
              className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white font-mono focus:outline-none focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF]/50 transition-all placeholder-[#94A3B8]/50"
              whileFocus={{ scale: 1.02 }}
              disabled={isLoading}
            />
          </div>

          {/* Error Message */}
          {isError && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-[#FF3366] font-mono text-sm animate-pulse glitch"
            >
              {errorMessage}
            </motion.div>
          )}

          {/* Login Button */}
          <motion.button
            type="submit"
            onMouseEnter={() => playHoverSound()}
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full py-4 mt-6 rounded-xl bg-gradient-to-r from-[#00F0FF] to-[#B026FF] text-white font-bold tracking-widest uppercase shadow-lg shadow-[#B026FF]/20 transition-all disabled:opacity-50"
            whileHover={{ scale: 1.02, boxShadow: '0 0 50px rgba(176, 38, 255, 0.4)' }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? 'Initializing Warp...' : 'Enter The Cosmos'}
          </motion.button>
        </form>

        {/* Links */}
        <div className="mt-6 flex justify-between items-center text-sm">
          <motion.button
            type="button"
            onMouseEnter={() => playHoverSound()}
            className="text-[#94A3B8] hover:text-[#00F0FF] transition-all cursor-none data-testid='forgot-password-link'"
            whileHover={{
              textShadow: '0 0 8px rgba(0, 240, 255, 0.8)',
            }}
          >
            Forgot Password?
          </motion.button>

          <motion.button
            type="button"
            onMouseEnter={() => playHoverSound()}
            className="text-[#94A3B8] hover:text-[#B026FF] transition-all cursor-none data-testid='sign-up-link'"
            whileHover={{
              textShadow: '0 0 8px rgba(176, 38, 255, 0.8)',
            }}
          >
            Sign Up
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}
