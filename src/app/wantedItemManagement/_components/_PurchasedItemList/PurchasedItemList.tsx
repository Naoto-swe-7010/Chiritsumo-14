import React, { Suspense } from 'react';

import { SkeletonList } from '../SkeletonList';
import { List } from './List';

export const PurchasedItemList = () => {
  return (
    <div>
      <h1 className="mb-4 pl-1 text-xl font-bold text-gray-100 sm:text-2xl">
        購入済みリスト
      </h1>
      <Suspense fallback={<SkeletonList />}>
        <List />
      </Suspense>
    </div>
  );
};
