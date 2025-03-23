import React from 'react';
import { redirect } from 'next/navigation';

import { getSession } from '../lib/commonFunction';
import { AddBalance } from './_components/_AddBalance/AddBalance';
import { AIAdvice } from './_components/_AIAdvice/AIAdvice';
import { BalanceDisplay } from './_components/_BalanceDisplay/BalanceDisplay';
import { BalanceProgress } from './_components/_BalanceProgress/BalanceProgress';

const page = async () => {
  // 認証チェック
  const session = await getSession();
  if (!session) {
    redirect('/');
  }

  return (
    <div className="mb-20 mt-[64px] min-h-[calc(100vh-64px)]">
      <BalanceDisplay />
      <AddBalance />
      <AIAdvice />
      <BalanceProgress />
    </div>
  );
};

export default page;
