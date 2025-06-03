import { useState } from "preact/hooks";

export default function FilterPanel() {
  const [workType, setWorkType] = useState("");
  const [subject, setSubject] = useState("");
  const [dateFrom, setDateFrom] = useState("");

  return (
    <form class="filter-panel">
      <label>
        Work Type:
        <select
          value={workType}
          onChange={(e) => setWorkType(e.currentTarget.value)}
        >
          <option value="">All</option>
          <option value="coursework">Coursework</option>
          <option value="essay">Essay</option>
          <option value="notes">Notes</option>
        </select>
      </label>
      <label>
        Subject:
        <select
          value={subject}
          onChange={(e) => setSubject(e.currentTarget.value)}
        >
          <option value="">All</option>
          <option value="Law">Law</option>
          <option value="Math">Math</option>
          <option value="Physics">Physics</option>
        </select>
      </label>
      <label>
        From Date:
        <input
          type="date"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.currentTarget.value)}
        />
      </label>
      <button type="submit">Apply Filters</button>
    </form>
  );
}
