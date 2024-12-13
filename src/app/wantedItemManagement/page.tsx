import React from "react";
import AddWantedItem from "./_components/AddWantedItem";
import WantedItemList from "./_components/WantedItemList";
import { auth } from "../../../auth";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth();
  if (!session) {
    redirect("/");
  }
  return (
    <div className="mb-20 mt-[64px] min-h-[calc(100vh-64px)] pb-10 pt-8">
      <AddWantedItem />
      <WantedItemList />
    </div>
  );
};

export default page;
