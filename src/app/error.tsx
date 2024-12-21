"use client";
import React from "react";
import { useRouter } from "next/navigation";

const ErrorPage = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b text-white">
      {/* エラーメッセージ */}
      <h1 className="text-5xl font-bold mb-6">エラーが発生しました</h1>
      <p className="text-lg mb-8">
        予期しない問題が発生しました。もう一度操作をお試しください。
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
      </div>
    </div>
  );
};

export default ErrorPage;