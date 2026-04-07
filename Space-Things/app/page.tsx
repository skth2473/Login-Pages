'use client'

import { SpaceCanvas } from '@/components/SpaceCanvas'
import { LoginCard } from '@/components/LoginCard'
import { CustomCursor } from '@/components/CustomCursor'
import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    // Prevent scrolling on mount
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  return (
    <main className="relative w-full h-screen overflow-hidden bg-[#030008] cursor-none">
      {/* 3D Space Background */}
      <SpaceCanvas />

      {/* Login Card */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-auto">
        <LoginCard />
      </div>

      {/* Custom Cursor */}
      <CustomCursor />
    </main>
  )
}
