export default function AnnouncementCard({
  id,
  workType,
  university,
  subjectArea,
  description,
  initialPrice,
  creationDate,
}: {
  id: number;
  workType: string;
  university: string;
  subjectArea: string;
  description: string;
  initialPrice: number;
  creationDate: Date;
}) {
  return (
    <div class="announcement-card">
      <h4>{description}</h4>
      <p>Type: {workType}</p>
      <p>University: {university}</p>
      <p>Subject: {subjectArea}</p>
      <p>Price: {initialPrice}</p>
      <p>Created: {creationDate.toLocaleDateString()}</p>
      <a href={`/cabinet/announcements/${id}`}>View</a>
    </div>
  );
}
