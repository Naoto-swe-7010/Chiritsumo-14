import React from 'react';
import Link from 'next/link';
import { TbMountain } from 'react-icons/tb';

export const Title = () => {
  return (
    <header>
      <Link
        href="/"
        className="flex items-center gap-2"
        aria-label="ルートに移動"
      >
        <TbMountain size={35} data-testid="icon" />
        <h1 className="pt-[3px] text-3xl font-bold text-gray-800">ちりつも</h1>
      </Link>
    </header>
  );
};
