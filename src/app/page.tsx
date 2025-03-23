import { redirect } from 'next/navigation';

import { getSession } from './lib/commonFunction';
import { SignIn } from './SignIn';

const Home = async () => {
  const session = await getSession();
  // 認証チェック
  if (session) {
    redirect('/main');
  }
  return <SignIn />;
};

export default Home;
