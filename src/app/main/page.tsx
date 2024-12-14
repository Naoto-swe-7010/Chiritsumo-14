import React from "react";
import BalanceDisplay from "./_components/BalanceDisplay";
import AddBalance from "./_components/AddBalance";
import BalanceProgress from "./_components/BalanceProgress";

const page = async () => {
  return (
    <div className="mb-20 mt-[64px] min-h-[calc(100vh-64px)]">
      <BalanceDisplay />
      <AddBalance />
      <BalanceProgress />
    </div>
  );
};

export default page;
