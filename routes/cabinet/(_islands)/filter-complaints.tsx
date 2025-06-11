import { useState } from "preact/hooks";

export default function FilterComplaints() {
  const [plaintiff, setPlaintiff] = useState("");
  const [status, setStatus] = useState("");

  const handleFilter = (e: Event) => {
    e.preventDefault();

    const url = new URL(globalThis.location.href);
    url.searchParams.set("plaintiff", plaintiff);
    url.searchParams.set("status", status);
    globalThis.location.href = url.toString();
  };

  return (
    <form class="filter-complaints" onSubmit={handleFilter}>
      <label>
        Plaintiff:
        <select
          value={plaintiff}
          onChange={(e) => setPlaintiff(e.currentTarget.value)}
        >
          <option value="">All</option>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>
      </label>
      <label>
        Status:
        <select
          value={status}
          onChange={(e) => setStatus(e.currentTarget.value)}
        >
          <option value="">All</option>
          <option value="regular">Regular</option>
          <option value="important">Important</option>
          <option value="resolved">Resolved</option>
        </select>
      </label>
      <button type="submit">Apply Filters</button>
    </form>
  );
}
