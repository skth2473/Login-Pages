"use client"

import { useEffect, useRef, useState } from "react"

export function AmbientAudio() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const audioContextRef = useRef<AudioContext | null>(null)
  const oscillatorsRef = useRef<OscillatorNode[]>([])
  const gainRef = useRef<GainNode | null>(null)

  const startAmbient = () => {
    if (audioContextRef.current) return

    const audioContext = new AudioContext()
    audioContextRef.current = audioContext

    // Master gain
    const masterGain = audioContext.createGain()
    masterGain.gain.value = 0.15
    masterGain.connect(audioContext.destination)
    gainRef.current = masterGain

    // Low frequency hum
    const hum = audioContext.createOscillator()
    hum.type = "sine"
    hum.frequency.value = 60
    const humGain = audioContext.createGain()
    humGain.gain.value = 0.3
    hum.connect(humGain)
    humGain.connect(masterGain)
    hum.start()
    oscillatorsRef.current.push(hum)

    // Subtle bubbling effect using filtered noise
    const noiseBuffer = audioContext.createBuffer(1, audioContext.sampleRate * 2, audioContext.sampleRate)
    const noiseData = noiseBuffer.getChannelData(0)
    for (let i = 0; i < noiseBuffer.length; i++) {
      noiseData[i] = Math.random() * 2 - 1
    }

    const noise = audioContext.createBufferSource()
    noise.buffer = noiseBuffer
    noise.loop = true

    const noiseFilter = audioContext.createBiquadFilter()
    noiseFilter.type = "bandpass"
    noiseFilter.frequency.value = 400
    noiseFilter.Q.value = 10

    const noiseGain = audioContext.createGain()
    noiseGain.gain.value = 0.05

    noise.connect(noiseFilter)
    noiseFilter.connect(noiseGain)
    noiseGain.connect(masterGain)
    noise.start()

    // Modulate the filter for bubbling effect
    const lfo = audioContext.createOscillator()
    lfo.type = "sine"
    lfo.frequency.value = 0.5
    const lfoGain = audioContext.createGain()
    lfoGain.gain.value = 200
    lfo.connect(lfoGain)
    lfoGain.connect(noiseFilter.frequency)
    lfo.start()
    oscillatorsRef.current.push(lfo)

    // Ethereal pad sound
    const pad1 = audioContext.createOscillator()
    pad1.type = "sine"
    pad1.frequency.value = 110
    const pad1Gain = audioContext.createGain()
    pad1Gain.gain.value = 0.1
    pad1.connect(pad1Gain)
    pad1Gain.connect(masterGain)
    pad1.start()
    oscillatorsRef.current.push(pad1)

    const pad2 = audioContext.createOscillator()
    pad2.type = "sine"
    pad2.frequency.value = 165
    const pad2Gain = audioContext.createGain()
    pad2Gain.gain.value = 0.05
    pad2.connect(pad2Gain)
    pad2Gain.connect(masterGain)
    pad2.start()
    oscillatorsRef.current.push(pad2)

    setIsPlaying(true)
  }

  const stopAmbient = () => {
    oscillatorsRef.current.forEach((osc) => {
      try {
        osc.stop()
      } catch {
        // Already stopped
      }
    })
    oscillatorsRef.current = []

    if (audioContextRef.current) {
      audioContextRef.current.close()
      audioContextRef.current = null
    }

    gainRef.current = null
    setIsPlaying(false)
  }

  useEffect(() => {
    return () => {
      stopAmbient()
    }
  }, [])

  return (
    <button
      onClick={() => (isPlaying ? stopAmbient() : startAmbient())}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-wider backdrop-blur-sm transition-all duration-300 ${
        isPlaying
          ? "border-emerald-500/50 bg-emerald-950/50 text-emerald-300 hover:bg-emerald-900/50"
          : "border-cyan-500/30 bg-slate-900/50 text-cyan-400/70 hover:bg-slate-800/50 hover:text-cyan-300"
      }`}
      title={isPlaying ? "Mute ambient sound" : "Play ambient sound"}
    >
      {isPlaying ? (
        <SoundOnIcon className="h-4 w-4" />
      ) : (
        <SoundOffIcon className="h-4 w-4" />
      )}
      <span className={`transition-all duration-300 ${isHovered ? "w-auto opacity-100" : "w-0 opacity-0 overflow-hidden"}`}>
        {isPlaying ? "Mute" : "Sound"}
      </span>
      {isPlaying && (
        <span className="flex gap-0.5">
          {[...Array(3)].map((_, i) => (
            <span
              key={i}
              className="w-0.5 bg-emerald-400 animate-sound-bar"
              style={{
                animationDelay: `${i * 0.15}s`,
                height: "12px",
              }}
            />
          ))}
        </span>
      )}
    </button>
  )
}

function SoundOnIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M11 5L6 9H2v6h4l5 4V5z" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
    </svg>
  )
}

function SoundOffIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M11 5L6 9H2v6h4l5 4V5z" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  )
}
