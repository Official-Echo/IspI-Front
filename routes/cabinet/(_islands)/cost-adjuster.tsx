import { useState } from "preact/hooks";

export default function CostAdjuster(
  { announcementId, currentPrice }: {
    announcementId: number;
    currentPrice: number;
  },
) {
  const [newPrice, setNewPrice] = useState(currentPrice);

  const handleAdjust = async (e: Event) => {
    e.preventDefault();
    if (newPrice <= currentPrice) {
      alert("New price must be higher than current!");
      return;
    }
    const response = await fetch(`/api/adjust-cost/${announcementId}`, {
      method: "POST",
      body: JSON.stringify({ newPrice }),
    });
    if (response.ok) alert("Price adjusted!");
  };

  return (
    <form class="cost-adjuster" onSubmit={handleAdjust}>
      <label>
        Current Price: {currentPrice}
      </label>
      <label>
        New Price:
        <input
          type="number"
          value={newPrice}
          onChange={(e) => setNewPrice(parseInt(e.currentTarget.value))}
          min={currentPrice + 1}
          required
        />
      </label>
      <button type="submit">Adjust Price</button>
    </form>
  );
}
