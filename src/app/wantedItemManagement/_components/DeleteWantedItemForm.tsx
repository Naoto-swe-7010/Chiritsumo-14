"use client";
import { deleteWantedItem, DeleteWantedItemFormState } from "@/app/lib/action";
import { Button } from "@/components/ui/button";
import { Log, WantedItem } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useActionState } from "react";

const DeleteWantedItemForm = ({ item }: { item: WantedItem }) => {
  if (!item) return null;
  const initialState: DeleteWantedItemFormState = { message: null };
  const deleteWantedItemWithId = deleteWantedItem.bind(null, item.id);
  const [state, formAction, isPending] = useActionState(
    deleteWantedItemWithId,
    initialState
  );

  const router = useRouter();

  return (
    <form action={formAction}>
      <p className="mb-4 text-gray-400">本当にこのアイテムを削除しますか？</p>
      {state?.message && (
        <p className="mt-2 text-sm text-red-500" id="title-error">
          {state.message}
        </p>
      )}
      <div className="flex justify-end gap-2">
        <Button
          type="submit"
          disabled={isPending}
          className="bg-red-500 hover:bg-red-700 font-bold"
        >
          はい
        </Button>
        <Button
          onClick={(e) => {
            e.preventDefault();
            router.back();
          }}
          disabled={isPending}
          className="bg-gray-500 hover:bg-gray-700 font-bold"
        >
          いいえ
        </Button>
      </div>
    </form>
  );
};

export default DeleteWantedItemForm;
