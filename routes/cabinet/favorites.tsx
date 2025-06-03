import { defineRoute, RouteContext } from "$fresh/server.ts";

export default defineRoute(async (req, ctx: RouteContext) => {
  const { user } = ctx.state as { user: { id: number } | null };

  const favorites = await fetchFavorites(user?.id);

  return (
    <div class="favorites-page">
      <h3>Your Favorite Documents</h3>
      <ul>
        {favorites.map((doc: any) => (
          <li key={doc.id}>
            <a href={`/database/${doc.id}`}>{doc.name}</a> ({doc.work_type})
            <form action={`/api/remove-favorite/${doc.id}`} method="POST">
              <button type="submit">Remove</button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
});

async function fetchFavorites(userId: number | undefined) {
  return [
    { id: 1, name: "Sample Coursework", work_type: "coursework" },
  ];
}
