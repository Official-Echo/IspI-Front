import { useState } from "preact/hooks";

export default function UploadWork({ dealId }: { dealId: number }) {
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async (e: Event) => {
    e.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch(`/api/upload-work/${dealId}`, {
      method: "POST",
      body: formData,
    });
    if (response.ok) alert("Work uploaded!");
  };

  return (
    <form class="upload-work" onSubmit={handleUpload}>
      <label>
        Upload Work:
        <input
          type="file"
          onChange={(e) => setFile(e.currentTarget.files?.[0] || null)}
          required
        />
      </label>
      <button type="submit">Upload</button>
    </form>
  );
}
