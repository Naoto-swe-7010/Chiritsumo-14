import React from 'react';
import { FcGoogle } from 'react-icons/fc';

import { signIn } from '../../../../auth';

export const CtaSection = () => {
  return (
    <section className="pb-52 pt-20">
      <div className="container mx-auto flex flex-col items-center justify-center px-4">
        <h2 className="mb-6 text-3xl font-bold md:text-5xl">
          <span className="text-gray-700">さあ、</span>
          <span className="text-cyan-500">始めましょう</span>
        </h2>
        <h3 className="mb-12 mt-8 text-center text-xl font-bold text-gray-500 md:text-3xl">
          <div className="inline-block">無駄づかいを我慢して</div>
          <div className="inline-block">欲しい物を手に入れよう！</div>
        </h3>
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
        </form>
      </div>
    </section>
  );
};
