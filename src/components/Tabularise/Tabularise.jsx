import "./tableStyle.css";
import React from "react";
import { TableRow } from "./TableRow";
import { useMemo } from "react";
import { Paginator } from "./Paginator";
import { useState } from "react";

export const Tabularise = ({
  data = [],
  label,
  columns,
  pageSize,
  paginationCount,
}) => {
  const size = pageSize || data?.length;

  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedData = useMemo(() => {
    const start = currentPage * size;
    const end = start + size;
    return data?.slice(start, end);
  }, [data, currentPage, size]);
  return (
    <>
      {label && <div role="heading">{label || "Tabularise"}</div>}

      <table aria-live="polite" className="table" aria-label={`Displaying table content`}>
        <thead>
          <tr className="tbRow">
            {columns?.map((item, idx, c) => (
              <th
                className={`tbHeaderCell tbCell ${
                  idx === 0 ? "firstHeaderCell" : ""
                } ${idx === c?.length - 1 ? "lastHeaderCell" : ""}`}
                key={item.key}
              >
                {item.headerName}
              </th>
            ))}
          </tr>
        </thead>
        {data && data?.length > 0 ? (
          <tbody>
            {paginatedData?.map((row, idx) => (
              <TableRow key={idx} row={row} columns={columns} />
            ))}
          </tbody>
        ) : (
          <tbody>
            <tr className="noData">
              <td aria-label="No data available" colSpan={columns?.length} className="noData">
                No data available
              </td>
            </tr>
          </tbody>
        )}
      </table>

      {pageSize && (
        <Paginator
          pages={Math.ceil(data?.length / pageSize)}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
          paginationCount={paginationCount}
        />
      )}
    </>
  );
};
