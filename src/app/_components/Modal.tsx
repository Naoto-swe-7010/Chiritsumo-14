import React from 'react';

export const Modal = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-sm rounded-lg bg-white p-4 shadow-lg sm:max-w-md sm:p-6 md:max-w-lg lg:max-w-xl">
        {children}
      </div>
    </div>
  );
};
