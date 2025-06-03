import { RouteContext } from "$fresh/server.ts";
import { defineRoute } from "$fresh/server.ts";

export default defineRoute((req, ctx: RouteContext) => {
  const { isAuthenticated } = ctx.state as { isAuthenticated: boolean };

  return (
    <div class="home">
      <h2>Welcome to IsPi!</h2>
      <p>
        Your platform for ordering academic works from teachers or exploring
        ready-made materials in our database.
      </p>
      <div class="promo">
        <div>
          <h3>Order Custom Work</h3>
          <p>Need a coursework or essay? Create an announcement!</p>
          {!isAuthenticated && <a href="/register">Register Now</a>}
          {isAuthenticated && <a href="/cabinet/announcements">Order Now</a>}
        </div>
        <div>
          <h3>Explore Database</h3>
          <p>Browse coursework, notes, and more for free!</p>
          <a href="/database">View Files</a>
        </div>
        <div>
          <h3>Premium Access</h3>
          <p>Unlock ad-free experience and downloads with a subscription.</p>
          <a href="/subscriptions">Learn More</a>
        </div>
      </div>
    </div>
  );
});
