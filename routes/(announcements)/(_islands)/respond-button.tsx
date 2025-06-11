import { useState } from "preact/hooks";

export default function RespondButton(
  { announcementId }: { announcementId: number },
) {
  const [responded, setResponded] = useState(false);

  const handleRespond = async () => {
    const response = await fetch(`/api/respond/${announcementId}`, {
      method: "POST",
      body: JSON.stringify({ price: 550 }),
    });
    if (response.ok) setResponded(true);
  };

  return (
    <div class="respond-button">
      {responded
        ? <p>Response submitted!</p>
        : (
          <button type="button" onClick={handleRespond}>
            Respond to Announcement
          </button>
        )}
    </div>
  );
}
