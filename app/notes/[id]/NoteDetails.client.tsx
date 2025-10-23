"use client";

import { fetchNoteById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function NoteDetails() {
  const { id } = useParams<{ id: string }>();

  const {
    data: response,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    enabled: !!id,
  });

  if (isLoading) {
    return <p>Loading, please wait...</p>;
  }

  if (isError || !response) {
    return <p>Something went wrong.</p>;
  }

  return (
    <div>
      <div>
        <div>
          <h2>{response?.title}</h2>
        </div>
        <p>{response?.content}</p>
        <p>{new Date(response.createdAt).toLocaleString()}</p>
      </div>
    </div>
  );
}
