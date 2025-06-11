import { defineRoute } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";

export default defineRoute((req, ctx) => {
  const url = new URL(req.url);
  const plan = url.searchParams.get("plan") || "premium";
  const returnUrl = url.searchParams.get("return_url");

  if (returnUrl) {
    const redirectUrl = new URL(returnUrl, url.origin);
    redirectUrl.searchParams.set("payment_success", "true");
    redirectUrl.searchParams.set("plan", plan);

    return (
      <html>
        <head>
          <meta
            http-equiv="refresh"
            content={`0; url=${redirectUrl.toString()}`}
          />
          <title>Redirecting...</title>
        </head>
        <body>
          <p>Payment successful! Redirecting...</p>
        </body>
      </html>
    );
  }

  return (
    <>
      <Head>
        <title>Payment Successful!</title>
      </Head>
      <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #27ae60, #2ecc71);">
        <div style="background: white; padding: 40px; border-radius: 20px; text-align: center; box-shadow: 0 20px 60px rgba(0,0,0,0.1); max-width: 500px;">
          <div style="font-size: 4rem; margin-bottom: 20px;">✅</div>
          <h1 style="color: #27ae60; margin-bottom: 10px;">
            Payment Successful!
          </h1>
          <p style="color: #666; margin-bottom: 30px;">
            Your subscription has been activated successfully.
          </p>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 30px;">
            <h3 style="margin: 0 0 10px 0; color: #2c3e50;">
              Subscription Details
            </h3>
            <p style="margin: 0; color: #666;">
              Plan: {plan.charAt(0).toUpperCase() + plan.slice(1)}
            </p>
            <p style="margin: 0; color: #666;">Status: Active</p>
          </div>
          <div style="display: flex; gap: 15px; justify-content: center;">
            <a
              href="/cabinet/subscription"
              style="background: #3498db; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600;"
            >
              Manage Subscription
            </a>
            <a
              href="/database"
              style="background: #27ae60; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600;"
            >
              Explore Database
            </a>
          </div>
        </div>
      </div>
    </>
  );
});
