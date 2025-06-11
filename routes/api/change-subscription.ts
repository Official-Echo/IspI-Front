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

  if (newPlan === "Меценат") {
    console.log(`Updated user ${user.id} to Меценат plan`);
    return Response.redirect(
      "/cabinet/subscription?payment_success=true&plan=Меценат",
    );
  }

  if (newPlan === "Бібліотекар") {
    return new Response(null, {
      status: 302,
      headers: {
        Location: new URL(
          "/payment?plan=librarian&amount=9.99&return_url=/cabinet/subscription",
          new URL(req.url).origin,
        ).toString(),
      },
    });
  } else if (newPlan === "Захист+") {
    return new Response(null, {
      status: 302,
      headers: {
        Location: new URL(
          "/payment?plan=premium&amount=19.99&return_url=/cabinet/subscription",
          new URL(req.url).origin,
        ).toString(),
      },
    });
  }

  return Response.redirect("/cabinet/subscription");
});
