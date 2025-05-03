'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiOutlineHome, AiOutlineUnorderedList } from 'react-icons/ai';
import { BsBookmarkHeart } from 'react-icons/bs';

export const Menu = () => {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="hidden gap-6 font-bold sm:flex">
        <li>
          <Link
            href="/main"
            className={`flex items-center gap-2 ${
              pathname === '/main' ? 'text-cyan-500' : 'hover:text-cyan-400'
            }`}
          >
            <AiOutlineHome size={20} data-testid="icon-home" />
            ホーム
          </Link>
        </li>
        <li>
          <Link
            href="/logManagement/logTable/1"
            className={`flex items-center gap-2 ${
              pathname.startsWith('/logManagement')
                ? 'text-cyan-500'
                : 'hover:text-cyan-400'
            }`}
          >
            <AiOutlineUnorderedList size={20} data-testid="icon-log" />
            ログ
          </Link>
        </li>
        <li>
          <Link
            href="/wantedItemManagement"
            className={`flex items-center gap-2 ${
              pathname === '/wantedItemManagement'
                ? 'text-cyan-500'
                : 'hover:text-cyan-400'
            }`}
          >
            <BsBookmarkHeart size={20} data-testid="icon-wanted-item" />
            欲しい物リスト
          </Link>
        </li>
      </ul>
    </nav>
  );
};
