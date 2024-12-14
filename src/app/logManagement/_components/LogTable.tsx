import React, { Suspense } from "react";
import Row from "./Row";
import { prisma } from "../../../../prisma";
import RowSkeleton from "./RowSkeleton";
import { auth } from "../../../../auth";

const LogTable = async () => {
  const session = await auth();
  const userId = session!.user!.id;
  if (!session?.user) return null;

  // ログ取得
  const logs = await prisma.log.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
  return (
    <div className="overflow-x-auto">
      {logs.length > 0 ? (
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="bg-black bg-opacity-50">
              {/* タイトル行の幅を広く */}
              <th className="w-3/5 p-2 font-semibold text-gray-200 sm:w-1/2">
                タイトル
              </th>
              <th className="w-1/6 p-2 font-semibold text-gray-200">値段</th>
              <th className="w-1/5 p-2 font-semibold text-gray-200">日時</th>
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
      ) : (
        <p className="text-center text-gray-500">ログがありません。</p>
      )}
    </div>
  );
};

export default LogTable;
