"use client";
import React from "react";
import { signOut } from "next-auth/react";

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b  text-white">
      {/* エラーメッセージ */}
      <h1 className="text-5xl font-bold mb-6">エラーが発生しました</h1>
      <p className="text-lg mb-8">
        予期しない問題が発生しました。ログインし直してください。
      </p>

      {/* ボタン群 */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* メインページに戻るボタン */}
        <button
          onClick={() => signOut()}
          className="px-6 py-3 bg-pink-500 rounded-lg font-bold hover:bg-pink-700 transition duration-300"
        >
          ログイン画面に戻る
        </button>
      </div>
    </div>
  );
};

export default Error;
