import React from "react";
import { Balance, WantedItem } from "@prisma/client";

// 欲しいものリストの各アイテムの値段に対する残高の進捗をプログレスバーで可視化
const ProgressBar = ({
  item,
  balance,
}: {
  item: WantedItem;
  balance: Balance;
}) => {
  return (
    <div className="mt-2 flex items-center gap-2">
      <progress
        max="1"
        value={balance!.balance / item.price}
        className="w-full"
      ></progress>
      <p className="text-sm sm:text-base">
        {Math.min(Math.round((balance!.balance / item.price) * 100), 100)}%
      </p>
    </div>
  );
};

export default ProgressBar;
