import React from 'react';
import { redirect } from 'next/navigation';

import { Modal } from '@/app/_components/Modal';
import { getSession } from '@/app/lib/commonFunction';
import { PurchaseForm } from '@/app/main/purchaseWantedItem/_components/PurchaseForm';
import { prisma } from '../../../../../../prisma';

const page = async ({ params }: { params: { id: string } }) => {
  // 認証チェック
  const session = await getSession();
  if (!session) {
    redirect('/');
  }

  const { id } = params;

  // 削除対象のログを取得
  let item = null;
  try {
    item = await prisma.wantedItem.findUnique({
      where: { id }
    });
    if (!item) {
      throw new Error('指定されたアイテムが見つかりませんでした。');
    }
  } catch {
    return (
      <Modal>
        <div className="text-center text-red-500">
          <p>アイテムの取得中にエラーが発生しました。</p>
          <p>再度お試しください。</p>
        </div>
      </Modal>
    );
  }

  return (
    <Modal>
      <h2 className="mb-4 text-lg font-bold text-white sm:text-xl">購入</h2>
      <div className="rounded border border-gray-300 bg-gray-900 p-4 shadow-md">
        <div className="flex items-start gap-3">
          <div>
            <h3 className="text-xl font-semibold text-gray-100">{item.name}</h3>
            <p className="text-sm text-gray-500 sm:text-base">
              Price: ¥{item.price.toLocaleString()}
            </p>
          </div>
          {item.url && (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto text-sm text-blue-500 underline hover:text-blue-700"
            >
              詳細を見る
            </a>
          )}
        </div>
      </div>
      <div className="mt-6">
        <PurchaseForm item={item} />
      </div>
    </Modal>
  );
};

export default page;
