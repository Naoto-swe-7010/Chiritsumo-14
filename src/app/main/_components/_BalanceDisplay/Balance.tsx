import React from 'react';

import { getBalance, getSessionAndUserId } from '@/app/lib/commonFunction';

export const Balance = async () => {
  try {
    // UserID取得
    const userId = await getSessionAndUserId();
    // 残高取得
    const balance = await getBalance(userId);

    // 取得した残高を表示
    return <h1 aria-label="balance">{balance.balance.toLocaleString()}</h1>;
  } catch {
    throw new Error('残高の取得中にエラーが発生しました。');
  }
};
