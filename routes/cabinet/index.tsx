import { defineRoute, RouteContext } from "$fresh/server.ts";

export default defineRoute(async (req, ctx) => {
  const { user } = ctx.state as {
    user: { id: number; role: string; pib: string } | null;
  };

  return (
    <div class="cabinet-overview">
      <h3>Welcome to your Cabinet, {user?.pib}!</h3>
      <p>Role: {user?.role}</p>

      {user?.role === "student" && (
        <div>
          <h4>Student Dashboard</h4>
          <ul>
            <li>
              <a href="/cabinet/announcements">My Announcements</a>
            </li>
            <li>
              <a href="/cabinet/deals">My Deals</a>
            </li>
            <li>
              <a href="/cabinet/favorites">Favorite Documents</a>
            </li>
            <li>
              <a href="/cabinet/uploads">My Uploads</a>
            </li>
          </ul>
        </div>
      )}

      {user?.role === "teacher" && (
        <div>
          <h4>Teacher Dashboard</h4>
          <ul>
            <li>
              <a href="/announcements">Browse Announcements</a>
            </li>
            <li>
              <a href="/cabinet/deals">My Deals</a>
            </li>
            <li>
              <a href="/cabinet/favorites">Favorite Documents</a>
            </li>
            <li>
              <a href="/cabinet/uploads">My Uploads</a>
            </li>
          </ul>
        </div>
      )}

      {user?.role === "moderator" && (
        <div>
          <h4>Moderator Dashboard</h4>
          <ul>
            <li>
              <a href="/cabinet/complaints">Complaints</a>
            </li>
            <li>
              <a href="/cabinet/profile-violations">Profile Violations</a>
            </li>
            <li>
              <a href="/cabinet/announcement-violations">
                Announcement Violations
              </a>
            </li>
            <li>
              <a href="/cabinet/document-complaints">Document Complaints</a>
            </li>
          </ul>
        </div>
      )}

      <div style="margin-top: 20px;">
        <a href="/cabinet/profile">Edit Profile</a> |
        <a href="/cabinet/subscription">Manage Subscription</a>
      </div>
    </div>
  );
});
