import { redirect } from 'next/navigation';

import { SignIn } from './_components/_SignIn/SignIn';
import { getSession } from './lib/commonFunction';

const Home = async () => {
  const session = await getSession();
  // 認証チェック
  if (session) {
    redirect('/main');
  }
  return <SignIn />;
};

export default Home;
