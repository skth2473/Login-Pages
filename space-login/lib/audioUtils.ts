let audioContext: AudioContext | null = null

const getAudioContext = (): AudioContext => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
  }
  return audioContext
}

export const playHoverSound = () => {
  try {
    const ctx = getAudioContext()

    // Resume context if needed (browser autoplay policy)
    if (ctx.state === 'suspended') {
      ctx.resume()
    }

    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.frequency.value = 800
    osc.type = 'sine'

    gain.gain.setValueAtTime(0.1, now)
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05)

    osc.start(now)
    osc.stop(now + 0.05)
  } catch (e) {
    console.error('Audio error:', e)
  }
}

export const playWarpSound = () => {
  try {
    const ctx = getAudioContext()

    if (ctx.state === 'suspended') {
      ctx.resume()
    }

    const now = ctx.currentTime
    const duration = 0.6

    // White noise
    const bufferSize = ctx.sampleRate * duration
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)

    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1
    }

    const noise = ctx.createBufferSource()
    noise.buffer = buffer

    // Filter for sweep effect
    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(4000, now)
    filter.frequency.exponentialRampToValueAtTime(200, now + duration)

    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.3, now)
    gain.gain.exponentialRampToValueAtTime(0.01, now + duration)

    noise.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)

    noise.start(now)
    noise.stop(now + duration)

    // Pitch drop for hyperspace effect
    const osc = ctx.createOscillator()
    const oscGain = ctx.createGain()

    osc.connect(oscGain)
    oscGain.connect(ctx.destination)

    osc.frequency.setValueAtTime(200, now)
    osc.frequency.exponentialRampToValueAtTime(50, now + duration)

    oscGain.gain.setValueAtTime(0.1, now)
    oscGain.gain.exponentialRampToValueAtTime(0.01, now + duration)

    osc.start(now)
    osc.stop(now + duration)
  } catch (e) {
    console.error('Audio error:', e)
  }
}

export const startAmbientDrone = () => {
  try {
    const ctx = getAudioContext()

    if (ctx.state === 'suspended') {
      ctx.resume()
    }

    const now = ctx.currentTime

    // Two oscillators for beating effect
    const osc1 = ctx.createOscillator()
    const osc2 = ctx.createOscillator()
    const gain = ctx.createGain()

    osc1.frequency.value = 50
    osc2.frequency.value = 52

    osc1.type = 'sine'
    osc2.type = 'sine'

    gain.gain.setValueAtTime(0, now)
    gain.gain.linearRampToValueAtTime(0.05, now + 2)

    osc1.connect(gain)
    osc2.connect(gain)
    gain.connect(ctx.destination)

    osc1.start(now)
    osc2.start(now)

    // Stop after 30 seconds to save resources
    osc1.stop(now + 30)
    osc2.stop(now + 30)
  } catch (e) {
    console.error('Audio error:', e)
  }
}
