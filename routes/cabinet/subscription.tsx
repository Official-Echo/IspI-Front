import { FreshContext } from "$fresh/server.ts";
import { defineRoute } from "$fresh/server.ts";

export default defineRoute(async (req, ctx) => {
  const { user } = ctx.state as {
    user: { id: number; subscription: boolean; activation_date: Date } | null;
  };

  const url = new URL(req.url);
  console.log("Current URL:", url.toString());

  const changeTo = url.searchParams.get("change_to");
  const selectedPlan = url.searchParams.get("plan");

  console.log("changeTo:", changeTo);
  console.log("selectedPlan:", selectedPlan);

  if (changeTo === "Patron") {
    console.log("Handling changeTo=Patron");

    console.log(`Updated user ${user?.id} to Patron plan`);
    const redirectUrl = new URL("/cabinet/subscription", url.origin);
    redirectUrl.searchParams.set("payment_success", "true");
    redirectUrl.searchParams.set("plan", "Patron");
    return Response.redirect(redirectUrl.toString());
  }

  if (selectedPlan) {
    console.log("Handling selectedPlan:", selectedPlan);
    if (selectedPlan === "Patron") {
      console.log(`Updated user ${user?.id} to Patron plan`);
      const redirectUrl = new URL("/cabinet/subscription", url.origin);
      redirectUrl.searchParams.set("payment_success", "true");
      redirectUrl.searchParams.set("plan", "Patron");
      return Response.redirect(redirectUrl.toString());
    } else if (selectedPlan === "Librarian") {
      console.log("Redirecting to Librarian payment");
      const redirectUrl = new URL("/payment", url.origin);
      redirectUrl.searchParams.set("plan", "librarian");
      redirectUrl.searchParams.set("amount", "9.99");
      redirectUrl.searchParams.set("return_url", "/cabinet/subscription");
      console.log("Redirect URL:", redirectUrl.toString());
      return Response.redirect(redirectUrl.toString());
    } else if (selectedPlan === "Protection+") {
      console.log("Redirecting to Protection+ payment");
      const redirectUrl = new URL("/payment", url.origin);
      redirectUrl.searchParams.set("plan", "premium");
      redirectUrl.searchParams.set("amount", "19.99");
      redirectUrl.searchParams.set("return_url", "/cabinet/subscription");
      console.log("Redirect URL:", redirectUrl.toString());
      return Response.redirect(redirectUrl.toString());
    }
  }

  const subscription = await fetchSubscription(user?.id);

  const paymentSuccess = url.searchParams.get("payment_success") === "true";
  const newPlan = url.searchParams.get("plan");

  return (
    <div class="subscription-page">
      <h3>Subscription Status</h3>

      {paymentSuccess && newPlan && (
        <div style="background: #d4edda; color: #155724; padding: 15px; border-radius: 5px; margin-bottom: 20px; border: 1px solid #c3e6cb;">
          <strong>✅ Payment Successful!</strong>
          <p style="margin: 5px 0 0 0;">
            Your subscription has been upgraded to {newPlan}.
          </p>
        </div>
      )}

      <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
        <p>
          <strong>Current Plan:</strong> {subscription.plan || "None"}
        </p>
        <p>
          <strong>Status:</strong> {user?.subscription ? "Active" : "Inactive"}
        </p>
        <p>
          <strong>Activated:</strong>{" "}
          {subscription.activation_date?.toLocaleDateString() || "N/A"}
        </p>
        {subscription.plan === "Patron" && (
          <p>
            <strong>Uploads for free period:</strong> {subscription.uploads}/10
          </p>
        )}
      </div>

      <h4>Change Subscription Plan</h4>

      <div class="subscription-plans">
        <form action="/cabinet/subscription" method="GET" f-client-nav={false}>
          <div class="plan-options">
            <div class="plan-option">
              <input
                type="radio"
                id="patron"
                name="plan"
                value="Patron"
                checked={subscription.plan === "Patron"}
              />
              <label for="patron" class="plan-label">
                <div class="plan-header">
                  <h4>Patron</h4>
                  <span class="plan-price">Free</span>
                </div>
                <p>
                  Upload 10+ documents to unlock 10 free downloads/prints per
                  day for a week.
                </p>
                <ul>
                  <li>✓ Earn through contributions</li>
                  <li>✓ 10 downloads/day for a week</li>
                  <li>✓ Basic access</li>
                </ul>
                {subscription.plan === "Patron" && (
                  <div class="current-plan-badge">
                    <span>✅ Current Plan</span>
                  </div>
                )}
              </label>
            </div>

            <div class="plan-option">
              <input
                type="radio"
                id="librarian"
                name="plan"
                value="Librarian"
                checked={subscription.plan === "Librarian"}
              />
              <label for="librarian" class="plan-label">
                <div class="plan-header">
                  <h4>Librarian</h4>
                  <span class="plan-price">$9.99/month</span>
                </div>
                <p>Unlimited document downloads for a monthly fee.</p>
                <ul>
                  <li>✓ Unlimited downloads</li>
                  <li>✓ Priority support</li>
                  <li>✓ Monthly billing</li>
                </ul>
                {subscription.plan === "Librarian" && (
                  <div class="current-plan-badge">
                    <span>✅ Current Plan</span>
                  </div>
                )}
              </label>
            </div>

            <div class="plan-option">
              <input
                type="radio"
                id="protection"
                name="plan"
                value="Protection+"
                checked={subscription.plan === "Protection+"}
              />
              <label for="protection" class="plan-label">
                <div class="plan-header">
                  <h4>Protection+</h4>
                  <span class="plan-price">$19.99/month</span>
                </div>
                <p>
                  Ad-free experience, unlimited downloads, and private work
                  uploads.
                </p>
                <ul>
                  <li>✓ Ad-free experience</li>
                  <li>✓ Unlimited downloads</li>
                  <li>✓ Private work uploads</li>
                  <li>✓ Premium support</li>
                </ul>
                {subscription.plan === "Protection+" && (
                  <div class="current-plan-badge">
                    <span>✅ Current Plan</span>
                  </div>
                )}
              </label>
            </div>
          </div>

          <div class="form-actions">
            <button type="submit" class="change-plan-btn">
              💳 Change Plan
            </button>
          </div>
        </form>
      </div>

      <div class="subscription-info">
        <h4>Billing Information</h4>
        <div style="background: #f8f9fa; padding: 20px; border-radius: 10px;">
          <p>• Your subscription will be automatically renewed each month.</p>
          <p>• You can change your plan at any time.</p>
          <p>• Upgrades take effect immediately.</p>
          <p>
            • Downgrades will take effect at the end of your current billing
            period.
          </p>
          <p>• Free plan (Patron) changes take effect immediately.</p>
        </div>
      </div>
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
