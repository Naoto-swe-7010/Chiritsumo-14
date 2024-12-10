"use client";
import { updateWantedItem, UpdateWantedItemFormState } from "@/app/lib/action";
import { Button } from "@/components/ui/button";
import { WantedItem } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useActionState } from "react";

const EditWantedItemForm = ({ item }: { item: WantedItem }) => {
  const initialState: UpdateWantedItemFormState = { message: null, errors: {} };
  const updateWantedItemWithId = updateWantedItem.bind(null, item.id);
  const [state, formAction, isPending] = useActionState(
    updateWantedItemWithId,
    initialState
  );

  const router = useRouter();
  return (
    <form action={formAction}>
      <div className="mb-4">
        <label className="block text-gray-400">タイトル</label>
        <input
          type="text"
          name="name"
          defaultValue={item!.name}
          className="w-full rounded border bg-black bg-opacity-10 p-2 text-gray-100"
          placeholder="商品名"
          required
          aria-describedby="name-error"
        />
        {state?.errors?.name &&
          state.errors.name.map((error: string) => (
            <p
              className="mt-2 text-sm text-red-500"
              id="name-error"
              key={error}
            >
              {error}
            </p>
          ))}
      </div>
      <div className="mb-4">
        <label className="block text-gray-400">値段</label>
        <input
          type="number"
          name="price"
          defaultValue={item!.price}
          className="w-full rounded border bg-black bg-opacity-10 p-2 text-gray-100"
          placeholder="値段"
          required
          aria-describedby="price-error"
        />
        {state?.errors?.price &&
          state.errors.price.map((error: string) => (
            <p
              className="mt-2 text-sm text-red-500"
              id="price-error"
              key={error}
            >
              {error}
            </p>
          ))}
      </div>
      <div className="mb-4">
        <label className="block text-gray-400">URL</label>
        <input
          type="url"
          name="url"
          defaultValue={item.url?.toString()}
          className="w-full rounded border bg-black bg-opacity-10 p-2 text-gray-100"
          placeholder="https://example.com"
          aria-describedby="url-error"
        />
        {state?.errors?.url &&
          state.errors.url.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" id="url-error" key={error}>
              {error}
            </p>
          ))}
      </div>
      <div className="flex justify-end gap-2">
        <Button
          disabled={isPending}
          type="submit"
          className="bg-green-500 hover:bg-green-700 font-bold"
        >
          保存
        </Button>
        <Button
          disabled={isPending}
          onClick={(e) => {
            e.preventDefault();
            router.back();
          }}
          className="bg-gray-500 hover:bg-gray-700 font-bold"
        >
          キャンセル
        </Button>
      </div>
    </form>
  );
};

export default EditWantedItemForm;
