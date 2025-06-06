import { useEffect, useState } from "preact/hooks";
import Chat from "./chat.tsx";
import CostAdjuster from "./cost-adjuster.tsx";

interface TeacherResponse {
  id: number;
  teacher_id: number;
  teacher_name: string;
  teacher_experience: string;
  teacher_rating: number;
  suggested_price: number;
  current_price: number;
  estimated_days: number;
}

interface ExistingDeal {
  id: number;
  teacher_name: string;
  agreed_price: number;
}

export default function TeacherResponsesManager({
  announcementId,
  currentPrice,
}: {
  announcementId: number;
  currentPrice: number;
}) {
  const [teacherResponses, setTeacherResponses] = useState<TeacherResponse[]>(
    [],
  );
  const [existingDeal, setExistingDeal] = useState<ExistingDeal | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();

    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [announcementId]);

  const fetchData = async () => {
    try {
      const [responsesRes, dealRes] = await Promise.all([
        fetch(`/api/announcement-responses/${announcementId}`),
        fetch(`/api/announcement-deal/${announcementId}`),
      ]);

      if (responsesRes.ok) {
        const responses = await responsesRes.json();
        setTeacherResponses(responses);
      }

      if (dealRes.ok) {
        const deal = await dealRes.json();
        setExistingDeal(deal);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTeacherAction = async (
    action: "accept" | "reject",
    responseId: number,
    teacherId?: number,
    price?: number,
  ) => {
    const formData = new FormData();
    formData.append("response_id", responseId.toString());

    if (action === "accept") {
      formData.append("announcement_id", announcementId.toString());
      formData.append("teacher_id", teacherId!.toString());
      formData.append("agreed_price", price!.toString());
    }

    const response = await fetch(`/api/${action}-teacher`, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      if (action === "accept") {
        fetchData();
      } else {
        setTeacherResponses((prev) => prev.filter((r) => r.id !== responseId));
      }
    } else {
      alert(`Failed to ${action} teacher. Please try again.`);
    }
  };

  if (loading) {
    return <div>Loading teacher responses...</div>;
  }

  return (
    <div>
      {existingDeal
        ? (
          <div style="background: linear-gradient(90deg, #e8f5e8, #d4edda); padding: 20px; border-radius: 8px; border: 1px solid #27ae60;">
            <h4>✅ Deal Active!</h4>
            <p>
              You accepted{" "}
              <strong>{existingDeal.teacher_name}</strong>'s offer for{" "}
              <strong>{existingDeal.agreed_price} UAH</strong>
            </p>
            <a
              href={`/cabinet/deals/${existingDeal.id}`}
              style="background: #27ae60; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 10px;"
            >
              💬 Open Deal Chat
            </a>
          </div>
        )
        : (
          <div>
            <h4>👨‍🏫 Teacher Responses ({teacherResponses.length})</h4>

            {teacherResponses.length === 0
              ? (
                <div style="text-align: center; padding: 30px; background: linear-gradient(45deg, #f8f9fa, #e9ecef); border-radius: 8px; border: 2px dashed #dee2e6;">
                  <p style="font-size: 18px; margin-bottom: 15px;">
                    📭 No responses yet
                  </p>
                  <p style="color: #6c757d; margin-bottom: 20px;">
                    Consider increasing your budget to attract more teachers
                  </p>
                  <CostAdjuster
                    announcementId={announcementId}
                    currentPrice={currentPrice}
                  />
                </div>
              )
              : (
                <div style="max-height: 500px; overflow-y: auto;">
                  {teacherResponses.map((response) => (
                    <TeacherResponseCard
                      key={response.id}
                      response={response}
                      onAction={handleTeacherAction}
                    />
                  ))}
                </div>
              )}
          </div>
        )}
    </div>
  );
}

function TeacherResponseCard({
  response,
  onAction,
}: {
  response: TeacherResponse;
  onAction: (
    action: "accept" | "reject",
    responseId: number,
    teacherId?: number,
    price?: number,
  ) => void;
}) {
  const [isAccepting, setIsAccepting] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);

  const handleAccept = async () => {
    const confirmed = confirm(
      `Accept ${response.teacher_name} for ${
        response.current_price || response.suggested_price
      } UAH?`,
    );

    if (!confirmed) return;

    setIsAccepting(true);
    await onAction(
      "accept",
      response.id,
      response.teacher_id,
      response.current_price || response.suggested_price,
    );
    setIsAccepting(false);
  };

  const handleReject = async () => {
    const confirmed = confirm("Reject this teacher?");
    if (!confirmed) return;

    setIsRejecting(true);
    await onAction("reject", response.id);
    setIsRejecting(false);
  };

  return (
    <div style="border: 1px solid #ddd; margin: 15px 0; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
      <div style="background: linear-gradient(135deg, #f8f9fa, #e9ecef); padding: 15px; border-bottom: 1px solid #ddd;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <h5 style="margin: 0; color: #2c3e50; font-size: 16px;">
              👨‍🎓 {response.teacher_name}
            </h5>
            <p style="margin: 5px 0 0 0; color: #6c757d; font-size: 14px;">
              {response.teacher_experience}
            </p>
            <p style="margin: 5px 0 0 0; color: #f39c12; font-weight: bold;">
              ⭐ {response.teacher_rating}/5
            </p>
          </div>
          <div style="text-align: right;">
            <p style="margin: 0; font-size: 20px; font-weight: bold; color: #27ae60;">
              💰 {response.current_price || response.suggested_price} UAH
            </p>
            <p style="margin: 5px 0 0 0; color: #6c757d; font-size: 14px;">
              📅 {response.estimated_days} days
            </p>
          </div>
        </div>
      </div>

      <div style="padding: 15px;">
        <h6 style="margin: 0 0 10px 0; color: #495057;">
          💬 Price Negotiation:
        </h6>

        <Chat dealId={response.id} />

        <div style="display: flex; gap: 10px; margin-top: 15px;">
          <button
            onClick={handleAccept}
            disabled={isAccepting}
            style="flex: 1; background: linear-gradient(135deg, #27ae60, #219a52); color: white; padding: 12px; border: none; border-radius: 8px; font-weight: bold; font-size: 14px; cursor: pointer;"
          >
            {isAccepting
              ? "⏳ Processing..."
              : `✅ Accept for ${
                response.current_price || response.suggested_price
              } UAH`}
          </button>

          <button
            onClick={handleReject}
            disabled={isRejecting}
            style="background: linear-gradient(135deg, #e74c3c, #c0392b); color: white; padding: 12px 16px; border: none; border-radius: 8px; font-weight: bold; cursor: pointer;"
          >
            {isRejecting ? "⏳..." : "❌ Reject"}
          </button>
        </div>
      </div>
    </div>
  );
}
