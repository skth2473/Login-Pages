'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

export function LoginCard() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);

  const playSound = (type: 'hover' | 'click' | 'error') => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    if (type === 'hover') {
      oscillator.frequency.value = 600;
      gain.gain.setValueAtTime(0.1, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    } else if (type === 'click') {
      oscillator.frequency.value = 800;
      gain.gain.setValueAtTime(0.15, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.15);
    } else if (type === 'error') {
      oscillator.frequency.value = 300;
      gain.gain.setValueAtTime(0.1, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.2);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Wrong password, astronaut 🚀');
      setShake(true);
      playSound('error');
      setTimeout(() => setShake(false), 500);
      return;
    }

    playSound('click');
    setIsLoading(true);
    setError('');

    // Simulate warp effect
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
  };

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <motion.div
        className="pointer-events-auto relative"
        animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
        transition={{ duration: 0.4 }}
      >
        {/* Glowing border effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 p-0.5 opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-300" />

        {/* Main card with glassmorphism */}
        <div className="relative bg-black/40 backdrop-blur-xl border border-blue-400/20 rounded-2xl p-8 w-96 shadow-2xl">
          {/* Animated glow background */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 opacity-50" />

          {/* Content */}
          <div className="relative z-10">
            {/* Header */}
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 mb-2">
                Welcome Back
              </h1>
              <p className="text-blue-200/60 text-sm">Explorer 🚀</p>
            </motion.div>

            {/* Error message with glitch effect */}
            {error && (
              <motion.div
                className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm text-center"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {error}
              </motion.div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email field */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-blue-300/80 text-sm font-medium mb-2">
                  Email
                </label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/50 to-cyan-500/50 rounded-lg blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError('');
                    }}
                    onMouseEnter={() => playSound('hover')}
                    placeholder="explorer@space.com"
                    className="relative w-full bg-slate-900/50 border border-blue-400/30 rounded-lg px-4 py-3 text-white placeholder-blue-300/40 focus:outline-none focus:border-blue-400 focus:bg-slate-900/70 transition-all duration-300"
                  />
                </div>
              </motion.div>

              {/* Password field */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label className="block text-blue-300/80 text-sm font-medium mb-2">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/50 to-blue-500/50 rounded-lg blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (error) setError('');
                      }}
                      onMouseEnter={() => playSound('hover')}
                      placeholder="••••••••"
                      className="relative w-full bg-slate-900/50 border border-purple-400/30 rounded-lg px-4 py-3 text-white placeholder-purple-300/40 focus:outline-none focus:border-purple-400 focus:bg-slate-900/70 transition-all duration-300"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseEnter={() => playSound('hover')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-300/60 hover:text-blue-300 transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Login button with gradient glow */}
              <motion.button
                type="submit"
                disabled={isLoading}
                onMouseEnter={() => !isLoading && playSound('hover')}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                whileHover={!isLoading ? { scale: 1.02 } : {}}
                whileTap={!isLoading ? { scale: 0.98 } : {}}
                className="relative w-full mt-6 group"
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-lg blur opacity-75 group-hover:opacity-100 group-active:opacity-50 transition-opacity duration-300" />

                {/* Button content */}
                <div className="relative flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 hover:from-blue-500 hover:via-purple-500 hover:to-cyan-500 px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 shadow-lg">
                  {isLoading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Initiating Warp...</span>
                    </>
                  ) : (
                    'Launch Explorer'
                  )}
                </div>
              </motion.button>

              {/* Links */}
              <div className="flex items-center justify-between mt-6 text-sm">
                <motion.button
                  type="button"
                  onMouseEnter={() => playSound('hover')}
                  className="text-blue-300/60 hover:text-blue-300 transition-colors relative group"
                  whileHover={{ x: 2 }}
                >
                  Forgot Password?
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 group-hover:w-full transition-all duration-300" />
                </motion.button>

                <motion.button
                  type="button"
                  onMouseEnter={() => playSound('hover')}
                  className="text-purple-300/60 hover:text-purple-300 transition-colors relative group"
                  whileHover={{ x: -2 }}
                >
                  Sign Up
                  <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-gradient-to-l from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300" />
                </motion.button>
              </div>
            </form>

            {/* Floating particles around card */}
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={`card-particle-${i}`}
                className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                style={{
                  left: '50%',
                  top: '50%',
                }}
                animate={{
                  x: Math.cos((i / 8) * Math.PI * 2) * 120,
                  y: Math.sin((i / 8) * Math.PI * 2) * 120,
                  opacity: [0, 0.6, 0],
                }}
                transition={{
                  duration: 3,
                  delay: (i / 8) * 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
