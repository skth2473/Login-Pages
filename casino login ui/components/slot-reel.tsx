'use client';

import { useState, useEffect, useRef } from 'react';

const SYMBOLS = ['A', 'B', 'C', 'D', 'E', '1', '2', '3', '4', '5'];

interface SlotReelProps {
  isSpinning: boolean;
  targetValue: string;
  onSpinComplete: (value: string) => void;
}

export default function SlotReel({
  isSpinning,
  targetValue,
  onSpinComplete,
}: SlotReelProps) {
  const [displayValue, setDisplayValue] = useState(SYMBOLS[0]);
  const [rotation, setRotation] = useState(0);
  const spinIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isSpinning) {
      let currentIndex = 0;
      let spinCount = 0;
      const totalSpins = 20;

      spinIntervalRef.current = setInterval(() => {
        spinCount++;
        currentIndex = (currentIndex + 1) % SYMBOLS.length;
        setDisplayValue(SYMBOLS[currentIndex]);
        setRotation((prev) => prev + 36);

        if (spinCount >= totalSpins) {
          if (spinIntervalRef.current) {
            clearInterval(spinIntervalRef.current);
          }

          const targetIndex = SYMBOLS.indexOf(targetValue);
          setDisplayValue(targetValue);
          setRotation(targetIndex * 36);
          onSpinComplete(targetValue);
        }
      }, 50);
    }

    return () => {
      if (spinIntervalRef.current) {
        clearInterval(spinIntervalRef.current);
      }
    };
  }, [isSpinning, targetValue, onSpinComplete]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-24 w-20 overflow-hidden rounded-lg border-4 border-yellow-400 bg-gray-900 shadow-2xl shadow-yellow-400/50">
        {/* Reel display window */}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-gray-800 to-gray-950 perspective">
          <div
            className="text-4xl font-bold text-yellow-400 drop-shadow-lg transition-all duration-300"
            style={{
              textShadow: '0 0 20px rgba(255, 215, 0, 0.8)',
              transform: `rotateY(${rotation}deg)`,
            }}
          >
            {displayValue}
          </div>
        </div>

        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"></div>
      </div>

      {/* Decorative lights below reel */}
      <div className="mt-3 flex gap-1">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`h-2 w-2 rounded-full transition-all ${
              displayValue === SYMBOLS[i]
                ? 'bg-yellow-400 shadow-lg shadow-yellow-400'
                : 'bg-red-600'
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}
