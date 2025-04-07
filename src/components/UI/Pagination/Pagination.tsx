import React from "react";
import "./Pagination.css";
import Pagination from "@mui/material/Pagination";

type PaginatedContainerProps = {
  length: number;
  elementsPerPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
};

const PaginationContainer = ({
  length,
  elementsPerPage,
  setPage,
  currentPage,
}: PaginatedContainerProps) => {
  const pages = [];
  for (let i = 1; i <= Math.ceil(length / elementsPerPage); i++) {
    pages.push(i);
  }
  if (pages.length === 1 || pages.length === 0) return null;

  return (
    <div className="pagination row-center">
      <Pagination
        count={pages.length}
        page={currentPage}
        onChange={(e, page) => setPage(page)}
        size={window.innerWidth <= 1080 ? "small" : "large"}
      />
    </div>
  );
};

export default PaginationContainer;
