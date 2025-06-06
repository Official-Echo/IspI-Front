import { defineRoute, RouteContext } from "$fresh/server.ts";
import AnnouncementManager from "./(_islands)/announcement-manager.tsx";
import type { Post } from "../../types/basic.ts";

export default defineRoute(async (req, ctx) => {
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

      <AnnouncementManager announcements={announcements} />
    </div>
  );
});

async function fetchUserAnnouncements(
  userId: number | undefined,
): Promise<(Post & { response_count: number; status: string })[]> {
  return [
    {
      post_id: 1,
      student_id: userId || 1,
      student_name: "John Doe",
      work_type: "coursework",
      university: "Sample Uni",
      subject_area: "Law",
      description: "My coursework on contract law",
      initial_price: 500,
      creation_date: new Date(),
      response_count: 3,
      status: "active",
    },
  ];
}
