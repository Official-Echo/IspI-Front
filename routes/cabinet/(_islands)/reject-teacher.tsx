import { useState } from "preact/hooks";

export default function RejectTeacher({ responseId }: { responseId: number }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleReject = async (e: Event) => {
    e.preventDefault();

    const confirmed = confirm("Reject this teacher?");
    if (!confirmed) return;

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("response_id", responseId.toString());

    const result = await fetch("/api/reject-teacher", {
      method: "POST",
      body: formData,
    });

    if (result.ok) {
      window.location.reload();
    } else {
      alert("Failed to reject teacher. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <button
      onClick={handleReject}
      disabled={isSubmitting}
      style="background: linear-gradient(135deg, #e74c3c, #c0392b); color: white; padding: 12px 16px; border: none; border-radius: 8px; font-weight: bold; cursor: pointer;"
    >
      {isSubmitting ? "⏳..." : "❌ Reject"}
    </button>
  );
}
