import { defineRoute } from "$fresh/server.ts";
import type { Subscription } from "../types/basic.ts";

export default defineRoute((req, ctx) => {
  const { isAuthenticated, user } = ctx.state as {
    isAuthenticated: boolean;
    user: { subscription: Subscription } | null;
  };

  const url = new URL(req.url);
  const selectedPlan = url.searchParams.get("change_to");

  if (selectedPlan) {
    if (selectedPlan === "Бібліотекар") {
      return Response.redirect(
        new URL(
          "/payment?plan=librarian&amount=9.99&return_url=/cabinet/subscription",
          url.origin,
        ).toString(),
      );
    } else if (selectedPlan === "Захист+") {
      return Response.redirect(
        new URL(
          "/payment?plan=premium&amount=19.99&return_url=/cabinet/subscription",
          url.origin,
        ).toString(),
      );
    }
  }

  return (
    <div class="subscriptions-page">
      <h3>Subscription Plans</h3>

      {isAuthenticated && (
        <div style="background: #e8f5e8; padding: 10px; border-radius: 5px; margin-bottom: 20px;">
          <p>
            Current Status: {user?.subscription || "Free"}
          </p>
          <a href="/cabinet/subscription">Manage Your Subscription</a>
        </div>
      )}

      <div class="plans">
        <div class="plan">
          <h4>🆓 Free</h4>
          <p>Basic access with advertisements every minute.</p>
          <ul>
            <li>✓ View documents online</li>
            <li>✓ Ads every minute</li>
            <li>❌ No downloads or printing</li>
          </ul>
          <p>
            <strong>Free</strong>
          </p>
          {(!isAuthenticated || !user?.subscription ||
            user.subscription === "Free") && (
            <span style="color: green; font-weight: bold;">
              ✅ Current Plan
            </span>
          )}
        </div>

        <div class="plan">
          <h4>📚 Меценат</h4>
          <p>
            Upload 10+ documents to unlock 10 downloads/prints per day for 7
            days.
          </p>
          <ul>
            <li>✓ 10 downloads/day for 7 days</li>
            <li>✓ 10 prints/day for 7 days</li>
            <li>✓ View with ads</li>
            <li>⚠️ Requires 10+ document uploads</li>
          </ul>
          <p>
            <strong>Free*</strong> - Earn through contributions
          </p>
          {isAuthenticated
            ? <a href="/cabinet/subscription?change_to=Меценат">Activate</a>
            : <a href="/register">Register to Activate</a>}
          {user?.subscription === "Меценат" && (
            <span style="color: green; font-weight: bold;">
              ✅ Current Plan
            </span>
          )}
        </div>

        <div class="plan">
          <h4>💼 Бібліотекар</h4>
          <p>Unlimited document downloads and no advertisements.</p>
          <ul>
            <li>✓ Unlimited downloads</li>
            <li>✓ Unlimited printing</li>
            <li>✓ No advertisements</li>
            <li>✓ Priority support</li>
          </ul>
          <p>
            <strong>$9.99/month</strong>
          </p>
          {isAuthenticated
            ? (
              <a
                href="/cabinet/subscription?change_to=Бібліотекар"
                f-client-nav={false}
              >
                Subscribe Now
              </a>
            )
            : <a href="/register">Register to Subscribe</a>}
          {user?.subscription === "Бібліотекар" && (
            <span style="color: green; font-weight: bold;">
              ✅ Current Plan
            </span>
          )}
        </div>

        <div class="plan">
          <h4>🛡️ Захист+</h4>
          <p>Premium features including private work protection.</p>
          <ul>
            <li>✓ Everything in Бібліотекар</li>
            <li>✓ Private work protection</li>
            <li>✓ Works won't be uploaded to database</li>
            <li>✓ Premium support</li>
          </ul>
          <p>
            <strong>$19.99/month</strong>
          </p>
          {isAuthenticated
            ? (
              <a
                href="/cabinet/subscription?change_to=Захист+"
                f-client-nav={false}
              >
                Subscribe Now
              </a>
            )
            : <a href="/register">Register to Subscribe</a>}
          {user?.subscription === "Захист+" && (
            <span style="color: green; font-weight: bold;">
              ✅ Current Plan
            </span>
          )}
        </div>
      </div>

      {!isAuthenticated && (
        <div style="text-align: center; margin-top: 30px;">
          <p>
            <strong>Ready to get started?</strong>
          </p>
          <a
            href="/register"
            style="background: #3498db; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 0 10px;"
          >
            Register Now
          </a>
          <a
            href="/login"
            style="background: #2ecc71; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 0 10px;"
          >
            Login
          </a>
        </div>
      )}
    </div>
  );
});
