"use client"

export function ScanlineOverlay() {
  return (
    <>
      {/* Scanlines */}
      <div
        className="fixed inset-0 z-40 pointer-events-none scanlines opacity-50"
        style={{ mixBlendMode: "overlay" }}
      />

      {/* Moving scan line */}
      <div className="fixed inset-0 z-40 pointer-events-none overflow-hidden">
        <div
          className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--neon-cyan)]/30 to-transparent animate-scanline"
          style={{
            boxShadow: "0 0 20px var(--neon-cyan)",
          }}
        />
      </div>

      {/* Corner HUD elements */}
      <div className="fixed top-4 left-4 z-40 pointer-events-none">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[var(--neon-cyan)] animate-pulse" />
          <span className="font-mono text-[10px] text-[var(--neon-cyan)]/70 tracking-widest">
            NETWORK: ACTIVE
          </span>
        </div>
        <div className="mt-1 flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="w-1 h-3 bg-[var(--neon-cyan)]/50"
              style={{
                height: `${8 + Math.random() * 8}px`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="fixed top-4 right-4 z-40 pointer-events-none text-right">
        <div className="font-mono text-[10px] text-[var(--neon-yellow)]/70 tracking-widest">
          2077.12.31
        </div>
        <div className="font-mono text-[10px] text-[var(--neon-yellow)]/70 tracking-widest">
          23:59:59
        </div>
      </div>

      <div className="fixed bottom-4 left-4 z-40 pointer-events-none">
        <div className="font-mono text-[10px] text-[var(--neon-cyan)]/50 tracking-widest">
          ARASAKA_CORP
        </div>
        <div className="font-mono text-[10px] text-[var(--neon-cyan)]/50 tracking-widest">
          SECURE_TERMINAL_v2.077
        </div>
      </div>

      <div className="fixed bottom-4 right-4 z-40 pointer-events-none">
        <div className="flex items-center gap-2 justify-end">
          <span className="font-mono text-[10px] text-[var(--neon-yellow)]/50 tracking-widest">
            LAT: 52.4820
          </span>
        </div>
        <div className="flex items-center gap-2 justify-end">
          <span className="font-mono text-[10px] text-[var(--neon-yellow)]/50 tracking-widest">
            LON: -1.8908
          </span>
        </div>
      </div>

      {/* Thin grid lines */}
      <div className="fixed inset-0 z-30 pointer-events-none grid-overlay opacity-20" />
    </>
  )
}
