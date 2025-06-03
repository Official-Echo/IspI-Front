import { useEffect, useState } from "preact/hooks";

export default function Recommendations(
  { documentId }: { documentId: number },
) {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    async function fetchRecommendations() {
      const response = await fetch(`/api/recommendations/${documentId}`);
      const data = await response.json();
      setRecommendations(data);
    }
    fetchRecommendations();
  }, [documentId]);

  return (
    <div class="recommendations">
      <h4>Recommended Documents</h4>
      <ul>
        {recommendations.map((doc: any) => (
          <li key={doc.id}>
            <a href={`/database/${doc.id}`}>{doc.name}</a> ({doc.work_type})
          </li>
        ))}
      </ul>
    </div>
  );
}
