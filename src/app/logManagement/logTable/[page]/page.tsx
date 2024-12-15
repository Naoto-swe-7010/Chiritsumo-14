import React, { Suspense } from "react";

import { getSessionAndUserId } from "@/app/lib/commonFunction";
import { prisma } from "../../../../../prisma";
import Row from "../_components/Row";
import Pagination from "../_components/Pagination";
import RowSkeleton from "../_components/RowSkeleton";

const page = async ({ params }: { params: Promise<{ page: string }> }) => {
  // ページ番号を取得し、数値に変換
  const { page } = await params;
  const pageNumber = parseInt(page, 10) || 1; // デフォルトで1ページ目

  // 1ページあたりの表示件数
  const pageSize = 10;

  try {
    // UserIDを取得
    const userId = await getSessionAndUserId();

    // ユーザーのログの総数と１ページあたりの表示件数から総ページ数を計算（ページネーション用）
    const totalLogs = await prisma.log.count({
      where: { userId },
    });
    const totalPages = Math.ceil(totalLogs / pageSize);

    // ログを取得（ページ数に応じてスキップ件数を設定）
    const logs = await prisma.log.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
    });

    return (
      <div>
        <div className="mb-20 mt-[64px] min-h-[calc(100vh-64px)] pb-10 pt-8">
          <div>
            <h1 className="mb-4 pl-1 text-xl font-bold text-gray-100 sm:text-2xl">
              ログ
            </h1>
            {logs && logs.length > 0 ? (
              <div>
                <table className="w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="bg-black bg-opacity-50">
                      {/* タイトル行の幅を広く */}
                      <th className="w-3/5 p-2 font-semibold text-gray-200 sm:w-1/2">
                        タイトル
                      </th>
                      <th className="w-1/6 p-2 font-semibold text-gray-200">
                        値段
                      </th>
                      <th className="w-1/5 p-2 font-semibold text-gray-200">
                        日時
                      </th>
                      <th className="w-1/6 p-2 font-semibold text-gray-200">
                        アクション
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <Suspense fallback={<RowSkeleton />}>
                      {logs.map((log) => (
                        <Row key={log.id} log={log} />
                      ))}
                    </Suspense>
                  </tbody>
                </table>
                <Pagination totalPages={totalPages} page={page} />
              </div>
            ) : (
              <p className="text-center text-gray-500">ログがありません。</p>
            )}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("LogTableの取得中にエラーが発生しました:", error);
    return (
      <p className="text-center text-red-500">
        エラーが発生しました。再度お試しください。
      </p>
    );
  }
};

export default page;
