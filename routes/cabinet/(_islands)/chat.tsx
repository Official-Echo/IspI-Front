import { useEffect, useState } from "preact/hooks";

interface MessageType {
  id: number;
  text: string;
  sender: string;
}

export default function Chat({ dealId }: { dealId: number }) {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchMessages() {
      const response = await fetch(`/api/chat/${dealId}`);
      const data = await response.json();
      setMessages(data);
    }
    fetchMessages();
  }, [dealId]);

  const sendMessage = async (e: Event) => {
    e.preventDefault();
    const response = await fetch(`/api/chat/${dealId}`, {
      method: "POST",
      body: JSON.stringify({ message }),
    });
    if (response.ok) {
      setMessages([...messages, {
        id: Date.now(),
        text: message,
        sender: "me",
      }]);
      setMessage("");
    }
  };

  return (
    <div class="chat">
      <h4>Chat</h4>
      <div class="messages">
        {messages.map((msg: any) => (
          <p key={msg.id}>
            <strong>{msg.sender}:</strong> {msg.text}
          </p>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.currentTarget.value)}
          required
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
