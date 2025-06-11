import { useEffect, useState } from "preact/hooks";
import TeacherResponsesManager from "./teacher-response-manager.tsx";
import type { Post } from "../../../types/basic.ts";

interface AnnouncementWithStatus extends Post {
  response_count: number;
  status: string;
}

export default function AnnouncementManager({
  announcements,
}: {
  announcements: AnnouncementWithStatus[];
}) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [processedAnnouncements, setProcessedAnnouncements] = useState<
    AnnouncementWithStatus[]
  >([]);

  useEffect(() => {
    const processed = announcements.map((ann) => ({
      ...ann,
      creation_date: new Date(ann.creation_date),
    }));
    setProcessedAnnouncements(processed);

    const urlParams = new URLSearchParams(globalThis.location.search);
    const idFromUrl = urlParams.get("id");
    if (idFromUrl) {
      setSelectedId(parseInt(idFromUrl));
    }
  }, [announcements]);

  const handleViewResponses = (announcementId: number) => {
    setSelectedId(announcementId);
    const newUrl =
      `/cabinet/announcements?id=${announcementId}#announcement-${announcementId}`;
    globalThis.history.pushState({}, "", newUrl);
  };

  const handleClose = () => {
    setSelectedId(null);
    globalThis.history.pushState({}, "", "/cabinet/announcements");
  };

  return (
    <div class="announcement-list">
      {processedAnnouncements.map((ann) => (
        <div key={ann.post_id} id={`announcement-${ann.post_id}`}>
          <div class="announcement-card">
            <h4>{ann.description}</h4>
            <p>Type: {ann.work_type}</p>
            <p>University: {ann.university}</p>
            <p>Subject: {ann.subject_area}</p>
            <p>Budget: {ann.initial_price} UAH</p>
            <p>Created: {ann.creation_date.toLocaleDateString()}</p>
            <p>
              Status:{" "}
              <span
                style={`font-weight: bold; color: ${
                  ann.status === "active"
                    ? "#3498db"
                    : ann.status === "completed"
                    ? "#27ae60"
                    : "#e74c3c"
                }`}
              >
                {ann.status}
              </span>
            </p>
            <p>Teacher Responses: {ann.response_count}</p>
            <button
              type="button"
              onClick={() =>
                handleViewResponses(ann.post_id)}
              style="background: #3498db; color: white; padding: 8px 16px; border: none; border-radius: 5px; cursor: pointer;"
            >
              {ann.status === "active" ? "Manage Responses" : "View Details"}
            </button>
          </div>

          {selectedId === ann.post_id && (
            <div
              class="announcement-details-expanded"
              style="margin-top: 10px; padding: 15px; background: #f9f9f9; border-radius: 5px; border: 2px solid #3498db;"
            >
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                <h4>📋 Managing: {ann.description}</h4>
                <button
                  type="button"
                  onClick={handleClose}
                  style="background: none; border: none; color: #e74c3c; font-size: 18px; cursor: pointer; padding: 0;"
                >
                  ✕ Close
                </button>
              </div>

              <TeacherResponsesManager
                announcementId={ann.post_id}
                currentPrice={ann.initial_price}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
