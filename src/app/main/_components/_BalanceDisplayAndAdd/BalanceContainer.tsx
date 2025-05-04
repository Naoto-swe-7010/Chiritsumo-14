import React from 'react';

import { getBalance, getSessionAndUserId } from '@/app/lib/commonFunction';
import { BalanceDisplayAndAdd } from './BalanceDisplayAndAdd';

export const BalanceContainer = async () => {
  try {
    const userId = await getSessionAndUserId();
    const balance = await getBalance(userId);
    return <BalanceDisplayAndAdd balance={balance.balance} />;
  } catch {
    throw new Error('残高の取得中にエラーが発生しました。');
  }
};
