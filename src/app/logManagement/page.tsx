import React from "react";

import LogTable from "./_components/LogTable";
import Pagination from "./_components/Pagination";

const page = async () => {
  return (
    <div className="mb-20 mt-[64px] min-h-[calc(100vh-64px)] pb-10 pt-8">
      <div>
        <h1 className="mb-4 pl-1 text-xl font-bold text-gray-100 sm:text-2xl">
          ログ
        </h1>
        <LogTable />
        <Pagination />
      </div>
    </div>
  );
};

export default page;
