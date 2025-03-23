import React, { Suspense } from 'react';

import { List } from './List';
import { SkeletonList } from './SkeletonList';

export const WantedItemList = () => {
  return (
    <div>
      <h1 className="mb-4 pl-1 text-xl font-bold text-gray-100 sm:text-2xl">
        欲しい物リスト
      </h1>
      <Suspense fallback={<SkeletonList />}>
        <List />
      </Suspense>
    </div>
  );
};
