export default function ResponseCard({
  id,
  price,
  creationDate,
  respondent,
}: {
  id: number;
  price: number;
  creationDate: Date;
  respondent: string;
}) {
  return (
    <div class="response-card">
      <p>Respondent: {respondent}</p>
      <p>Offered Price: {price}</p>
      <p>Created: {creationDate.toLocaleDateString()}</p>
      <form action={`/api/delete-response/${id}`} method="POST">
        <button type="submit">Delete</button>
      </form>
    </div>
  );
}
