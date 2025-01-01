import Modal from '@/app/_components/Modal'
import { getSession } from '@/app/lib/commonFunction'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'
import { FaCheckCircle } from 'react-icons/fa'
import Confetti from '../_components/Confetti'

const PostPurchase = async () => {
  // 認証チェック
  const session = await getSession()
  if (!session) {
    redirect('/')
  }

  return (
    <Modal>
      <div className="text-center">
        <FaCheckCircle className="mx-auto text-green-500 text-6xl mb-4" />
        <h2 className="text-2xl font-bold text-white sm:text-3xl">
          残高を消費しました！
        </h2>
        <p className="text-gray-300 mt-2">
          他のアイテムの購入を目指して、引き続き無駄づかいを我慢しましょう！
        </p>

        <div className="mt-6">
          <Link href={'/main'}>
            <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600">
              ホームに戻る
            </button>
          </Link>
        </div>
      </div>
      {/* 紙吹雪エフェクト */}
      <Confetti />
    </Modal>
  )
}

export default PostPurchase
