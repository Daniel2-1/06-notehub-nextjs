import css from "./SearchBox.module.css";
import { DebouncedState } from "use-debounce";

interface SearchBoxProps {
  onSearch: DebouncedState<(query: string) => void>;
   searchQueryProp: string;
}

export default function SearchBox({ onSearch, searchQueryProp }: SearchBoxProps) {
  const handleA = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };
  return (
    <div>
      <input
        onChange={handleA}
        className={css.input}
        type="text"
        placeholder="Search notes"
        defaultValue={searchQueryProp}
      />
    </div>
  );
}
