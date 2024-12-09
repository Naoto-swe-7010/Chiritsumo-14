"use client";
import { Button } from "@/components/ui/button";
import { Log } from "@prisma/client";
import { useRouter } from "next/navigation";
import React from "react";

const DeleteForm = ({ log }: { log: Log }) => {
  const router = useRouter();

  return (
    <form>
      <p className="mb-4 text-gray-400">本当にこのデータを削除しますか？</p>
      <div className="flex justify-end gap-2">
        <Button
          onClick={(e) => {
            e.preventDefault();
            router.back();
          }}
          type="submit"
          className="bg-red-500 hover:bg-red-700"
        >
          YES
        </Button>
        <Button
          onClick={(e) => {
            e.preventDefault();
            router.back();
          }}
          className="bg-gray-500 hover:bg-gray-700"
        >
          NO
        </Button>
      </div>
    </form>
  );
};

export default DeleteForm;
