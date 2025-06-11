import { defineRoute, RouteContext } from "$fresh/server.ts";
import AdBanner from "../(_islands)/ad-banner.tsx";
import Recommendations from "../(_islands)/recommendations.tsx";
import BackButton from "../(_islands)/back-button.tsx";

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
      <div class="document-header">
        <BackButton />
        <h3>{document.name}</h3>
      </div>

      <div class="document-details">
        <p>
          <strong>Type:</strong> {document.work_type}
        </p>
        <p>
          <strong>Subject:</strong> {document.subject_area}
        </p>
        <p>
          <strong>Uploaded:</strong> {document.upload_date.toLocaleDateString()}
        </p>
        <div class="document-preview">
          <p>
            <strong>Preview:</strong>
          </p>
          <p>{document.preview || "First 100 chars..."}</p>
        </div>
      </div>

      {isAuthenticated && user?.subscription && (
        <div class="document-actions">
          <button type="button" class="action-btn download-btn">
            📥 Download
          </button>
          <button type="button" class="action-btn print-btn">🖨️ Print</button>

          <div class="rating-section">
            <form action={`/api/rate-document/${parsed_id}`} method="POST">
              <label>Rate this document (1-5):</label>
              <div class="rating-input">
                <input type="number" min="1" max="5" name="rating" required />
                <button type="submit" class="action-btn rating-btn">
                  ⭐ Submit Rating
                </button>
              </div>
            </form>
          </div>

          <div class="complaint-section">
            <form action={`/api/complain-document/${parsed_id}`} method="POST">
              <label>Report an issue with this document:</label>
              <textarea
                name="description"
                placeholder="Describe the issue..."
                required
              >
              </textarea>
              <button type="submit" class="action-btn complaint-btn">
                🚨 Submit Complaint
              </button>
            </form>
          </div>
        </div>
      )}

      <Recommendations documentId={parsed_id} />

      {(!isAuthenticated || !user?.subscription) && <AdBanner />}

      {!isAuthenticated && (
        <div class="auth-prompt">
          <p>
            <a href="/register">Register</a> or{" "}
            <a href="/subscriptions">get a subscription</a> for full access!
          </p>
        </div>
      )}

      <div class="order-similar">
        <a href="/cabinet/announcements" class="order-link">
          📝 Order similar work
        </a>
      </div>
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
