import { useState } from "preact/hooks";

export default function AcceptTeacher({
  response,
  announcementId,
}: {
  response: any;
  announcementId: number;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAccept = async (e: Event) => {
    e.preventDefault();

    const confirmed = confirm(
      `Accept ${response.teacher_name} for ${
        response.current_price || response.suggested_price
      } UAH?`,
    );

    if (!confirmed) return;

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("announcement_id", announcementId.toString());
    formData.append("teacher_id", response.teacher_id.toString());
    formData.append("response_id", response.id.toString());
    formData.append(
      "agreed_price",
      (response.current_price || response.suggested_price).toString(),
    );

    const result = await fetch("/api/accept-teacher", {
      method: "POST",
      body: formData,
    });

    if (result.ok) {
      window.location.reload();
    } else {
      alert("Failed to accept teacher. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <button
      onClick={handleAccept}
      disabled={isSubmitting}
      style="width: 100%; background: linear-gradient(135deg, #27ae60, #219a52); color: white; padding: 12px; border: none; border-radius: 8px; font-weight: bold; font-size: 14px; cursor: pointer;"
    >
      {isSubmitting
        ? "⏳ Processing..."
        : `✅ Accept for ${
          response.current_price || response.suggested_price
        } UAH`}
    </button>
  );
}
