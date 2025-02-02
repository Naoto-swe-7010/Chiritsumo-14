import React from 'react'

import Menu from './Menu'
import CopyRight from './CopyRight'
import { getSession } from '@/app/lib/commonFunction'

const Footer = async () => {
  const session = await getSession()
  return (
    <footer className=" bottom-0 left-0 w-full bg-gray-900 text-white px-[4%] py-6">
      {/* モバイルメニュー */}
      {session && (
        // sm以下の時にメニューを表示。sm以上の時はヘッダーに表示。
        <Menu />
      )}
      <CopyRight />
    </footer>
  )
}

export default Footer
