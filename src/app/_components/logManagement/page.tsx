import React from "react";
import { redirect } from "next/navigation";

import { auth } from "../../../../auth";
import LogTable from "@/app/logManagement/_components/LogTable";
import Pagination from "@/app/logManagement/_components/Pagination";

const page = async () => {
  const session = await auth();
  !session && redirect("/");

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
