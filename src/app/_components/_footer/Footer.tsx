import React from 'react';

import { getSession } from '@/app/lib/commonFunction';
import { CopyRight } from './CopyRight';
import { Menu } from './Menu';

export const Footer = async () => {
  const session = await getSession();
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-black text-white sm:px-[4%] sm:py-2">
      {/* モバイルメニュー */}
      {session && (
        // sm以下の時にメニューを表示。sm以上の時はヘッダーに表示。
        <Menu />
      )}
      <CopyRight />
    </footer>
  );
};
