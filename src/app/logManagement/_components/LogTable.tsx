import React, { Suspense } from "react";
import Row from "./Row";
import { prisma } from "../../../../prisma";
import RowSkeleton from "./RowSkeleton";
import { auth } from "../../../../auth";

const LogTable = async () => {
  try {
    // セッション情報を取得
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
      console.error("セッション情報が取得できませんでした。");
      return (
        <p className="text-center text-gray-500">セッション情報が必要です。</p>
      );
    }

    const userId = session.user.id;

    // ログを取得
    const logs = await prisma.log.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return (
      <div className="overflow-x-auto">
        {logs && logs.length > 0 ? (
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
  } catch (error) {
    console.error("LogTableの取得中にエラーが発生しました:", error);
    return (
      <p className="text-center text-red-500">
        エラーが発生しました。再度お試しください。
      </p>
    );
  }
};

export default LogTable;
