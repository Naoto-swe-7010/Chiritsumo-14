'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const Error = () => {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b text-gray-600">
      {/* エラーメッセージ */}
      <h1 className="mb-6 text-5xl font-bold">エラーが発生しました</h1>
      <p className="mb-8 text-lg">
        予期しない問題が発生しました。もう一度操作をお試しください。
      </p>
      {/* ボタン群 */}
      <div className="flex flex-col gap-4 sm:flex-row">
        {/* ホームページに戻るボタン */}
        <button
          onClick={() => {
            router.push('/');
          }}
          className="rounded-lg bg-cyan-500 px-6 py-3 font-bold text-white transition duration-300 hover:bg-cyan-700"
        >
          ホームに戻る
        </button>
      </div>
    </div>
  );
};

export default Error;
