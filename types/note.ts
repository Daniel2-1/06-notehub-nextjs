export interface Note {
  id: string;
  title: string;
  content: string;
  tag: string;
  createdAt: string;
  updatedAt: string;
}

export interface newNoteType {
  content: string;
  title: string;
  tag: string;
}

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}
