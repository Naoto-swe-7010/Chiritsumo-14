import React, { Suspense } from 'react';
import { redirect } from 'next/navigation';

import { getSessionAndUserId, preloadForMainPage } from '../lib/commonFunction';
import { AIAdvice } from './_components/_AIAdvice/AIAdvice';
import { BalanceContainer } from './_components/_BalanceDisplayAndAdd/BalanceContainer';
import { BalanceProgress } from './_components/_BalanceProgress/BalanceProgress';
import { SkeletonProgressItem } from './_components/_BalanceProgress/SkeletonProgressItem';

const page = async () => {
  // 認証チェック＋ユーザーIDのpreload
  const userId = await getSessionAndUserId();
  if (!userId) {
    redirect('/signIn');
  }
  // preload
  await preloadForMainPage(userId);

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
