import React from "react";
import { prisma } from "../../../../prisma";
import Row from "./Row";

const WantedItemList = async () => {
  const wantedItemList = await prisma.wantedItem.findMany({
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
};

export default WantedItemList;
