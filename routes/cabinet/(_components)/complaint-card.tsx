export default function ComplaintCard({
  id,
  description,
  status,
  plaintiffId,
}: {
  id: number;
  description: string;
  status: string;
  plaintiffId: number;
}) {
  return (
    <div class="complaint-card">
      <p>Description: {description}</p>
      <p>Status: {status}</p>
      <p>Plaintiff ID: {plaintiffId}</p>
      <form action={`/api/update-complaint/${id}`} method="POST">
        <select name="status">
          <option value="regular">Regular</option>
          <option value="important">Important</option>
          <option value="resolved">Resolved</option>
        </select>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
