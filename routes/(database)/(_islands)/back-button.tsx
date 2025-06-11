import { useEffect, useState } from "preact/hooks";

export default function BackButton() {
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    setCanGoBack(globalThis.history.length > 1);
  }, []);

  const handleBack = () => {
    if (canGoBack) {
      globalThis.history.back();
    } else {
      globalThis.location.href = "/database";
    }
  };

  return (
    <button
      type="button"
      class="back-button"
      onClick={handleBack}
    >
      ← Back
    </button>
  );
}
