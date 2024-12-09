const RowSkeleton = () => {
  return (
    <>
      {Array.from({ length: 15 }).map((_, index) => (
        <tr
          key={index}
          className="border-b border-gray-500 bg-black bg-opacity-30"
        >
          <td className="max-w-xs break-words py-2 px-3">
            <div className="h-4 w-3/4 bg-gray-600 animate-pulse rounded"></div>
          </td>
          <td className="py-2 p-3">
            <div className="h-4 w-1/2 bg-gray-600 animate-pulse rounded"></div>
          </td>
          <td className="py-2 p-3">
            <div className="h-4 w-3/4 bg-gray-600 animate-pulse rounded"></div>
          </td>
          <td className="py-2 p-3">
            <div className="flex flex-col gap-1">
              <div className="h-8 w-8 bg-gray-600 animate-pulse rounded"></div>
              <div className="h-8 w-8 bg-gray-600 animate-pulse rounded"></div>
            </div>
          </td>
        </tr>
      ))}
    </>
  );
};

export default RowSkeleton;
