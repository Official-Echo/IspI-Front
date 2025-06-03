import { defineRoute, RouteContext } from "$fresh/server.ts";
import AnnouncementDetails from "../(_islands)/announcement-details.tsx";
import RespondButton from "../(_islands)/respond-button.tsx";

export default defineRoute(async (req, ctx: RouteContext) => {
  const { id } = ctx.params;
  const parsed_id = parseInt(id);

  const announcement = await fetchAnnouncement(parsed_id);
  if (!announcement) return <h3>Announcement not found</h3>;

  return (
    <div class="announcement-page">
      <h3>{announcement.description}</h3>
      <p>Type: {announcement.work_type}</p>
      <p>University: {announcement.university}</p>
      <p>Subject: {announcement.subject_area}</p>
      <p>Price: {announcement.initial_price}</p>
      <p>Created: {announcement.creation_date.toLocaleDateString()}</p>
      <RespondButton announcementId={parsed_id} />
      <AnnouncementDetails announcementId={parsed_id} />
    </div>
  );
});

async function fetchAnnouncement(id: number) {
  return {
    id: id,
    work_type: "coursework",
    university: "Sample Uni",
    subject_area: "Law",
    description: "Need a coursework on contract law",
    initial_price: 500,
    creation_date: new Date(),
  };
}
