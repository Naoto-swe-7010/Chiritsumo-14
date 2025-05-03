'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiOutlineHome, AiOutlineUnorderedList } from 'react-icons/ai';
import { BsBookmarkHeart } from 'react-icons/bs';

export const Menu = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-gray-200 py-2 pt-2 font-bold sm:hidden">
      <ul className="flex justify-around gap-4 text-sm">
        <li className="flex flex-col items-center">
          <Link
            href="/main"
            className={`flex flex-col items-center ${
              pathname === '/main' ? 'text-cyan-500' : 'hover:text-cyan-400'
            }`}
          >
            <AiOutlineHome size={22} data-testid="icon-home" />
            <span>ホーム</span>
          </Link>
        </li>
        <li className="flex flex-col items-center">
          <Link
            href="/logManagement/logTable/1"
            className={`flex flex-col items-center ${
              pathname.startsWith('/logManagement')
                ? 'text-cyan-500'
                : 'hover:text-cyan-400'
            }`}
          >
            <AiOutlineUnorderedList size={22} data-testid="icon-log" />
            <span>ログ</span>
          </Link>
        </li>
        <li className="flex flex-col items-center">
          <Link
            href="/wantedItemManagement"
            className={`flex flex-col items-center ${
              pathname === '/wantedItemManagement'
                ? 'text-cyan-500'
                : 'hover:text-cyan-400'
            }`}
          >
            <BsBookmarkHeart size={22} data-testid="icon-wanted-item" />
            <span>欲しい物</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
