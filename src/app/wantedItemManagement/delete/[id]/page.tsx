import React from "react";

import { prisma } from "../../../../../prisma";
import DeleteWantedItemForm from "../DeleteWantedItemForm";
import Modal from "@/app/_components/Modal";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  // 削除対象のアイテムを取得
  let item = null;
  try {
    item = await prisma.wantedItem.findUnique({
      where: {
        id: id,
      },
    });
  } catch (e) {
    console.error(e);
  }

  return (
    <Modal>
      <h2 className="mb-4 text-lg font-bold">削除</h2>
      <DeleteWantedItemForm item={item!} />
    </Modal>
  );
};

export default page;
