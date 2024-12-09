import EditModal from "@/app/_components/EditModal";
import React from "react";
import DeleteForm from "@/app/logManagement/_components/deleteForm";
import { prisma } from "../../../../../prisma";

const page = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const id = params.id;
  let log = null;

  try {
    log = await prisma.log.findUnique({
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
      <DeleteForm log={log!} />
    </EditModal>
  );
};

export default page;
