import { defineLayout } from "$fresh/server.ts";
import { Partial } from "$fresh/runtime.ts";

export default defineLayout((req, ctx) => {
  const { user } = ctx.state as {
    user: { role: string; pib: string } | null;
  };

  return (
    <div class="cabinet-layout">
      <h2>Cabinet</h2>
      <nav>
        <a href="/cabinet" f-partial="/cabinet">Overview</a>
        <a href="/cabinet/profile" f-partial="/cabinet/profile">Profile</a>
        <a href="/cabinet/subscription" f-partial="/cabinet/subscription">
          Subscription
        </a>
        <a href="/cabinet/favorites" f-partial="/cabinet/favorites">
          Favorites
        </a>
        <a href="/cabinet/uploads" f-partial="/cabinet/uploads">Uploads</a>
        <a href="/cabinet/announcements" f-partial="/cabinet/announcements">
          Announcements
        </a>
        <a href="/cabinet/deals" f-partial="/cabinet/deals">Deals</a>
        {user?.role === "moderator" && (
          <>
            <a href="/cabinet/complaints" f-partial="/cabinet/complaints">
              Complaints
            </a>
            <a
              href="/cabinet/profile-violations"
              f-partial="/cabinet/profile-violations"
            >
              Profile Violations
            </a>
            <a
              href="/cabinet/announcement-violations"
              f-partial="/cabinet/announcement-violations"
            >
              Announcement Violations
            </a>
            <a
              href="/cabinet/document-complaints"
              f-partial="/cabinet/document-complaints"
            >
              Document Complaints
            </a>
          </>
        )}
      </nav>

      <Partial name="cabinet-content">
        <ctx.Component />
      </Partial>
    </div>
  );
});
