import { useMemo, useState } from "preact/hooks";

interface FilterState {
  workType: string;
  subject: string;
  dateFrom: string;
  dateTo: string;
  priceMin: string;
  priceMax: string;
  sortBy: string;
  sortOrder: string;
}

export default function FilterPanel() {
  const [filters, setFilters] = useState<FilterState>({
    workType: "",
    subject: "",
    dateFrom: "",
    dateTo: "",
    priceMin: "",
    priceMax: "",
    sortBy: "date",
    sortOrder: "desc",
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const filterOptions = useMemo(() => ({
    workTypes: [
      { value: "", label: "All Types" },
      { value: "coursework", label: "Coursework" },
      { value: "essay", label: "Essay" },
      { value: "notes", label: "Notes" },
      { value: "thesis", label: "Thesis" },
      { value: "lab_report", label: "Lab Report" },
    ],
    subjects: [
      { value: "", label: "All Subjects" },
      { value: "Law", label: "Law" },
      { value: "Math", label: "Mathematics" },
      { value: "Physics", label: "Physics" },
      { value: "Chemistry", label: "Chemistry" },
      { value: "Biology", label: "Biology" },
      { value: "Computer Science", label: "Computer Science" },
      { value: "History", label: "History" },
      { value: "Literature", label: "Literature" },
      { value: "Economics", label: "Economics" },
    ],
    sortOptions: [
      { value: "date", label: "Upload Date" },
      { value: "name", label: "Name" },
      { value: "subject", label: "Subject" },
      { value: "type", label: "Type" },
      { value: "rating", label: "Rating" },
    ],
  }), []);

  const activeFilterCount = useMemo(() => {
    return Object.entries(filters).filter(([key, value]) =>
      key !== "sortBy" && key !== "sortOrder" && value !== ""
    ).length;
  }, [filters]);

  const queryString = useMemo(() => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    return params.toString();
  }, [filters]);

  const updateFilter = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      workType: "",
      subject: "",
      dateFrom: "",
      dateTo: "",
      priceMin: "",
      priceMax: "",
      sortBy: "date",
      sortOrder: "desc",
    });
  };

  const applyFilters = (e: Event) => {
    e.preventDefault();

    const newUrl = queryString ? `/database?${queryString}` : "/database";
    globalThis.history.pushState({}, "", newUrl);

    globalThis.dispatchEvent(
      new CustomEvent("filtersChanged", {
        detail: filters,
      }),
    );
  };

  return (
    <div class="filter-panel-container">
      <div class="filter-header">
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          class="filter-toggle"
          style="display: flex; align-items: center; gap: 8px; background: #3498db; color: white; border: none; padding: 10px 15px; border-radius: 5px; cursor: pointer;"
        >
          <span>🔍 Filters</span>
          {activeFilterCount > 0 && (
            <span style="background: #e74c3c; color: white; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold;">
              {activeFilterCount}
            </span>
          )}
          <span
            style={`transform: rotate(${
              isExpanded ? "180deg" : "0deg"
            }); transition: transform 0.2s;`}
          >
            ▼
          </span>
        </button>

        {activeFilterCount > 0 && (
          <button
            type="button"
            onClick={clearFilters}
            style="background: #e74c3c; color: white; border: none; padding: 8px 12px; border-radius: 5px; cursor: pointer; margin-left: 10px;"
          >
            Clear All
          </button>
        )}
      </div>

      {isExpanded && (
        <form
          class="filter-panel"
          onSubmit={applyFilters}
          style="margin-top: 10px;"
        >
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; padding: 15px; background: #f8f9fa; border-radius: 8px; border: 1px solid #dee2e6;">
            <label style="display: flex; flex-direction: column; gap: 5px;">
              <span style="font-weight: bold; color: #495057;">Work Type:</span>
              <select
                value={filters.workType}
                onChange={(e) =>
                  updateFilter("workType", e.currentTarget.value)}
                style="padding: 8px; border: 1px solid #ced4da; border-radius: 5px; background: white;"
              >
                {filterOptions.workTypes.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label style="display: flex; flex-direction: column; gap: 5px;">
              <span style="font-weight: bold; color: #495057;">Subject:</span>
              <select
                value={filters.subject}
                onChange={(e) => updateFilter("subject", e.currentTarget.value)}
                style="padding: 8px; border: 1px solid #ced4da; border-radius: 5px; background: white;"
              >
                {filterOptions.subjects.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label style="display: flex; flex-direction: column; gap: 5px;">
              <span style="font-weight: bold; color: #495057;">From Date:</span>
              <input
                type="date"
                value={filters.dateFrom}
                onChange={(e) =>
                  updateFilter("dateFrom", e.currentTarget.value)}
                style="padding: 8px; border: 1px solid #ced4da; border-radius: 5px;"
              />
            </label>

            <label style="display: flex; flex-direction: column; gap: 5px;">
              <span style="font-weight: bold; color: #495057;">To Date:</span>
              <input
                type="date"
                value={filters.dateTo}
                onChange={(e) => updateFilter("dateTo", e.currentTarget.value)}
                style="padding: 8px; border: 1px solid #ced4da; border-radius: 5px;"
              />
            </label>

            <label style="display: flex; flex-direction: column; gap: 5px;">
              <span style="font-weight: bold; color: #495057;">
                Min Price (UAH):
              </span>
              <input
                type="number"
                value={filters.priceMin}
                onChange={(e) =>
                  updateFilter("priceMin", e.currentTarget.value)}
                placeholder="0"
                min="0"
                style="padding: 8px; border: 1px solid #ced4da; border-radius: 5px;"
              />
            </label>

            <label style="display: flex; flex-direction: column; gap: 5px;">
              <span style="font-weight: bold; color: #495057;">
                Max Price (UAH):
              </span>
              <input
                type="number"
                value={filters.priceMax}
                onChange={(e) =>
                  updateFilter("priceMax", e.currentTarget.value)}
                placeholder="∞"
                min="0"
                style="padding: 8px; border: 1px solid #ced4da; border-radius: 5px;"
              />
            </label>

            <label style="display: flex; flex-direction: column; gap: 5px;">
              <span style="font-weight: bold; color: #495057;">Sort By:</span>
              <select
                value={filters.sortBy}
                onChange={(e) => updateFilter("sortBy", e.currentTarget.value)}
                style="padding: 8px; border: 1px solid #ced4da; border-radius: 5px; background: white;"
              >
                {filterOptions.sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label style="display: flex; flex-direction: column; gap: 5px;">
              <span style="font-weight: bold; color: #495057;">
                Sort Order:
              </span>
              <select
                value={filters.sortOrder}
                onChange={(e) =>
                  updateFilter("sortOrder", e.currentTarget.value)}
                style="padding: 8px; border: 1px solid #ced4da; border-radius: 5px; background: white;"
              >
                <option value="desc">Newest First</option>
                <option value="asc">Oldest First</option>
              </select>
            </label>
          </div>

          <div style="display: flex; gap: 10px; margin-top: 15px; justify-content: center;">
            <button
              type="submit"
              style="background: #28a745; color: white; padding: 10px 20px; border: none; border-radius: 5px; font-weight: bold; cursor: pointer;"
            >
              Apply Filters
            </button>
            <button
              type="button"
              onClick={clearFilters}
              style="background: #6c757d; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;"
            >
              Reset
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
