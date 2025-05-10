'use client';

import { useEffect, useRef } from 'react';
import { useActionStateCompat } from '@strozw/use-action-state-compat';

import { LoadingSpinner } from '@/app/_components/LoadingSpinner';
import { addWantedItem } from '@/app/lib/action';
import { AddWantedItemFormState } from '@/app/lib/formState';
import { Button } from '@/components/ui/button';

export const AddWantedItemForm = () => {
  // ServerActions × useActionStateCompat
  // stateでは、エラーメッセージを管理
  const initialState: AddWantedItemFormState = {
    message: null,
    errors: {}
  };
  const [state, formAction, isPending] = useActionStateCompat(
    addWantedItem,
    initialState
  );

  // Submit時のFormクリア用
  const formRef = useRef<HTMLFormElement>(null);

  // 欲しい物リストへの追加成功時の処理
  // state.messageには、エラーがなくてもランダムな値が返ってくるため、フォーム送信時にuseEffectが発火する
  useEffect(() => {
    if (state.message) {
      // Formクリア
      formRef.current?.reset();
    }
  }, [state.message]);

  return (
    <form
      action={formAction}
      ref={formRef}
      className="mb-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap"
    >
      <div className="flex-1">
        <input
          type="text"
          placeholder="商品名"
          name="name"
          required
          className="w-full rounded-md border border-gray-300 bg-white p-3 text-gray-800 placeholder-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500"
        />
      </div>
      {state.errors?.name?.map((error: string) => (
        <p className="mt-2 text-sm text-red-500" id="name-error" key={error}>
          {error}
        </p>
      ))}
      <div className="flex-1">
        <input
          type="number"
          name="price"
          placeholder="価格"
          required
          className="w-full rounded-md border border-gray-300 bg-white p-3 text-gray-800 placeholder-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500"
        />
      </div>
      {state.errors?.price?.map((error: string) => (
        <p className="mt-2 text-sm text-red-500" id="price-error" key={error}>
          {error}
        </p>
      ))}
      <div className="flex-1">
        <input
          type="url"
          name="url"
          placeholder="https://example.com"
          className="w-full rounded-md border border-gray-300 bg-white p-3 text-gray-800 placeholder-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500"
        />
      </div>
      {state.errors?.url?.map((error: string) => (
        <p className="mt-2 text-sm text-red-500" id="url-error" key={error}>
          {error}
        </p>
      ))}
      <div className="sm:w-auto">
        <Button
          className="h-[50px] w-full bg-cyan-500 text-lg font-bold hover:bg-cyan-700 sm:w-[68px]"
          disabled={isPending}
        >
          {isPending ? <LoadingSpinner size={24} color="white" /> : '追加'}
        </Button>
      </div>
    </form>
  );
};
