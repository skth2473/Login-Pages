'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface LoginFormProps {
  onSubmit: (username: string, password: string) => Promise<void>;
  isLoading: boolean;
  loginState: 'idle' | 'error' | 'success';
}

export default function LoginForm({
  onSubmit,
  isLoading,
  loginState,
}: LoginFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showAccessText, setShowAccessText] = useState(false);

  useEffect(() => {
    if (loginState === 'success') {
      setShowAccessText(true);
      const timer = setTimeout(() => {
        setShowAccessText(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [loginState]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(username, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div className="text-center mb-8">
        <h1
          className={`text-3xl font-bold tracking-tight text-foreground transition-all duration-300 ${
            loginState === 'success' ? 'scale-105' : ''
          }`}
          style={{
            textShadow:
              loginState === 'success'
                ? '0 0 20px rgba(100, 200, 255, 0.6), 0 0 40px rgba(100, 200, 255, 0.3)'
                : 'none',
          }}
        >
          CRYO VAULT
        </h1>
        <p className="text-muted-foreground text-sm mt-2">
          Enter the frozen realm
        </p>
      </div>

      {/* Username Field */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground/90 block">
          FROST ID
        </label>
        <div className="relative group">
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLoading || loginState === 'success'}
            className="bg-input/40 border-border/60 text-foreground placeholder:text-muted-foreground/50 focus-visible:ring-accent/50 transition-all"
            style={{
              boxShadow:
                loginState === 'error'
                  ? '0 0 15px rgba(255, 100, 100, 0.3), inset 0 0 10px rgba(255, 100, 100, 0.1)'
                  : 'inset 0 0 10px rgba(100, 200, 255, 0.05)',
            }}
          />
          {/* Frost crystals on input */}
          <div className="absolute top-0 right-4 text-accent/30 text-lg pointer-events-none">
            ❄
          </div>
        </div>
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground/90 block">
          CRYO KEY
        </label>
        <div className="relative group">
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading || loginState === 'success'}
            className="bg-input/40 border-border/60 text-foreground placeholder:text-muted-foreground/50 focus-visible:ring-accent/50 transition-all"
            style={{
              boxShadow:
                loginState === 'error'
                  ? '0 0 15px rgba(255, 100, 100, 0.3), inset 0 0 10px rgba(255, 100, 100, 0.1)'
                  : 'inset 0 0 10px rgba(100, 200, 255, 0.05)',
            }}
          />
          {/* Frost crystals on input */}
          <div className="absolute top-0 right-4 text-accent/30 text-lg pointer-events-none">
            ❄
          </div>
        </div>
        <p className="text-xs text-muted-foreground text-right">
          Hint: Try "CRYO"
        </p>
      </div>

      {/* Error State Message */}
      {loginState === 'error' && (
        <div
          className="rounded-lg bg-red-500/20 border border-red-500/50 p-3 text-red-200 text-sm text-center animate-pulse"
          style={{
            animation: 'shatter 0.6s ease-out, pulse 1s infinite 0.6s',
          }}
        >
          <div className="font-bold">INSTANT TEMPERATURE DROP</div>
          <div className="text-xs mt-1">Full screen freezes in under 0.5 sec</div>
        </div>
      )}

      {/* Success State Message */}
      {showAccessText && loginState === 'success' && (
        <div className="rounded-lg bg-accent/20 border border-accent/50 p-3 text-accent text-sm text-center animate-pulse">
          <div className="font-bold">SYSTEM THAWED</div>
          <div className="text-xs mt-1">ACCESS GRANTED</div>
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isLoading || loginState === 'success'}
        className="w-full relative overflow-hidden bg-accent hover:bg-accent/90 text-accent-foreground font-bold py-2 transition-all duration-300 group"
        style={{
          boxShadow:
            loginState === 'success'
              ? '0 0 30px rgba(100, 200, 255, 0.6)'
              : 'none',
        }}
      >
        {/* Shimmer effect */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          style={{
            animation: isLoading ? 'shimmer 1.5s infinite' : 'none',
          }}
        />

        <span className="relative">
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-accent-foreground/30 border-t-accent-foreground" />
              FREEZING...
            </span>
          ) : loginState === 'success' ? (
            <span>✓ ACCESS GRANTED</span>
          ) : (
            <span>INITIALIZE CRYO</span>
          )}
        </span>
      </Button>

      {/* Footer Info */}
      <div className="text-center text-xs text-muted-foreground space-y-1 pt-4">
        <p>Ultra realistic ice • Frost simulation • Cinematic UI</p>
        <p>Immersive cold environment • Sub-zero aesthetic</p>
      </div>
    </form>
  );
}
