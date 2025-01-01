import Link from 'next/link'
import React from 'react'
import { AiOutlineHome, AiOutlineUnorderedList } from 'react-icons/ai'
import { BsBookmarkHeart } from 'react-icons/bs'

const Menu = () => {
  return (
    <nav className="bg-gray-700 py-2 pt-2 sm:hidden">
      <ul className="flex justify-around gap-4 text-sm">
        <li className="flex flex-col items-center">
          <Link
            href="/main"
            className="flex flex-col items-center text-white hover:text-pink-500">
            <AiOutlineHome size={22} data-testid="icon-home" />
            <span>ホーム</span>
          </Link>
        </li>
        <li className="flex flex-col items-center">
          <Link
            href="/logManagement/logTable/1"
            className="flex flex-col items-center text-white hover:text-pink-500">
            <AiOutlineUnorderedList size={22} data-testid="icon-log" />
            <span>ログ</span>
          </Link>
        </li>
        <li className="flex flex-col items-center">
          <Link
            href="/wantedItemManagement"
            className="flex flex-col items-center text-white hover:text-pink-500">
            <BsBookmarkHeart size={22} data-testid="icon-wanted-item" />
            <span>欲しい物</span>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Menu
