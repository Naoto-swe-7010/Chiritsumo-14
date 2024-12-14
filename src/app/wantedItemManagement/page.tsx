import React from "react";
import AddWantedItem from "./_components/AddWantedItem";
import WantedItemList from "./_components/WantedItemList";

const page = async () => {
  return (
    <div className="mb-20 mt-[64px] min-h-[calc(100vh-64px)] pb-10 pt-8">
      <AddWantedItem />
      <WantedItemList />
    </div>
  );
};

export default page;
