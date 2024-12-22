"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Log } from "@prisma/client";
import { useActionStateCompat } from "@strozw/use-action-state-compat";

import LoadingSpinner from "@/app/_components/LoadingSpinner";
import { updateLog } from "@/app/lib/action";
import { UpdateLogFormState } from "@/app/lib/formState";

const EditLogForm = ({ log }: { log: Log }) => {
  // ServerActions × useActionStateCompat
  // プロップスで渡されたログを予め引数にバインドしておく
  const updateLogWithId = updateLog.bind(null, log.id);

  const initialState: UpdateLogFormState = { message: null, errors: {} };
  const [state, formAction, isPending] = useActionStateCompat(
    updateLogWithId,
    initialState
  );

  // キャンセルボタン用のルーター
  const router = useRouter();

  return (
    <form action={formAction}>
      <div className="mb-4">
        <label className="block text-gray-400">タイトル</label>
        <input
          type="text"
          name="title"
          defaultValue={log!.title}
          className="w-full rounded border bg-black bg-opacity-10 p-2 text-gray-100"
          placeholder="タイトル"
          required
          aria-describedby="title-error"
        />
        {state?.errors?.title &&
          state.errors.title.map((error: string) => (
            <p
              className="mt-2 text-sm text-red-500"
              id="title-error"
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
          defaultValue={log!.price}
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
      <div className="flex justify-end gap-2">
        <Button
          type="submit"
          className="bg-green-500 hover:bg-green-700 font-bold"
          disabled={isPending}
        >
          {isPending ? <LoadingSpinner size={18} color="white" /> : "保存"}
        </Button>
        <Button
          onClick={(e) => {
            e.preventDefault();
            router.back();
          }}
          className="bg-gray-500 hover:bg-gray-700 font-bold"
          disabled={isPending}
        >
          キャンセル
        </Button>
      </div>
    </form>
  );
};

export default EditLogForm;
