import React from "react";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
const Pagination = () => {
  const total_pages = useSelector((state) => state.movies.total_pages);
  return (
    <div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        //  onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={15000}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default Pagination;
