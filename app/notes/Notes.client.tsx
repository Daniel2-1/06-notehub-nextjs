'use client'
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchNotes } from "../../lib/api";
import SearchBox from "../../components/SearchBox/SearchBox";
import NoteList from "../../components/NoteList/NoteList";
import { useState } from "react";
import Pagination from "../../components/Pagination/Pagination";
import Modal from "../../components/Modal/Modal";
import NoteForm from "../../components/NoteForm/NoteForm";
import { useDebouncedCallback } from "use-debounce";
import css from '../../components/NotesPage/NotesPage.module.css'

function NotesClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [searchQuery, setQuery] = useState("");

  const { data, isSuccess } = useQuery({
    queryKey: ["notes", page, searchQuery], 
    queryFn: () => fetchNotes(page, searchQuery),
    placeholderData: keepPreviousData,
  });

  const handleQuery = useDebouncedCallback((query: string) => {
    setQuery(query);
    setPage(1);
  }, 300);

  const totalPages = data?.totalPages || 1;
  const onCloseModal = () => setIsModalOpen(false);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={handleQuery} searchQueryProp={searchQuery} />
        {totalPages > 1 && isSuccess && (
          <Pagination totalPages={totalPages} page={page} setPage={setPage} />
        )}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create Note +
        </button>
      </header>
      {data && data?.notes.length > 0 && <NoteList data={data?.notes} />}
      {isModalOpen && (
        <Modal onClose={onCloseModal}>
          <NoteForm onClose={onCloseModal} />
        </Modal>
      )}
    </div>
  );
}

export default NotesClient;
