import React, { Suspense } from "react";
import List from "./List";
import SkeletonList from "./SkeletonList";

const WantedItemList = async () => {
  return (
    <div>
      <h2 className="mb-4 pl-1 text-xl font-bold text-gray-100 sm:text-2xl">
        欲しい物リスト
      </h2>
      <Suspense fallback={<SkeletonList />}>
        <List />
      </Suspense>
    </div>
  );
};

export default WantedItemList;
