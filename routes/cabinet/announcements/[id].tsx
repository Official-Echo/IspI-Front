import { defineRoute, RouteContext } from "$fresh/server.ts";

export default defineRoute(async (req, ctx: RouteContext) => {
  const { id } = ctx.params;

  return new Response(null, {
    status: 302,
    headers: { Location: `/cabinet/announcements?id=${id}#announcement-${id}` },
  });
});
