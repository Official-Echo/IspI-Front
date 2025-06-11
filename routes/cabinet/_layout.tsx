import { defineLayout } from "$fresh/server.ts";
import { Partial } from "$fresh/runtime.ts";
import type { Subscription } from "../../types/basic.ts";

export default defineLayout((req, ctx) => {
  const { user } = ctx.state as {
    user: {
      pib: string;
      role: "student" | "teacher" | "moderator";
      subscription: Subscription;
      upload_count?: number;
    } | null;
  };

  return (
    <div class="cabinet-layout">
      <div class="cabinet-header">
        <div class="cabinet-hero-mini">
          <div class="mini-avatar">
            <span class="mini-avatar-icon">
              {user?.role === "student"
                ? "🎓"
                : user?.role === "teacher"
                ? "👨‍🏫"
                : "🛡️"}
            </span>
          </div>
          <div class="mini-user-info">
            <h2 class="mini-welcome">Cabinet</h2>
            <p class="mini-user-name">{user?.pib}</p>
            <div class="mini-badges">
              <span class="mini-role-badge">{user?.role}</span>
              <span class="mini-sub-badge">{user?.subscription || "Free"}</span>
            </div>
          </div>
        </div>

        <nav class="cabinet-nav">
          <div class="nav-container">
            <a href="/cabinet" class="nav-item" f-partial="/cabinet">
              <div class="nav-icon">🏠</div>
              <span>Overview</span>
            </a>

            <a
              href="/cabinet/profile"
              class="nav-item"
              f-partial="/cabinet/profile"
            >
              <div class="nav-icon">👤</div>
              <span>Profile</span>
            </a>

            <a
              href="/cabinet/subscription"
              class="nav-item"
              f-partial="/cabinet/subscription"
            >
              <div class="nav-icon">💎</div>
              <span>Subscription</span>
            </a>

            <a
              href="/cabinet/favorites"
              class="nav-item"
              f-partial="/cabinet/favorites"
            >
              <div class="nav-icon">💝</div>
              <span>Favorites</span>
            </a>

            <a
              href="/cabinet/uploads"
              class="nav-item"
              f-partial="/cabinet/uploads"
            >
              <div class="nav-icon">☁️</div>
              <span>Uploads</span>
            </a>

            {user?.role !== "teacher" && (
              <a
                href="/cabinet/announcements"
                class="nav-item"
                f-partial="/cabinet/announcements"
              >
                <div class="nav-icon">📢</div>
                <span>Announcements</span>
              </a>
            )}

            <a
              href="/cabinet/deals"
              class="nav-item"
              f-partial="/cabinet/deals"
            >
              <div class="nav-icon">🤝</div>
              <span>Deals</span>
            </a>

            {user?.role === "moderator" && (
              <>
                <a
                  href="/cabinet/complaints"
                  class="nav-item mod-item"
                  f-partial="/cabinet/complaints"
                >
                  <div class="nav-icon">⚠️</div>
                  <span>Complaints</span>
                </a>

                <a
                  href="/cabinet/profile-violations"
                  class="nav-item mod-item"
                  f-partial="/cabinet/profile-violations"
                >
                  <div class="nav-icon">🚫</div>
                  <span>Profile Issues</span>
                </a>

                <a
                  href="/cabinet/announcement-violations"
                  class="nav-item mod-item"
                  f-partial="/cabinet/announcement-violations"
                >
                  <div class="nav-icon">📋</div>
                  <span>Announcement Issues</span>
                </a>

                <a
                  href="/cabinet/document-complaints"
                  class="nav-item mod-item"
                  f-partial="/cabinet/document-complaints"
                >
                  <div class="nav-icon">📄</div>
                  <span>Document Reports</span>
                </a>
              </>
            )}
          </div>
        </nav>
      </div>

      <div class="cabinet-content">
        <Partial name="cabinet-content">
          <ctx.Component />
        </Partial>
      </div>
    </div>
  );
});
