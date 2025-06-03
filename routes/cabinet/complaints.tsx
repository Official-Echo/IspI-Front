import { defineRoute, RouteContext } from "$fresh/server.ts";
import ComplaintCard from "./(_components)/complaint-card.tsx";
import FilterComplaints from "./(_islands)/filter-complaints.tsx";

export default defineRoute(async (req, ctx: RouteContext) => {
  const { user } = ctx.state as { user: { role: string } | null };
  if (user?.role !== "moderator") return <h3>Access denied</h3>;

  const complaints = await fetchComplaints();

  return (
    <div class="complaints-page">
      <h3>Complaints</h3>
      <FilterComplaints />
      <div class="complaint-list">
        {complaints.map((complaint: any) => (
          <ComplaintCard
            key={complaint.id}
            id={complaint.id}
            description={complaint.description}
            status={complaint.status}
            plaintiffId={complaint.plaintiff_id}
          />
        ))}
      </div>
    </div>
  );
});

async function fetchComplaints() {
  return [
    { id: 1, description: "Bad work", status: "regular", plaintiff_id: 1 },
  ];
}
