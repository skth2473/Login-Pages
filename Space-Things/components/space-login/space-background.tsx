'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
}

interface ShootingStar {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

interface Planet {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  rings?: boolean;
}

export function SpaceBackground() {
  const [stars, setStars] = useState<Star[]>([]);
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate stars
  useEffect(() => {
    const generatedStars: Star[] = Array.from({ length: 150 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.7 + 0.3,
      duration: Math.random() * 3 + 2,
    }));
    setStars(generatedStars);

    // Generate planets
    const generatedPlanets: Planet[] = [
      {
        id: 1,
        x: 15,
        y: 25,
        size: 70,
        color: 'from-blue-500 to-cyan-400',
        duration: 20,
      },
      {
        id: 2,
        x: 75,
        y: 20,
        size: 55,
        color: 'from-yellow-500 to-orange-400',
        duration: 25,
      },
      {
        id: 3,
        x: 85,
        y: 65,
        size: 65,
        color: 'from-red-600 to-orange-500',
        duration: 22,
      },
      {
        id: 4,
        x: 25,
        y: 75,
        size: 90,
        color: 'from-orange-600 to-yellow-500',
        duration: 28,
        rings: true,
      },
      {
        id: 5,
        x: 65,
        y: 75,
        size: 75,
        color: 'from-amber-600 to-orange-400',
        duration: 30,
      },
    ];
    setPlanets(generatedPlanets);
  }, []);

  // Handle shooting stars
  useEffect(() => {
    const interval = setInterval(() => {
      const newShootingStar: ShootingStar = {
        id: Math.random(),
        startX: Math.random() * 100,
        startY: Math.random() * 30,
        endX: Math.random() * 100,
        endY: Math.random() * 100,
      };
      setShootingStars((prev) => [...prev, newShootingStar]);

      setTimeout(() => {
        setShootingStars((prev) =>
          prev.filter((star) => star.id !== newShootingStar.id)
        );
      }, 2000);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Handle parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const parallaxX = typeof window !== 'undefined' ? (mousePos.x - window.innerWidth / 2) * 0.02 : 0;
  const parallaxY = typeof window !== 'undefined' ? (mousePos.y - window.innerHeight / 2) * 0.02 : 0;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden bg-black"
    >
      {/* Dark space background with Milky Way effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-black to-black" />

      {/* Milky Way band - curved light effect */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-1/3 left-0 w-full h-96 bg-gradient-to-r from-transparent via-blue-300/20 to-transparent blur-3xl transform -skew-y-12" />
        <div className="absolute top-2/5 left-1/4 w-96 h-64 bg-gradient-to-b from-white/10 to-transparent blur-2xl rounded-full" />
      </div>

      {/* Planets */}
      {planets.map((planet) => (
        <motion.div
          key={planet.id}
          className="absolute rounded-full"
          style={{
            left: `${planet.x}%`,
            top: `${planet.y}%`,
            width: planet.size,
            height: planet.size,
            x: parallaxX * 0.5,
            y: parallaxY * 0.5,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: planet.duration, repeat: Infinity, ease: 'linear' }}
        >
          {/* Planet gradient background */}
          <div
            className={`absolute inset-0 rounded-full bg-gradient-to-br ${planet.color} shadow-2xl`}
            style={{
              boxShadow: `0 0 60px ${planet.color.includes('blue') ? 'rgba(59, 130, 246, 0.5)' : planet.color.includes('purple') ? 'rgba(168, 85, 247, 0.5)' : 'rgba(249, 115, 22, 0.5)'}`,
            }}
          />
          {/* Planet rings */}
          {planet.rings && (
            <div className="absolute inset-0 rounded-full border-4 border-yellow-400/30 shadow-lg" />
          )}
        </motion.div>
      ))}

      {/* Static stars with twinkling animation */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            x: parallaxX * 0.3,
            y: parallaxY * 0.3,
            boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, ${star.opacity})`,
          }}
          animate={{ opacity: [star.opacity * 0.3, star.opacity, star.opacity * 0.3] }}
          transition={{ duration: star.duration, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Shooting stars */}
      {shootingStars.map((star) => {
        const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1000;
        const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 1000;
        return (
          <motion.div
            key={star.id}
            className="absolute w-1 h-1 rounded-full bg-white shadow-lg"
            style={{
              left: `${star.startX}%`,
              top: `${star.startY}%`,
              boxShadow: '0 0 20px rgba(255, 255, 255, 0.8)',
            }}
            initial={{ x: 0, y: 0, opacity: 1 }}
            animate={{
              x: (star.endX - star.startX) * windowWidth * 0.01,
              y: (star.endY - star.startY) * windowHeight * 0.01,
              opacity: 0,
            }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
        );
      })}

      {/* Floating particles around the center */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full"
          style={{
            left: '50%',
            top: '50%',
            boxShadow: '0 0 10px rgba(34, 211, 238, 0.6)',
          }}
          animate={{
            x: Math.cos((i / 20) * Math.PI * 2) * 200,
            y: Math.sin((i / 20) * Math.PI * 2) * 200,
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 4,
            delay: (i / 20) * 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
