import { EditWantedItem } from '@/app/wantedItemManagement/_components/_EditWantedItem/EditWantedItem';

const page = ({ params }: { params: { id: string } }) => {
  return <EditWantedItem params={params} />;
};

export default page;
