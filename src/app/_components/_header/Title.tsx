import Link from 'next/link'
import React from 'react'
import { TbMountain } from 'react-icons/tb'

const Title = () => {
  return (
    <header>
      <Link
        href="/main"
        className="flex items-center gap-2"
        aria-label="メインページに移動">
        <TbMountain size={35} data-testid="icon" />
        <h1 className="text-3xl font-bold text-pink-500">ちりつも</h1>
      </Link>
    </header>
  )
}

export default Title
