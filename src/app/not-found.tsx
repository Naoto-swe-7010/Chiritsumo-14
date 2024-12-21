"use client";
import React from "react";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b  text-white">
      {/* メッセージ */}
      <h1 className="text-5xl font-bold mb-6">ページが見つかりません</h1>
      <p className="text-lg mb-8">
        お探しのページが存在しないか、移動した可能性があります。
      </p>

      {/* ボタン群 */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* ホームページに戻るボタン */}
        <button
          onClick={() => router.push("/")}
          className="px-6 py-3 bg-blue-500 rounded-lg font-bold hover:bg-blue-700 transition duration-300"
        >
          ホームに戻る
        </button>

        {/* 前のページに戻るボタン */}
        <button
          onClick={() => router.back()}
          className="px-6 py-3 bg-gray-500 rounded-lg font-bold hover:bg-gray-700 transition duration-300"
        >
          前のページに戻る
        </button>
      </div>
    </div>
  );
};

export default NotFound;