import React from 'react';

import { AddWantedItemForm } from './AddWantedItemForm';

export const AddWantedItem = () => {
  return (
    <div>
      <h1 className="mb-4 pl-1 text-xl font-bold text-gray-600 sm:text-2xl">
        欲しい物
      </h1>
      <AddWantedItemForm />
    </div>
  );
};
