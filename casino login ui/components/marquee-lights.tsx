'use client';

export default function MarqueeLights() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Top lights */}
      <div className="absolute top-0 left-0 right-0 flex justify-around px-8 py-4">
        {[...Array(8)].map((_, i) => (
          <div
            key={`top-${i}`}
            className="h-3 w-3 rounded-full bg-red-500 animate-flicker shadow-lg shadow-red-500"
            style={{ animationDelay: `${i * 0.1}s` }}
          ></div>
        ))}
      </div>

      {/* Left lights */}
      <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-around px-4 py-8">
        {[...Array(6)].map((_, i) => (
          <div
            key={`left-${i}`}
            className="h-3 w-3 rounded-full bg-yellow-400 animate-flicker shadow-lg shadow-yellow-400"
            style={{ animationDelay: `${i * 0.15}s` }}
          ></div>
        ))}
      </div>

      {/* Right lights */}
      <div className="absolute right-0 top-0 bottom-0 flex flex-col justify-around px-4 py-8">
        {[...Array(6)].map((_, i) => (
          <div
            key={`right-${i}`}
            className="h-3 w-3 rounded-full bg-purple-500 animate-flicker shadow-lg shadow-purple-500"
            style={{ animationDelay: `${i * 0.12}s` }}
          ></div>
        ))}
      </div>

      {/* Bottom lights */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-around px-8 py-4">
        {[...Array(8)].map((_, i) => (
          <div
            key={`bottom-${i}`}
            className="h-3 w-3 rounded-full bg-cyan-400 animate-flicker shadow-lg shadow-cyan-400"
            style={{ animationDelay: `${i * 0.1}s` }}
          ></div>
        ))}
      </div>
    </div>
  );
}
