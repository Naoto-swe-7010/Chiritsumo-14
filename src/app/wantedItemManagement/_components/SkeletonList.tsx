import React from 'react';

export const SkeletonList = () => {
  return (
    <section className="space-y-4">
      {Array.from({ length: 7 }).map((dummy, index) => (
        <article
          key={index}
          className="mb-4 flex items-center justify-between gap-4 rounded border border-gray-500 bg-gray-900 p-5 shadow-xl"
        >
          <div className="w-full flex-1">
            <div>
              <div className="flex items-end gap-3">
                <div className="h-5 w-1/3 animate-pulse bg-gray-700"></div>
                <div className="h-4 w-1/4 animate-pulse bg-gray-700"></div>
              </div>
              <div className="mt-2 h-4 w-1/4 animate-pulse bg-gray-700"></div>
            </div>
          </div>
          <div>
            <div className="flex flex-col space-y-2">
              <div className="h-8 w-10 animate-pulse rounded bg-gray-700"></div>
              <div className="h-8 w-10 animate-pulse rounded bg-gray-700"></div>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
};
