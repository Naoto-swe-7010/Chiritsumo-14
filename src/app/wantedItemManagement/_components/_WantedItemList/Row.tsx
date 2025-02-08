import React from 'react'
import Link from 'next/link'
import { WantedItem } from '@prisma/client'
import { Button } from '@/components/ui/button'

const Row = ({ item }: { item: WantedItem }) => {
  return (
    <article
      className="mb-4 flex items-center justify-between gap-4 rounded border border-gray-500 bg-gray-900 p-4 shadow-xl"
      aria-labelledby={`wanted-item-${item.id}`}>
      <div className="flex-1">
        <div>
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-1 sm:gap-3 mb-2">
            <h3
              id={`wanted-item-${item.id}`}
              className="text-lg font-semibold text-gray-100">
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
              className="text-blue-500 underline">
              詳細を見る
            </a>
          )}
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <Link
          href={`/wantedItemManagement/edit/${item.id}`}
          aria-label={`Edit ${item.name}`}>
          <Button
            aria-label={`Edit ${item.name}`}
            className="bg-pink-500 hover:bg-pink-700">
            ✏️
          </Button>
        </Link>
        <Link
          href={`/wantedItemManagement/delete/${item.id}`}
          aria-label={`Delete ${item.name}`}>
          <Button
            aria-label={`Delete ${item.name}`}
            className="bg-gray-300 hover:bg-gray-400">
            🗑️
          </Button>
        </Link>
      </div>
    </article>
  )
}

export default Row
