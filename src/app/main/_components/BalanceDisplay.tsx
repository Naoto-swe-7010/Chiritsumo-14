import React, { Suspense } from "react";
import { prisma } from "../../../../prisma";
import Balance from "./Balance";
import Loading from "@/app/_components/Loading";

const BalanceDisplay = async () => {
  return (
    <div className="mb-16 mt-32 flex flex-col items-center text-2xl">
      <h3 className="mb-4 text-2xl font-bold sm:mb-6 sm:text-4xl">残高</h3>
      <div className="h-40 mb-2 text-[100px] font-bold leading-none sm:mb-4 sm:text-[150px]">
        <Suspense fallback={<Loading />}>
          <Balance />
        </Suspense>
      </div>
      <div className="text-4xl font-bold sm:text-5xl">JPY</div>
    </div>
  );
};

export default BalanceDisplay;
