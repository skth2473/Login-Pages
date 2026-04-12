'use client';

import { useState, useRef, useEffect } from 'react';
import SlotReel from './slot-reel';
import CoinBurstEffect from './coin-burst-effect';
import ConfettiEffect from './confetti-effect';
import MarqueeLights from './marquee-lights';

const SYMBOLS = ['A', 'B', 'C', 'D', 'E', '1', '2', '3', '4', '5'];

export default function CasinoLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSpinning, setIsSpinning] = useState(false);
  const [displayUsername, setDisplayUsername] = useState('');
  const [displayPassword, setDisplayPassword] = useState('');
  const [jackpot, setJackpot] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const [coinBurst, setCoinBurst] = useState(false);
  const [reelsCompleted, setReelsCompleted] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    // Initialize audio context
    if (typeof window !== 'undefined') {
      audioContextRef.current = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
    }
  }, []);

  const playSound = (frequency: number, duration: number = 100) => {
    if (!audioContextRef.current) return;

    const ctx = audioContextRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.frequency.value = frequency;
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration / 1000);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration / 1000);
  };

  const playTickSound = () => playSound(800, 50);

  const playJackpotSound = () => {
    if (!audioContextRef.current) return;

    const ctx = audioContextRef.current;
    const notes = [523, 659, 784, 1047]; // C, E, G, C (higher octave)

    notes.forEach((freq, i) => {
      setTimeout(() => playSound(freq, 200), i * 150);
    });
  };

  const playErrorSound = () => {
    if (!audioContextRef.current) return;

    const ctx = audioContextRef.current;
    playSound(300, 200);
    setTimeout(() => playSound(200, 200), 250);
  };

  const getRandomCharFromSet = (value: string): string => {
    if (!value) return SYMBOLS[0];
    const index = SYMBOLS.indexOf(value);
    if (index !== -1) return value;
    return SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
  };

  const handleSpin = async () => {
    if (!username || !password) {
      setError(true);
      setMessage('Enter Player ID & Luck Code!');
      playErrorSound();
      return;
    }

    setIsSpinning(true);
    setReelsCompleted(0);
    setError(false);
    setMessage('');
    setJackpot(false);

    // Start reel spinning with sound
    playTickSound();

    // Simulate reel spin delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Check if login is correct
    const isCorrect = username === 'admin' && password === 'secret123';

    setIsSpinning(false);
  };

  const handleReelComplete = (symbol: string, index: number) => {
    playTickSound();
    const newCompleted = reelsCompleted + 1;
    setReelsCompleted(newCompleted);

    const isCorrect = username === 'admin' && password === 'secret123';

    // All reels completed
    if (newCompleted === 2) {
      if (isCorrect) {
        // JACKPOT!
        setJackpot(true);
        setMessage('JACKPOT! ACCESS GRANTED 🎰');
        playJackpotSound();
        setCoinBurst(true);

        if (containerRef.current) {
          containerRef.current.classList.add('animate-camera-shake');
          setTimeout(() => {
            containerRef.current?.classList.remove('animate-camera-shake');
          }, 500);
        }

        // Redirect after delay
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 3000);
      } else {
        setError(true);
        setMessage('TRY AGAIN');
        playErrorSound();
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-gray-950 via-blue-950 to-purple-950"
      style={{
        backgroundImage: `
          radial-gradient(ellipse at 20% 50%, rgba(255, 23, 68, 0.15) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 50%, rgba(0, 212, 255, 0.15) 0%, transparent 50%)
        `,
      }}
    >
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="rgb(255, 215, 0)"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Marquee lights */}
      <MarqueeLights />

      {/* Coin burst effect */}
      <CoinBurstEffect
        trigger={coinBurst}
        centerX={typeof window !== 'undefined' ? window.innerWidth / 2 : 0}
        centerY={typeof window !== 'undefined' ? window.innerHeight / 2 : 0}
      />

      {/* Confetti effect */}
      <ConfettiEffect trigger={jackpot} />

      {/* Main content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md">
          {/* Slot machine panel */}
          <div className="relative rounded-3xl border-8 border-yellow-400 bg-gradient-to-b from-red-900 via-gray-900 to-black p-12 shadow-2xl shadow-yellow-400/50">
            {/* Top decorative bar */}
            <div className="absolute top-0 left-0 right-0 h-8 rounded-t-2xl bg-gradient-to-r from-red-600 via-yellow-400 to-red-600 flex items-center justify-center">
              <div className="text-sm font-bold text-red-900 tracking-widest animate-marquee-lights">
                🎰 CASINO LOGIN 🎰
              </div>
            </div>

            {/* Content */}
            <div className="mt-6">
              {/* Title */}
              <h1 className="text-center text-3xl font-black text-yellow-400 drop-shadow-lg mb-8 animate-pulse-glow">
                WELCOME TO JACKPOT
              </h1>

              {/* Player ID Label */}
              <label className="block text-sm font-bold text-yellow-300 mb-3 uppercase tracking-wider">
                PLAYER ID
              </label>

              {/* Username input */}
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value.toUpperCase())}
                placeholder="Enter username"
                className="w-full mb-6 px-4 py-3 bg-gray-800 border-2 border-yellow-400 rounded-lg text-yellow-300 placeholder-gray-500 focus:outline-none focus:border-yellow-200 focus:ring-2 focus:ring-yellow-400/50 transition-all"
              />

              {/* Luck Code Label */}
              <label className="block text-sm font-bold text-yellow-300 mb-3 uppercase tracking-wider">
                LUCK CODE
              </label>

              {/* Password input */}
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full mb-8 px-4 py-3 bg-gray-800 border-2 border-yellow-400 rounded-lg text-yellow-300 placeholder-gray-500 focus:outline-none focus:border-yellow-200 focus:ring-2 focus:ring-yellow-400/50 transition-all"
              />

              {/* Status message */}
              {message && (
                <div
                  className={`text-center mb-6 text-lg font-bold animate-pulse ${
                    jackpot
                      ? 'text-yellow-300 drop-shadow-lg'
                      : 'text-red-400 drop-shadow-lg'
                  }`}
                  style={{
                    textShadow: jackpot
                      ? '0 0 20px rgba(255, 215, 0, 0.8)'
                      : '0 0 20px rgba(255, 23, 68, 0.8)',
                  }}
                >
                  {message}
                </div>
              )}

              {/* Spin button */}
              <button
                onClick={handleSpin}
                disabled={isSpinning}
                className="w-full py-4 px-6 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 hover:from-yellow-300 hover:via-yellow-200 hover:to-yellow-300 text-gray-900 font-black text-lg uppercase tracking-widest rounded-xl transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-yellow-400/50 mb-6 border-2 border-yellow-500"
              >
                {isSpinning ? 'SPINNING...' : 'SPIN'}
              </button>

              {/* Reel display area */}
              {isSpinning && (
                <div className="flex justify-center gap-6 py-6 px-4 bg-black/50 rounded-lg border-2 border-yellow-400/30">
                  <SlotReel
                    isSpinning={isSpinning}
                    targetValue={username.charAt(0) || 'A'}
                    onSpinComplete={(symbol) =>
                      handleReelComplete(symbol, 0)
                    }
                  />
                  <SlotReel
                    isSpinning={isSpinning}
                    targetValue={password.charAt(0) || 'A'}
                    onSpinComplete={(symbol) =>
                      handleReelComplete(symbol, 1)
                    }
                  />
                </div>
              )}

              {/* Footer text */}
              <p className="text-center text-xs text-gray-400 mt-6 uppercase tracking-wide">
                Try: admin / secret123
              </p>
            </div>

            {/* Bottom decorative bar */}
            <div className="absolute bottom-0 left-0 right-0 h-6 rounded-b-2xl bg-gradient-to-r from-purple-600 via-red-600 to-purple-600"></div>
          </div>

          {/* Glow effect */}
          <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-r from-red-500/20 via-yellow-400/20 to-purple-500/20 blur-3xl"></div>
        </div>
      </div>
    </div>
  );
}
