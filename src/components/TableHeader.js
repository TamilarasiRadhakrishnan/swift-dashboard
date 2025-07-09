import React from "react";

function TableHeader({ title, column, sortConfig, onSort }) {
  let arrow = "";
  if (sortConfig.column === column) {
    arrow = sortConfig.direction === "asc" ? "▲" : sortConfig.direction === "desc" ? "▼" : "";
  }

  return (
    <th style={{ cursor: "pointer" }} onClick={() => onSort(column)}>
      {title} {arrow}
    </th>
  );
}

export default TableHeader;
