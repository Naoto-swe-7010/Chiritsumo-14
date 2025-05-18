import React from 'react';

import {
  getPurchasedItemList,
  getSessionAndUserId
} from '@/app/lib/commonFunction';
import { Row } from './Row';

export const List = async () => {
  try {
    // UserIDを取得
    const userId = await getSessionAndUserId();
    // 欲しい物リストを取得
    const purchaseItemList = await getPurchasedItemList(userId);

    return (
      <div>
        <div>
          {purchaseItemList.length > 0 ? (
            purchaseItemList.map((item) => <Row key={item.id} item={item} />)
          ) : (
            <div className="text-center text-gray-500">
              <p>購入済みのアイテムはありません。</p>
            </div>
          )}
        </div>
      </div>
    );
  } catch {
    return (
      <div className="text-center text-red-500">
        <p>エラーが発生しました。再度お試しください。</p>
      </div>
    );
  }
};
