import { defineRoute, RouteContext } from "$fresh/server.ts";
import DealCard from "../(_components)/deal-card.tsx";

export default defineRoute(async (req, ctx: RouteContext) => {
  const { user } = ctx.state as { user: { id: number; role: string } | null };

  const deals = await fetchDeals(user?.id, user?.role);

  return (
    <div class="deals-page">
      <h3>Your Deals</h3>
      <div class="deal-list">
        {deals.map((deal: any) => (
          <DealCard
            key={deal.id}
            id={deal.id}
            status={deal.status}
            price={deal.price}
            workType={deal.work_type}
          />
        ))}
      </div>
    </div>
  );
});

async function fetchDeals(
  userId: number | undefined,
  role: string | undefined,
) {
  return [
    { id: 1, status: "in progress", price: 500, work_type: "coursework" },
  ];
}
