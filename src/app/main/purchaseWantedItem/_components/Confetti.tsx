'use client';

import { useEffect } from 'react';
import confetti from 'canvas-confetti';

export const Confetti = () => {
  useEffect(() => {
    // 紙吹雪エフェクト
    void confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#e7ff30', '#ffffff', '#a2a70b', '#000000']
    });
  }, []);
  return null;
};
