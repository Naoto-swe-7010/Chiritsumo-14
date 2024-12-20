import React from "react";

import { prisma } from "../../../../../prisma";
import EditWantedItemForm from "../EditWantedItemForm";
import Modal from "@/app/_components/Modal";

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  // 編集対象のアイテムを取得
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
      <h2 className="mb-4 text-lg font-bold">編集</h2>
      <EditWantedItemForm item={item!} />
    </Modal>
  );
};

export default page;
