import React, { useEffect, useState } from "react";
import { saveToStorage, loadFromStorage } from "../utils/storage";
import { getNextSortDirection } from "../utils/sorting";
import PaginationControls from "./PaginationControls";
import TableHeader from "./TableHeader";
import { useNavigate } from "react-router-dom";

function CommentsDashboard() {
  const navigate = useNavigate();

  const [comments, setComments] = useState([]);
  const [searchTerm, setSearchTerm] = useState(loadFromStorage("searchTerm", ""));
  const [sortConfig, setSortConfig] = useState(loadFromStorage("sortConfig", { column: null, direction: null }));
  const [pageSize, setPageSize] = useState(loadFromStorage("pageSize", 10));
  const [currentPage, setCurrentPage] = useState(loadFromStorage("currentPage", 1));

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/comments")
      .then((res) => res.json())
      .then((data) => {
        setComments(data);
      });
  }, []);

  useEffect(() => {
    saveToStorage("searchTerm", searchTerm);
    saveToStorage("sortConfig", sortConfig);
    saveToStorage("pageSize", pageSize);
    saveToStorage("currentPage", currentPage);
  }, [searchTerm, sortConfig, pageSize, currentPage]);

  const handleSort = (column) => {
    let direction = null;
    if (sortConfig.column === column) {
      direction = getNextSortDirection(sortConfig.direction);
    } else {
      direction = "asc";
    }
    setSortConfig({
      column: direction ? column : null,
      direction,
    });
  };

  const filtered = comments.filter((c) => {
    return (
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  let sorted = [...filtered];
  if (sortConfig.column && sortConfig.direction) {
    sorted.sort((a, b) => {
      if (a[sortConfig.column] < b[sortConfig.column]) return sortConfig.direction === "asc" ? -1 : 1;
      if (a[sortConfig.column] > b[sortConfig.column]) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }

  const totalPages = Math.ceil(sorted.length / pageSize);
  const paged = sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div style={{ padding: 20 }}>
      <h2>Comments Dashboard</h2>

      <button onClick={() => navigate("/profile")}>Go to Profile</button>

      <div style={{ margin: "10px 0" }}>
        <input
          placeholder="Search name or email..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setCurrentPage(1);
          }}
          style={{ marginLeft: 10 }}
        >
          <option value={10}>10</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>

      <table border="1" cellPadding="5" style={{ width: "100%" }}>
        <thead>
          <tr>
            <TableHeader
              title="Post ID"
              column="postId"
              sortConfig={sortConfig}
              onSort={handleSort}
            />
            <TableHeader
              title="Name"
              column="name"
              sortConfig={sortConfig}
              onSort={handleSort}
            />
            <TableHeader
              title="Email"
              column="email"
              sortConfig={sortConfig}
              onSort={handleSort}
            />
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
          {paged.map((c) => (
            <tr key={c.id}>
              <td>{c.postId}</td>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.body}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      <p>
        Showing page {currentPage} of {totalPages}
      </p>
    </div>
  );
}

export default CommentsDashboard;
