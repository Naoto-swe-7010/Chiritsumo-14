'use client';

import React, { useEffect, useState } from 'react';

export const NumberLoading = () => {
  const [randomNumber, setRandomNumber] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRandomNumber(Math.floor(Math.random() * 10000)); // 0〜9999のランダムな数
    }, 20); // 100msごとに更新

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      className="text-[100px] font-bold leading-none sm:text-[150px]"
      aria-label="Balance Amount"
    >
      <h1 aria-label="balance" className="text-gray-700">
        {randomNumber.toLocaleString()}
      </h1>
    </div>
  );
};
