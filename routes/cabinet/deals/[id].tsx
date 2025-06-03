import { defineRoute, RouteContext } from "$fresh/server.ts";
import Chat from "../(_islands)/chat.tsx";
import Rating from "../(_islands)/rating.tsx";
import UploadWork from "../(_islands)/upload-work.tsx";

export default defineRoute(async (req, ctx: RouteContext) => {
  const { id } = ctx.params;
  const parsed_id = parseInt(id);
  const { user } = ctx.state as { user: { role: string } | null };

  const deal = await fetchDeal(parsed_id);
  if (!deal) return <h3>Deal not found</h3>;

  return (
    <div class="deal-page">
      <h3>Deal #{parsed_id}</h3>
      <p>Status: {deal.status}</p>
      <p>Price: {deal.price}</p>
      <p>Work Type: {deal.work_type}</p>
      <Chat dealId={parsed_id} />
      {user?.role === "student" && deal.status === "finished" && (
        <>
          <Rating dealId={parsed_id} />
          <form action={`/api/complain-deal/${parsed_id}`} method="POST">
            <label>
              Complaint: <textarea name="description"></textarea>
            </label>
            <button type="submit">Submit Complaint</button>
          </form>
        </>
      )}
      {user?.role === "teacher" && <UploadWork dealId={parsed_id} />}
    </div>
  );
});

async function fetchDeal(id: number) {
  return {
    id: id,
    status: "in progress",
    price: 500,
    work_type: "coursework",
  };
}
