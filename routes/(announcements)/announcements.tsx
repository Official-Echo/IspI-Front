import { defineRoute, RouteContext } from "$fresh/server.ts";
import AnnouncementCard from "./(_components)/announcement-card.tsx";
import FilterControls from "./(_islands)/filter-controls.tsx";
import AnnouncementDetails from "./(_islands)/announcement-details.tsx";
import RespondButton from "./(_islands)/respond-button.tsx";

export default defineRoute(async (req, ctx: RouteContext) => {
  const url = new URL(req.url);
  const selectedId = url.hash.replace("#announcement-", "") ||
    url.searchParams.get("id");
  const announcements = await fetchAnnouncements({ limit: 20 });

  return (
    <div class="announcements">
      <h3>All Announcements</h3>
      <FilterControls />
      <div style="display: flex; gap: 20px;">
        <div class="announcement-list" style="flex: 1;">
          {announcements.map((ann) => (
            <div key={ann.id} id={`announcement-${ann.id}`}>
              <AnnouncementCard
                id={ann.id}
                workType={ann.work_type}
                university={ann.university}
                subjectArea={ann.subject_area}
                description={ann.description}
                initialPrice={ann.initial_price}
                creationDate={ann.creation_date}
              />
              {selectedId && parseInt(selectedId) === ann.id && (
                <div
                  class="announcement-details-expanded"
                  style="margin-top: 10px; padding: 15px; background: #f9f9f9; border-radius: 5px;"
                >
                  <h4>Announcement Details</h4>
                  <p>
                    <strong>Full Description:</strong> {ann.description}
                  </p>
                  <p>
                    <strong>Requirements:</strong>{" "}
                    {ann.requirements || "Standard academic work requirements"}
                  </p>
                  <p>
                    <strong>Deadline:</strong>{" "}
                    {ann.deadline?.toLocaleDateString() || "To be discussed"}
                  </p>
                  <RespondButton announcementId={ann.id} />
                  <AnnouncementDetails announcementId={ann.id} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

async function fetchAnnouncements({ limit }: { limit: number }) {
  return [
    {
      id: 1,
      work_type: "coursework",
      university: "Sample Uni",
      subject_area: "Law",
      description: "Need a coursework on contract law",
      initial_price: 500,
      creation_date: new Date(),
      requirements: "Must include case studies and legal precedents",
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    },
    {
      id: 2,
      work_type: "essay",
      university: "Tech University",
      subject_area: "Computer Science",
      description: "Essay on machine learning algorithms",
      initial_price: 300,
      creation_date: new Date(),
      requirements: "5-10 pages, APA format",
      deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    },
  ];
}
