import React from 'react';

// SuspenseのFallbackUI
export const LoadingSpinner = ({
  size = 20,
  color = 'border-white'
}: {
  size?: number;
  color?: string;
}) => {
  const sizeStr = size.toString();
  return (
    <div
      className={`animate-spin rounded-full border-4 border-solid border-t-transparent ${color}`}
      style={{
        width: `${sizeStr}px`,
        height: `${sizeStr}px`
      }}
      role="loading"
    ></div>
  );
};
