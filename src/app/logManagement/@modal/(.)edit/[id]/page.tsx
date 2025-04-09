import { EditLog } from '../../../_components/EditLog';

const page = ({ params }: { params: { id: string } }) => {
  return <EditLog params={params} />;
};

export default page;
