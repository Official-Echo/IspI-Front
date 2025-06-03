import { defineRoute, RouteContext } from "$fresh/server.ts";

export default defineRoute(async (req, ctx: RouteContext) => {
  const { user } = ctx.state as { user: { role: string } | null };
  if (user?.role !== "moderator") return <h3>Access denied</h3>;

  const violations = await fetchAnnouncementViolations();

  return (
    <div class="announcement-violations">
      <h3>Announcement Violations</h3>
      <ul>
        {violations.map((v: any) => (
          <li key={v.id}>
            <p>Description: {v.description}</p>
            <p>Post: {v.post_description}</p>
            <form action={`/api/delete-post-error/${v.id}`} method="POST">
              <button type="submit">Delete</button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
});

async function fetchAnnouncementViolations() {
  return [
    {
      id: 1,
      description: "Contact info in post",
      post_description: "Need coursework",
    },
  ];
}
