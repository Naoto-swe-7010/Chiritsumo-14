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
    <div className="flex h-full items-center justify-center" role="loading">
      <div className="text-center text-gray-700">
        <p>{randomNumber}</p>
      </div>
    </div>
  );
};
