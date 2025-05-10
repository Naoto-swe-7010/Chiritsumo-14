import React from 'react';

import { getBalance, getSessionAndUserId } from '@/app/lib/commonFunction';
import { BalanceDisplayAndAdd } from './BalanceDisplayAndAdd';

export const BalanceContainer = async () => {
  try {
    // ユーザーID取得
    const userId = await getSessionAndUserId();
    // 残高取得
    const balance = await getBalance(userId);
    return <BalanceDisplayAndAdd balance={balance.balance} />;
  } catch {
    throw new Error('残高の取得中にエラーが発生しました。');
  }
};
