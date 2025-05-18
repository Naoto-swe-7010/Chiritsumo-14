import React, { Suspense } from 'react';
import { redirect } from 'next/navigation';

import { getSessionAndUserId } from '@/app/lib/commonFunction';
import { Pagination } from '../_components/Pagination';
import { SkeletonTable } from '../_components/SkeletonTable';
import { Table } from '../_components/Table';

const page = async ({ params }: { params: Promise<{ page: string }> }) => {
  // 認証チェック＋ユーザーIDのpreload
  const userId = await getSessionAndUserId();
  if (!userId) {
    redirect('/signIn');
  }
  // パラメータからページ番号を取得
  const { page } = await params;

  return (
    <div>
      <h1 className="mb-4 pl-1 text-xl font-bold text-gray-600 sm:text-2xl">
        ログ
      </h1>
      <Suspense fallback={<SkeletonTable />}>
        <Table page={page} />
      </Suspense>
      <Suspense fallback={''}>
        <Pagination page={page} />
      </Suspense>
    </div>
  );
};

export default page;
