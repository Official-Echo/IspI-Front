import { FreshContext } from "$fresh/server.ts";

export async function handler(req: Request, ctx: FreshContext) {
  console.log("API handler hit with method:", req.method);
  console.log("Request URL:", req.url);

  if (req.method !== "POST") {
    console.log("Method not allowed:", req.method);
    return new Response("Method not allowed", {
      status: 405,
      headers: {
        "Allow": "POST",
      },
    });
  }

  try {
    console.log("Processing POST request...");

    const formData = await req.formData();
    const paymentData = {
      plan: formData.get("plan"),
      amount: formData.get("amount"),
      paymentMethod: formData.get("payment_method"),
      cardNumber: formData.get("card_number"),
      email: formData.get("email"),
      cardholder: formData.get("cardholder"),
      expiry: formData.get("expiry"),
      cvv: formData.get("cvv"),
      address: formData.get("address"),
      city: formData.get("city"),
      zip: formData.get("zip"),
      country: formData.get("country"),
    };

    console.log("Processing payment with data:", {
      plan: paymentData.plan,
      amount: paymentData.amount,
      email: paymentData.email,
    });

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const success = Math.random() > 0.1;

    if (success) {
      console.log(`Payment successful for plan: ${paymentData.plan}`);

      const { user } = ctx.state as { user: { id: number } | null };
      if (user) {
        console.log(
          `Updating subscription for user ${user.id}: ${paymentData.plan}`,
        );
      }

      const originalUrl = new URL(req.url);
      const returnUrl = originalUrl.searchParams.get("return_url");

      let successUrl = `/payment-success?plan=${paymentData.plan}`;
      if (returnUrl) {
        successUrl += `&return_url=${encodeURIComponent(returnUrl)}`;
      }

      return new Response(null, {
        status: 302,
        headers: {
          "Location": successUrl,
        },
      });
    } else {
      console.log("Payment failed - simulated failure");

      return new Response(null, {
        status: 302,
        headers: {
          "Location": "/payment-failed",
        },
      });
    }
  } catch (error) {
    console.error("Error processing payment:", error);
    return new Response("Internal server error", {
      status: 500,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }
}
