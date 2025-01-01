import Link from 'next/link'
import React from 'react'
import { AiOutlineHome, AiOutlineUnorderedList } from 'react-icons/ai'
import { BsBookmarkHeart } from 'react-icons/bs'

const Menu = () => {
  return (
    <nav>
      <ul className="hidden gap-6 sm:flex">
        <li>
          <Link
            href="/main"
            className="flex items-center gap-2 hover:text-pink-300">
            <AiOutlineHome size={20} data-testid="icon-home" />
            ホーム
          </Link>
        </li>
        <li>
          <Link
            href="/logManagement/logTable/1"
            className="flex items-center gap-2 hover:text-pink-300">
            <AiOutlineUnorderedList size={20} data-testid="icon-log" />
            ログ
          </Link>
        </li>
        <li>
          <Link
            href="/wantedItemManagement"
            className="flex items-center gap-2 hover:text-pink-300">
            <BsBookmarkHeart size={20} data-testid="icon-wanted-item" />
            欲しい物リスト
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Menu
