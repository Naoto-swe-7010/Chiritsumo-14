import EditModal from "@/app/_components/EditModal";
import React from "react";
import { prisma } from "../../../../../prisma";
import DeleteWantedItemForm from "../../_components/DeleteWantedItemForm";

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
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
      <h2 className="mb-4 text-lg font-bold">削除</h2>
      <DeleteWantedItemForm item={item!} />
    </EditModal>
  );
};

export default page;
