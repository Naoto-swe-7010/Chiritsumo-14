import EditModal from "@/app/_components/EditModal";
import React from "react";
import { prisma } from "../../../../../prisma";
import DeleteWantedItemForm from "../../_components/DeleteWantedItemForm";
import { auth } from "../../../../../auth";
import { redirect } from "next/navigation";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const session = await auth();
  if (!session) {
    redirect("/");
  }

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
      <h2 className="mb-4 text-lg font-bold">削除</h2>
      <DeleteWantedItemForm item={item!} />
    </EditModal>
  );
};

export default page;
