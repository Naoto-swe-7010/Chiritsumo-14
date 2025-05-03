export const SkeletonTable = () => {
  return (
    <table className="w-full border-collapse text-left text-sm">
      <thead>
        <tr className="bg-cyan-900 bg-opacity-10">
          <th
            scope="col"
            className="w-3/5 p-2 font-semibold text-gray-600 sm:w-1/2"
          >
            タイトル
          </th>
          <th scope="col" className="w-1/6 p-2 font-semibold text-gray-600">
            値段
          </th>
          <th scope="col" className="w-1/5 p-2 font-semibold text-gray-600">
            日時
          </th>
          <th
            scope="col"
            className="w-1/6 p-2 text-[10px] font-semibold text-gray-600 sm:text-sm"
          >
            アクション
          </th>
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: 15 }).map((dummy, index) => (
          <tr
            key={index}
            className="border-b border-gray-200 bg-gray-100 bg-opacity-50"
          >
            <td className="max-w-xs break-words px-3 py-3 text-base sm:max-w-full">
              <div className="h-5 w-2/3 animate-pulse bg-gray-200"></div>
            </td>
            <td className="px-3 py-3 text-base">
              <div className="h-5 w-1/3 animate-pulse bg-gray-200"></div>
            </td>
            <td className="px-3 py-3 text-base">
              <div className="h-5 w-1/2 animate-pulse bg-gray-200"></div>
            </td>
            <td className="px-3 py-3">
              <div className="flex flex-col gap-1">
                <div className="h-8 w-10 animate-pulse rounded bg-gray-200"></div>
                <div className="h-8 w-10 animate-pulse rounded bg-gray-200"></div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
