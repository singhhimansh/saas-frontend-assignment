import React from "react";
import { useState } from "react";

export const Paginator = ({
  pages,
  currentPage,
  handlePageChange,
  paginationCount = 5,
}) => {
  const  countBothSide = Math.floor(paginationCount / 2);
  return (
    <div className="paginatorBar">
      <button
        tabindex="0"
        aria-label="Previous page"
        className="fixedButton"
        disabled={currentPage <= 0}
        onClick={() => handlePageChange(Math.max(currentPage - 1, 0))}
      >
        Prev
      </button>
      <div className="pageOptions">
        {paginationCount && countBothSide < currentPage   && <span>...</span>}
        {Array.from({ length: pages }, (v, i) => i)
          ?.slice(
            currentPage - countBothSide < 0 ? 0 : currentPage - countBothSide,
            currentPage + countBothSide + 1
          )
          ?.map((v,idx) => {
            return (
              <button
                tabindex={(idx+1).toString()}
                key={v + 1}
                aria-label={`Go to Page ${v + 1}`}
                className={` ${v === currentPage ? "active" : "pageButton"}`}
                onClick={() => handlePageChange(v)}
              >
                {v + 1}
              </button>
            );
          })}
          {paginationCount &&  currentPage < pages- countBothSide -1 && <span>...</span>}
      </div>
      <button
        tabindex={(paginationCount+1).toString()}
        className="fixedButton"
        aria-label="Next page"
        disabled={pages <= currentPage + 1}
        onClick={() => handlePageChange(Math.min(currentPage + 1, pages - 1))}
      >
        Next
      </button>
    </div>
  );
};
