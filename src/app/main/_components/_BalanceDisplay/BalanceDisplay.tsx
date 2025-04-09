import React, { Suspense } from 'react';

import { Loading } from '@/app/_components/Loading';
import { Balance } from './Balance';

export const BalanceDisplay = () => {
  return (
    <section
      className="mb-16 mt-12 flex h-[225px] flex-col items-center justify-between text-2xl sm:h-[300px]"
      aria-labelledby="balance-title"
    >
      <h2 id="balance-title" className="text-3xl font-bold sm:text-4xl">
        残高
      </h2>
      <div
        className="text-[100px] font-bold leading-none sm:text-[150px]"
        aria-label="Balance Amount"
      >
        <Suspense fallback={<Loading />}>
          <Balance />
        </Suspense>
      </div>
      <p className="text-4xl font-bold sm:text-5xl" role="Currency">
        JPY
      </p>
    </section>
  );
};
