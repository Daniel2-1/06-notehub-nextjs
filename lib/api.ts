import { NotesResponse } from "./../types/note";
import axios from "axios";
import { newNoteType, Note } from ".././types/note";
axios.defaults.baseURL = "https://notehub-public.goit.study/api";
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;


export const fetchNotes = async (
  page: number,
  query: string
): Promise<NotesResponse> => {
  const response = await axios.get<NotesResponse>("/notes", {
    params: {
      page,
      perPage: 12,
      search: query,
    },
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return response.data;
};

export const createNote = async (newNote: newNoteType) => {
  const response = await axios.post<Note>("/notes", newNote, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return response.data;
};

export const deleteNote = async (noteId: string) => {
  const response = await axios.delete<Note>(`/notes/${noteId}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return response.data;
};

export const fetchNoteById = async (noteId: string) => {
  const response = await axios.get<Note>(`/notes/${noteId}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return response.data;
};