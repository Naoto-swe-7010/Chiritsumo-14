import React from 'react';
import Link from 'next/link';
import { Log } from '@prisma/client';

import { formattedDate } from '@/app/lib/commonFunction';
import { Button } from '@/components/ui/button';

// テーブルの各ログ（各レコード）
export const Row = ({ log }: { log: Log }) => {
  return (
    <tr className="border-b border-gray-200 bg-gray-100 bg-opacity-50">
      <td className="max-w-xs break-words px-3 py-2 text-base sm:max-w-full">
        {log.title}
      </td>
      <td className="p-3 py-2 text-base">{log.price.toLocaleString()}</td>
      <td className="p-3 py-2 text-base">{formattedDate(log.createdAt)}</td>
      <td className="p-3 py-2">
        <div className="flex flex-col gap-1">
          <Link href={`/logManagement/edit/${log.id}`} tabIndex={-1}>
            <Button
              className="bg-green-500 font-bold hover:bg-green-700"
              aria-label="編集"
            >
              編集
            </Button>
          </Link>
          <Link href={`/logManagement/delete/${log.id}`} tabIndex={-1}>
            <Button
              className="bg-gray-500 font-bold hover:bg-gray-700"
              aria-label="削除"
            >
              削除
            </Button>
          </Link>
        </div>
      </td>
    </tr>
  );
};
