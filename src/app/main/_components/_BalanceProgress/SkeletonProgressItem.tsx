import React from 'react';

export const SkeletonProgressItem = () => {
  return (
    <div className="flex justify-center p-4 sm:p-6">
      <div className="w-full max-w-2xl">
        <h2 className="mb-4 mt-12 text-center text-xl font-bold sm:text-2xl">
          <span className="border-b-2 border-cyan-500">欲しい物リスト進捗</span>
        </h2>
        {Array.from({ length: 10 }).map((dummy, index) => (
          <article
            key={index}
            className="mb-4 animate-pulse rounded bg-gray-100 p-4 shadow-lg"
          >
            <div>
              <div className="flex justify-between">
                <div>
                  <div className="flex flex-col items-start gap-1 sm:flex-row sm:items-end sm:gap-3">
                    <div className="h-6 w-32 rounded bg-gray-300"></div>
                    <div className="h-4 w-20 rounded bg-gray-300"></div>
                  </div>
                  <div className="mt-2 h-4 w-24 rounded bg-gray-300"></div>
                </div>
                <div className="h-8 w-16 rounded bg-gray-300"></div>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <div className="relative h-2 w-full rounded bg-gray-300">
                  <div className="absolute left-0 top-0 h-2 w-1/2 rounded bg-gray-400"></div>
                </div>
                <div className="h-4 w-8 rounded bg-gray-300"></div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
