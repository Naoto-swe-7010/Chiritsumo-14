import React from 'react'

import BalanceDisplay from './_components/_BalanceDisplay/BalanceDisplay'
import AddBalance from './_components/_AddBalance/AddBalance'
import BalanceProgress from './_components/_BalanceProgress/BalanceProgress'
import { getSession } from '../lib/commonFunction'
import { redirect } from 'next/navigation'
import AIAdvice from './_components/_AIAdvice/AIAdvice'
const page = async () => {
  // 認証チェック
  const session = await getSession()
  if (!session) {
    redirect('/')
  }

  return (
    <div className="mb-20 mt-[64px] min-h-[calc(100vh-64px)]">
      <BalanceDisplay />
      <AddBalance />
      <AIAdvice />
      <BalanceProgress />
    </div>
  )
}

export default page
