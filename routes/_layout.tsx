import { defineLayout } from "$fresh/server.ts";
import { Head, Partial } from "$fresh/runtime.ts";
import type { Subscription } from "../types/basic.ts";

export default defineLayout((req, ctx) => {
  const { isAuthenticated, user } = ctx.state as {
    isAuthenticated: boolean;
    user: {
      pib: string;
      role: string;
      subscription: Subscription;
      upload_count?: number;
    } | null;
  };

  return (
    <html>
      <Head>
        <link rel="stylesheet" href="/styles.css" />
		<link rel="icon" href="/Primary Logo.svg" type="image/x-icon" />
      </Head>
      <body f-client-nav>
        <div class="container">
          <header>
            <div class="header-logo">
              <a href="/" class="logo-link">
                <img src="/Horizontal Logo.svg" alt="IsPi" class="logo-svg" />
              </a>
            </div>
            <nav>
              <a href="/">home</a>
              <a href="/database">database</a>
              {isAuthenticated && user?.role === "teacher" && (
                <a href="/announcements">announcements</a>
              )}
              {isAuthenticated && <a href="/cabinet">cabinet</a>}
              {!isAuthenticated && <a href="/subscriptions">subscriptions</a>}
              {isAuthenticated
                ? <a href="/api/logout" f-client-nav={false}>log out</a>
                : (
                  <>
                    <a href="/login">login</a>
                    <a href="/register">register</a>
                  </>
                )}
            </nav>
            {isAuthenticated && user && (
              <p>
                Welcome, {user.pib} ({user.role}) - Plan: {user.subscription}
                {user.subscription === "Меценат" && user.upload_count && (
                  <span>- Uploads: {user.upload_count}/10</span>
                )}
              </p>
            )}
          </header>
          <main>
            <Partial name="main-content">
              <ctx.Component />
            </Partial>
          </main>
          <footer>
            <p>&copy; 2025 IsPi - Academic Support Platform</p>
            <div class="footer-words">
              <span class="footer-word">source.</span>
              <span class="footer-word">service.</span>
              <span class="footer-word">support.</span>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
});
