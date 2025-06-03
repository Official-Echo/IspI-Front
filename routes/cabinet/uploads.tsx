import { defineRoute } from "$fresh/server.ts";

export default defineRoute(async (req, ctx) => {
  const { user } = ctx.state as { user: { id: number } | null };

  const uploads = await fetchUploads(user?.id);

  return (
    <div class="uploads-page">
      <h3>Your Uploaded Documents</h3>
      <ul>
        {uploads.map((doc: any) => (
          <li key={doc.id}>
            <a href={`/database/${doc.id}`}>{doc.name}</a> ({doc.work_type})
            <form action={`/api/edit-document/${doc.id}`} method="POST">
              <button type="submit">Edit</button>
            </form>
            <form action={`/api/delete-document/${doc.id}`} method="POST">
              <button type="submit">Delete</button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
});

async function fetchUploads(userId: number | undefined) {
  return [
    { id: 1, name: "My Coursework", work_type: "coursework" },
  ];
}
