import { useState } from "preact/hooks";

export default function Rating({ dealId }: { dealId: number }) {
  const [rating, setRating] = useState(0);

  const submitRating = async (e: Event) => {
    e.preventDefault();
    const response = await fetch(`/api/rate-deal/${dealId}`, {
      method: "POST",
      body: JSON.stringify({ rating }),
    });
    if (response.ok) alert("Rating submitted!");
  };

  return (
    <form class="rating" onSubmit={submitRating}>
      <label>
        Rate (1-5):
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(parseInt(e.currentTarget.value))}
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
