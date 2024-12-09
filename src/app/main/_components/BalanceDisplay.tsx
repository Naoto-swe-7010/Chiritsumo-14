import React, { Suspense } from "react";
import Balance from "./Balance";
import Loading from "@/app/_components/Loading";

const BalanceDisplay = async () => {
  return (
    <div className="mb-16 mt-32 flex flex-col items-center justify-between text-2xl h-[225px] sm:h-[300px]">
      <h3 className="text-3xl font-bold sm:text-4xl">残高</h3>
      <div className="text-[100px] font-bold leading-none sm:text-[150px]">
        <Suspense fallback={<Loading />}>
          <Balance />
        </Suspense>
      </div>
      <div className="text-4xl font-bold sm:text-5xl">JPY</div>
    </div>
  );
};

export default BalanceDisplay;
