import { defineRoute } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";

export default defineRoute((req, ctx) => {
  return (
    <>
      <Head>
        <title>Payment Failed</title>
      </Head>
      <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #e74c3c, #c0392b);">
        <div style="background: white; padding: 40px; border-radius: 20px; text-align: center; box-shadow: 0 20px 60px rgba(0,0,0,0.1); max-width: 500px;">
          <div style="font-size: 4rem; margin-bottom: 20px;">❌</div>
          <h1 style="color: #e74c3c; margin-bottom: 10px;">Payment Failed</h1>
          <p style="color: #666; margin-bottom: 30px;">
            We couldn't process your payment. Please try again or contact
            support.
          </p>
          <div style="background: #fff5f5; padding: 20px; border-radius: 10px; margin-bottom: 30px; border: 1px solid #fed7d7;">
            <h3 style="margin: 0 0 10px 0; color: #e74c3c;">Common Issues:</h3>
            <ul style="text-align: left; color: #666; margin: 0; padding-left: 20px;">
              <li>Insufficient funds</li>
              <li>Expired card</li>
              <li>Incorrect card details</li>
              <li>Bank declined transaction</li>
            </ul>
          </div>
          <div style="display: flex; gap: 15px; justify-content: center;">
            <a
              href="/payment"
              style="background: #3498db; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600;"
            >
              Try Again
            </a>
            <a
              href="/subscriptions"
              style="background: #95a5a6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600;"
            >
              View Plans
            </a>
          </div>
        </div>
      </div>
    </>
  );
});
