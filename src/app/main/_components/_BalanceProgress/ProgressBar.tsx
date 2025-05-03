import React from 'react';
import { Balance, WantedItem } from '@prisma/client';

// 欲しい物リストの各アイテムの値段に対する残高の進捗をプログレスバーで可視化
export const ProgressBar = ({
  item,
  balance
}: {
  item: WantedItem;
  balance: Balance;
}) => {
  const progress = Math.max(
    0,
    Math.min((balance.balance / item.price) * 100, 100)
  );
  return (
    <div className="mt-2 flex items-center gap-2">
      <div className="relative h-2 w-full rounded bg-gray-300">
        <div
          className={`absolute left-0 top-0 h-2 rounded bg-green-400`}
          style={{ width: `${progress.toString()}%` }}
        ></div>
      </div>
      <p className="text-xs sm:text-base">
        {Math.max(
          0,
          Math.min(Math.round((balance.balance / item.price) * 100), 100)
        )}
        %{/* あと{item.price - balance!.balance}円 */}
      </p>
    </div>
  );
};
