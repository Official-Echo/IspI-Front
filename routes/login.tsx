import { defineRoute } from "$fresh/server.ts";

export default defineRoute(() => {
  return (
    <div class="login-page">
      <h3>Login</h3>
      <form action="/api/login" method="POST">
        <label>
          Email:
          <input type="email" name="email" required />
        </label>
        <label>
          Password:
          <input type="password" name="password" required />
        </label>
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <a href="/register">Register</a>
      </p>
    </div>
  );
});
