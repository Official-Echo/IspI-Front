import { defineRoute, RouteContext } from "$fresh/server.ts";
import AdBanner from "../(_islands)/ad-banner.tsx";
import Recommendations from "../(_islands)/recommendations.tsx";

export default defineRoute(async (req, ctx: RouteContext) => {
  const { id } = ctx.params;
  const parsed_id = parseInt(id);
  const { isAuthenticated, user } = ctx.state as {
    isAuthenticated: boolean;
    user: { subscription: boolean } | null;
  };

  const document = await fetchDocument(parsed_id);
  if (!document) return <h3>Document not found</h3>;

  return (
    <div class="document-page">
      <h3>{document.name}</h3>
      <p>Type: {document.work_type}</p>
      <p>Subject: {document.subject_area}</p>
      <p>Uploaded: {document.upload_date.toLocaleDateString()}</p>
      <p>Preview: {document.preview || "First 100 chars..."}</p>
      {isAuthenticated && user?.subscription && (
        <>
          <button type="button">Download</button>
          <button type="button">Print</button>
          <form action={`/api/rate-document/${parsed_id}`} method="POST">
            <label>Rate (1-5):</label>
            <input type="number" min="1" max="5" name="rating" />
            <button type="submit">Submit Rating</button>
          </form>
          <form action={`/api/complain-document/${parsed_id}`} method="POST">
            <label>Complaint:</label>
            <textarea name="description"></textarea>
            <button type="submit">Submit Complaint</button>
          </form>
        </>
      )}
      <Recommendations documentId={parsed_id} />
      {!isAuthenticated || !user?.subscription && <AdBanner />}
      {!isAuthenticated && (
        <p>
          <a href="/register">Register</a> or{" "}
          <a href="/subscriptions">get a subscription</a> for full access!
        </p>
      )}
      <a href="/cabinet/announcements">Order similar work</a>
    </div>
  );
});

async function fetchDocument(id: number) {
  return {
    id: id,
    name: "Sample Coursework",
    work_type: "coursework",
    subject_area: "Law",
    upload_date: new Date(),
    preview: "This is a preview of the document...",
  };
}
