import React from 'react';
import { BsChevronDown } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { TbMountain } from 'react-icons/tb';

import { signIn } from '../../../../auth';

export const Main = () => {
  return (
    <div className="flex min-h-[calc(100vh-132px)] translate-y-[-5%] flex-col items-center justify-center px-4 text-center">
      {/* ロゴ */}
      <TbMountain className="size-[200px] md:size-[280px]" data-testid="icon" />
      {/* タイトル */}
      <h1 className="mb-3 text-4xl font-bold text-gray-700 sm:text-5xl md:text-6xl">
        ちりつも
      </h1>
      {/* サブタイトル */}
      <h3 className="mb-6 text-lg font-bold sm:text-xl md:my-10 md:text-4xl">
        <div className="inline-block text-gray-500">無駄づかいを我慢して</div>
        <div className="inline-block text-gray-500">欲しい物を手に入れよう</div>
      </h3>
      {/* サインインボタン */}
      <form
        action={async () => {
          'use server';
          await signIn('google');
        }}
        className="flex justify-center rounded-full bg-white px-6 py-3 text-base font-semibold no-underline transition hover:bg-white/50 sm:w-[70%] sm:text-lg md:w-[40%] md:text-xl lg:w-[25%]"
      >
        <button className="flex max-w-md flex-nowrap items-center justify-center gap-3">
          <FcGoogle className="size-6 sm:size-7 md:size-8" />
          <p className="text-cyan-500">Sign in with Google！</p>
        </button>
        <div className="absolute bottom-[2%]">
          <div className="text-light-green-400 flex animate-[bounce_1s_ease-in-out_3] flex-col items-center">
            <BsChevronDown className="h-6 w-6" />
            <BsChevronDown className="h-6 w-6" />
          </div>
        </div>
      </form>
    </div>
  );
};
