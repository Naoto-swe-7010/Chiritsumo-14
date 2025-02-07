import React from 'react'
import Link from 'next/link'
import { WantedItem } from '@prisma/client'
import { Button } from '@/components/ui/button'

import { getBalance, getSessionAndUserId } from '@/app/lib/commonFunction'
import ProgressBar from './ProgressBar'

const BalanceProgressItem = async ({ item }: { item: WantedItem }) => {
  try {
    // UserID取得
    const userId = await getSessionAndUserId()
    // 残高情報取得
    const balance = await getBalance(userId)

    if (!balance) {
      console.error('残高情報が取得できませんでした。')
      return (
        <div className="text-center text-gray-500">
          <p>残高情報がありません。</p>
        </div>
      )
    }

    return (
      <article
        key={item.id}
        className="mb-4 rounded border border-gray-500 bg-gray-900 p-4 shadow-xl">
        <div>
          <div className="flex justify-between">
            <div>
              <div className="flex items-end gap-2 sm:gap-3">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500 sm:text-base">
                  Price: ¥{item.price.toLocaleString()}{' '}
                  <span className="text-xs">
                    (あと
                    {(item.price - balance!.balance).toLocaleString()}円)
                  </span>
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
            <div>
              {/* 値段に対する残高の進捗が100％以上の時のみ、購入ボタンを表示 */}
              {balance.balance / item.price >= 1 && (
                <Link href={`/main/purchaseWantedItem/${item.id}`}>
                  <Button className="bg-pink-500 hover:bg-pink-700">
                    購入
                  </Button>
                </Link>
              )}
            </div>
          </div>
          <ProgressBar item={item} balance={balance} />
        </div>
      </article>
    )
  } catch (error) {
    console.error(
      'BalanceProgressItemの処理中にエラーが発生しました:',
      error,
    )
    return (
      <div className="text-center text-red-500">
        <p>エラーが発生しました。再度お試しください。</p>
      </div>
    )
  }
}

export default BalanceProgressItem
