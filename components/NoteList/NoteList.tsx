import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Note } from "../../types/note";
import css from "./NoteList.module.css";
import { deleteNote } from "../../lib/api";
import Link from "next/link";

interface NoteListProps {
  data: Note[];
}

export default function NoteList({ data }: NoteListProps) {
  const queryClient = useQueryClient();
  const { mutate: deletenote } = useMutation({
    mutationFn: (notID: string) => deleteNote(notID),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
    },
  });

  const handleDeleteNote = (id: string) => {
    deletenote(id);
    console.log(id);
  };

  return (
    <ul className={css.list}>
      {data.map((note) => {
        return (
          <li className={css.listItem} key={note.id}>
            <h2 className={css.title}>{note.title}</h2>
            <p className={css.content}>{note.content}</p>
            <div className={css.footer}>
              <span className={css.tag}>{note.tag}</span>
              <Link href={`/notes/${note.id}`}>View</Link>
              <button
                onClick={() => handleDeleteNote(note.id)}
                className={css.button}
              >
                Delete
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
