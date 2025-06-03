export default function DocumentCard({
  id,
  name,
  workType,
  subjectArea,
  uploadDate,
  canInteract,
}: {
  id: number;
  name: string;
  workType: string;
  subjectArea: string;
  uploadDate: Date;
  canInteract: boolean;
}) {
  return (
    <div class="document-card">
      <h4>{name}</h4>
      <p>Type: {workType}</p>
      <p>Subject: {subjectArea}</p>
      <p>Uploaded: {uploadDate.toLocaleDateString()}</p>
      <a href={`/database/${id}`}>View</a>
      {canInteract && (
        <>
          <button type="button">Download</button>
          <button type="button">Add to Favorites</button>
        </>
      )}
    </div>
  );
}
