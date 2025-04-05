import React, { Suspense } from 'react';
import { FaStar } from 'react-icons/fa';

import { SkeletonList } from '../SkeletonList';
import { List } from './List';

export const WantedItemList = () => {
  return (
    <div>
      <h1 className="mb-4 flex items-center pl-1 text-xl font-bold text-gray-100 sm:text-2xl">
        欲しい物リスト
        <span className="ml-4 flex items-center text-sm text-gray-400">
          <FaStar className="text-md mr-1 text-yellow-500" />
          ホームに表示
        </span>
      </h1>
      <Suspense fallback={<SkeletonList />}>
        <List />
      </Suspense>
    </div>
  );
};
