import { defineRoute, RouteContext } from "$fresh/server.ts";

export default defineRoute(async (req, ctx: RouteContext) => {
  const { user } = ctx.state as { user: { role: string } | null };
  if (user?.role !== "moderator") return <h3>Access denied</h3>;

  const violations = await fetchProfileViolations();

  return (
    <div class="profile-violations">
      <h3>Profile Violations</h3>
      <ul>
        {violations.map((v: any) => (
          <li key={v.id}>
            <p>Description: {v.description}</p>
            <p>User: {v.pib}</p>
            <p>Email: {v.email}</p>
            <form action={`/api/delete-profile-error/${v.id}`} method="POST">
              <button type="submit">Delete</button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
});

async function fetchProfileViolations() {
  return [
    {
      id: 1,
      description: "Contact info in profile",
      pib: "John Doe",
      email: "john@example.com",
    },
  ];
}
