import { DeleteWantedItem } from '../../_components/_DeleteWantedItem/DeleteWantedItem';

const page = ({ params }: { params: { id: string } }) => {
  return <DeleteWantedItem params={params} />;
};

export default page;
