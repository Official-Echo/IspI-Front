import { defineRoute } from "$fresh/server.ts";

export default defineRoute(async (req, ctx) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const { user } = ctx.state as { user: { id: number } | null };
  if (!user) {
    return Response.redirect("/login");
  }

  const formData = await req.formData();
  const newPlan = formData.get("plan");

  console.log(`Changing subscription for user ${user.id} to: ${newPlan}`);

  if (newPlan === "Patron") {
    console.log(`Updated user ${user.id} to Patron plan`);

    return Response.redirect(
      "/cabinet/subscription?payment_success=true&plan=Patron",
    );
  }

  if (newPlan === "Librarian") {
    return Response.redirect(
      "/payment?plan=librarian&amount=9.99&return_url=/cabinet/subscription",
    );
  } else if (newPlan === "Protection+") {
    return Response.redirect(
      "/payment?plan=premium&amount=19.99&return_url=/cabinet/subscription",
    );
  }

  return Response.redirect("/cabinet/subscription");
});
