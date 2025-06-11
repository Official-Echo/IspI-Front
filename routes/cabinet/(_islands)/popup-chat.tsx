import { useEffect, useState } from "preact/hooks";

interface ChatMessage {
  id: number;
  sender: "teacher" | "student";
  message?: string;
  suggested_price?: number;
  timestamp: Date;
  can_accept?: boolean;
}

interface AnnouncementInfo {
  id: number;
  description: string;
  work_type: string;
  subject_area: string;
  university: string;
  initial_price: number;
  deadline?: Date;
}

export default function PopupChat({
  announcementId,
  teacherId,
  teacherName,
  userRole,
  onClose,
}: {
  announcementId: number;
  teacherId: number;
  teacherName: string;
  userRole: "student" | "teacher";
  onClose: () => void;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [suggestedPrice, setSuggestedPrice] = useState("");
  const [announcement, setAnnouncement] = useState<AnnouncementInfo | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChatData();
  }, [announcementId, teacherId]);

  const fetchChatData = async () => {
    try {
      const [chatRes, announcementRes] = await Promise.all([
        fetch(`/api/chat/${announcementId}/${teacherId}`),
        fetch(`/api/announcement/${announcementId}`),
      ]);

      console.log("chatRes status:", chatRes.status);
      console.log("chatRes headers:", chatRes.headers.get("content-type"));

      const chatText = await chatRes.text();
      console.log("chatRes raw text:", chatText);

      if (chatRes.ok) {
        try {
          const chatData = JSON.parse(chatText);
          setMessages(chatData.messages || []);
        } catch (parseError) {
          console.error("JSON parse error for chat:", parseError);
          console.error("Trying to parse:", chatText);
        }
      }

      if (announcementRes.ok) {
        const announcementData = await announcementRes.json();
        setAnnouncement(announcementData);
      }
    } catch (error) {
      console.error("Failed to fetch chat data:", error);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (e: Event) => {
    e.preventDefault();
    if (!suggestedPrice || parseInt(suggestedPrice) <= 0) return;

    const messageData = {
      suggested_price: parseInt(suggestedPrice),
    };

    const response = await fetch(`/api/chat/${announcementId}/${teacherId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(messageData),
    });

    if (response.ok) {
      const newMsg: ChatMessage = {
        id: Date.now(),
        sender: userRole,
        suggested_price: parseInt(suggestedPrice),
        timestamp: new Date(),
      };

      setMessages([...messages, newMsg]);
      setSuggestedPrice("");
    }
  };

  const acceptDeal = async (messageId: number, price: number) => {
    const confirmed = confirm(
      `Accept this deal for ${price} UAH? This will create a binding agreement.`,
    );

    if (!confirmed) return;

    const response = await fetch("/api/accept-deal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        announcement_id: announcementId,
        teacher_id: teacherId,
        agreed_price: price,
        message_id: messageId,
      }),
    });

    if (response.ok) {
      alert("Deal accepted! Redirecting to your deals page...");
      window.location.href = "/cabinet/deals";
    } else {
      alert("Failed to accept deal. Please try again.");
    }
  };

  if (loading) {
    return (
      <div class="popup-overlay">
        <div class="popup-chat">
          <div class="chat-header">
            <h3>Loading...</h3>
            <button class="close-btn" onClick={onClose}>✕</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div class="popup-overlay">
      <div class="popup-chat">
        <div class="chat-header">
          <h3>💬 Chat with {teacherName}</h3>
          <button class="close-btn" onClick={onClose}>✕</button>
        </div>

        <div class="chat-content">
          <div class="announcement-sidebar">
            <h4>📋 Announcement Details</h4>
            {announcement && (
              <div class="announcement-info">
                <p>
                  <strong>Description:</strong> {announcement.description}
                </p>
                <p>
                  <strong>Type:</strong> {announcement.work_type}
                </p>
                <p>
                  <strong>Subject:</strong> {announcement.subject_area}
                </p>
                <p>
                  <strong>University:</strong> {announcement.university}
                </p>
                <p>
                  <strong>Budget:</strong> {announcement.initial_price} UAH
                </p>
                {announcement.deadline && (
                  <p>
                    <strong>Deadline:</strong>{" "}
                    {new Date(announcement.deadline).toLocaleDateString()}
                  </p>
                )}
              </div>
            )}
          </div>

          <div class="chat-area">
            <div class="messages-container">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  class={`message ${
                    msg.sender === userRole ? "own-message" : "other-message"
                  }`}
                >
                  <div class="message-content">
                    {msg.suggested_price && (
                      <div class="price-offer">
                        <span class="price-tag">
                          💰 {msg.suggested_price} UAH
                        </span>
                        {msg.sender === "teacher" && userRole === "student" && (
                          <button
                            class="accept-deal-btn"
                            onClick={() =>
                              acceptDeal(msg.id, msg.suggested_price!)}
                          >
                            ✅ Accept Deal
                          </button>
                        )}
                      </div>
                    )}
                    <span class="timestamp">
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <form class="message-form" onSubmit={sendMessage}>
              <div class="input-row">
                <div class="price-input" style="flex: 1;">
                  <label>💰 Enter your price offer (UAH):</label>
                  <input
                    type="number"
                    value={suggestedPrice}
                    onChange={(e) => setSuggestedPrice(e.currentTarget.value)}
                    placeholder="Enter amount..."
                    min="1"
                    step="1"
                    required
                  />
                </div>
                <button type="submit" class="send-btn">
                  {userRole === "teacher"
                    ? "🎯 Make Offer"
                    : "💰 Counter Offer"}
                </button>
              </div>
              <div class="form-actions">
                <small>
                  {userRole === "teacher"
                    ? "💡 Make competitive offers to win the project"
                    : "💡 Only you can accept final deals"}
                </small>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
