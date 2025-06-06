import { defineRoute } from "$fresh/server.ts";

export default defineRoute((req, ctx) => {
  const { isAuthenticated, user } = ctx.state as {
    isAuthenticated: boolean;
    user: { subscription: boolean } | null;
  };

  return (
    <div class="subscriptions-page">
      <h3>Subscription Plans</h3>

      {isAuthenticated && (
        <div style="background: #e8f5e8; padding: 10px; border-radius: 5px; margin-bottom: 20px;">
          <p>
            Current Status: {user?.subscription
              ? "Active Subscription"
              : "No Active Subscription"}
          </p>
          <a href="/cabinet/subscription">Manage Your Subscription</a>
        </div>
      )}

      <div class="plans">
        <div class="plan">
          <h4>Patron</h4>
          <p>
            Upload 10+ documents to unlock 10 free downloads/prints per day for
            a week.
          </p>
          <p>
            <strong>Free</strong> - Earn through contributions
          </p>
          {isAuthenticated
            ? <a href="/cabinet/subscription">Activate</a>
            : <a href="/register">Register to Activate</a>}
        </div>

        <div class="plan">
          <h4>Librarian</h4>
          <p>Unlimited document downloads for a monthly fee.</p>
          <p>
            <strong>$9.99/month</strong>
          </p>
          {isAuthenticated
            ? <a href="/cabinet/subscription">Subscribe</a>
            : <a href="/register">Register to Subscribe</a>}
        </div>

        <div class="plan">
          <h4>Protection+</h4>
          <p>
            Ad-free experience, unlimited downloads, and private work uploads.
          </p>
          <p>
            <strong>$19.99/month</strong>
          </p>
          {isAuthenticated
            ? <a href="/cabinet/subscription">Subscribe</a>
            : <a href="/register">Register to Subscribe</a>}
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
