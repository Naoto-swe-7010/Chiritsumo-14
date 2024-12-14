"use client";
import { deleteWantedItem } from "@/app/lib/action";
import { Button } from "@/components/ui/button";
import { WantedItem } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useActionState } from "react";

const DeleteWantedItemForm = ({ item }: { item: WantedItem }) => {
  // プロップスで渡されたアイテムを予め引数にバインドしておく
  const deleteWantedItemWithId = deleteWantedItem.bind(null, item.id);
  const [state, formAction, isPending] = useActionState(
    deleteWantedItemWithId,
    null
  );

  // キャンセルボタン用のルーター
  const router = useRouter();

  return (
    <form action={formAction}>
      <p className="mb-4 text-gray-400">本当にこのアイテムを削除しますか？</p>
      {state && (
        <p className="mt-2 text-sm text-red-500" id="title-error">
          {state.message}
        </p>
      )}
      <div className="flex justify-end gap-2">
        <Button
          type="submit"
          className="bg-red-500 hover:bg-red-700 font-bold"
          disabled={isPending}
        >
          はい
        </Button>
        <Button
          onClick={(e) => {
            e.preventDefault();
            router.back();
          }}
          className="bg-gray-500 hover:bg-gray-700 font-bold"
          disabled={isPending}
        >
          いいえ
        </Button>
      </div>
    </form>
  );
};

export default DeleteWantedItemForm;
