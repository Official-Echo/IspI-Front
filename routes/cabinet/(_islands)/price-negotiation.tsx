import { useState } from "preact/hooks";

export default function PriceNegotiation({
  responseId,
  announcementId,
  initialMessages,
}: {
  responseId: number;
  announcementId: number;
  initialMessages: any[];
}) {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [counterOffer, setCounterOffer] = useState("");

  const sendNegotiation = async (e: Event) => {
    e.preventDefault();

    const response = await fetch(`/api/negotiate-price/${responseId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        announcement_id: announcementId,
        message: newMessage,
        counter_offer: counterOffer ? parseInt(counterOffer) : null,
      }),
    });

    if (response.ok) {
      const newMsg = {
        id: Date.now(),
        sender: "student",
        message: newMessage,
        suggested_price: counterOffer ? parseInt(counterOffer) : null,
        timestamp: new Date(),
      };

      setMessages([...messages, newMsg]);
      setNewMessage("");
      setCounterOffer("");
    }
  };

  return (
    <div>
      <div style="max-height: 150px; overflow-y: auto; background: #fafafa; padding: 10px; border-radius: 8px; margin: 10px 0; border: 1px solid #e9ecef;">
        {messages.map((msg: any) => (
          <div
            key={msg.id}
            style={`margin: 8px 0; text-align: ${
              msg.sender === "student" ? "right" : "left"
            };`}
          >
            <div
              style={`display: inline-block; padding: 10px; border-radius: 15px; max-width: 75%; ${
                msg.sender === "student"
                  ? "background: linear-gradient(135deg, #3498db, #2980b9); color: white;"
                  : "background: linear-gradient(135deg, #ecf0f1, #bdc3c7); color: #2c3e50;"
              }`}
            >
              <p style="margin: 0; font-size: 14px;">{msg.message}</p>
              {msg.suggested_price && (
                <p style="margin: 8px 0 0 0; font-weight: bold; font-size: 15px;">
                  💰 {msg.suggested_price} UAH
                </p>
              )}
              <p style="margin: 5px 0 0 0; font-size: 11px; opacity: 0.8;">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      <form
        onSubmit={sendNegotiation}
        style="display: flex; gap: 8px; margin: 15px 0;"
      >
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.currentTarget.value)}
          placeholder="💬 Negotiate price or ask questions..."
          style="flex: 1; padding: 10px; border: 1px solid #ddd; border-radius: 8px; resize: none; font-family: inherit;"
          rows={2}
          required
        />
        <input
          type="number"
          value={counterOffer}
          onChange={(e) => setCounterOffer(e.currentTarget.value)}
          placeholder="💰 Price"
          style="width: 90px; padding: 10px; border: 1px solid #ddd; border-radius: 8px;"
        />
        <button
          type="submit"
          style="background: linear-gradient(135deg, #3498db, #2980b9); color: white; padding: 10px 15px; border: none; border-radius: 8px; font-weight: bold; cursor: pointer;"
        >
          📤 Send
        </button>
      </form>
    </div>
  );
}
