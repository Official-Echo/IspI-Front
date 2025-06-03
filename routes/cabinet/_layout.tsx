import { FreshContext } from "$fresh/server.ts";
import { defineLayout } from "$fresh/server.ts";

export default defineLayout((req, ctx) => {
  const { user } = ctx.state as {
    user: { role: string; pib: string } | null;
  };

  return (
    <div class="cabinet-layout">
      <h2>Cabinet</h2>
      <nav>
        <a href="/cabinet">Overview</a>
        <a href="/cabinet/profile">Profile</a>
        <a href="/cabinet/subscription">Subscription</a>
        <a href="/cabinet/favorites">Favorites</a>
        <a href="/cabinet/uploads">Uploads</a>
        <a href="/cabinet/announcements">Announcements</a>
        <a href="/cabinet/deals">Deals</a>
        {user?.role === "moderator" && (
          <>
            <a href="/cabinet/complaints">Complaints</a>
            <a href="/cabinet/profile-violations">Profile Violations</a>
            <a href="/cabinet/announcement-violations">
              Announcement Violations
            </a>
            <a href="/cabinet/document-complaints">Document Complaints</a>
          </>
        )}
      </nav>
      <ctx.Component />
    </div>
  );
});
