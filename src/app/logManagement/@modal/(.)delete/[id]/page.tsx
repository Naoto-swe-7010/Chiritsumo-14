import React from 'react';

import { DeleteLog } from '@/app/logManagement/_components/DeleteLog';

const page = ({ params }: { params: { id: string } }) => {
  return <DeleteLog params={params} />;
};

export default page;
