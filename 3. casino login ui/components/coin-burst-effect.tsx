'use client';

import { useState, useEffect } from 'react';

interface CoinBurstEffectProps {
  trigger: boolean;
  centerX: number;
  centerY: number;
}

export default function CoinBurstEffect({
  trigger,
  centerX,
  centerY,
}: CoinBurstEffectProps) {
  const [coins, setCoins] = useState<
    Array<{ id: number; angle: number; distance: number }>
  >([]);

  useEffect(() => {
    if (trigger) {
      const newCoins = Array.from({ length: 12 }, (_, i) => ({
        id: i,
        angle: (i / 12) * Math.PI * 2,
        distance: 200,
      }));
      setCoins(newCoins);

      const timer = setTimeout(() => {
        setCoins([]);
      }, 1200);

      return () => clearTimeout(timer);
    }
  }, [trigger]);

  return (
    <>
      {coins.map((coin) => {
        const x = Math.cos(coin.angle) * coin.distance;
        const y = Math.sin(coin.angle) * coin.distance;

        return (
          <div
            key={coin.id}
            className="pointer-events-none fixed animate-coin-burst"
            style={{
              left: `${centerX}px`,
              top: `${centerY}px`,
              '--tx': `${x}px`,
              '--ty': `${y}px`,
            } as React.CSSProperties}
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-yellow-400 shadow-lg shadow-yellow-400">
              <span className="text-xs font-bold text-gray-900">$</span>
            </div>
          </div>
        );
      })}
    </>
  );
}
