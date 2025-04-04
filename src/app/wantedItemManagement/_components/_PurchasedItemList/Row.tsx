import React from 'react';
import Link from 'next/link';
import { WantedItem } from '@prisma/client';

import { Button } from '@/components/ui/button';

export const Row = ({ item }: { item: WantedItem }) => {
  return (
    <article
      className="mb-4 flex items-center justify-between gap-4 rounded border border-gray-500 bg-gray-900 p-4 shadow-xl"
      aria-labelledby={`wanted-item-${item.id}`}
    >
      <div className="flex-1">
        <div>
          <div className="mb-2 flex flex-col items-start gap-1 sm:flex-row sm:items-end sm:gap-3">
            <h3
              id={`wanted-item-${item.id}`}
              className="text-lg font-semibold text-gray-100"
            >
              {item.name}
            </h3>
            <p className="text-sm text-gray-300 sm:text-base">
              ¥{item.price.toLocaleString()}
            </p>
          </div>
          {item.url && (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              詳細を見る
            </a>
          )}
        </div>
      </div>
      <div className="flex flex-col items-end space-y-2">
        <Link
          href={`/wantedItemManagement/edit/${item.id}`}
          aria-label={`Edit ${item.name}`}
        >
          <Button
            aria-label={`Edit ${item.name}`}
            className="bg-pink-500 hover:bg-pink-700"
          >
            編集
          </Button>
        </Link>
        <div className="flex space-x-2">
          <Link
            href={`/wantedItemManagement/cancelPurchased/${item.id}`}
            aria-label={`Cancel Purchase ${item.name}`}
          >
            <Button
              aria-label={`Cancel Purchase ${item.name}`}
              className="bg-blue-500 hover:bg-blue-700"
            >
              購入取消
            </Button>
          </Link>
          <Link
            href={`/wantedItemManagement/delete/${item.id}`}
            aria-label={`Delete ${item.name}`}
          >
            <Button
              aria-label={`Delete ${item.name}`}
              className="bg-gray-500 hover:bg-gray-700"
            >
              削除
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
};
