import { defineRoute } from "$fresh/server.ts";

export default defineRoute(() => {
  return (
    <div class="subscriptions-page">
      <h3>Subscription Plans</h3>
      <div class="plans">
        <div class="plan">
          <h4>Patron</h4>
          <p>
            Upload 10+ documents to unlock 10 free downloads/prints per day for
            a week.
          </p>
        </div>
        <div class="plan">
          <h4>Librarian</h4>
          <p>Unlimited document downloads for a monthly fee.</p>
        </div>
        <div class="plan">
          <h4>Protection+</h4>
          <p>
            Ad-free experience, unlimited downloads, and private work uploads.
          </p>
        </div>
      </div>
      <p>
        <a href="/register">Register</a> or <a href="/login">Login</a>{" "}
        to subscribe!
      </p>
    </div>
  );
});
