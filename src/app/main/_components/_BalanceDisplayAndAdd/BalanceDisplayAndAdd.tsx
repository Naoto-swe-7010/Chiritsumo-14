'use client';

import React, { useEffect, useRef } from 'react';
import { useActionStateCompat } from '@strozw/use-action-state-compat';
import confetti from 'canvas-confetti';

import { LoadingSpinner } from '@/app/_components/LoadingSpinner';
import { NumberLoading } from '@/app/_components/NumberLoading';
import { addBalance } from '@/app/lib/action';
import { AddBalanceFormState } from '@/app/lib/formState';
import { Button } from '@/components/ui/button';

export const BalanceDisplayAndAdd = ({ balance }: { balance: number }) => {
  // ServerActions × useActionStateCompat
  // stateはエラーメッセージを管理
  const initialState: AddBalanceFormState = {
    message: null,
    errors: {}
  };
  const [state, formAction, isPending] = useActionStateCompat(
    addBalance,
    initialState
  );

  // Submit時のFormクリア用
  const formRef = useRef<HTMLFormElement>(null);

  // 残高追加（ログ作成）成功時の処理
  // state.messageには、エラーがなくてもランダムな値が返ってくるため、フォーム送信時にuseEffectが発火する
  useEffect(() => {
    if (state.message) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // 紙吹雪エフェクト
      void confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.45 }
      });
      // Formクリア
      formRef.current?.reset();
    }
  }, [state.message]);

  // Submit時および残高更新時にトップまでスクロールする（isPendingで判断）
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [isPending]);

  return (
    <>
      <section
        className="mb-16 mt-12 flex h-[225px] flex-col items-center justify-between text-2xl sm:h-[300px]"
        aria-labelledby="balance-title"
      >
        <h2
          id="balance-title"
          className="text-3xl font-bold text-gray-600 sm:text-4xl"
        >
          残高
        </h2>
        {isPending ? (
          <NumberLoading />
        ) : (
          <div
            className="text-[100px] font-bold leading-none sm:text-[150px]"
            aria-label="Balance Amount"
          >
            <h1 aria-label="balance" className="text-gray-700">
              {balance.toLocaleString()}
            </h1>
          </div>
        )}
        <p
          className="text-4xl font-bold text-gray-600 sm:text-5xl"
          role="Currency"
        >
          JPY
        </p>
      </section>

      <section className="flex justify-center p-4 text-gray-300 sm:p-6">
        <div className="w-full max-w-lg">
          <h1 className="mb-6 text-center text-xl font-bold text-gray-500 sm:text-2xl">
            <span className="block">無駄づかいを我慢できたら入力！</span>
          </h1>
          <form action={formAction} ref={formRef} className="space-y-3">
            <div className="md:flex md:items-center md:gap-4">
              <div className="mb-2 flex flex-col md:mb-0 md:w-1/2">
                <input
                  type="text"
                  className="w-full rounded-md border border-gray-300 bg-white p-3 text-gray-800 placeholder-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500"
                  name="title"
                  placeholder="我慢したものを入力"
                  required
                />
                {state.errors?.title?.map((error: string) => (
                  <p
                    className="mt-2 text-sm text-red-500"
                    id="title-error"
                    key={error}
                  >
                    {error}
                  </p>
                ))}
              </div>
              <div className="flex flex-col md:w-1/2">
                <input
                  type="number"
                  className="w-full rounded-md border border-gray-300 bg-white p-3 text-gray-800 placeholder-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500"
                  name="price"
                  placeholder="節約できた額を入力"
                  required
                />
                {state.errors?.price?.map((error: string) => (
                  <p
                    className="mt-2 text-sm text-red-500"
                    id="price-error"
                    key={error}
                  >
                    {error}
                  </p>
                ))}
              </div>
            </div>

            <div className="mx-auto w-[50%]">
              <Button
                className="h-[50px] w-full bg-cyan-500 text-lg font-bold hover:bg-cyan-700"
                disabled={isPending}
              >
                {isPending ? (
                  <LoadingSpinner size={24} color="white" />
                ) : (
                  '我慢できた！'
                )}
              </Button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};
