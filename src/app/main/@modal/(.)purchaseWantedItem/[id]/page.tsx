import React from 'react';

import { PurchaseWantedItem } from '@/app/main/_components/_purchaseWantedItem/PurchaseWantedItem';

const page = ({ params }: { params: { id: string } }) => {
  return <PurchaseWantedItem params={params} />;
};
export default page;
