import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { FaCheckCircle } from 'react-icons/fa';

import { Modal } from '@/app/_components/Modal';
import { getSession } from '@/app/lib/commonFunction';
import { Confetti } from './Confetti';

export const PostPurchase = async () => {
  // 認証チェック
  const session = await getSession();
  if (!session) {
    redirect('/');
  }

  return (
    <Modal>
      <div className="text-center">
        <FaCheckCircle className="mx-auto mb-4 text-6xl text-green-500" />
        <h2 className="text-2xl font-bold text-gray-700 sm:text-3xl">
          残高を消費しました！
        </h2>
        <p className="mt-2 text-gray-600">
          他のアイテムの購入を目指して、引き続き無駄づかいを我慢しましょう！
        </p>

        <div className="mt-6">
          <Link href={'/main'}>
            <button className="rounded bg-cyan-500 px-4 py-2 font-semibold text-white hover:bg-cyan-600">
              ホームに戻る
            </button>
          </Link>
        </div>
      </div>
      {/* 紙吹雪エフェクト */}
      <Confetti />
    </Modal>
  );
};
