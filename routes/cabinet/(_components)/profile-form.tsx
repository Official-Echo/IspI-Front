export default function ProfileForm(
  { user }: {
    user:
      | { pib: string; email: string; role: string; description?: string }
      | null;
  },
) {
  return (
    <form action="/api/update-profile" method="POST" class="profile-form">
      <label>
        Name: <input type="text" name="pib" defaultValue={user?.pib} required />
      </label>
      <label>
        Email:{" "}
        <input type="email" name="email" defaultValue={user?.email} required />
      </label>
      {user?.role === "teacher" && (
        <label>
          Description:{" "}
          <textarea name="description" defaultValue={user?.description || ""}>
          </textarea>
        </label>
      )}
      <button type="submit">Save</button>
    </form>
  );
}
