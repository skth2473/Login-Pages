"use client"

import { useState, useEffect, useRef, useCallback } from "react"

// Matrix code rain character set
const MATRIX_CHARS = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"

// Random system logs for background effect
const SYSTEM_LOGS = [
  "INITIALIZING NEURAL INTERFACE...",
  "SCANNING BIOMETRIC DATA...",
  "DECRYPTING QUANTUM KEYS...",
  "SYNCHRONIZING MATRIX NODES...",
  "BYPASSING FIREWALL PROTOCOLS...",
  "LOADING CONSCIOUSNESS DRIVER...",
  "ESTABLISHING SECURE TUNNEL...",
  "VERIFYING IDENTITY HASH...",
  "CALIBRATING REALITY ENGINE...",
  "ACCESSING DEEP WEB NODES...",
]

// Possible usernames for AI auto-fill
const POSSIBLE_NAMES = ["NEO", "MORPHEUS", "TRINITY", "CYPHER", "TANK", "DOZER", "ORACLE", "AGENT_SMITH", "NIOBE", "GHOST"]

interface RainDrop {
  x: number
  y: number
  speed: number
  chars: string[]
  opacity: number
  layer: number
}

export default function MatrixLogin() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [identity, setIdentity] = useState("")
  const [encryptionKey, setEncryptionKey] = useState("")
  const [isTypingIdentity, setIsTypingIdentity] = useState(false)
  const [isTypingKey, setIsTypingKey] = useState(false)
  const [systemLog, setSystemLog] = useState("")
  const [showCursor, setShowCursor] = useState(true)
  const [loginState, setLoginState] = useState<"idle" | "analyzing" | "success" | "error">("idle")
  const [glitchActive, setGlitchActive] = useState(false)
  const [screenShake, setScreenShake] = useState(false)
  const [codeRainSpeed, setCodeRainSpeed] = useState(1)
  const [showAccessText, setShowAccessText] = useState("")
  const rainDropsRef = useRef<RainDrop[]>([])
  const animationRef = useRef<number>()
  const audioContextRef = useRef<AudioContext | null>(null)

  // Initialize rain drops
  const initRainDrops = useCallback((width: number, height: number) => {
    const drops: RainDrop[] = []
    const columnWidth = 20
    const columns = Math.ceil(width / columnWidth)

    for (let i = 0; i < columns * 3; i++) {
      const layer = Math.floor(Math.random() * 3)
      drops.push({
        x: (i % columns) * columnWidth + Math.random() * 10,
        y: Math.random() * height - height,
        speed: (Math.random() * 2 + 1) * (layer === 0 ? 0.5 : layer === 1 ? 1 : 1.5),
        chars: Array.from({ length: Math.floor(Math.random() * 20) + 10 }, () =>
          MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]
        ),
        opacity: layer === 0 ? 0.3 : layer === 1 ? 0.6 : 1,
        layer,
      })
    }
    rainDropsRef.current = drops
  }, [])

  // Play typing sound
  const playTypingSound = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext()
    }
    const ctx = audioContextRef.current
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)

    oscillator.frequency.value = 800 + Math.random() * 400
    oscillator.type = "square"
    gainNode.gain.value = 0.02

    oscillator.start()
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05)
    oscillator.stop(ctx.currentTime + 0.05)
  }, [])

  // Play glitch sound
  const playGlitchSound = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext()
    }
    const ctx = audioContextRef.current
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)

    oscillator.frequency.value = 100 + Math.random() * 200
    oscillator.type = "sawtooth"
    gainNode.gain.value = 0.05

    oscillator.start()
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1)
    oscillator.stop(ctx.currentTime + 0.1)
  }, [])

  // Canvas animation for matrix rain
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initRainDrops(canvas.width, canvas.height)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      rainDropsRef.current.forEach((drop) => {
        const fontSize = drop.layer === 0 ? 12 : drop.layer === 1 ? 16 : 20
        ctx.font = `${fontSize}px monospace`

        drop.chars.forEach((char, index) => {
          const y = drop.y + index * fontSize
          if (y > 0 && y < canvas.height) {
            const brightness = index === 0 ? 1 : 1 - index / drop.chars.length
            const green = Math.floor(255 * brightness * drop.opacity)
            ctx.fillStyle = index === 0 ? `rgba(255, 255, 255, ${drop.opacity})` : `rgba(0, ${green}, 0, ${drop.opacity * brightness})`
            ctx.fillText(char, drop.x, y)
          }
        })

        drop.y += drop.speed * codeRainSpeed

        if (drop.y > canvas.height + drop.chars.length * 20) {
          drop.y = -drop.chars.length * 20
          drop.x = Math.random() * canvas.width
          drop.chars = Array.from({ length: Math.floor(Math.random() * 20) + 10 }, () =>
            MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]
          )
        }

        // Randomly change characters for flickering effect
        if (Math.random() < 0.02) {
          const randomIndex = Math.floor(Math.random() * drop.chars.length)
          drop.chars[randomIndex] = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]
        }
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [initRainDrops, codeRainSpeed])

  // Cursor blink effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530)
    return () => clearInterval(interval)
  }, [])

  // Random system logs
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemLog(SYSTEM_LOGS[Math.floor(Math.random() * SYSTEM_LOGS.length)])
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Random glitch effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.1) {
        setGlitchActive(true)
        setTimeout(() => setGlitchActive(false), 100 + Math.random() * 200)
      }
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  // AI Auto-fill feature
  const handleIdentityFocus = () => {
    if (identity) return
    setIsTypingIdentity(true)
    setLoginState("analyzing")

    const messages = ["Analyzing user...", "Predicting identity...", "Scanning neural patterns..."]
    let msgIndex = 0

    const msgInterval = setInterval(() => {
      setIdentity(messages[msgIndex % messages.length])
      msgIndex++
    }, 800)

    setTimeout(() => {
      clearInterval(msgInterval)
      // Random character scramble effect
      const targetName = POSSIBLE_NAMES[Math.floor(Math.random() * POSSIBLE_NAMES.length)]
      let scrambleCount = 0
      const scrambleInterval = setInterval(() => {
        const scrambled = Array.from({ length: targetName.length }, () =>
          MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]
        ).join("")
        setIdentity(scrambled)
        playTypingSound()
        scrambleCount++

        if (scrambleCount > 15) {
          clearInterval(scrambleInterval)
          // Gradually reveal the real name
          let revealIndex = 0
          const revealInterval = setInterval(() => {
            setIdentity(targetName.slice(0, revealIndex + 1) + scrambled.slice(revealIndex + 1))
            playTypingSound()
            revealIndex++
            if (revealIndex >= targetName.length) {
              clearInterval(revealInterval)
              setIdentity(targetName)
              setIsTypingIdentity(false)
              setLoginState("idle")
            }
          }, 100)
        }
      }, 50)
    }, 2400)
  }

  // Handle login attempt
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    if (!identity || !encryptionKey) return

    setLoginState("analyzing")
    setCodeRainSpeed(1.5)

    // Simulate authentication
    setTimeout(() => {
      const isSuccess = encryptionKey.toLowerCase() === "matrix" || encryptionKey.toLowerCase() === "redpill"

      if (isSuccess) {
        // Success state
        setLoginState("success")
        setCodeRainSpeed(5)
        playGlitchSound()

        // Show ACCESS GRANTED with typewriter effect
        const text = "ACCESS GRANTED"
        let index = 0
        const typeInterval = setInterval(() => {
          setShowAccessText(text.slice(0, index + 1))
          playTypingSound()
          index++
          if (index >= text.length) {
            clearInterval(typeInterval)
          }
        }, 100)
      } else {
        // Error state
        setLoginState("error")
        setScreenShake(true)
        setGlitchActive(true)
        playGlitchSound()

        // Show ACCESS DENIED
        setShowAccessText("ACCESS DENIED, HUMAN")

        setTimeout(() => {
          setScreenShake(false)
          setGlitchActive(false)
          setShowAccessText("")
          setLoginState("idle")
          setCodeRainSpeed(1)
          setEncryptionKey("")
        }, 2000)
      }
    }, 1500)
  }

  return (
    <div
      className={`relative min-h-screen bg-black overflow-hidden ${screenShake ? "animate-shake" : ""} ${glitchActive ? "glitch-effect" : ""}`}
    >
      {/* Matrix rain canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Scanline overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none scanlines" />

      {/* CRT flicker effect */}
      <div className="absolute inset-0 z-10 pointer-events-none crt-flicker" />

      {/* System log in corner */}
      <div className="absolute top-4 left-4 z-20 font-mono text-xs text-green-500/50">
        <span className="animate-pulse">{"> "}</span>
        {systemLog}
      </div>

      {/* Main login container */}
      <div className="relative z-20 flex items-center justify-center min-h-screen p-4">
        <div className={`w-full max-w-md ${loginState === "success" ? "success-glow" : ""}`}>
          {/* Terminal header */}
          <div className="mb-8 text-center">
            <h1 className="font-mono text-2xl md:text-3xl text-green-500 mb-2 glitch-text" data-text="SYSTEM ACCESS">
              SYSTEM ACCESS
            </h1>
            <p className="font-mono text-xs text-green-500/60">
              {"["} SECURE TERMINAL v2.049 {"]"}
            </p>
          </div>

          {/* Access text overlay */}
          {showAccessText && (
            <div
              className={`absolute inset-0 flex items-center justify-center z-30 ${loginState === "success" ? "text-green-400" : "text-red-500"}`}
            >
              <span className="font-mono text-4xl md:text-6xl font-bold animate-pulse glitch-text" data-text={showAccessText}>
                {showAccessText}
              </span>
            </div>
          )}

          {/* Login form */}
          <form onSubmit={handleLogin} className={`space-y-6 ${showAccessText ? "opacity-30" : ""}`}>
            {/* Identity field */}
            <div className="space-y-2">
              <label className="font-mono text-sm text-green-500/80 block">
                {">"} IDENTITY_
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={identity}
                  onChange={(e) => setIdentity(e.target.value)}
                  onFocus={handleIdentityFocus}
                  className="w-full bg-transparent border border-green-500/30 text-green-400 font-mono px-4 py-3 focus:outline-none focus:border-green-500 focus:shadow-[0_0_10px_rgba(0,255,0,0.3)] transition-all placeholder:text-green-500/30"
                  placeholder="ENTER IDENTITY..."
                  disabled={isTypingIdentity || loginState === "success"}
                />
                {isTypingIdentity && (
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500 animate-pulse">
                    {showCursor ? "█" : " "}
                  </span>
                )}
              </div>
            </div>

            {/* Encryption Key field */}
            <div className="space-y-2">
              <label className="font-mono text-sm text-green-500/80 block">
                {">"} ENCRYPTION_KEY_
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={encryptionKey}
                  onChange={(e) => {
                    setEncryptionKey(e.target.value)
                    if (!isTypingKey) setIsTypingKey(true)
                    playTypingSound()
                  }}
                  onBlur={() => setIsTypingKey(false)}
                  className="w-full bg-transparent border border-green-500/30 text-green-400 font-mono px-4 py-3 focus:outline-none focus:border-green-500 focus:shadow-[0_0_10px_rgba(0,255,0,0.3)] transition-all placeholder:text-green-500/30"
                  placeholder="ENTER ENCRYPTION KEY..."
                  disabled={loginState === "success"}
                />
                {isTypingKey && (
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500">
                    {showCursor ? "█" : " "}
                  </span>
                )}
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={!identity || !encryptionKey || loginState === "analyzing" || loginState === "success"}
              className="w-full font-mono text-sm border border-green-500/50 text-green-500 py-3 hover:bg-green-500/10 hover:border-green-500 hover:shadow-[0_0_20px_rgba(0,255,0,0.3)] transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:shadow-none"
            >
              {loginState === "analyzing" ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">◌</span>
                  AUTHENTICATING...
                </span>
              ) : (
                "[ INITIALIZE ACCESS ]"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center font-mono text-xs text-green-500/40">
            <p>UNAUTHORIZED ACCESS WILL BE PROSECUTED</p>
            <p className="mt-1">
              {showCursor ? "█" : " "} HINT: The password is {"'matrix'"} or {"'redpill'"}
            </p>
          </div>
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        .scanlines {
          background: repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.1) 0px,
            rgba(0, 0, 0, 0.1) 1px,
            transparent 1px,
            transparent 2px
          );
        }

        .crt-flicker {
          animation: flicker 0.15s infinite;
        }

        @keyframes flicker {
          0% {
            opacity: 0.97;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0.98;
          }
        }

        .glitch-text {
          position: relative;
        }

        .glitch-text::before,
        .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .glitch-text::before {
          animation: glitch-1 0.3s infinite;
          color: #ff0000;
          z-index: -1;
        }

        .glitch-text::after {
          animation: glitch-2 0.3s infinite;
          color: #00ffff;
          z-index: -2;
        }

        @keyframes glitch-1 {
          0%,
          100% {
            clip-path: inset(0 0 0 0);
            transform: translate(0);
          }
          20% {
            clip-path: inset(20% 0 60% 0);
            transform: translate(-2px, 2px);
          }
          40% {
            clip-path: inset(40% 0 40% 0);
            transform: translate(2px, -2px);
          }
          60% {
            clip-path: inset(60% 0 20% 0);
            transform: translate(-2px, 2px);
          }
          80% {
            clip-path: inset(80% 0 0% 0);
            transform: translate(2px, -2px);
          }
        }

        @keyframes glitch-2 {
          0%,
          100% {
            clip-path: inset(0 0 0 0);
            transform: translate(0);
          }
          20% {
            clip-path: inset(60% 0 20% 0);
            transform: translate(2px, -2px);
          }
          40% {
            clip-path: inset(20% 0 60% 0);
            transform: translate(-2px, 2px);
          }
          60% {
            clip-path: inset(80% 0 0% 0);
            transform: translate(2px, -2px);
          }
          80% {
            clip-path: inset(0% 0 80% 0);
            transform: translate(-2px, 2px);
          }
        }

        .glitch-effect {
          animation: screen-glitch 0.2s ease-in-out;
        }

        @keyframes screen-glitch {
          0% {
            transform: translate(0);
            filter: hue-rotate(0deg);
          }
          20% {
            transform: translate(-5px, 5px);
            filter: hue-rotate(90deg);
          }
          40% {
            transform: translate(5px, -5px);
            filter: hue-rotate(180deg);
          }
          60% {
            transform: translate(-5px, -5px);
            filter: hue-rotate(270deg);
          }
          80% {
            transform: translate(5px, 5px);
            filter: hue-rotate(360deg);
          }
          100% {
            transform: translate(0);
            filter: hue-rotate(0deg);
          }
        }

        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }

        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          10%,
          30%,
          50%,
          70%,
          90% {
            transform: translateX(-10px);
          }
          20%,
          40%,
          60%,
          80% {
            transform: translateX(10px);
          }
        }

        .success-glow {
          animation: success-pulse 1s ease-in-out infinite;
        }

        @keyframes success-pulse {
          0%,
          100% {
            filter: drop-shadow(0 0 10px rgba(0, 255, 0, 0.5));
          }
          50% {
            filter: drop-shadow(0 0 30px rgba(0, 255, 0, 0.8));
          }
        }
      `}</style>
    </div>
  )
}
