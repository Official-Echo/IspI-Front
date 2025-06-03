import { defineLayout } from "$fresh/server.ts";

export default defineLayout((req, ctx) => {
  return (
    <div class="announcements-layout">
      <h2>Announcements Board</h2>
      <p>Filter and sort announcements below</p>
      <ctx.Component />
    </div>
  );
});
