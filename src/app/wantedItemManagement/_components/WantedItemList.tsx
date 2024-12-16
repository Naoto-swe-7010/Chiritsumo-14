import React from "react";

import { prisma } from "../../../../prisma";
import Row from "./Row";
import {
  getSessionAndUserId,
  getWantedItemList,
} from "@/app/lib/commonFunction";

const WantedItemList = async () => {
  try {
    // UserIDを取得
    const userId = await getSessionAndUserId();
    // 欲しい物リストを取得
    const wantedItemList = await getWantedItemList(userId);

    return (
      <div>
        <h2 className="mb-4 pl-1 text-xl font-bold text-gray-100 sm:text-2xl">
          欲しい物リスト
        </h2>

        <div>
          {wantedItemList && wantedItemList.length > 0 ? (
            wantedItemList.map((item) => <Row key={item.id} item={item} />)
          ) : (
            <div className="text-center text-gray-500">
              <p>欲しい物リストが空です。新しいアイテムを追加してください。</p>
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error("WantedItemListの取得中にエラーが発生しました:", error);
    return (
      <div className="text-center text-red-500">
        <p>エラーが発生しました。再度お試しください。</p>
      </div>
    );
  }
};

export default WantedItemList;
