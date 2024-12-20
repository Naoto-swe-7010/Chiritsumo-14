import React from "react";

import { prisma } from "../../../../../prisma";
import EditLogForm from "../EditLogForm";
import Modal from "@/app/_components/Modal";

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  // 編集対象のログを取得
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
    <Modal>
      <h2 className="mb-4 text-lg font-bold">編集</h2>
      <EditLogForm log={log!} />
    </Modal>
  );
};

export default page;
