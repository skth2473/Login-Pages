'use client';

import { useState, useRef, useEffect } from 'react';
import RetinaScanner from '@/components/retina-scanner';
import FingerprintScanner from '@/components/fingerprint-scanner';
import LaserGrid from '@/components/laser-grid';
import LoginPanel from '@/components/login-panel';

export default function Home() {
  const [status, setStatus] = useState<'idle' | 'scanning' | 'error' | 'success'>('idle');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const playSuccessSound = () => {
    // Create a simple beep sound using Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0, audioContext.currentTime + 0.1);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('scanning');

    // Simulate scanning and biometric verification
    setTimeout(() => {
      const success = Math.random() > 0.3; // 70% success rate for demo
      if (success) {
        playSuccessSound();
        setStatus('success');
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    }, 2000);
  };

  const handleReset = () => {
    setStatus('idle');
  };

  return (
    <main
      ref={containerRef}
      className="min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#0a0e27] via-[#0f1629] to-[#0a0e27] relative"
    >
      {/* Background depth blur effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl"></div>
      </div>

      {/* Animated laser grid background */}
      <LaserGrid mousePos={mousePos} />

      {/* Main content container */}
      <div className="relative z-10 h-screen w-full flex items-center justify-center px-4">
        <div className="flex w-full max-w-6xl gap-12 items-center justify-center">
          {/* Left side - Scanner visualizations */}
          <div className="hidden lg:flex flex-col gap-8 items-center justify-center w-1/3">
            <RetinaScanner isActive={status === 'scanning' || status === 'success'} />
            <FingerprintScanner isActive={status === 'scanning'} />
          </div>

          {/* Center - Login panel */}
          <LoginPanel
            status={status}
            onSubmit={handleSubmit}
            onReset={handleReset}
          />

          {/* Right side - HUD elements */}
          <div className="hidden lg:flex flex-col gap-8 w-1/3 text-xs font-mono text-[#00d4ff]/60">
            <div className="border border-[#00d4ff]/30 p-4 bg-[#1a1f3a]/40 backdrop-blur-md">
              <div className="mb-2 text-[#00d4ff]/80">SYSTEM STATUS</div>
              <div className="space-y-1">
                <div>SECURITY PROTOCOL: ACTIVE</div>
                <div>BIOMETRIC SCAN: {status === 'scanning' ? 'IN PROGRESS' : 'READY'}</div>
                <div>ACCESS LEVEL: TOP SECRET</div>
              </div>
            </div>

            <div className="border border-[#00d4ff]/30 p-4 bg-[#1a1f3a]/40 backdrop-blur-md">
              <div className="mb-2 text-[#00d4ff]/80">THREAT ASSESSMENT</div>
              <div className="space-y-1">
                <div>PERIMETER: SECURE</div>
                <div>INTRUDERS: NONE</div>
                <div>LOCKDOWN: {status === 'error' ? 'ACTIVE' : 'INACTIVE'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sound effects indicator */}
      <div className="fixed bottom-4 right-4 text-xs text-[#00d4ff]/40 font-mono">
        [AUDIO ENABLED]
      </div>
    </main>
  );
}
