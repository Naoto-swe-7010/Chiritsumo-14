import React from "react";
import AddBalanceForm from "./AddBalanceForm";

const AddBalance = () => {
  return (
    <div className="flex justify-center p-4 text-gray-300 sm:p-6">
      <div className="w-full max-w-lg">
        <h2 className="mb-6 text-center text-xl font-bold text-gray-100 sm:text-2xl">
          <div className="block font-bold">無駄づかいを我慢して</div>
          <div className="block font-bold">欲しい物を手に入れよう！</div>
        </h2>
        <AddBalanceForm />
      </div>
    </div>
  );
};

export default AddBalance;
