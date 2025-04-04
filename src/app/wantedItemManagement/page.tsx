import React from 'react';
import { redirect } from 'next/navigation';

import { getSession } from '../lib/commonFunction';
import { AddWantedItem } from './_components/_AddWantedItem/AddWantedItem';
import { PurchasedItemList } from './_components/_PurchasedItemList/PurchasedItemList';
import { WantedItemList } from './_components/_WantedItemList/WantedItemList';

const page = async () => {
  // 認証チェック
  const session = await getSession();
  if (!session) {
    redirect('/');
  }
  return (
    <div className="mb-20 mt-[64px] min-h-[calc(100vh-64px)] pb-10 pt-8">
      <AddWantedItem />
      <WantedItemList />
      <PurchasedItemList />
    </div>
  );
};

export default page;
