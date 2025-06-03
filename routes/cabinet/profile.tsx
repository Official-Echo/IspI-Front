import { defineRoute } from "$fresh/server.ts";
import ProfileForm from "./(_components)/profile-form.tsx";

export default defineRoute(async (req, ctx) => {
  const { user } = ctx.state as {
    user:
      | { pib: string; email: string; role: string; description?: string }
      | null;
  };

  return (
    <div class="profile-page">
      <h3>Your Profile</h3>
      <p>Name: {user?.pib}</p>
      <p>Email: {user?.email}</p>
      {user?.role === "teacher" && (
        <p>Description: {user?.description || "None"}</p>
      )}
      <ProfileForm user={user} />
    </div>
  );
});
