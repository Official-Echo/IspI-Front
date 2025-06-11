import { defineRoute } from "$fresh/server.ts";
import { Subscription } from "../../types/basic.ts";

export default defineRoute(async (req, ctx) => {
  const { user } = ctx.state as {
    user: {
      id: number;
      subscription: Subscription;
      activation_date: Date;
      upload_count?: number;
    } | null;
  };

  const url = new URL(req.url);
  const changeTo = url.searchParams.get("change_to");
  const selectedPlan = url.searchParams.get("plan");

  if (changeTo === "Меценат") {
    const uploadCount = user?.upload_count || 0;
    if (uploadCount >= 10) {
      console.log(`Updated user ${user?.id} to Меценат plan`);
      const redirectUrl = new URL("/cabinet/subscription", url.origin);
      redirectUrl.searchParams.set("payment_success", "true");
      redirectUrl.searchParams.set("plan", "Меценат");
      return Response.redirect(redirectUrl.toString());
    } else {
      const redirectUrl = new URL("/cabinet/subscription", url.origin);
      redirectUrl.searchParams.set("error", "need_uploads");
      redirectUrl.searchParams.set("needed", (10 - uploadCount).toString());
      return Response.redirect(redirectUrl.toString());
    }
  }

  if (selectedPlan) {
    if (selectedPlan === "Бібліотекар") {
      return new Response(null, {
        status: 302,
        headers: {
          Location: new URL(
            "/payment?plan=librarian&amount=9.99&return_url=/cabinet/subscription",
            url.origin,
          ).toString(),
        },
      });
    } else if (selectedPlan === "Захист+") {
      return new Response(null, {
        status: 302,
        headers: {
          Location: new URL(
            "/payment?plan=premium&amount=19.99&return_url=/cabinet/subscription",
            url.origin,
          ).toString(),
        },
      });
    }
  }

  const subscription = await fetchSubscription(user?.id);
  const paymentSuccess = url.searchParams.get("payment_success") === "true";
  const newPlan = url.searchParams.get("plan");
  const error = url.searchParams.get("error");
  const needed = url.searchParams.get("needed");

  return (
    <div class="subscription-page">
      <h3>Subscription Status</h3>

      {paymentSuccess && newPlan && (
        <div style="background: #d4edda; color: #155724; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
          <strong>✅ Success!</strong>
          <p>Your subscription has been updated to {newPlan}.</p>
        </div>
      )}

      {error === "need_uploads" && (
        <div style="background: #f8d7da; color: #721c24; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
          <strong>❌ Upload Required</strong>
          <p>
            You need to upload {needed}{" "}
            more documents to activate Меценат status.
          </p>
          <a href="/cabinet/uploads">Go to Upload Page</a>
        </div>
      )}

      <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
        <p>
          <strong>Current Plan:</strong> {user?.subscription || "Free"}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          {user?.subscription && user.subscription !== "Free"
            ? "Active"
            : "Free Tier"}
        </p>
        {user?.subscription === "Меценат" && (
          <p>
            <strong>Documents Uploaded:</strong> {user.upload_count || 0}/10
          </p>
        )}
      </div>

      <h4>Available Plans</h4>

      <div class="subscription-plans">
        <form action="/cabinet/subscription" method="GET">
          <div class="plan-options">
            <div class="plan-option">
              <div class="plan-label">
                <div class="plan-header">
                  <h4>🆓 Free</h4>
                  <span class="plan-price">Free</span>
                </div>
                <p>Basic access with advertisements</p>
                <ul>
                  <li>✓ View documents online</li>
                  <li>✓ Ads every minute</li>
                  <li>❌ No downloads</li>
                  <li>❌ No printing</li>
                </ul>
                {(!user?.subscription || user.subscription === "Free") && (
                  <div class="current-plan-badge">
                    <span>✅ Current Plan</span>
                  </div>
                )}
              </div>
            </div>

            <div class="plan-option">
              <input
                type="radio"
                id="mecen"
                name="change_to"
                value="Меценат"
                disabled
                style="cursor: not-allowed; opacity: 0.5;"
              />
              <label
                for="mecen"
                class="plan-label disabled-plan"
                title={`You must upload 10+ documents to unlock Меценат status. Current uploads: ${
                  user?.upload_count || 0
                }/10`}
              >
                <div class="plan-header">
                  <h4>📚 Меценат</h4>
                  <span class="plan-price">Free*</span>
                  <span class="requirement-badge">📤 Upload Required</span>
                </div>
                <p>Upload 10+ documents to unlock benefits</p>
                <ul>
                  <li>✓ 10 downloads/day for 7 days</li>
                  <li>✓ 10 prints/day for 7 days</li>
                  <li>✓ View with ads</li>
                  <li>⚠️ Requires 10+ uploads</li>
                </ul>

                <div class="upload-progress">
                  <div class="progress-bar">
                    <div
                      class="progress-fill"
                      style={`width: ${
                        Math.min((user?.upload_count || 0) / 10 * 100, 100)
                      }%`}
                    >
                    </div>
                  </div>
                  <p class="progress-text">
                    {user?.upload_count || 0}/10 documents uploaded
                  </p>
                  {(user?.upload_count || 0) < 10 && (
                    <p class="requirement-text">
                      Upload {10 - (user?.upload_count || 0)}{" "}
                      more documents to unlock
                    </p>
                  )}
                </div>

                {user?.subscription === "Меценат" && (
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
                value="Бібліотекар"
              />
              <label for="librarian" class="plan-label">
                <div class="plan-header">
                  <h4>💼 Бібліотекар</h4>
                  <span class="plan-price">$9.99/month</span>
                </div>
                <p>Full access without limitations</p>
                <ul>
                  <li>✓ Unlimited downloads</li>
                  <li>✓ Unlimited printing</li>
                  <li>✓ No advertisements</li>
                  <li>✓ Priority support</li>
                </ul>
                {user?.subscription === "Бібліотекар" && (
                  <div class="current-plan-badge">
                    <span>✅ Current Plan</span>
                  </div>
                )}
              </label>
            </div>

            <div class="plan-option">
              <input type="radio" id="protection" name="plan" value="Захист+" />
              <label for="protection" class="plan-label">
                <div class="plan-header">
                  <h4>🛡️ Захист+</h4>
                  <span class="plan-price">$19.99/month</span>
                </div>
                <p>Premium protection + all features</p>
                <ul>
                  <li>✓ Everything in Бібліотекар</li>
                  <li>✓ Private work protection</li>
                  <li>✓ Works won't be uploaded to database</li>
                  <li>✓ Premium support</li>
                </ul>
                {user?.subscription === "Захист+" && (
                  <div class="current-plan-badge">
                    <span>✅ Current Plan</span>
                  </div>
                )}
              </label>
            </div>
          </div>

          <div class="form-actions">
            <button
              type="submit"
              class="change-plan-btn"
              f-client-nav={false}
            >
              💳 Change Plan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
});

async function fetchSubscription(userId: number | undefined) {
  return {
    plan: "Free",
    activation_date: new Date(),
    upload_count: 5,
  };
}
