'use client'
import LoadingSpinner from '@/app/_components/LoadingSpinner'
import { getAIAdvice } from '@/app/lib/action'
import { Button } from '@/components/ui/button'
import { useActionStateCompat } from '@strozw/use-action-state-compat'
import { WiStars } from 'react-icons/wi'

const AIAdvice = () => {
  const [advice, formAction, isPending] = useActionStateCompat(
    getAIAdvice,
    '',
  )

  return (
    <div className="mt-10 flex justify-center p-4">
      <div className="w-full max-w-lg space-y-6">
        <div className="overflow-hidden rounded-lg bg-gradient-to-r from-indigo-950 to-indigo-950 py-8 px-4 sm:px-8 shadow-lg">
          <div className="mb-6 flex items-center justify-center space-x-2">
            <WiStars className="h-6 w-6 sm:h-8 sm:w-8 text-cyan-400" />
            <h2 className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-lg sm:text-xl font-bold text-transparent">
              AI 節約アドバイス
            </h2>
            <WiStars className="h-6 w-6 sm:h-8 sm:w-8 text-pink-400" />
          </div>
          <form
            action={formAction}
            name="keyword"
            className="flex flex-row items-center gap-2 sm:gap-4">
            <input
              type="text"
              name="keyword"
              placeholder="キーワードを入力"
              className="flex-1 rounded-lg bg-gray-800/50 px-2 py-2 text-white placeholder-gray-400 shadow-inner transition-all focus:bg-gray-800/70 focus:outline-none focus:ring-2 focus:ring-purple-400 border-2 border-cyan-400 border-purple-400 border-pink-400"
            />
            <Button
              className="rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 h-[40px] font-bold text-white shadow-md transition-all hover:opacity-90 hover:shadow-lg active:scale-95 "
              disabled={isPending}>
              {isPending ?
                <LoadingSpinner size={20} color="white" />
              : '送信'}
            </Button>
          </form>
          {advice && (
            <div className="mt-4 rounded-lg bg-gray-800/50 p-4 shadow-inner">
              <h3 className="text-md font-semibold text-purple-400">
                AIからの返答:
              </h3>
              <p className="mt-2 text-sm text-white">{advice}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AIAdvice
