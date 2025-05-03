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
    redirect('/signIn');
  }
  return (
    <div>
      <AddWantedItem />
      <WantedItemList />
      <PurchasedItemList />
    </div>
  );
};

export default page;
