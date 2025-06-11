import { defineRoute, RouteContext } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import BackButton from "../(_islands)/back-button.tsx";
import Recommendations from "../(_islands)/recommendations.tsx";
import AdBanner from "../(_islands)/ad-banner.tsx";
import PDFViewer from "../(_islands)/pdf-viewer.tsx";
import type { Subscription } from "../../../types/basic.ts";

export default defineRoute(async (req, ctx: RouteContext) => {
  const { id } = ctx.params;
  const { isAuthenticated, user } = ctx.state as {
    isAuthenticated: boolean;
    user: { subscription: Subscription } | null;
  };

  const parsed_id = parseInt(id);
  if (isNaN(parsed_id)) {
    return <h3>Invalid document ID</h3>;
  }

  const document = await fetchDocument(parsed_id);
  if (!document) return <h3>Document not found</h3>;

  return (
    <>
      <Head>
        <title>{document.name} - Document Viewer</title>
        <meta
          name="description"
          content={`View ${document.name} - ${document.work_type} in ${document.subject_area}`}
        />
      </Head>

      <div class="document-page">
        <div class="document-header">
          <BackButton />
          <h1>{document.name}</h1>
        </div>

        <div class="document-info-bar">
          <div class="document-meta">
            <span class="meta-item">
              <strong>Type:</strong> {document.work_type}
            </span>
            <span class="meta-item">
              <strong>Subject:</strong> {document.subject_area}
            </span>
            <span class="meta-item">
              <strong>Uploaded:</strong>{" "}
              {document.upload_date.toLocaleDateString()}
            </span>
          </div>
        </div>

        <PDFViewer
          documentId={parsed_id}
          documentName={document.name}
          isAuthenticated={isAuthenticated}
          userSubscription={user?.subscription || "Free"}
        />

        {isAuthenticated && user?.subscription && (
          <div class="document-actions">
            <div class="action-section">
              <h3>📋 Document Actions</h3>

              <div class="rating-section">
                <form action={`/api/rate-document/${parsed_id}`} method="POST">
                  <label>Rate this document (1-5 stars):</label>
                  <div class="rating-input">
                    <select name="rating" required>
                      <option value="">Select rating</option>
                      <option value="1">⭐ 1 Star</option>
                      <option value="2">⭐⭐ 2 Stars</option>
                      <option value="3">⭐⭐⭐ 3 Stars</option>
                      <option value="4">⭐⭐⭐⭐ 4 Stars</option>
                      <option value="5">⭐⭐⭐⭐⭐ 5 Stars</option>
                    </select>
                    <button type="submit" class="action-btn rating-btn">
                      Submit Rating
                    </button>
                  </div>
                </form>
              </div>

              <div class="complaint-section">
                <form
                  action={`/api/complain-document/${parsed_id}`}
                  method="POST"
                >
                  <label>Report an issue with this document:</label>
                  <textarea
                    name="description"
                    placeholder="Describe the issue (plagiarism, incorrect content, etc.)..."
                    required
                    rows={3}
                  >
                  </textarea>
                  <button type="submit" class="action-btn complaint-btn">
                    🚨 Submit Complaint
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        <Recommendations documentId={parsed_id} />

        {(!isAuthenticated || user?.subscription === "Free" ||
          user?.subscription === "Меценат") && <AdBanner />}

        {!isAuthenticated && (
          <div class="auth-prompt">
            <h3>🔓 Get Full Access</h3>
            <p>
              <a href="/register">Register</a> or{" "}
              <a href="/subscriptions">get a subscription</a>{" "}
              for unlimited access to all documents!
            </p>
          </div>
        )}

        <div class="order-similar">
          <a href="/cabinet/announcements" class="order-link">
            📝 Order similar work from our experts
          </a>
        </div>
      </div>
    </>
  );
});

async function fetchDocument(id: number) {
  const documents = {
    1: {
      id: 1,
      name: "Constitutional Law Analysis",
      work_type: "coursework",
      subject_area: "Law",
      upload_date: new Date("2024-01-15"),
      preview:
        "This comprehensive analysis covers constitutional principles...",
    },
    2: {
      id: 2,
      name: "Calculus Notes",
      work_type: "notes",
      subject_area: "Math",
      upload_date: new Date("2024-02-01"),
      preview: "Detailed calculus notes covering derivatives and integrals...",
    },
    3: {
      id: 3,
      name: "Physics Lab Report",
      work_type: "lab_report",
      subject_area: "Physics",
      upload_date: new Date("2024-01-20"),
      preview:
        "Experimental results and analysis from physics laboratory work...",
    },
    4: {
      id: 4,
      name: "Shakespeare Essay",
      work_type: "essay",
      subject_area: "Literature",
      upload_date: new Date("2024-02-10"),
      preview: "Literary analysis of Shakespeare's major works and themes...",
    },
    5: {
      id: 5,
      name: "Chemistry Experiment Results",
      work_type: "lab_report",
      subject_area: "Chemistry",
      upload_date: new Date("2024-01-25"),
      preview: "Chemical reaction experiments and molecular analysis...",
    },
    6: {
      id: 6,
      name: "History of World War II",
      work_type: "essay",
      subject_area: "History",
      upload_date: new Date("2024-02-05"),
      preview: "Historical analysis of World War II events and consequences...",
    },
    7: {
      id: 7,
      name: "Computer Science Algorithms",
      work_type: "notes",
      subject_area: "Computer Science",
      upload_date: new Date("2024-01-30"),
      preview: "Study notes on algorithm design and complexity analysis...",
    },
    8: {
      id: 8,
      name: "Economics Market Analysis",
      work_type: "coursework",
      subject_area: "Economics",
      upload_date: new Date("2024-02-08"),
      preview: "Market trends analysis and economic forecasting models...",
    },
  };

  return documents[id as keyof typeof documents] || null;
}
