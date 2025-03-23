'use client';

import React from 'react';
import Link from 'next/link';

export const PaginationUI = ({
  totalPages,
  page
}: {
  totalPages: number;
  page: string;
}) => {
  const currentPage = parseInt(page);

  // ページネーションリンクを生成
  const paginationLinks = Array.from({ length: totalPages }, (dummy, index) => {
    const page = index + 1; // ページ番号 (1-based index)
    const pageStr = page.toString();
    const isActive = page === currentPage; // 現在のページかどうかを判定
    return (
      <li key={page} className="mx-1 inline-block">
        <Link
          href={`/logManagement/logTable/${pageStr}`}
          className={`rounded px-3 py-1 ${
            isActive
              ? 'bg-pink-500 text-white' // 現在のページはピンク背景＋白文字
              : 'text-gray-400 hover:bg-gray-600 hover:text-white'
          }`}
        >
          {page}
        </Link>
      </li>
    );
  });

  return (
    <nav className="mt-4">
      <ul className="m-0 flex list-none items-center justify-center p-0">
        {/* Back ボタン */}
        <li className="mx-2">
          {currentPage > 1 ? (
            <Link
              href={`/logManagement/logTable/${(currentPage - 1).toString()}`}
              className="rounded px-3 py-1 text-gray-400 hover:bg-gray-600 hover:text-white"
            >
              &lt; Back
            </Link>
          ) : (
            <span className="pointer-events-none rounded px-3 py-1 text-gray-500 opacity-50">
              &lt; Back
            </span>
          )}
        </li>

        {/* ページ番号 */}
        {paginationLinks}

        {/* Next ボタン */}
        <li className="mx-2">
          {currentPage < totalPages ? (
            <Link
              href={`/logManagement/logTable/${(currentPage + 1).toString()}`}
              className="rounded px-3 py-1 text-gray-400 hover:bg-gray-600 hover:text-white"
            >
              Next &gt;
            </Link>
          ) : (
            <span className="pointer-events-none rounded px-3 py-1 text-gray-500 opacity-50">
              Next &gt;
            </span>
          )}
        </li>
      </ul>
    </nav>
  );
};
