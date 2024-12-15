"use client";
import { useActionState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";

import { addBalance } from "@/app/lib/action";
import { AddBalanceFormState } from "@/app/lib/formState";
import LoadingSpinner from "@/app/_components/LoadingSpinner";

const AddBalanceForm = () => {
  const initialState: AddBalanceFormState = { message: null, errors: {} };
  const [state, formAction, isPending] = useActionState(
    addBalance,
    initialState
  );

  // 紙吹雪エフェクト
  useEffect(() => {
    if (state.message) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [state.message]);

  return (
    <form action={formAction} className="space-y-3">
      <div className="md:flex md:items-center md:gap-4">
        <div className="mb-2 flex flex-col md:mb-0 md:w-1/2">
          <input
            type="text"
            className="w-full rounded-md border border-gray-600 bg-[#2a273f] p-3 text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            name="title"
            placeholder="我慢したものを入力"
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
        <div className="flex flex-col md:w-1/2">
          <input
            type="number"
            className="w-full rounded-md border border-gray-600 bg-[#2a273f] p-3 text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            name="price"
            placeholder="節約できた額を入力"
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
      </div>

      <div className="mx-auto w-[50%]">
        <Button
          className="bg-pink-500 hover:bg-pink-700 h-[50px] w-full text-lg font-bold"
          disabled={isPending}
        >
          {isPending ? (
            <LoadingSpinner size={24} color="white" />
          ) : (
            "我慢できた！"
          )}
        </Button>
      </div>
    </form>
  );
};

export default AddBalanceForm;
