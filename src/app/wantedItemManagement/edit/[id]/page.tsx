import React from 'react';
import { redirect } from 'next/navigation';

import { Modal } from '@/app/_components/Modal';
import { getSession } from '@/app/lib/commonFunction';
import { EditWantedItemForm } from '../_components/EditWantedItemForm';
import { prisma } from '../../../../../prisma';

const page = async ({ params }: { params: { id: string } }) => {
  // 認証チェック
  const session = await getSession();
  if (!session) {
    redirect('/');
  }
  const { id } = params;
  // 編集対象のアイテムを取得
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
    <div className="mb-20 mt-[64px] min-h-[calc(100vh-64px)]">
      <Modal>
        <h2 className="mb-4 text-lg font-bold">編集</h2>
        <EditWantedItemForm item={item} />
      </Modal>
    </div>
  );
};

export default page;
