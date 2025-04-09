import React from 'react';

import { PurchaseWantedItem } from '../../_components/_purchaseWantedItem/PurchaseWantedItem';

const page = ({ params }: { params: { id: string } }) => {
  return <PurchaseWantedItem params={params} />;
};
export default page;
