export const SkeletonTable = () => {
  return (
    <table className="w-full border-collapse text-left text-sm">
      <thead>
        <tr className="bg-black bg-opacity-50">
          <th
            scope="col"
            className="w-3/5 p-2 font-semibold text-gray-200 sm:w-1/2"
          >
            タイトル
          </th>
          <th scope="col" className="w-1/6 p-2 font-semibold text-gray-200">
            値段
          </th>
          <th scope="col" className="w-1/5 p-2 font-semibold text-gray-200">
            日時
          </th>
          <th
            scope="col"
            className="w-1/6 p-2 text-[10px] font-semibold text-gray-200 sm:text-sm"
          >
            アクション
          </th>
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: 15 }).map((dummy, index) => (
          <tr
            key={index}
            className="border-b border-gray-500 bg-black bg-opacity-30"
          >
            <td className="max-w-xs break-words px-3 py-3 text-base sm:max-w-full">
              <div className="h-5 w-2/3 animate-pulse bg-gray-700"></div>
            </td>
            <td className="px-3 py-3 text-base">
              <div className="h-5 w-1/3 animate-pulse bg-gray-700"></div>
            </td>
            <td className="px-3 py-3 text-base">
              <div className="h-5 w-1/2 animate-pulse bg-gray-700"></div>
            </td>
            <td className="px-3 py-3">
              <div className="flex flex-col gap-1">
                <div className="h-8 w-10 animate-pulse rounded bg-gray-700"></div>
                <div className="h-8 w-10 animate-pulse rounded bg-gray-700"></div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
