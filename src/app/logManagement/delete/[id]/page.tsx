import EditModal from "@/app/_components/EditModal";
import React from "react";
import { prisma } from "../../../../../prisma";
import { auth } from "../../../../../auth";
import { redirect } from "next/navigation";
import DeleteLogForm from "../DeleteLogForm";

const page = async ({ params }: { params: { id: string } }) => {
  const session = await auth();
  if (!session) {
    redirect("/");
  }
  const { id } = params;

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
      <DeleteLogForm log={log!} />
    </EditModal>
  );
};

export default page;
