import React from 'react';

import {
  getSessionAndUserId,
  getWantedItemList
} from '@/app/lib/commonFunction';
import { Row } from './Row';

export const List = async () => {
  try {
    // UserIDを取得
    const userId = await getSessionAndUserId();
    // 欲しい物リストを取得
    const wantedItemList = await getWantedItemList(userId);

    return (
      <div>
        <div>
          {wantedItemList.length > 0 ? (
            wantedItemList.map((item) => <Row key={item.id} item={item} />)
          ) : (
            <div className="text-center text-gray-500">
              <p>欲しい物リストが空です。新しいアイテムを追加してください。</p>
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
