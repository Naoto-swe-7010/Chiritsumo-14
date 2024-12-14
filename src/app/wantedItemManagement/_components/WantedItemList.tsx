import React from "react";
import { prisma } from "../../../../prisma";
import Row from "./Row";
import { auth } from "../../../../auth";

const WantedItemList = async () => {
  try {
    // セッション情報を取得
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
      console.error("セッション情報が取得できませんでした。");
      return (
        <div className="text-center text-gray-500">
          <p>セッション情報が必要です。</p>
        </div>
      );
    }

    const userId = session.user.id;

    // 欲しい物リストを取得
    const wantedItemList = await prisma.wantedItem.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

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
