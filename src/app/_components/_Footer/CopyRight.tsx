import React from 'react';

export const CopyRight = () => {
  return (
    <section
      className="container mx-auto hidden text-center sm:block"
      aria-label="コピーライト"
    >
      <small className="text-sm text-gray-500">
        &copy; {new Date().getFullYear()} ちりつも. All Rights Reserved.
      </small>
    </section>
  );
};
