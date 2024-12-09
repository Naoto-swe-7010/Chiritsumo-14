"use client";
import { Button } from "@/components/ui/button";
import { Log } from "@prisma/client";
import { useRouter } from "next/navigation";
import React from "react";

const editForm = ({ log }: { log: Log }) => {
  const router = useRouter();
  return (
    <form method="post">
      <div className="mb-4">
        <label className="block text-gray-400">タイトル</label>
        <input
          type="text"
          name="title"
          defaultValue={log!.title}
          className="w-full rounded border bg-black bg-opacity-10 p-2 text-gray-100"
          placeholder="タイトル"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-400">値段</label>
        <input
          type="number"
          name="price"
          defaultValue={log!.price}
          className="w-full rounded border bg-black bg-opacity-10 p-2 text-gray-100"
          placeholder="値段"
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button
          onClick={(e) => {
            e.preventDefault();
            router.back();
          }}
          type="submit"
          className="bg-green-500 hover:bg-green-700"
        >
          Save
        </Button>
        <Button
          onClick={(e) => {
            e.preventDefault();
            router.back();
          }}
          className="bg-gray-500 hover:bg-gray-700"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default editForm;
