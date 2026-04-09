'use client';

import { useState, useEffect, useRef } from 'react';
import IceBackground from '@/components/ice-background';
import FrostedPanel from '@/components/frosted-panel';
import LoginForm from '@/components/login-form';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [loginState, setLoginState] = useState<'idle' | 'error' | 'success'>('idle');
  const containerRef = useRef<HTMLDivElement>(null);

  const handleLogin = async (username: string, password: string) => {
    setIsLoading(true);
    setLoginState('idle');

    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Mock validation: wrong password triggers error state
    if (password !== 'CRYO') {
      setLoginState('error');
      setIsLoading(false);
      // Reset after error animation
      setTimeout(() => {
        setLoginState('idle');
      }, 2000);
    } else {
      setLoginState('success');
      setIsLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-background">
      {/* Frozen Cave Background with Particles */}
      <IceBackground />

      {/* Login Container */}
      <div
        ref={containerRef}
        className="relative flex min-h-screen items-center justify-center px-4"
      >
        <FrostedPanel loginState={loginState}>
          <LoginForm
            onSubmit={handleLogin}
            isLoading={isLoading}
            loginState={loginState}
          />
        </FrostedPanel>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="animate-bounce text-accent opacity-40">
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </main>
  );
}
