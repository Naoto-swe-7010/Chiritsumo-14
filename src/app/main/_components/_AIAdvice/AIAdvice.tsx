'use client';

import { useActionStateCompat } from '@strozw/use-action-state-compat';
import { WiStars } from 'react-icons/wi';

import { LoadingSpinner } from '@/app/_components/LoadingSpinner';
import { getAIAdvice } from '@/app/lib/action';
import { Button } from '@/components/ui/button';

export const AIAdvice = () => {
  const [advice, formAction, isPending] = useActionStateCompat(getAIAdvice, '');

  return (
    <div className="mt-10 flex justify-center p-4">
      <div className="w-full max-w-lg space-y-6">
        <div className="overflow-hidden rounded-lg bg-gray-100 px-4 py-8 shadow-lg sm:px-8">
          <div className="mb-6 flex items-center justify-center space-x-2">
            <WiStars className="h-6 w-6 text-cyan-600 sm:h-8 sm:w-8" />
            <h2 className="bg-gradient-to-r from-cyan-600 via-green-500 to-blue-600 bg-clip-text text-lg font-bold text-transparent sm:text-xl">
              AI 節約アドバイス
            </h2>
            <WiStars className="h-6 w-6 text-cyan-600 sm:h-8 sm:w-8" />
          </div>
          {/* 節約アドバイスのキーワード送信フォーム */}
          <form
            action={formAction}
            name="keyword"
            className="flex flex-row items-center gap-2 sm:gap-4"
          >
            <input
              type="text"
              name="keyword"
              placeholder="キーワードを入力"
              required
              className="flex-1 rounded-lg border-2 border-cyan-400 bg-white px-4 py-2 text-gray-800 placeholder-gray-400 shadow-inner transition-all focus:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            <Button
              className="h-[40px] rounded-lg bg-gradient-to-r from-cyan-600 to-green-500 px-4 py-3 font-bold text-white shadow-md transition-all hover:bg-gradient-to-r hover:from-cyan-700 hover:to-green-600 active:scale-95"
              disabled={isPending}
            >
              {isPending ? <LoadingSpinner size={28} color="white" /> : '送信'}
            </Button>
          </form>
          <div className="mt-4 rounded-lg bg-white p-4 shadow-inner">
            <h3 className="text-md font-semibold text-cyan-500">
              AIからの返答
            </h3>
            {/* 節約アドバイスの返答 */}
            <p className="mt-2 text-sm text-gray-800">{advice}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
