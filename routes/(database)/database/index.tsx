import { defineRoute, RouteContext } from "$fresh/server.ts";
import DocumentCard from "../(_components)/document-card.tsx";
import FilterPanel from "../(_islands)/filter-panel.tsx";

export default defineRoute(async (req, ctx: RouteContext) => {
  const { isAuthenticated, user } = ctx.state as {
    isAuthenticated: boolean;
    user: { subscription: boolean } | null;
  };

  const documents = await fetchDocuments({ limit: 20 });

  return (
    <div class="database">
      <h3>Search Documents</h3>
      <FilterPanel />
      <div class="document-list">
        {documents.map((doc) => (
          <DocumentCard
            key={doc.id}
            id={doc.id}
            name={doc.name}
            workType={doc.work_type}
            subjectArea={doc.subject_area}
            uploadDate={doc.upload_date}
            canInteract={isAuthenticated && (user?.subscription ?? false)}
          />
        ))}
      </div>
      {!isAuthenticated && (
        <p>
          <a href="/register">Register</a> or{" "}
          <a href="/subscriptions">get a subscription</a> to download and rate!
        </p>
      )}
    </div>
  );
});

async function fetchDocuments({ limit }: { limit: number }) {
  return [
    {
      id: 1,
      name: "Sample Coursework",
      work_type: "coursework",
      subject_area: "Law",
      upload_date: new Date(),
    },
  ];
}
