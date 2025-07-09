import React from "react";

function PaginationControls({ currentPage, totalPages, onPageChange }) {
  return (
    <div style={{ margin: "10px 0" }}>
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          onClick={() => onPageChange(i + 1)}
          style={{
            fontWeight: currentPage === i + 1 ? "bold" : "normal",
            margin: "0 2px",
          }}
        >
          {i + 1}
        </button>
      ))}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}

export default PaginationControls;
