import React from "react";

const LoadingSpinner = ({
  size = 20,
  color = "border-white",
}: {
  size?: number;
  color?: string;
}) => {
  return (
    <div
      className={`border-4 border-t-transparent border-solid rounded-full animate-spin ${color}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    ></div>
  );
};

export default LoadingSpinner;
