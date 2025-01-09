import React from 'react'
import { getBalance, getSessionAndUserId } from '@/app/lib/commonFunction'

const Balance = async () => {
  try {
    // UserID取得
    const userId = await getSessionAndUserId()
    // 残高取得
    const balance = await getBalance(userId)

    // 取得した残高を表示
    return <h1 aria-label="balance">{balance.balance}</h1>
  } catch {
    console.error(
      'Balanceテーブルの取得または作成中にエラーが発生しました:',
    )
  }
}
export default Balance
