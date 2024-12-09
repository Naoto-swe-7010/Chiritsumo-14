import EditModal from "@/app/_components/EditModal";
import React from "react";
import EditForm from "../../_components/editForm";
import { prisma } from "../../../../../prisma";

const page = async ({
  params: { id },
}: {
  params: {
    id: string;
  };
}) => {
  let log = null; // スコープを広げるために外で宣言

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
      <h2 className="mb-4 text-lg font-bold">編集</h2>
      <EditForm log={log!} />
    </EditModal>
  );
};

export default page;
