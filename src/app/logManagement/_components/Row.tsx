import { Button } from "@/components/ui/button";
import { Log } from "@prisma/client";
import Link from "next/link";
import React from "react";

// 日付フォーマット関数
const formattedDate = (date: Date): string => {
  return date
    .toLocaleString("ja-JP", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
    .replace(/^20/, "");
};

// テーブルの各ログ（各レコード）
const Row = ({ log }: { log: Log }) => {
  return (
    <tr className="border-b border-gray-500 bg-black bg-opacity-30">
      <td className="max-w-xs break-words py-2 px-3 text-base sm:max-w-full">
        {log.title}
      </td>
      <td className="py-2 p-3 text-base">{log.price}</td>
      <td className="py-2 p-3 text-base">{formattedDate(log.createdAt)}</td>
      <td className="py-2 p-3">
        <div className="flex flex-col gap-1">
          <Link href={`/logManagement/edit/${log.id}`}>
            <Button className="bg-pink-500 hover:bg-pink-700">✏️</Button>
          </Link>
          <Link href={`/logManagement/delete/${log.id}`}>
            <Button className="bg-gray-300 hover:bg-gray-400">🗑️</Button>
          </Link>
        </div>
      </td>
    </tr>
  );
};

export default Row;
