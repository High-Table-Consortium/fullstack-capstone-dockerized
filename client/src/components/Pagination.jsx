'use client'

import React from 'react';

const Pagination = ({ currentPage, totalPages, onPrev, onNext, onPageChange, itemsPerPage, setItemsPerPage, totalItems }) => {

  const pageNumbers = [];
  const maxPageNumbers = 3; // Show 3 page numbers before adding ellipses

  // Calculate visible page numbers
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      pageNumbers.push(i);
    }
  }

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value));
  };

  return (
    <div className="flex flex-col items-center mt-8 space-y-4">
      {/* Pagination Buttons */}
      <div className="flex items-center space-x-2">
        {/* Previous Button */}
        <button
          onClick={onPrev}
          disabled={currentPage === 1}
          className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          &lt;
        </button>

        {/* Page Numbers */}
        {pageNumbers.map((number, index) => (
          <React.Fragment key={index}>
            {index > 0 && number > pageNumbers[index - 1] + 1 && (
              <span className="px-2 py-1 text-sm">...</span>
            )}
            <button
              onClick={() => onPageChange(number)}
              className={`px-3 py-1 text-sm rounded ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              {number}
            </button>
          </React.Fragment>
        ))}

        {/* Next Button */}
        <button
          onClick={onNext}
          disabled={currentPage === totalPages}
          className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          &gt;
        </button>
      </div>

      {/* Results Summary */}
      <span className="text-sm text-gray-700">
        Results: {itemsPerPage * (currentPage - 1) + 1} -{' '}
        {Math.min(itemsPerPage * currentPage, totalItems)} of {totalItems}
      </span>

      {/* Items Per Page Dropdown */}
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-700">Items per page:</span>
        <select
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded"
        >
          {[8, 10, 15].map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Pagination;
