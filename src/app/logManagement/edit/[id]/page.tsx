import EditModal from "@/app/_components/EditModal";
import React from "react";
import { prisma } from "../../../../../prisma";
import EditLogForm from "../EditLogForm";
import { auth } from "../../../../../auth";
import { redirect } from "next/navigation";

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
      <h2 className="mb-4 text-lg font-bold">編集</h2>
      <EditLogForm log={log!} />
    </EditModal>
  );
};

export default page;
