import { defineRoute } from "$fresh/server.ts";

export default defineRoute(async (req, ctx) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const body = await req.json();
    const { announcement_id, teacher_id, agreed_price, message_id } = body;

    console.log("Creating deal:", {
      announcement_id,
      teacher_id,
      agreed_price,
      message_id,
    });

    return Response.json({
      success: true,
      deal_id: Math.floor(Math.random() * 1000) + 1,
    });
  } catch (error) {
    console.error("Accept deal error:", error);
    return new Response("Internal server error", { status: 500 });
  }
});
