
import React, {
  useRef,
  useState
} from "react";

import TaskList from "./TaskList";

function SearchBar() {
  const [query, setQuery] = useState("");
  const searchRef = useRef(null);

  function handleSearch(e) {
    setQuery(e.target.value);
  }

  function handleClear() {
    setQuery("");
    searchRef.current?.focus();
  }

  return (
    <div>
      <input
        ref={searchRef}
        type="text"
        placeholder="Search tasks..."
        value={query}
        onChange={handleSearch}
      />

      <button
        type="button"
        onClick={handleClear}
      >
        Clear Search
      </button>

      <TaskList query={query} />
    </div>
  );
}

export default SearchBar;
