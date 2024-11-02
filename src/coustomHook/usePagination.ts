import { useState } from 'react';

const usePagination = <T,>(data: T[], itemsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  return {
    currentPage,
    totalPages,
    paginatedData,
    handleNextPage,
    handlePrevPage,
    handlePageClick,
  };
};

export default usePagination;
