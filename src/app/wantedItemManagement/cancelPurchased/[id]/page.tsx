import { CancelPurchased } from '../../_components/_CancelPurchased/CancelPurchased';

const page = ({ params }: { params: { id: string } }) => {
  return <CancelPurchased params={params} />;
};

export default page;
