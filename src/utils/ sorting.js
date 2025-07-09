export function getNextSortDirection(current) {
  if (current === null) return "asc";
  if (current === "asc") return "desc";
  if (current === "desc") return null;
}
