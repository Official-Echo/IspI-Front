import { defineRoute } from "$fresh/server.ts";

export default defineRoute((req, ctx) => {
  const url = new URL(req.url);
  const error = url.searchParams.get("error");
  const success = url.searchParams.get("success");

  return (
    <div class="login-page">
      <h3>Login</h3>
      {error === "invalid" && (
        <p style="color: red;">Invalid email or password. Please try again.</p>
      )}
      {success === "registered" && (
        <p style="color: green;">Registration successful! Please log in.</p>
      )}
      <form action="/api/login" method="POST" f-client-nav={false}>
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
      <div style="margin-top: 20px; padding: 10px; background: #f0f0f0; border-radius: 5px;">
        <h4>Test Accounts:</h4>
        <p>
          <strong>Student:</strong> student@example.com / password
        </p>
        <p>
          <strong>Teacher:</strong> teacher@example.com / password
        </p>
        <p>
          <strong>Moderator:</strong> moderator@example.com / password
        </p>
      </div>
    </div>
  );
});
