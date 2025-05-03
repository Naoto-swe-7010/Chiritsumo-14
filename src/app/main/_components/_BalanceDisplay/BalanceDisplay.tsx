import React, { Suspense } from 'react';

import { NumberLoading } from '@/app/_components/NumberLoading';
import { Balance } from './Balance';

export const BalanceDisplay = () => {
  return (
    <section
      className="mb-16 mt-12 flex h-[225px] flex-col items-center justify-between text-2xl sm:h-[300px]"
      aria-labelledby="balance-title"
    >
      <h2
        id="balance-title"
        className="text-3xl font-bold text-gray-600 sm:text-4xl"
      >
        残高
      </h2>
      <div
        className="text-[100px] font-bold leading-none sm:text-[150px]"
        aria-label="Balance Amount"
      >
        <Suspense fallback={<NumberLoading />}>
          <Balance />
        </Suspense>
      </div>
      <p
        className="text-4xl font-bold text-gray-600 sm:text-5xl"
        role="Currency"
      >
        JPY
      </p>
    </section>
  );
};
