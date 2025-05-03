import React from 'react';
import Link from 'next/link';
import { WantedItem } from '@prisma/client';

import { getBalance, getSessionAndUserId } from '@/app/lib/commonFunction';
import { Button } from '@/components/ui/button';
import { FavoriteButton } from './FavoriteButton';

export const Row = async ({ item }: { item: WantedItem }) => {
  // UserID取得
  const userId = await getSessionAndUserId();
  // 残高情報取得
  const balance = await getBalance(userId);

  return (
    <article
      className="mb-4 flex items-center justify-between gap-4 rounded bg-gray-100 p-4 shadow-lg"
      aria-labelledby={`wanted-item-${item.id}`}
    >
      <div className="flex-1">
        <div>
          <div className="mb-2 flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:gap-3">
            <div className="flex items-center gap-2">
              <div className="mt-[2px] flex items-center">
                <FavoriteButton item={item} />
              </div>
              <h3
                id={`wanted-item-${item.id}`}
                className="text-lg font-semibold"
              >
                {item.name}
              </h3>
            </div>
            <p className="text-sm text-gray-600 sm:text-base">
              ¥{item.price.toLocaleString()}{' '}
              <span className="text-xs text-gray-500">
                （残り
                {Math.max(0, item.price - balance.balance).toLocaleString()}
                円）
              </span>
            </p>
          </div>
          {item.url && (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-600 underline"
            >
              詳細を見る
            </a>
          )}
        </div>
      </div>
      <div className="flex flex-col items-end space-y-2">
        <div className="flex space-x-2">
          {/* 値段に対する残高の進捗が100％以上の時のみ、購入ボタンを表示 */}
          {balance.balance / item.price >= 1 && (
            <Link
              href={`/main/purchaseWantedItem/${item.id}`}
              aria-label={`Cancel Purchase ${item.name}`}
            >
              <Button
                aria-label={`Cancel Purchase ${item.name}`}
                className="bg-cyan-500 font-bold hover:bg-cyan-700"
              >
                購入
              </Button>
            </Link>
          )}
          <Link
            href={`/wantedItemManagement/edit/${item.id}`}
            aria-label={`Edit ${item.name}`}
          >
            <Button
              aria-label={`Edit ${item.name}`}
              className="bg-green-500 font-bold hover:bg-green-700"
            >
              編集
            </Button>
          </Link>
        </div>
        <Link
          href={`/wantedItemManagement/delete/${item.id}`}
          aria-label={`Delete ${item.name}`}
        >
          <Button
            aria-label={`Delete ${item.name}`}
            className="bg-gray-500 font-bold hover:bg-gray-700"
          >
            削除
          </Button>
        </Link>
      </div>
    </article>
  );
};
