import { defineLayout } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";

export default defineLayout((req, ctx) => {
  const { isAuthenticated, user } = ctx.state as {
    isAuthenticated: boolean;
    user: { pib: string; role: string; subscription: boolean } | null;
  };

  return (
    <div>
      <Head>
        <link rel="stylesheet" href="/styles.css" />
      </Head>
      <div class="container">
        <header>
          <h1>IsPi</h1>
          <nav>
            <a href="/">Home</a>
            <a href="/database">Database</a>
            {isAuthenticated && user?.role === "teacher" && (
              <a href="/announcements">Announcements</a>
            )}
            {isAuthenticated && <a href="/cabinet">Cabinet</a>}
            <a href="/subscriptions">Subscriptions</a>
            {isAuthenticated ? <a href="/logout">Log Out</a> : (
              <>
                <a href="/login">Login</a>
                <a href="/register">Register</a>
              </>
            )}
          </nav>
          {isAuthenticated && user && <p>Welcome, {user.pib} ({user.role})</p>}
        </header>
        <main>
          <ctx.Component />
        </main>
        <footer>
          <p>&copy; 2025 IsPi - Academic Support Platform</p>
        </footer>
      </div>
    </div>
  );
});
