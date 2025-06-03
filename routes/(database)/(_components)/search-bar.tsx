export default function SearchBar() {
  return (
    <form action="/database" method="GET" class="search-bar">
      <input type="text" name="query" placeholder="Search documents..." />
      <button type="submit">Search</button>
    </form>
  );
}
