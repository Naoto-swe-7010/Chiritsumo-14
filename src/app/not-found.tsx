'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const NotFound = () => {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b text-white">
      {/* メッセージ */}
      <h1 className="mb-6 text-5xl font-bold">ページが見つかりません</h1>
      <p className="mb-8 text-lg">
        お探しのページが存在しないか、移動した可能性があります。
      </p>

      {/* ボタン群 */}
      <div className="flex flex-col gap-4 sm:flex-row">
        {/* ホームページに戻るボタン */}
        <button
          onClick={() => {
            router.push('/');
          }}
          className="rounded-lg bg-blue-500 px-6 py-3 font-bold transition duration-300 hover:bg-blue-700"
        >
          ホームに戻る
        </button>

        {/* 前のページに戻るボタン */}
        <button
          onClick={() => {
            router.back();
          }}
          className="rounded-lg bg-gray-500 px-6 py-3 font-bold transition duration-300 hover:bg-gray-700"
        >
          前のページに戻る
        </button>
      </div>
    </div>
  );
};

export default NotFound;
