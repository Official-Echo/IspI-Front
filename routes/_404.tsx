import { defineRoute } from "$fresh/server.ts";

export default defineRoute(() => {
  return (
    <div class="not-found">
      <h3>404 - Page Not Found</h3>
      <p>Sorry, the page you're looking for doesn't exist.</p>
      <a href="/">Back to Home</a>
    </div>
  );
});
