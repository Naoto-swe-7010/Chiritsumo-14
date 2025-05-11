import React, { Suspense } from 'react';
import { redirect } from 'next/navigation';

import { getSession } from '../lib/commonFunction';
import { AIAdvice } from './_components/_AIAdvice/AIAdvice';
import { BalanceContainer } from './_components/_BalanceDisplayAndAdd/BalanceContainer';
import { BalanceProgress } from './_components/_BalanceProgress/BalanceProgress';
import { SkeletonProgressItem } from './_components/_BalanceProgress/SkeletonProgressItem';

const page = async () => {
  // 認証チェック
  const session = await getSession();
  if (!session) {
    redirect('/signIn');
  }

  return (
    <div>
      <BalanceContainer />
      <AIAdvice />
      <Suspense fallback={<SkeletonProgressItem />}>
        <BalanceProgress />
      </Suspense>
    </div>
  );
};

export default page;
