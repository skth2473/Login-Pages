'use client'

import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Suspense } from 'react'
import * as THREE from 'three'

// Stars Component
function Stars() {
  const pointsRef = useRef<THREE.Points>(null)
  const [positions, setPositions] = useState<Float32Array | null>(null)
  const velocitiesRef = useRef<Float32Array | null>(null)
  const [isWarping, setIsWarping] = useState(false)

  useEffect(() => {
    // Create star field
    const starCount = 1000
    const positions = new Float32Array(starCount * 3)
    const velocities = new Float32Array(starCount * 3)

    for (let i = 0; i < starCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 200
      positions[i + 1] = (Math.random() - 0.5) * 200
      positions[i + 2] = (Math.random() - 0.5) * 200

      velocities[i] = 0
      velocities[i + 1] = 0
      velocities[i + 2] = -0.05
    }

    setPositions(positions)
    velocitiesRef.current = velocities

    // Listen for warp event
    const handleWarp = () => {
      setIsWarping(true)
      setTimeout(() => setIsWarping(false), 800)
    }

    window.addEventListener('startWarp', handleWarp)
    return () => window.removeEventListener('startWarp', handleWarp)
  }, [])

  useFrame(() => {
    if (!pointsRef.current || !velocitiesRef.current || !positions) return

    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array
    const vel = velocitiesRef.current

    for (let i = 0; i < pos.length; i += 3) {
      // Increase velocity during warp
      vel[i + 2] = isWarping ? -1.5 : -0.05

      // Update position
      pos[i] += vel[i]
      pos[i + 1] += vel[i + 1]
      pos[i + 2] += vel[i + 2]

      // Wrap around
      if (pos[i + 2] < -100) {
        pos[i + 2] = 100
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true

    // Twinkling effect
    const colors = pointsRef.current.geometry.attributes.color.array as Float32Array
    for (let i = 0; i < colors.length; i += 3) {
      const twinkle = 0.5 + 0.5 * Math.sin(Date.now() * 0.001 + i)
      colors[i] = twinkle
      colors[i + 1] = twinkle
      colors[i + 2] = twinkle
    }
    pointsRef.current.geometry.attributes.color.needsUpdate = true
  })

  if (!positions) return null

  // Create colors array
  const colors = new Float32Array(positions.length)
  for (let i = 0; i < colors.length; i += 3) {
    colors[i] = 1
    colors[i + 1] = 1
    colors[i + 2] = 1
  }

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={positions.length / 3} itemSize={3} />
        <bufferAttribute attach="attributes-color" array={colors} count={colors.length / 3} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.5} sizeAttenuation={true} vertexColors />
    </points>
  )
}

// Shooting Stars Component
function ShootingStar() {
  const lineRef = useRef<THREE.Line>(null)
  const [showStar, setShowStar] = useState(false)
  const timeRef = useRef(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setShowStar(true)
      timeRef.current = 0
      setTimeout(() => setShowStar(false), 1500)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  useFrame(() => {
    if (!lineRef.current || !showStar) return
    timeRef.current += 0.016
    const progress = Math.min(timeRef.current / 1.5, 1)
    lineRef.current.geometry.setDrawRange(0, Math.floor(progress * 100))
  })

  if (!showStar) return null

  // Create shooting star line
  const points = []
  for (let i = 0; i <= 100; i++) {
    points.push(new THREE.Vector3(i - 50, 40 + Math.random() * 20, -80))
  }
  const positions = new Float32Array(points.flatMap(p => [p.x, p.y, p.z]))

  return (
    <line ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={positions.length / 3} itemSize={3} />
      </bufferGeometry>
      <lineBasicMaterial color={0x00f0ff} linewidth={2} />
    </line>
  )
}

// Planet Component
function Planet({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.0005
      meshRef.current.rotation.y += 0.001
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[8, 32, 32]} />
      <meshStandardMaterial
        color={0xb026ff}
        emissive={0xb026ff}
        emissiveIntensity={0.3}
        metalness={0.4}
        roughness={0.7}
      />
    </mesh>
  )
}

export function SpaceCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 50], fov: 75 }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}
      gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
    >
      <color attach="background" args={['#030008']} />
      <Suspense fallback={null}>
        <Stars />
        <ShootingStar />
        <Planet position={[-40, -30, -60]} />
        <Planet position={[50, 35, -100]} />
      </Suspense>
    </Canvas>
  )
}
