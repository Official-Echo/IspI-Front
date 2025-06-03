import { FreshContext } from "$fresh/server.ts";
import { defineRoute } from "$fresh/server.ts";

export default defineRoute(async (req, ctx) => {
  const { user } = ctx.state as {
    user: { id: number; subscription: boolean; activation_date: Date } | null;
  };

  const subscription = await fetchSubscription(user?.id);

  return (
    <div class="subscription-page">
      <h3>Subscription Status</h3>
      <p>Current Plan: {subscription.plan || "None"}</p>
      <p>
        Activated: {subscription.activation_date?.toLocaleDateString() || "N/A"}
      </p>
      {subscription.plan === "Patron" && (
        <p>Uploads for free period: {subscription.uploads}/10</p>
      )}
      <form action="/api/change-subscription" method="POST">
        <label>
          Change Plan:
          <select name="plan">
            <option value="Patron">Patron</option>
            <option value="Librarian">Librarian</option>
            <option value="Protection+">Protection+</option>
          </select>
        </label>
        <button type="submit">Change</button>
      </form>
    </div>
  );
});

async function fetchSubscription(userId: number | undefined) {
  return {
    plan: "Patron",
    activation_date: new Date(),
    uploads: 5,
  };
}
