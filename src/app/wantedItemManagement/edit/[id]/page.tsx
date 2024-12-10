import EditModal from "@/app/_components/EditModal";
import React from "react";
import { prisma } from "../../../../../prisma";
import EditWantedItemForm from "../../_components/EditWantedItemForm";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
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
    <EditModal>
      <h2 className="mb-4 text-lg font-bold">編集</h2>
      <EditWantedItemForm item={item!} />
    </EditModal>
  );
};

export default page;
