"use client";
import { useRouter } from "next/navigation";
import { WantedItem } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { useActionStateCompat } from "@strozw/use-action-state-compat";

import { purchaseWantedItem } from "@/app/lib/action";

const PurchaseForm = ({ item }: { item: WantedItem }) => {
  // ServerActions × useActionStateCompat
  // プロップスで渡されたログを予め引数にバインドしておく
  const purchaseWantedItemWithId = purchaseWantedItem.bind(null, item.id);
  const [state, formAction, isPending] = useActionStateCompat(
    purchaseWantedItemWithId,
    null
  );

  // キャンセルボタン用のルーター
  const router = useRouter();

  return (
    <form action={formAction}>
      <p className="mb-4 text-gray-400">この商品を購入しますか？</p>
      {state && (
        <p className="mt-2 text-sm text-red-500" id="title-error">
          {state.message}
        </p>
      )}
      <div className="flex justify-end gap-2">
        <Button
          type="submit"
          className="bg-pink-500 hover:bg-pink-700 font-bold"
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

export default PurchaseForm;
