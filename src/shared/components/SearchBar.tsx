import { useState } from "react";
import styles from "./SearchBar.module.css"

interface Props {
  onSearch: (term: string) => void;
}

export const SearchBar = ({ onSearch }: Props) => {
  const { container, input, button } = styles

  const [query, setQuery] = useState<string>("")

  const handleSearch = (): void => {
    const trimmed = query.trim();
    if (!trimmed) return;

    onSearch(trimmed);
    setQuery("");
  }

  return (
    <div className={container}>
      <input className={input}
        type="text"
        value={query}
        placeholder="Buscar Gifs"
        onChange={e => setQuery(e.target.value)}
        onKeyDown={e => e.key === "Enter" && handleSearch()}
      />

      <button className={button}
        type="button"
        onClick={handleSearch}
      >
        Buscar
      </button>
    </div>
  )
}
