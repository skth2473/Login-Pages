"use client"

export function FogLayer() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Bottom Fog */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-48 animate-fog-drift opacity-40"
        style={{
          background: "linear-gradient(to top, rgba(200,200,200,0.4) 0%, transparent 100%)",
          filter: "blur(20px)",
        }}
      />
      
      {/* Moving Fog Layers */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-32 animate-fog-drift-slow opacity-30"
        style={{
          background: "linear-gradient(to top, rgba(180,180,180,0.3) 0%, transparent 100%)",
          filter: "blur(30px)",
          animationDelay: "2s",
        }}
      />
      
      <div 
        className="absolute bottom-10 left-0 right-0 h-24 animate-fog-drift-fast opacity-20"
        style={{
          background: "linear-gradient(to top, rgba(160,160,160,0.2) 0%, transparent 100%)",
          filter: "blur(25px)",
          animationDelay: "4s",
        }}
      />
    </div>
  )
}
