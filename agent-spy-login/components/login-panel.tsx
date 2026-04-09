'use client';

import { useState } from 'react';
import { Lock, AlertTriangle, CheckCircle } from 'lucide-react';

interface LoginPanelProps {
  status: 'idle' | 'scanning' | 'error' | 'success';
  onSubmit: (e: React.FormEvent) => void;
  onReset: () => void;
}

export default function LoginPanel({ status, onSubmit, onReset }: LoginPanelProps) {
  const [agentId, setAgentId] = useState('');
  const [securityCode, setSecurityCode] = useState('');

  const handleReset = () => {
    setAgentId('');
    setSecurityCode('');
    onReset();
  };

  return (
    <div className={`relative w-full max-w-md ${status === 'error' ? 'animate-alarm-shake' : ''}`}>
      <div className="border-2 border-[#ff0000]/30 bg-[#1a1f3a]/60 backdrop-blur-xl rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        {status === 'success' && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00ff00]/20 to-transparent animate-pulse pointer-events-none"></div>
        )}

        {status === 'error' && (
          <div className="absolute inset-0 bg-[#ff0000]/10 animate-alarm-flash pointer-events-none"></div>
        )}

        <div className="mb-8 text-center border-b border-[#ff0000]/20 pb-6">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Lock className="w-6 h-6 text-[#ff0000]" />
            <h1 className="text-2xl font-bold text-[#e8f0fe] tracking-widest">
              SPY MISSION
            </h1>
            <Lock className="w-6 h-6 text-[#ff0000]" />
          </div>
          <p className="text-xs text-[#00d4ff] font-mono uppercase tracking-widest">
            Top Secret Access Protocol
          </p>
        </div>

        {status === 'scanning' && (
          <div className="mb-6 p-4 bg-[#00d4ff]/10 border border-[#00d4ff]/30 rounded-lg">
            <p className="text-center text-[#00d4ff] text-sm font-mono animate-pulse">
              SCANNING BIOMETRIC CREDENTIALS...
            </p>
          </div>
        )}

        {status === 'error' && (
          <div className="mb-6 p-4 bg-[#ff0000]/10 border border-[#ff0000] rounded-lg animate-alarm-flash">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-[#ff0000]" />
              <p className="text-sm font-bold text-[#ff0000] font-mono">LOCKDOWN INITIATED</p>
            </div>
            <p className="text-xs text-[#ff0000] font-mono">UNAUTHORIZED ACCESS ATTEMPT DETECTED</p>
          </div>
        )}

        {status === 'success' && (
          <div className="mb-6 p-4 bg-[#00ff00]/10 border border-[#00ff00]/50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-4 h-4 text-[#00ff00]" />
              <p className="text-sm font-bold text-[#00ff00] font-mono">ACCESS GRANTED</p>
            </div>
            <p className="text-xs text-[#00ff00] font-mono">ALL SECURITY CLEARANCES VERIFIED</p>
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label className="block text-xs uppercase tracking-widest text-[#00d4ff] mb-3 font-mono">
              Agent ID
            </label>
            <div className="relative">
              <input
                type="text"
                value={agentId}
                onChange={(e) => setAgentId(e.target.value)}
                placeholder="Enter your designation"
                disabled={status === 'scanning' || status === 'success'}
                className="w-full px-4 py-3 bg-[#0f1629]/80 border border-[#00d4ff]/50 rounded-lg text-[#e8f0fe] placeholder-[#64748b] font-mono text-sm focus:outline-none focus:border-[#00d4ff] focus:shadow-[0_0_12px_rgba(0,212,255,0.3)] transition-all disabled:opacity-60"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#00d4ff]/40 text-xs">
                ◆
              </div>
            </div>
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-[#00d4ff] mb-3 font-mono">
              Security Code
            </label>
            <div className="relative">
              <input
                type="password"
                value={securityCode}
                onChange={(e) => setSecurityCode(e.target.value)}
                placeholder="Enter security code"
                disabled={status === 'scanning' || status === 'success'}
                className="w-full px-4 py-3 bg-[#0f1629]/80 border border-[#00d4ff]/50 rounded-lg text-[#e8f0fe] placeholder-[#64748b] font-mono text-sm focus:outline-none focus:border-[#00d4ff] focus:shadow-[0_0_12px_rgba(0,212,255,0.3)] transition-all disabled:opacity-60"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#00d4ff]/40 text-xs">
                ◆
              </div>
            </div>
          </div>
          <button
            type="submit"
            disabled={status === 'scanning' || status === 'success' || !agentId || !securityCode}
            className="w-full py-3 bg-gradient-to-r from-[#ff0000] to-[#ff3333] text-white font-mono text-sm uppercase tracking-widest rounded-lg font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_20px_rgba(255,0,0,0.5)] active:shadow-[0_0_30px_rgba(255,0,0,0.8)] relative overflow-hidden group"
          >
            <span className="relative z-10">
              {status === 'scanning' ? 'VERIFYING...' : 'INITIATE ACCESS'}
            </span>
            {status !== 'scanning' && (
              <div className="absolute inset-0 bg-gradient-to-r from-[#ff6666] to-[#ff0000] opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
            )}
          </button>

          {status === 'error' && (
            <button
              type="button"
              onClick={handleReset}
              className="w-full py-2 border border-[#ff0000]/50 text-[#ff0000] font-mono text-xs uppercase tracking-widest rounded-lg hover:bg-[#ff0000]/10 transition-all"
            >
              RESET SYSTEM
            </button>
          )}

          {status === 'success' && (
            <button
              type="button"
              onClick={handleReset}
              className="w-full py-2 border border-[#00ff00]/50 text-[#00ff00] font-mono text-xs uppercase tracking-widest rounded-lg hover:bg-[#00ff00]/10 transition-all"
            >
              NEW SESSION
            </button>
          )}
        </form>

        <div className="mt-8 pt-6 border-t border-[#ff0000]/10">
          <p className="text-xs text-[#64748b] font-mono text-center tracking-widest">
            CLASSIFIED SYSTEM • USE AUTHORIZED ONLY
          </p>
        </div>
      </div>

      <div className="absolute -inset-2 bg-gradient-to-r from-[#ff0000]/20 to-[#00d4ff]/20 rounded-2xl blur-xl -z-10 opacity-50"></div>
    </div>
  );
}
