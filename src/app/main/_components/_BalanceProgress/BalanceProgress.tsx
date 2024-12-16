import React, { Suspense } from "react";

import {
  getSessionAndUserId,
  getWantedItemList,
} from "@/app/lib/commonFunction";
import BalanceProgressItem from "./BalanceProgressItem";
import Loading from "@/app/_components/Loading";

const BalanceProgress = async () => {
  try {
    // UserID取得
    const userId = await getSessionAndUserId();
    // 欲しい物リスト取得
    const wantedItemList = await getWantedItemList(userId);

    return (
      <div className="flex justify-center p-4 sm:p-6">
        <div className="w-full max-w-2xl">
          <h2 className="mb-4 mt-12 text-center text-xl font-bold sm:text-2xl">
            <span className="border-b-2 border-pink-500">
              欲しい物リスト進捗
            </span>
          </h2>
          <Suspense fallback={<Loading />}>
            {wantedItemList && wantedItemList.length > 0 ? (
              wantedItemList.map((item) => (
                <BalanceProgressItem key={item.id} item={item} />
              ))
            ) : (
              <div className="text-center text-gray-500">
                <p>欲しい物リストが空です。</p>
                <p>欲しい物ページからアイテムを追加してください。</p>
              </div>
            )}
          </Suspense>
        </div>
      </div>
    );
  } catch (error) {
    console.error("欲しい物リストの取得中にエラーが発生しました:", error);
    return (
      <div className="text-center text-red-500">
        <p>エラーが発生しました。再度お試しください。</p>
      </div>
    );
  }
};

export default BalanceProgress;
