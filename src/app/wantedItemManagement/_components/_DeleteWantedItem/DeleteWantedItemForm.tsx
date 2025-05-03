'use client';

import { useRouter } from 'next/navigation';
import { WantedItem } from '@prisma/client';
import { useActionStateCompat } from '@strozw/use-action-state-compat';

import { LoadingSpinner } from '@/app/_components/LoadingSpinner';
import { deleteWantedItem } from '@/app/lib/action';
import { Button } from '@/components/ui/button';

export const DeleteWantedItemForm = ({ item }: { item: WantedItem }) => {
  // ServerActions × useActionStateCompat
  // プロップスで渡されたアイテムを予め引数にバインドしておく
  const deleteWantedItemWithId = deleteWantedItem.bind(null, item.id);
  const [state, formAction, isPending] = useActionStateCompat(
    deleteWantedItemWithId,
    null
  );

  // キャンセルボタン用のルーター
  const router = useRouter();

  return (
    <form action={formAction}>
      <p className="mb-4 text-gray-600">本当にこのアイテムを削除しますか？</p>
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
