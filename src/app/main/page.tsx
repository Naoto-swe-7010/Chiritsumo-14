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
    <div>
      <BalanceDisplay />
      <AddBalance />
      <AIAdvice />
      <BalanceProgress />
    </div>
  );
};

export default page;
