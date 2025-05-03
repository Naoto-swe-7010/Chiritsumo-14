import React from 'react';
import { redirect } from 'next/navigation';

import { getSession } from '../lib/commonFunction';
import { CtaSection } from './_components/CtaSection';
import { Features } from './_components/Features';
import { HowToUse } from './_components/HowToUse';
import { Main } from './_components/Main';

const page = async () => {
  const session = await getSession();
  // 認証チェック
  if (session) {
    redirect('/main');
  }
  return (
    <div>
      <Main />
      <Features />
      <HowToUse />
      <CtaSection />
    </div>
  );
};

export default page;
