import ReactPaginate from "react-paginate";
import css from "../Pagination/Pagination.module.css";

interface PaginationProps {
  totalPages: number;
  page: number;
  setPage: (page: number) => void;
}

export default function Pagination({
  totalPages,
  page,
  setPage,
}: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={totalPages}
      onPageChange={({ selected }) => setPage(selected + 1)}
      breakLabel="..."
      forcePage={page - 1}
      nextLabel="→"
      previousLabel="←"
      containerClassName={css.pagination}
      activeClassName={css.active}
    />
  );
}
