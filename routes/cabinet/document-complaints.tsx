import { defineRoute, RouteContext } from "$fresh/server.ts";

export default defineRoute(async (req, ctx: RouteContext) => {
  const { user } = ctx.state as { user: { role: string } | null };
  if (user?.role !== "moderator") return <h3>Access denied</h3>;

  const complaints = await fetchDocumentComplaints();

  return (
    <div class="document-complaints">
      <h3>Document Complaints</h3>
      <ul>
        {complaints.map((c: any) => (
          <li key={c.id}>
            <p>Description: {c.description}</p>
            <p>Status: {c.status}</p>
            <form action={`/api/update-complaint/${c.id}`} method="POST">
              <select name="status">
                <option value="regular">Regular</option>
                <option value="important">Important</option>
                <option value="resolved">Resolved</option>
              </select>
              <button type="submit">Update</button>
            </form>
            <form action={`/api/delete-complaint/${c.id}`} method="POST">
              <button type="submit">Delete</button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
});

async function fetchDocumentComplaints() {
  return [
    { id: 1, description: "Plagiarism in document", status: "regular" },
  ];
}
