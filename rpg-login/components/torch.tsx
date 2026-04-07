"use client"

interface TorchProps {
  position: "left" | "right"
}

export function Torch({ position }: TorchProps) {
  const positionClasses = position === "left" 
    ? "left-4 md:left-12 lg:left-24" 
    : "right-4 md:right-12 lg:right-24"

  return (
    <div className={`absolute top-1/4 ${positionClasses} z-5`}>
      {/* Torch Handle */}
      <div className="relative">
        <div className="w-3 h-20 bg-gradient-to-b from-amber-800 to-amber-950 rounded-b-lg shadow-lg" />
        
        {/* Torch Head */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-4 bg-gradient-to-t from-amber-900 to-amber-700 rounded-t-full" />
        
        {/* Flame Container */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2">
          {/* Main Flame */}
          <div className="relative">
            <div className="w-8 h-12 animate-flicker">
              <div 
                className="absolute inset-0 rounded-full blur-sm"
                style={{
                  background: "radial-gradient(ellipse at bottom, #ff6b35 0%, #ff4500 30%, #ff8c00 60%, transparent 100%)",
                  filter: "blur(2px)",
                }}
              />
              <div 
                className="absolute inset-1 rounded-full"
                style={{
                  background: "radial-gradient(ellipse at bottom, #ffcc00 0%, #ff6b35 40%, transparent 100%)",
                }}
              />
            </div>
            
            {/* Glow Effect */}
            <div 
              className="absolute -inset-8 rounded-full animate-pulse opacity-50"
              style={{
                background: "radial-gradient(circle, rgba(255,107,53,0.4) 0%, transparent 70%)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
