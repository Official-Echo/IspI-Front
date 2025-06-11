import { defineRoute } from "$fresh/server.ts";

export default defineRoute(async (req, ctx) => {
  const { id } = ctx.params;

  // For demo purposes, return null (no existing deals)
  return Response.json(null);
});
