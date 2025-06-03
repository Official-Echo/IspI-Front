export default function FilterControls() {
  return (
    <form class="filter-controls">
      <label>
        Work Type:
        <select name="workType">
          <option value="">All</option>
          <option value="coursework">Coursework</option>
          <option value="essay">Essay</option>
        </select>
      </label>
      <label>
        Subject:
        <select name="subject">
          <option value="">All</option>
          <option value="Law">Law</option>
          <option value="Math">Math</option>
        </select>
      </label>
      <label>
        Sort By:
        <select name="sort">
          <option value="date">Date</option>
          <option value="price">Price</option>
        </select>
      </label>
      <button type="submit">Apply</button>
    </form>
  );
}
