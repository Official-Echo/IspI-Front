import { defineRoute, RouteContext } from "$fresh/server.ts";
import AnnouncementCard from "../(announcements)/(_components)/announcement-card.tsx";

export default defineRoute(async (req, ctx: RouteContext) => {
  const { user } = ctx.state as { user: { id: number; role: string } | null };

  if (user?.role === "teacher") {
    return new Response(null, {
      status: 302,
      headers: { Location: "/announcements" },
    });
  }

  const announcements = await fetchUserAnnouncements(user?.id);

  return (
    <div class="cabinet-announcements">
      <h3>Your Announcements</h3>
      <form action="/api/create-announcement" method="POST">
        <label>
          Title: <input type="text" name="description" required />
        </label>
        <label>
          Type:{" "}
          <select name="workType">
            <option value="coursework">Coursework</option>
            <option value="essay">Essay</option>
          </select>
        </label>
        <label>
          University: <input type="text" name="university" required />
        </label>
        <label>
          Subject: <input type="text" name="subjectArea" required />
        </label>
        <label>
          Price: <input type="number" name="initialPrice" required />
        </label>
        <button type="submit">Create</button>
      </form>
      <div class="announcement-list">
        {announcements.map((ann: any) => (
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

async function fetchUserAnnouncements(userId: number | undefined) {
  return [
    {
      id: 1,
      work_type: "coursework",
      university: "Sample Uni",
      subject_area: "Law",
      description: "My coursework",
      initial_price: 500,
      creation_date: new Date(),
    },
  ];
}
