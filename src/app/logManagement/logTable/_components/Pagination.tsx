import React from 'react';

import { getSessionAndUserId } from '@/app/lib/commonFunction';
import { prisma } from '../../../../../prisma';
import { PaginationUI } from './PaginationUI';

// 1ページあたりの表示件数
const pageSize = 10;

export const Pagination = async ({ page }: { page: string }) => {
  // UserIDを取得
  const userId = await getSessionAndUserId();
  // ユーザーのログの総数と１ページあたりの表示件数から総ページ数を計算（ページネーション用）
  const totalLogs = await prisma.log.count({
    where: { userId }
  });
  const totalPages = Math.ceil(totalLogs / pageSize);

  return <PaginationUI totalPages={totalPages} page={page} />;
};
