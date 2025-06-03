import { defineRoute, RouteContext } from "$fresh/server.ts";
import AnnouncementCard from "./(_components)/announcement-card.tsx";
import FilterControls from "./(_islands)/filter-controls.tsx";

export default defineRoute(async (req, ctx: RouteContext) => {
  const announcements = await fetchAnnouncements({ limit: 20 });

  return (
    <div class="announcements">
      <h3>All Announcements</h3>
      <FilterControls />
      <div class="announcement-list">
        {announcements.map((ann) => (
          <AnnouncementCard
            key={ann.id}
            id={ann.id}
            workType={ann.work_type}
            university={ann.university}
            subjectArea={ann.subject_area}
            description={ann.description}
            initialPrice={ann.initial_price}
            creationDate={ann.creation_date}
          />
        ))}
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
    },
  ];
}
