import React from 'react';

import { getSession } from '@/app/lib/commonFunction';
import { AccountInfo } from './AccountInfo';
import { Menu } from './Menu';
import { Title } from './Title';

export const Header = async () => {
  const session = await getSession();

  return (
    <header className="fixed left-0 top-0 z-10 w-full bg-gray-900 px-[4%] text-white">
      <nav className="mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Title />
          {/* メニューはsm以上の時のみ表示。sm以下の場合は、フッターにメニューを表示。 */}
          {session && <Menu />}
        </div>

        {/* ログイン情報 */}
        {session && <AccountInfo session={session} />}
      </nav>
    </header>
  );
};
