"use client"
import Modal from '@/app/_components/Modal'
import confetti from 'canvas-confetti';
import Link from 'next/link';
import React, { useEffect } from 'react'
import { FaCheckCircle } from 'react-icons/fa';

const page = () => {

    useEffect(() => {
        // 紙吹雪エフェクト
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#e7ff30", "#ffffff", "#a2a70b", "#000000"],
        });
    }, []);

  return (
    <Modal>
      <div className="text-center">
        <FaCheckCircle className="mx-auto text-green-500 text-6xl mb-4" />
        <h2 className="text-2xl font-bold text-white sm:text-3xl">残高を消費しました！</h2>
        <p className="text-gray-300 mt-2">
          他のアイテムの購入を目指して、引き続き無駄づかいを我慢しましょう！
        </p>
        
        <div className="mt-6">
          <Link href={'/main'}>
          <button
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600"
            >
            ホームに戻る
          </button>
            </Link>
        </div>
      </div>
    </Modal>
  )
}

export default page