import React from 'react';
import { redirect } from 'next/navigation';

import { Modal } from '@/app/_components/Modal';
import { getSession } from '@/app/lib/commonFunction';
import { DeleteWantedItemForm } from '@/app/wantedItemManagement/delete/_components/DeleteWantedItemForm';
import { prisma } from '../../../../../../prisma';

const page = async ({ params }: { params: { id: string } }) => {
  // 認証チェック
  const session = await getSession();
  if (!session) {
    redirect('/');
  }
  const { id } = params;

  // 削除対象のアイテムを取得
  let item = null;
  try {
    item = await prisma.wantedItem.findUnique({
      where: {
        id: id
      }
    });
    if (!item) {
      throw new Error('指定されたアイテムが見つかりませんでした。');
    }
  } catch {
    throw new Error('欲しい物リストの取得中にエラーが発生しました。');
  }

  return (
    <Modal>
      <h2 className="mb-4 text-lg font-bold">削除 </h2>
      <DeleteWantedItemForm item={item} />
    </Modal>
  );
};

export default page;
