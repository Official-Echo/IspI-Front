import { defineRoute, RouteContext } from "$fresh/server.ts";

export default defineRoute(async (req, ctx) => {
  const { user } = ctx.state as {
    user: {
      id: number;
      role: string;
      pib: string;
      subscription: string;
      upload_count?: number;
    } | null;
  };

  return (
    <div class="cabinet-overview">
      <div class="cabinet-hero">
        <div class="hero-content">
          <div class="user-info">
            <h1 class="welcome-title">
              Welcome back, <span class="user-name">{user?.pib}</span>!
            </h1>
          </div>
        </div>
        <div class="hero-decoration">
          <div class="floating-shape shape-1"></div>
          <div class="floating-shape shape-2"></div>
          <div class="floating-shape shape-3"></div>
        </div>
      </div>

      <div class="quick-stats">
        <div class="stat-card">
          <div class="stat-icon">📈</div>
          <div class="stat-content">
            <h3>Activity</h3>
            <p class="stat-number">12</p>
            <p class="stat-label">This month</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">⭐</div>
          <div class="stat-content">
            <h3>Rating</h3>
            <p class="stat-number">4.8</p>
            <p class="stat-label">Average score</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🎯</div>
          <div class="stat-content">
            <h3>Achievements</h3>
            <p class="stat-number">8</p>
            <p class="stat-label">Unlocked</p>
          </div>
        </div>
        {user?.subscription === "Меценат" && (
          <div class="stat-card uploads-progress">
            <div class="stat-icon">📤</div>
            <div class="stat-content">
              <h3>Uploads</h3>
              <p class="stat-number">{user?.upload_count || 0}/10</p>
              <div class="progress-bar-mini">
                <div
                  class="progress-fill-mini"
                  style={`width: ${
                    Math.min((user?.upload_count || 0) / 10 * 100, 100)
                  }%`}
                >
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {user?.role === "student" && (
        <div class="dashboard-section">
          <h2 class="section-title">
            <span class="title-icon">🎓</span>
            Student Dashboard
          </h2>
          <div class="action-grid">
            <a href="/cabinet/announcements" class="action-card primary">
              <div class="card-icon">📢</div>
              <div class="card-content">
                <h3>My Announcements</h3>
                <p>Create and manage your project requests</p>
                <span class="card-badge">3 Active</span>
              </div>
              <div class="card-arrow">→</div>
            </a>

            <a href="/cabinet/deals" class="action-card">
              <div class="card-icon">🤝</div>
              <div class="card-content">
                <h3>My Deals</h3>
                <p>Track ongoing collaborations</p>
                <span class="card-badge">2 In Progress</span>
              </div>
              <div class="card-arrow">→</div>
            </a>

            <a href="/cabinet/favorites" class="action-card">
              <div class="card-icon">💝</div>
              <div class="card-content">
                <h3>Favorite Documents</h3>
                <p>Your saved academic materials</p>
                <span class="card-badge">15 Saved</span>
              </div>
              <div class="card-arrow">→</div>
            </a>

            <a href="/cabinet/uploads" class="action-card">
              <div class="card-icon">☁️</div>
              <div class="card-content">
                <h3>My Uploads</h3>
                <p>Documents you've shared</p>
                <span class="card-badge">{user?.upload_count || 0} Files</span>
              </div>
              <div class="card-arrow">→</div>
            </a>
          </div>
        </div>
      )}

      {user?.role === "teacher" && (
        <div class="dashboard-section">
          <h2 class="section-title">
            <span class="title-icon">👨‍🏫</span>
            Teacher Dashboard
          </h2>
          <div class="action-grid">
            <a href="/announcements" class="action-card primary">
              <div class="card-icon">🔍</div>
              <div class="card-content">
                <h3>Browse Announcements</h3>
                <p>Find new projects to work on</p>
                <span class="card-badge">42 Available</span>
              </div>
              <div class="card-arrow">→</div>
            </a>

            <a href="/cabinet/deals" class="action-card">
              <div class="card-icon">💼</div>
              <div class="card-content">
                <h3>My Deals</h3>
                <p>Active teaching projects</p>
                <span class="card-badge">5 Active</span>
              </div>
              <div class="card-arrow">→</div>
            </a>

            <a href="/cabinet/favorites" class="action-card">
              <div class="card-icon">📚</div>
              <div class="card-content">
                <h3>Resource Library</h3>
                <p>Your teaching materials</p>
                <span class="card-badge">28 Resources</span>
              </div>
              <div class="card-arrow">→</div>
            </a>

            <a href="/cabinet/uploads" class="action-card">
              <div class="card-icon">📝</div>
              <div class="card-content">
                <h3>My Contributions</h3>
                <p>Shared academic content</p>
                <span class="card-badge">
                  {user?.upload_count || 0} Uploads
                </span>
              </div>
              <div class="card-arrow">→</div>
            </a>
          </div>
        </div>
      )}

      {user?.role === "moderator" && (
        <div class="dashboard-section">
          <h2 class="section-title">
            <span class="title-icon">🛡️</span>
            Moderator Dashboard
          </h2>
          <div class="action-grid moderator-grid">
            <a href="/cabinet/complaints" class="action-card urgent">
              <div class="card-icon">⚠️</div>
              <div class="card-content">
                <h3>Complaints</h3>
                <p>Review user reports</p>
                <span class="card-badge urgent">3 Pending</span>
              </div>
              <div class="card-arrow">→</div>
            </a>

            <a href="/cabinet/profile-violations" class="action-card">
              <div class="card-icon">👤</div>
              <div class="card-content">
                <h3>Profile Violations</h3>
                <p>Manage user profiles</p>
                <span class="card-badge">1 New</span>
              </div>
              <div class="card-arrow">→</div>
            </a>

            <a href="/cabinet/announcement-violations" class="action-card">
              <div class="card-icon">📢</div>
              <div class="card-content">
                <h3>Announcement Issues</h3>
                <p>Monitor project posts</p>
                <span class="card-badge">0 Issues</span>
              </div>
              <div class="card-arrow">→</div>
            </a>

            <a href="/cabinet/document-complaints" class="action-card">
              <div class="card-icon">📄</div>
              <div class="card-content">
                <h3>Document Reports</h3>
                <p>Content moderation</p>
                <span class="card-badge">2 Reports</span>
              </div>
              <div class="card-arrow">→</div>
            </a>
          </div>
        </div>
      )}

      <div class="quick-actions">
        <h3 class="quick-title">⚡ Quick Actions</h3>
        <div class="quick-buttons">
          <a href="/cabinet/profile" class="quick-btn">
            <span class="btn-icon">⚙️</span>
            Edit Profile
          </a>
          <a href="/cabinet/subscription" class="quick-btn subscription">
            <span class="btn-icon">💎</span>
            Manage Subscription
          </a>
          <a href="/database" class="quick-btn">
            <span class="btn-icon">🗃️</span>
            Browse Database
          </a>
        </div>
      </div>
    </div>
  );
});
