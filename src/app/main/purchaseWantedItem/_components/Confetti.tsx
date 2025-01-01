'use client'
import confetti from 'canvas-confetti'
import { useEffect } from 'react'

const Confetti = () => {
  useEffect(() => {
    // 紙吹雪エフェクト
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#e7ff30', '#ffffff', '#a2a70b', '#000000'],
    })
  }, [])
  return null
}

export default Confetti
