import { useEffect, useState } from "preact/hooks";

export default function AnnouncementDetails(
  { announcementId }: { announcementId: number },
) {
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    async function fetchResponses() {
      const response = await fetch(`/api/responses/${announcementId}`);
      const data = await response.json();
      setResponses(data);
    }
    fetchResponses();
  }, [announcementId]);

  return (
    <div class="announcement-details">
      <h4>Responses</h4>
      <ul>
        {responses.map((res: any) => (
          <li key={res.id}>
            {res.respondent}: Offered {res.price} (Created:{" "}
            {res.creation_date.toLocaleDateString()})
          </li>
        ))}
      </ul>
    </div>
  );
}
