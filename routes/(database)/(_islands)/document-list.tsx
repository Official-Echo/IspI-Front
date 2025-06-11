import { useEffect, useState } from "preact/hooks";
import DocumentCard from "../(_components)/document-card.tsx";
import type { Subscription } from "../../../types/basic.ts";

export default function DocumentList({
  initialDocuments,
  isAuthenticated,
  userSubscription,
}: {
  initialDocuments: any[];
  isAuthenticated: boolean;
  userSubscription: Subscription;
}) {
  const [documents, setDocuments] = useState(initialDocuments);
  const [loading, setLoading] = useState(false);
  const [currentFilters, setCurrentFilters] = useState<any>({});

  useEffect(() => {
    console.log("DocumentList: Component mounted");

    const urlParams = new URLSearchParams(globalThis.location.search);
    const initialFilters = Object.fromEntries(urlParams.entries());

    console.log("DocumentList: URL params:", globalThis.location.search);
    console.log("DocumentList: Initial filters:", initialFilters);

    if (Object.keys(initialFilters).length > 0) {
      setCurrentFilters(initialFilters);
      fetchDocuments(initialFilters);
    }

    const handleSearchChange = (event: CustomEvent) => {
      console.log("DocumentList: Received searchChanged event:", event.detail);
      const { query, allParams } = event.detail;
      setCurrentFilters(allParams);
      fetchDocuments(allParams);
    };

    const handleFiltersChange = (event: CustomEvent) => {
      console.log("DocumentList: Received filtersChanged event:", event.detail);
      const filters = event.detail;
      setCurrentFilters(filters);
      fetchDocuments(filters);
    };

    console.log("DocumentList: Adding event listeners");
    globalThis.addEventListener(
      "searchChanged",
      handleSearchChange as EventListener,
    );
    globalThis.addEventListener(
      "filtersChanged",
      handleFiltersChange as EventListener,
    );

    return () => {
      console.log("DocumentList: Removing event listeners");
      globalThis.removeEventListener(
        "searchChanged",
        handleSearchChange as EventListener,
      );
      globalThis.removeEventListener(
        "filtersChanged",
        handleFiltersChange as EventListener,
      );
    };
  }, []);

  const fetchDocuments = async (filters: any) => {
    console.log("DocumentList: Fetching documents with filters:", filters);
    setLoading(true);

    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.set(key, value as string);
      });

      const apiUrl = `/api/documents?${params.toString()}`;
      console.log("DocumentList: Fetching from API:", apiUrl);

      const response = await fetch(apiUrl);

      if (response.ok) {
        const newDocuments = await response.json();
        console.log(
          "DocumentList: Received documents:",
          newDocuments.length,
          "documents",
        );

        setDocuments(newDocuments);
      } else {
        console.error(
          "DocumentList: Failed to fetch documents, status:",
          response.status,
        );
      }
    } catch (error) {
      console.error("DocumentList: Error fetching documents:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style="text-align: center; padding: 40px;">
        <p>🔍 Searching documents...</p>
      </div>
    );
  }

  return (
    <div>
      <div style="background: #f0f0f0; padding: 10px; margin: 10px 0; border-radius: 5px; font-size: 12px;">
        <strong>Debug:</strong> Current filters:{" "}
        {JSON.stringify(currentFilters)}
        <br />
        <strong>Documents count:</strong> {documents.length}
        <br />
        <strong>Initial docs count:</strong> {initialDocuments.length}
      </div>

      {currentFilters.query && (
        <div style="background: #fff3cd; padding: 10px; border-radius: 5px; margin: 10px 0; border: 1px solid #ffeaa7;">
          <strong>🔍 Searching for:</strong> "{currentFilters.query}"
          <small style="display: block; margin-top: 5px; color: #666;">
            Found {documents.length} documents
          </small>
        </div>
      )}

      {Object.entries(currentFilters).some(([key, value]) =>
        key !== "sortBy" && key !== "sortOrder" && value
      ) && (
        <div style="background: #e3f2fd; padding: 10px; border-radius: 5px; margin: 10px 0;">
          <strong>Active filters:</strong>
          {currentFilters.workType && (
            <span style="margin: 0 5px; padding: 2px 8px; background: #2196f3; color: white; border-radius: 3px; font-size: 12px;">
              Type: {currentFilters.workType}
            </span>
          )}
          {currentFilters.subject && (
            <span style="margin: 0 5px; padding: 2px 8px; background: #2196f3; color: white; border-radius: 3px; font-size: 12px;">
              Subject: {currentFilters.subject}
            </span>
          )}
          {currentFilters.query && (
            <span style="margin: 0 5px; padding: 2px 8px; background: #2196f3; color: white; border-radius: 3px; font-size: 12px;">
              Search: "{currentFilters.query}"
            </span>
          )}
        </div>
      )}

      <div class="document-list">
        {documents.map((doc) => (
          <DocumentCard
            key={doc.id}
            id={doc.id}
            name={doc.name}
            workType={doc.work_type}
            subjectArea={doc.subject_area}
            uploadDate={new Date(doc.upload_date)}
            canInteract={isAuthenticated &&
              (userSubscription === "Бібліотекар" ||
                userSubscription === "Захист+" ||
                userSubscription === "Меценат")}
          />
        ))}
      </div>

      {documents.length === 0 && (
        <div style="text-align: center; padding: 40px; color: #6c757d;">
          <h4>No documents found</h4>
          <p>Try adjusting your search terms or filters.</p>
          {currentFilters.query && (
            <p>
              No results for: "<strong>{currentFilters.query}</strong>"
            </p>
          )}
          <p>
            <em>Try searching for: "law", "notes", "physics", or "essay"</em>
          </p>
        </div>
      )}
    </div>
  );
}
