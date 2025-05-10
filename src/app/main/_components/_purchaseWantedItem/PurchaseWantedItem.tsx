import React from 'react';
import { redirect } from 'next/navigation';

import { Modal } from '@/app/_components/Modal';
import { getSession } from '@/app/lib/commonFunction';
import { prisma } from '../../../../../prisma';
import { PurchaseForm } from './PurchaseForm';

export const PurchaseWantedItem = async ({
  params
}: {
  params: { id: string };
}) => {
  // 認証チェック
  const session = await getSession();
  if (!session) {
    redirect('/');
  }

  // パラメーター取得
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
      <h2 className="mb-4 text-lg font-bold text-gray-600 sm:text-xl">購入</h2>
      <div className="rounded bg-gray-200 p-4 shadow-lg">
        <div className="flex items-start gap-3">
          <div>
            <h3 className="text-xl font-semibold">{item.name}</h3>
            <p className="text-sm text-gray-600 sm:text-base">
              Price: ¥{item.price.toLocaleString()}
            </p>
          </div>
          {item.url && (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto text-cyan-600 underline"
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
