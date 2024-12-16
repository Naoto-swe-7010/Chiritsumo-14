import React, { Suspense } from "react";

import Table from "../_components/Table";
import Pagination from "../_components/Pagination";
import { SkeletonTable } from "../_components/SkeletonTable";

const page = async ({ params }: { params: Promise<{ page: string }> }) => {
  // ページ番号を取得
  const { page } = await params;

  return (
    <div>
      <div className="mb-20 mt-[64px] min-h-[calc(100vh-64px)] pb-10 pt-8">
        <div>
          <h1 className="mb-4 pl-1 text-xl font-bold text-gray-100 sm:text-2xl">
            ログ
          </h1>
          <Suspense fallback={<SkeletonTable />}>
            <Table page={page} />
          </Suspense>
          <Suspense fallback={""}>
            <Pagination page={page} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default page;
