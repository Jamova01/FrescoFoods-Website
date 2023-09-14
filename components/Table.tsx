export const Table = ({
  columns,
  rows,
}: {
  columns: string[];
  rows: any[];
}) => {
  return (
    <div className="relative overflow-auto shadow-md sm:rounded-lg max-h-96">
      <table className="w-full text-sm text-left dark:text-slate-800">
        <thead className="text-xs uppercase bg-blue-500 dark:text-white sticky top-0 z-10">
          <tr>
            {columns?.map((column, index) => (
              <th key={index} scope="col" className="px-6 py-3">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="">
          {rows?.map((row, rowIndex) => (
            <tr key={rowIndex} className="bg-white">
              {columns?.map((column, colIndex) => (
                <td key={colIndex} className="px-6 py-4">
                  {row[column]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
