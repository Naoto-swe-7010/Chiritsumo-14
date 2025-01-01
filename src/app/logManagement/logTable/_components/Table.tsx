import React from 'react'

import Row from './Row'
import { getLog, getSessionAndUserId } from '@/app/lib/commonFunction'

// 1ページあたりの表示件数
const pageSize = 10

const Table = async ({ page }: { page: string }) => {
  const pageNumber = parseInt(page, 10) || 1 // デフォルトで1ページ目

  // UserIDを取得
  const userId = await getSessionAndUserId()
  // ログを取得（ページ数に応じてスキップ件数を設定）
  const logs = await getLog(userId, pageNumber, pageSize)

  return (
    <section aria-label="ログ一覧">
      {logs && logs.length > 0 ?
        <div>
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="bg-black bg-opacity-50">
                <th className="w-3/5 p-2 font-semibold text-gray-200 sm:w-1/2">
                  タイトル
                </th>
                <th className="w-1/6 p-2 font-semibold text-gray-200">
                  値段
                </th>
                <th className="w-1/5 p-2 font-semibold text-gray-200">
                  日時
                </th>
                <th className="w-1/6 p-2 font-semibold text-gray-200">
                  アクション
                </th>
              </tr>
            </thead>
            <tbody>
              {logs.map(log => (
                <Row key={log.id} log={log} />
              ))}
            </tbody>
          </table>
        </div>
      : <p className="text-center text-gray-500">ログがありません。</p>}
    </section>
  )
}

export default Table
