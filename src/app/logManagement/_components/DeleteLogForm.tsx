'use client';

import { useRouter } from 'next/navigation';
import { Log } from '@prisma/client';
import { useActionStateCompat } from '@strozw/use-action-state-compat';

import { LoadingSpinner } from '@/app/_components/LoadingSpinner';
import { deleteLog } from '@/app/lib/action';
import { Button } from '@/components/ui/button';

export const DeleteLogForm = ({ log }: { log: Log }) => {
  // ServerActions × useActionStateCompat
  // プロップスで渡されたログを予め引数にバインドしておく
  const deleteLogWithId = deleteLog.bind(null, log.id);

  // stateでは、エラーメッセージを管理
  const [state, formAction, isPending] = useActionStateCompat(
    deleteLogWithId,
    null
  );

  // キャンセルボタン用のルーター
  const router = useRouter();

  return (
    <form action={formAction}>
      <h3 className="mb-4 text-gray-600">本当にこのデータを削除しますか？</h3>
      {state && (
        <p className="mt-2 text-sm text-red-500" id="title-error">
          {state.message}
        </p>
      )}
      <div className="flex justify-end gap-2">
        <Button
          type="submit"
          className="bg-red-500 font-bold hover:bg-red-700"
          disabled={isPending}
        >
          {isPending ? <LoadingSpinner size={18} color="white" /> : 'はい'}
        </Button>
        <Button
          onClick={(e) => {
            e.preventDefault();
            router.back();
          }}
          className="bg-gray-500 font-bold hover:bg-gray-700"
          disabled={isPending}
        >
          いいえ
        </Button>
      </div>
    </form>
  );
};
