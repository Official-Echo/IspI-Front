export default function DealCard({
  id,
  status,
  price,
  workType,
}: {
  id: number;
  status: string;
  price: number;
  workType: string;
}) {
  return (
    <div class="deal-card">
      <h4>Deal #{id}</h4>
      <p>Status: {status}</p>
      <p>Price: {price}</p>
      <p>Type: {workType}</p>
      <a href={`/cabinet/deal/${id}`}>View</a>
    </div>
  );
}
