import { redirect } from 'next/navigation';

import { getSession } from './lib/commonFunction';

const Home = async () => {
  const session = await getSession();
  // 認証チェック
  if (session) {
    // メインページ
    redirect('/main');
  }
  // サインインページ
  redirect('/signIn');
};

export default Home;
