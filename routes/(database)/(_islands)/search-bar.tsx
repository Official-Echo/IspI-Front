import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";

export default function SearchBar() {
  const query = useSignal("");

  useEffect(() => {
    const urlParams = new URLSearchParams(globalThis.location.search);
    const currentQuery = urlParams.get("query");
    if (currentQuery) {
      query.value = currentQuery;
      console.log("SearchBar: Initialized with query:", currentQuery);
    }
  }, []);

  const performSearch = () => {
    console.log("SearchBar: Performing search with:", query.value);

    const url = new URL(globalThis.location.href);

    if (query.value.trim()) {
      url.searchParams.set("query", query.value.trim());
    } else {
      url.searchParams.delete("query");
    }

    globalThis.history.pushState({}, "", url.toString());

    const event = new CustomEvent("searchChanged", {
      detail: {
        query: query.value.trim(),
        allParams: Object.fromEntries(url.searchParams.entries()),
      },
    });

    console.log("SearchBar: Dispatching event:", event.detail);
    globalThis.dispatchEvent(event);
  };

  const handleSearch = (e?: Event) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    performSearch();
  };

  const handleInputChange = (e: Event) => {
    const target = e.currentTarget as HTMLInputElement;
    query.value = target.value;
  };

  const handleClearSearch = (e: Event) => {
    e.preventDefault();
    query.value = "";
    performSearch();
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      console.log("SearchBar: Enter key pressed, triggering search");

      if (!query.value.trim()) {
        console.log("SearchBar: Empty search - showing all documents");
      }

      (e.target as HTMLInputElement).blur();

      handleSearch();
    }
  };

  return (
    <div style="display: flex; margin: 10px 0;">
      <div style="display: flex; flex: 1;">
        <input
          type="text"
          value={query.value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Search documents... (try 'law', 'notes', 'physics')"
          style="flex: 1; padding: 10px; border: 1px solid #ced4da; border-radius: 5px 0 0 5px; font-size: 16px;"
        />
        <button
          type="button"
          onClick={() => handleSearch()}
          style="padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 0 5px 5px 0; cursor: pointer; font-size: 16px;"
        >
          🔍 Search
        </button>
      </div>
      {query.value && (
        <button
          type="button"
          onClick={handleClearSearch}
          style="padding: 10px 15px; background: #6c757d; color: white; border: none; border-radius: 5px; cursor: pointer; margin-left: 5px;"
        >
          ✕ Clear
        </button>
      )}
    </div>
  );
}
